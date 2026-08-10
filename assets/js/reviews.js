// Reviews widget — generates random reviews + localStorage form
(function(){
  var names=['Дмитрий','Анна','Сергей','Мария','Алексей','Елена','Иван','Ольга','Павел','Ксения','Андрей','Наталья','Владимир','Екатерина','Денис','Юлия'];
  var texts=[
    'Пользуюсь уже месяц, вполне доволен. Удобный интерфейс, быстро отвечает.',
    'Хорошая нейросеть для моих задач. Качество генерации на высоте.',
    'Нормальный сервис, но цены могли бы быть ниже. В целом доволен.',
    'Отличный инструмент для работы. Экономит много времени каждый день.',
    'Пробовал несколько нейросетей, эта одна из лучших. Рекомендую.',
    'Удобно что всё в одном месте. Не нужно переключаться между сервисами.',
    'Качество хорошее, но иногда нужно дорабатывать результат вручную.',
    'Для начинающих отличное решение. Простой интерфейс, понятные настройки.',
    'Использую для контента каждый день. Результат стабильный.',
    'Неплохо, но хочется больше моделей и функций в бесплатном тарифе.',
    'Скорость работы радует. Ответы получает за секунды, не минуты.',
    'Порадовал русский интерфейс и поддержка. Всё на родном языке.'
  ];
  var months=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

  function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
  function pick(arr){return arr[rand(0,arr.length-1)]}

  function genReviews(count,seed){
    var reviews=[];
    for(var i=0;i<count;i++){
      var name=pick(names);
      var rating=rand(3,5);
      var text=pick(texts);
      var d=rand(1,28);
      var m=rand(0,6);
      var y=2026;
      reviews.push({name:name,rating:rating,text:text,date:d+' '+months[m]+' '+y});
    }
    return reviews;
  }

  function getLocalReviews(key){
    try{var s=localStorage.getItem(key);return s?JSON.parse(s):[]}catch(e){return[]}
  }

  function addLocalReview(key,review){
    var list=getLocalReviews(key);
    list.unshift(review);
    localStorage.setItem(key,JSON.stringify(list));
    return list;
  }

  function renderStars(n){
    var s='';
    for(var i=1;i<=5;i++){s+=i<=n?'★':'☆'}
    return s;
  }

  window.initReviews=function(containerId,seedKey,genCount){
    var container=document.getElementById(containerId);
    if(!container)return;
    var gen=genReviews(genCount||6);
    var local=getLocalReviews(seedKey);
    var all=local.concat(gen);
    var total=all.length;
    var avg=all.reduce(function(s,r){return s+r.rating},0)/total;

    var html='<div class="reviews-header"><h2>Отзывы</h2><div class="reviews-summary"><span class="big-rating">'+avg.toFixed(1)+'</span><span class="stars">'+renderStars(Math.round(avg))+'</span><span class="review-count">'+total+' отзывов</span></div></div>';

    all.forEach(function(r){
      html+='<div class="review-item"><div class="review-meta"><span class="review-name">'+r.name+'</span><span class="review-date">'+r.date+'</span></div><div class="review-stars">'+renderStars(r.rating)+'</div><div class="review-text">'+r.text+'</div></div>';
    });

    html+='<div class="review-form"><h3>Оставить отзыв</h3><input type="text" id="rev-name" placeholder="Ваше имя" maxlength="50"><select id="rev-rating"><option value="5">5 звёзд</option><option value="4">4 звезды</option><option value="3">3 звезды</option><option value="2">2 звезды</option><option value="1">1 звезда</option></select><textarea id="rev-text" placeholder="Напишите ваш отзыв..." maxlength="500"></textarea><button onclick="submitReview(\''+seedKey+'\')">Отправить</button></div>';

    container.innerHTML=html;
  };

  window.submitReview=function(key){
    var name=document.getElementById('rev-name').value.trim();
    var rating=parseInt(document.getElementById('rev-rating').value);
    var text=document.getElementById('rev-text').value.trim();
    if(!name||!text){alert('Заполните имя и текст отзыва');return}
    var months2=['января','февраля','марта','апреля','мая','июня','июля','августа'];
    var now=new Date();
    var dateStr=now.getDate()+' '+months2[now.getMonth()]+' 2026';
    addLocalReview(key,{name:name,rating:rating,text:text,date:dateStr});
    location.reload();
  };
})();
