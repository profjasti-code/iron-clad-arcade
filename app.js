const originals = [
  ['2048','2048','Puzzle','gabrielecirulli/2048','Use arrow keys or swipe to merge matching tiles.'],
  ['tetris','Tetris','Puzzle','jakesgordon/javascript-tetris','Press Space to start. Move with the arrow keys and rotate with Up.'],
  ['clumsy','Clumsy Bird','Arcade','ellisonleao/clumsy-bird','Click, tap, or press Space to flap through the gaps.'],
  ['hextris','Hextris','Puzzle','Hextris/hextris','Use Left and Right or tap the sides to rotate the hexagon.'],
  ['breakout','Breakout','Arcade','jakesgordon/javascript-breakout','Press Space to serve. Move the paddle with Left and Right or drag.'],
  ['pacman','Pac-Man','Arcade','daleharvey/pacman','Press N to start and use the arrow keys to steer.']
].map(([id,name,genre,repo,controls])=>({id,name,genre,repo,controls}));
const get=id=>document.getElementById(id);
const games = [...originals, ...guestGames.filter(g=>g.name!=='2048')];
const genres=[...new Set(games.flatMap(g=>g.tags||[g.genre]))].sort();
get('genre').replaceChildren(...['All genres',...genres].map(label=>new Option(label,label)));
get('summary').textContent=games.length+' games to explore and play.';
function escapeText(value){return value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const heart='<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 4.8c-2.7-2.2-6.2-1-8.5 1.6C9.7 3.8 6.2 2.6 3.5 4.8c-3 2.5-2.2 6.4.4 9.1l8.1 7.2 8.1-7.2c2.6-2.7 3.4-6.6.4-9.1z"/></svg>';

function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}}
function save(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{}}
let saved=new Set(read('quartercade-favorites',[])),page='home';
const prefs=read('quartercade-display',{dark:true,showClock:true,hours:false});
function card(g,home=false){
 const star=saved.has(g.id);
 const name=escapeText(g.name);
 const art=g.image||'art/'+g.id+'-cover.webp';
 return `<article><button class="game" data-play="${g.id}" aria-label="Play ${name}"><img loading="lazy" decoding="async" src="${art}" alt=""><strong>${name}</strong></button>${home?'':`<button class="fav" aria-label="Favorite ${name}" aria-pressed="${star}" data-fav="${g.id}">${heart}</button>`}</article>`;
}
function catalog(){
 const q=get('query').value.trim().toLowerCase(),genre=get('genre').value;
 const list=games.filter(g=>(page!=='saved'||saved.has(g.id))&&(genre==='All genres'||(g.tags||[g.genre]).includes(genre))&&g.name.toLowerCase().includes(q));
 get('matches').textContent=list.length+' '+(list.length===1?'game':'games');
 get('grid').innerHTML=list.map(g=>card(g)).join('')||`<p>${page==='saved'&&!saved.size?'Choose a heart in All Games to save a favorite.':'No games match your search.'}</p>`;
}
function navigate(next){
 page=next;document.body.dataset.view=page;get('home').hidden=page!=='home';get('settings').hidden=page!=='settings';get('catalog').hidden=!['all','saved'].includes(page);
 document.querySelectorAll('nav button').forEach(b=>{if(b.dataset.page===(page==='saved'?'all':page))b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
 get('heading').textContent=page==='saved'?'Favorites':'All Games';
 get('query').value='';get('genre').value='All genres';catalog();window.scrollTo(0,0);
}
function clock(){get('clock').hidden=!prefs.showClock;get('clock').textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',hour12:!prefs.hours});}
function display(){document.documentElement.dataset.theme=prefs.dark?'dark':'light';clock();}
for(const key of ['dark','showClock','hours']){
 get(key).checked=prefs[key];get(key).onchange=()=>{prefs[key]=get(key).checked;save('quartercade-display',prefs);display();};
}
display();setInterval(clock,10000);
get('query').oninput=catalog;get('genre').onchange=catalog;
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.play){
  const g=games.find(g=>g.id===b.dataset.play);
  get('title').textContent=g.name;get('control').textContent=g.controls||g.tags.join(' · ');get('frame').title=g.name+' game';
  const url=g.url||'games/'+g.id+'/index.html';
  get('openGame').href=url;
  get('player').showModal();get('frame').src=url;

 }else if(b.dataset.fav){
 const id=b.dataset.fav;saved.has(id)?saved.delete(id):saved.add(id);save('quartercade-favorites',[...saved]);catalog();document.querySelector('[data-fav="'+id+'"]')?.focus();
 }else if(b.dataset.page){if(b.dataset.page===page &&page==='saved')navigate('all');else navigate(b.dataset.page);}
 else if(b.id==='sources')get('credits').showModal();
 else if(b.classList.contains('close'))b.closest('dialog').close();
});
get('player').addEventListener('close',()=>get('frame').src='about:blank');
get('frame').addEventListener('load',()=>{if(get('player').open){get('frame').focus();if(get('frame').contentDocument)get('frame').contentWindow.addEventListener('keydown',e=>{if(e.key==='Escape')get('player').close();});}});
get('links').innerHTML='<a href="https://geodmeeeeee.github.io/chiknsandwitch/" target="_blank" rel="noopener">Chikin Sandwitch collection<small>Original catalog and hosted games</small></a>'+originals.map(g=>`<a href="https://github.com/${g.repo}" target="_blank" rel="noopener">${g.name}<small>github.com/${g.repo}</small></a>`).join('');
navigate('home');
