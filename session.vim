if has('python')
python << EOF
import os, vim
items = {x.replace('=', r'\=') for x in os.listdir('.')}
items -= {'.git', 'lib'}
vim.command('nnoremap <leader>k :silent !git difftool -d ' + ' '.join(items) + ' -d &<CR>')
EOF
endif

set wildignore+=*.pyj-cached
set wildignore+=node_modules
