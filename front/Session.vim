let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/dev/epitech/gigz/front
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +11 src/api/chat.ts
badd +34 ~/dev/epitech/gigz/front/src/components/Chat/Chat.tsx
badd +50 src/components/Chat/ChatList.tsx
badd +50 ~/dev/epitech/gigz/front/src/components/Chat/ChatItem/ChatItem.tsx
badd +2 tailwind.config.js
badd +12 src/pages/Layout/Layout.tsx
badd +33 ~/dev/epitech/gigz/front/src/services/GigzFetcher.ts
argglobal
%argdel
$argadd src/api/chat.ts
set stal=2
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit ~/dev/epitech/gigz/front/src/components/Chat/Chat.tsx
argglobal
balt src/api/chat.ts
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=10
setlocal nofen
let s:l = 35 - ((18 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 35
normal! 09|
tabnext
edit src/components/Chat/ChatList.tsx
argglobal
balt ~/dev/epitech/gigz/front/src/components/Chat/Chat.tsx
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=10
setlocal nofen
let s:l = 50 - ((27 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 50
normal! 023|
tabnext 1
set stal=1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
