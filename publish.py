#!/usr/bin/env python
# vim:fileencoding=utf-8
# License: BSD Copyright: 2016, Kovid Goyal <kovid at kovidgoyal.net>

import subprocess
import os
import shutil
import json

base = os.path.dirname(os.path.abspath(__file__))
subprocess.check_call([os.path.join(base, 'build')])
with open('package.json', 'rb') as f:
    m = json.load(f)
version = m['version']
shutil.rmtree(os.path.join(base, 'release'))
shutil.copytree(os.path.join(base, 'dev'), os.path.join(base, 'release'))
subprocess.check_call(['git', 'add', os.path.join(base, 'release')])
if not subprocess.check_output(
        'git status --porcelain --untracked-files'.split()).strip():
    subprocess.check_call([
        'git', 'commit', '-m', 'Updating release build of compiler'])
subprocess.check_call('git tag -s v{0} -m version-{0}'.split())
subprocess.check_call(['git', 'push'])


gh_pages = os.path.join(os.path.dirname(base), 'kovidgoyal.github.io')
subprocess.check_call([os.path.join(gh_pages, 'update-rapyd-repl.py')])
subprocess.check_call(['npm', 'publish', base])
