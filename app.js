const originals = [
  ['2048','2048','Puzzle','gabrielecirulli/2048','Use arrow keys or swipe to merge matching tiles.'],
  ['tetris','Tetris','Puzzle','jakesgordon/javascript-tetris','Press Space to start. Move with the arrow keys and rotate with Up.'],
  ['clumsy','Clumsy Bird','Arcade','ellisonleao/clumsy-bird','Click, tap, or press Space to flap through the gaps.'],
  ['hextris','Hextris','Puzzle','Hextris/hextris','Use Left and Right or tap the sides to rotate the hexagon.'],
  ['breakout','Breakout','Arcade','jakesgordon/javascript-breakout','Press Space to serve. Move the paddle with Left and Right or drag.'],
  ['pacman','Pac-Man','Arcade','daleharvey/pacman','Press N to start and use the arrow keys to steer.']
].map(([id,name,genre,repo,controls])=>({id,name,genre,repo,controls}));
const get=id=>document.getElementById(id);
const pokiGames = [
  {
    "id": "poki-level-devil",
    "name": "Level Devil",
    "url": "https://poki.com/en/g/level-devil",
    "image": "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=320,height=320,fit=cover,f=auto/701e10b108ed7a0c68c738c46c9a705a/level-devil-logo.png",
    "tags": [
      "Poki",
      "Platformer"
    ],
    "external": true
  },
  {
    "id": "poki-master-chess",
    "name": "Master Chess",
    "url": "https://poki.com/en/g/master-chess",
    "image": "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=320,height=320,fit=cover,f=auto/505695b9-1b21-47fd-a8e1-93345afb57de/master-chess-logo.png",
    "tags": [
      "Poki",
      "Strategy"
    ],
    "external": true
  },
  {
    "id": "poki-aquaparkio",
    "name": "Aquapark.io",
    "url": "https://poki.com/en/g/aquaparkio",
    "image": "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=320,height=320,fit=cover,f=auto/f7807dce7b12c7db10bee0e6f645732b/aquaparkio-logo.jfif",
    "tags": [
      "Poki",
      "Racing"
    ],
    "external": true
  },
  {
    "id": "poki-minefun-io",
    "name": "MineFun.io",
    "url": "https://poki.com/en/g/minefun-io",
    "image": "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=320,height=320,fit=cover,f=auto/32d8c732177e212fce653cceeecfb5ac/minefun-io-logo.png",
    "tags": [
      "Poki",
      "Multiplayer"
    ],
    "external": true
  },
  {
    "id": "poki-blocky-blast-puzzle",
    "name": "Blocky Blast Puzzle",
    "url": "https://poki.com/en/g/blocky-blast-puzzle",
    "image": "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=320,height=320,fit=cover,f=auto/291aaf2dcf5c1322558a9c038b3c5251/blocky-blast-puzzle-logo.png",
    "tags": [
      "Poki",
      "Puzzle"
    ],
    "external": true
  },
  {
    "id": "poki-cryzen-io",
    "name": "Cryzen.io",
    "url": "https://poki.com/en/g/cryzen-io",
    "image": "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=320,height=320,fit=cover,f=auto/78b9b3f913a834fca35c2cc6423616af/cryzen-io-logo.jfif",
    "tags": [
      "Poki",
      "Shooter"
    ],
    "external": true
  }
];
const games = [...originals, ...pokiGames, ...guestGames.filter(g=>g.name!=='2048')];
// Snapshot: November 22, 2026. Headline chart positions precede collection positions.
// Each game's best placement across the two sites determines its order.
// Sources: https://poki.com/en/popular and https://www.coolmathgames.com/
// Additional titles: https://www.coolmathgames.com/1-mobile-site-most-popular-games
const chartPositions = {
  "2048": 32,
  "poki-master-chess": 1,
  "poki-minefun-io": 2,
  "poki-aquaparkio": 4,
  "poki-cryzen-io": 5,
  "geo-drift-boss": 7,
  "geo-retro-bowl": 8,
  "geo-stickman-hook": 9,
  "geo-monkey-mart": 10,
  "poki-blocky-blast-puzzle": 11,
  "poki-level-devil": 12,
  "geo-drive-mad": 29,
  "geo-basketball-stars": 32,
  "geo-ragdoll-hit": 55,
  "geo-speed-stars": 80,
  "geo-blacktop-police-chase": 98,
  "geo-run-3": 1,
  "geo-tiny-fishing": 4,
  "geo-cookie-clicker": 8,
  "geo-moto-x3m": 10,
  "geo-60-second-burger-run": 42,
  "geo-parking-fury": 45,
  "geo-moto-x3m-spooky-land": 46,
  "geo-parking-fury-2": 47,
  "geo-block-the-pig": 52
};
const titleOrder = new Intl.Collator('en', {numeric:true, sensitivity:'base'});
const pinnedGameId = 'geo-kour-io';
games.sort((a,b) => {
 if ((a.id === pinnedGameId) !== (b.id === pinnedGameId)) return a.id === pinnedGameId ? -1 : 1;
 const left = chartPositions[a.id] ?? Infinity;
 const right = chartPositions[b.id] ?? Infinity;
 return left === right ? titleOrder.compare(a.name,b.name) : left-right;
});
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
 const label=g.external?'Play on Poki':'Play';
 const art=g.image||'art/'+g.id+'-cover.webp';
 return `<article><button class="game" data-play="${g.id}" aria-label="${label} ${name}${g.external?' (opens in a new tab)':''}"><img loading="lazy" decoding="async" src="${art}" alt=""><strong>${name}${g.id === pinnedGameId ? ' <small>· Pinned</small>' : chartPositions[g.id] ? '' : ' <small>· Unranked</small>'}${g.external?' <small>· Poki ↗</small>':''}</strong></button>${home?'':`<button class="fav" aria-label="Favorite ${name}" aria-pressed="${star}" data-fav="${g.id}">${heart}</button>`}</article>`;
}
function catalog(){
 const q=get('query').value.trim().toLowerCase(),genre=get('genre').value;
 const list=games.filter(g=>(page!=='saved'||saved.has(g.id))&&(genre==='All genres'||(g.tags||[g.genre]).includes(genre))&&g.name.toLowerCase().includes(q));
 get('matches').textContent=list.length+' '+(list.length===1?'game':'games')+' · Poki and Coolmath chart order · Unranked games A–Z';
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
  if(g.external){window.open(g.url,'_blank','noopener,noreferrer');return;}
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
