#!/usr/bin/env python
# vim:fileencoding=utf-8
# License: BSD Copyright: 2016, Kovid Goyal <kovid at kovidgoyal.net>

import subprocess
import os
import shutil
import json

# Load metadata
base = os.path.dirname(os.path.abspath(__file__))
subprocess.check_call([os.path.join(base, 'build')])
with open('package.json', 'rb') as f:
    m = json.load(f)
version = m['version']

# Update the files in release/ from dev/
shutil.rmtree(os.path.join(base, 'release'))
shutil.copytree(os.path.join(base, 'dev'), os.path.join(base, 'release'))
subprocess.check_call(['git', 'add', os.path.join(base, 'release')])
if subprocess.check_output(
        'git status --porcelain --untracked-files release'.split()).strip():
    subprocess.check_call([
        'git', 'commit', '-m', 'Updating release build of compiler'])
    subprocess.check_call('git push'.split())

# Tag the release
subprocess.check_call('git tag -s v{0} -m version-{0}'.format(version).split())
subprocess.check_call(['git', 'push', 'origin', 'v'+version])

# Update the web REPL
gh_pages = os.path.join(os.path.dirname(base), 'kovidgoyal.github.io')
subprocess.check_call([os.path.join(gh_pages, 'update-rapyd-repl.py')])

# Publish to NPM
subprocess.check_call(['npm', 'publish', base])
