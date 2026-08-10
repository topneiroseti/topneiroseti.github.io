// ============================================================
// main.js — search, hamburger menu, card filter, rating sort
// ============================================================

// ----- Hamburger menu -----
function toggleMenu(){
  var nav=document.getElementById('nav');
  var hamburger=document.getElementById('hamburger');
  if(nav){nav.classList.toggle('open')}
  if(hamburger){hamburger.classList.toggle('open')}
}
window.toggleMenu=toggleMenu;

// ----- Card filter (homepage search) -----
function filterCards(){
  var q=(document.getElementById('search')?.value||'').toLowerCase().trim();
  var cards=document.querySelectorAll('.card');
  cards.forEach(function(c){
    var name=(c.getAttribute('data-name')||'').toLowerCase();
    c.style.display=(!q||name.indexOf(q)>-1)?'':'none';
  });
}
window.filterCards=filterCards;

// ----- Global search with results dropdown -----
(function(){
  var searchInput=document.getElementById('search');
  var resultsDiv=document.getElementById('search-results');
  if(!searchInput||!resultsDiv) return;

  // Build search index from all services
  var services=[
    {name:'ChatGPT',cat:'Текст',url:'models/chatgpt/'},
    {name:'Claude',cat:'Текст',url:'models/claude/'},
    {name:'Midjourney',cat:'Изображения',url:'models/midjourney/'},
    {name:'Suno',cat:'Аудио',url:'models/suno/'},
    {name:'DeepSeek',cat:'Текст',url:'models/deepseek/'},
    {name:'GigaChat',cat:'Текст',url:'models/gigachat/'},
    {name:'Яндекс Алиса',cat:'Текст',url:'models/yandex-alice/'},
    {name:'Kling AI',cat:'Видео',url:'models/kling/'},
    {name:'Recraft',cat:'Изображения',url:'models/recraft/'},
    {name:'MiniMax',cat:'Видео',url:'models/minimax/'},
    {name:'Mistral AI',cat:'Текст',url:'models/mistral/'},
    {name:'Krea',cat:'Изображения',url:'models/krea/'},
    {name:'Bria AI',cat:'Изображения',url:'models/bria/'},
    {name:'Meta AI',cat:'Текст',url:'models/meta/'},
    {name:'GPTunnel',cat:'Агрегатор',url:'competitors/gptunnel/'},
    {name:'MashaGPT',cat:'Агрегатор',url:'competitors/mashagpt/'},
    {name:'Study24',cat:'Агрегатор',url:'competitors/study24/'},
    {name:'RuGPT',cat:'Агрегатор',url:'competitors/rugpt/'},
    {name:'Aily',cat:'Агрегатор',url:'competitors/aily/'},
    {name:'Era2',cat:'Агрегатор',url:'competitors/era2/'},
    {name:'Fichi AI',cat:'Агрегатор',url:'competitors/fichi-ai/'},
    {name:'Ranvik',cat:'Агрегатор',url:'competitors/ranvik/'},
    {name:'Air Fail',cat:'Агрегатор',url:'competitors/air-fail/'},
    {name:'GPT Portal',cat:'Агрегатор',url:'competitors/gptportal/'},
    {name:'LeinGPT',cat:'Агрегатор',url:'competitors/leingpt/'},
    {name:'Floctor',cat:'Агрегатор',url:'competitors/floctor/'}
  ];

  // Determine depth (how many ../ to reach root)
  var depth=0;
  var path=window.location.pathname;
  if(path.match(/\/models\//)||path.match(/\/competitors\//)) depth=2;
  else if(path.match(/\/rating\//)||path.match(/\/reviews\//)) depth=1;
  var prefix='../'.repeat(depth);

  searchInput.addEventListener('input',function(){
    var q=this.value.toLowerCase().trim();
    if(!q||q.length<2){
      resultsDiv.classList.remove('active');
      resultsDiv.innerHTML='';
      return;
    }
    var matches=services.filter(function(s){
      return s.name.toLowerCase().indexOf(q)>-1||s.cat.toLowerCase().indexOf(q)>-1;
    }).slice(0,8);
    if(matches.length===0){
      resultsDiv.innerHTML='<div class="search-result-item"><span class="sr-name">Ничего не найдено</span></div>';
      resultsDiv.classList.add('active');
      return;
    }
    resultsDiv.innerHTML=matches.map(function(s){
      return '<a class="search-result-item" href="'+prefix+s.url+'"><span class="sr-name">'+s.name+'</span> <span class="sr-cat">'+s.cat+'</span></a>';
    }).join('');
    resultsDiv.classList.add('active');
    // Also filter cards if on a page with cards
    filterCards();
  });

  // Close results on outside click
  document.addEventListener('click',function(e){
    if(!searchInput.contains(e.target)&&!resultsDiv.contains(e.target)){
      resultsDiv.classList.remove('active');
    }
  });

  // Close on Escape
  searchInput.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      resultsDiv.classList.remove('active');
      this.blur();
    }
  });
})();

// ----- Rating page sorting -----
function sortRating(){
  var table=document.getElementById('rating-table');
  if(!table) return;
  var select=document.getElementById('sort-select');
  if(!select) return;
  var value=select.value;
  var tbody=table.querySelector('tbody');
  var rows=Array.from(tbody.querySelectorAll('tr'));

  rows.sort(function(a,b){
    var aR=parseFloat(a.dataset.rating);
    var bR=parseFloat(b.dataset.rating);
    var aRev=parseInt(a.dataset.reviews);
    var bRev=parseInt(b.dataset.reviews);
    var aN=a.dataset.name;
    var bN=b.dataset.name;

    switch(value){
      case 'rating-desc': return bR-aR||bRev-aRev;
      case 'rating-asc': return aR-bR||aRev-bRev;
      case 'reviews-desc': return bRev-aRev;
      case 'reviews-asc': return aRev-bRev;
      case 'name-asc': return aN.localeCompare(bN);
      default: return bR-aR;
    }
  });

  rows.forEach(function(row){tbody.appendChild(row)});
  
  // Update rank numbers
  rows.forEach(function(row,i){
    row.querySelector('.rank').textContent=i+1;
  });
}
window.sortRating=sortRating;
