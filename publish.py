#!/usr/bin/env python
# vim:fileencoding=utf-8
# License: GPLv3 Copyright: 2016, Kovid Goyal <kovid at kovidgoyal.net>

import subprocess
import os

base = os.path.dirname(os.path.abspath(__file__))
gh_pages = os.path.join(os.path.dirname(base), 'kovidgoyal.github.io')
subprocess.check_call([os.path.join(gh_pages, 'update-rapyd-repl.py')])
subprocess.check_call(['npm', 'publish', base])
