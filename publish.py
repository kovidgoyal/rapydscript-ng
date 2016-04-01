#!/usr/bin/env python
# vim:fileencoding=utf-8
# License: BSD Copyright: 2016, Kovid Goyal <kovid at kovidgoyal.net>

import subprocess
import os
import shutil

base = os.path.dirname(os.path.abspath(__file__))
shutil.rmtree(os.path.join(base, 'release'))
shutil.copytree(os.path.join(base, 'dev'), os.path.join(base, 'release'))
subprocess.check_call(['git', 'add', os.path.join(base, 'release')])
subprocess.check_call([
    'git', 'commit', '-m', 'Updating release build of compiler'])
subprocess.check_call(['git', 'push'])


gh_pages = os.path.join(os.path.dirname(base), 'kovidgoyal.github.io')
subprocess.check_call([os.path.join(gh_pages, 'update-rapyd-repl.py')])
subprocess.check_call(['npm', 'publish', base])
