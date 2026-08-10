// ============================================================
// Reviews widget — generates varied reviews + localStorage form
// ============================================================
(function(){
  var names=['Дмитрий','Анна','Сергей','Мария','Алексей','Елена','Иван','Ольга','Павел','Ксения','Андрей','Наталья','Владимир','Екатерина','Денис','Юлия','Михаил','Светлана','Артём','Дарья','Роман','Алина','Игорь','Татьяна','Максим','Виктория','Николай','Полина','Антон','Маргарита'];
  var textsPositive=[
    'Пользуюсь уже несколько месяцев, вполне доволен. Удобный интерфейс, быстро отвечает.',
    'Отличный инструмент для работы. Экономит много времени каждый день. Рекомендую!',
    'Качество генерации на высоте. Результаты стабильные, почти не приходится дорабатывать.',
    'Пробовал несколько нейросетей, эта одна из лучших. Соотношение цена/качество отличное.',
    'Удобно что всё в одном месте. Не нужно переключаться между разными сервисами.',
    'Скорость работы радует — ответы за секунды, не минуты. Интерфейс интуитивный.',
    'Порадовал русский интерфейс и поддержка. Всё на родном языке, без сложностей.',
    'Для моих задач подходит идеально. Генерирует качественный контент, который не стыдно опубликовать.',
    'Использую каждый день для работы. Стабильно, удобно, функционально.五星!',
    'Радует постоянное обновление и добавление новых функций. Сервис развивается.',
    'Качество ответов заметно выше, чем у конкурентов. Особенно по сложным промптам.',
    'Прекрасная нейросеть для создания контента. Тексты получаются живые и осмысленные.',
    'Очень доволен результатом. Использую для написания статей и сценариев — справляется на ура.',
    'Лучшее, что пробовал из отечественных решений. Работает без сбоев.',
    'Для программирования просто находка. Код генерирует чистый, рабочий, с комментариями.'
  ];
  var textsNeutral=[
    'Хорошая нейросеть для базовых задач. Качество приемлемое, но есть куда расти.',
    'Нормальный сервис, но цены могли бы быть ниже. В целом доволен результатом.',
    'Качество хорошее, но иногда нужно дорабатывать результат вручную. Не критично.',
    'Неплохо, но хочется больше моделей и функций в бесплатном тарифе. Базовые задачи решает.',
    'Работает стабильно, но интерфейс мог бы быть удобнее. Привыкаешь со временем.',
    'Со своими задачами справляется, но до лидеров рынка далеко. Средний уровень.',
    'Функционал базовый — для простых текстов нормально, для сложных задач маловато.',
    'Доступ из РФ работает, но скорость могла бы быть выше. Приемлемо для повседневной работы.',
    'Пользуюсь время от времени. Не хватает продвинутых функций, но для простых задач ок.',
    'Сервис рабочий, но поддержка отвечает долго. Были проблемы с оплатой, но решили.',
    'Качество среднее. Для быстрых черновиков подходит, но финальный текст приходится редактировать.',
    'Цена соответствует качеству. Не хватает интеграции с внешними сервисами.'
  ];
  var textsNegative=[
    'Качество генерации оставляет желать лучшего. Часто приходится всё переписывать вручную.',
    'Сервис периодически зависает. Поддержка отвечает долго. Разочарован.',
    'Цены завышены при ограниченном функционале. Есть более выгодные альтернативы.',
    'Мало моделей доступно. Нет видео и аудио генерации, только базовый текст.',
    'Интерфейс перегружен и непонятен для новичка. Нужно время чтобы разобраться.',
    'Качество ответов нестабильное — иногда хорошо, иногда полная ерунда. Надо дорабатывать.',
    'Обещали безлимит, но по факту жёсткие лимиты. Не соответствует описанию.',
    'Работает медленно, ответы обрываются на середине. Надеюсь исправят в будущем.',
    'Слабый сервис. Много ошибок в генерируемом тексте, не рекомендую для серьёзных задач.',
    'Отписка от платного тарифа заняла неделю и несколько обращений в поддержку. Неприятно.'
  ];
  var months=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

  function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
  function pick(arr){return arr[rand(0,arr.length-1)]}

  function genReviewText(rating){
    if(rating>=4) return pick(textsPositive);
    if(rating==3) return pick(textsNeutral);
    return pick(textsNegative);
  }

  function genReviews(count,ratingBase){
    var reviews=[];
    var baseRating=ratingBase||4;
    for(var i=0;i<count;i++){
      var name=pick(names);
      var rating;
      // Distribute ratings around the base
      if(baseRating>=4){
        rating=pick([5,5,4,4,4,3,5,4]);
      } else if(baseRating>=3){
        rating=pick([4,4,3,3,3,5,2,4]);
      } else {
        rating=pick([3,3,2,2,2,4,3,1]);
      }
      var text=genReviewText(rating);
      var d=rand(1,28);
      var m=rand(0,7);
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

  window.initReviews=function(containerId,seedKey,genCount,ratingBase){
    var container=document.getElementById(containerId);
    if(!container)return;
    
    // Читаем рейтинг и количество отзывов со страницы
    var pageRatingEl=document.querySelector('.page-rating .rating-value')||document.querySelector('.rating-value');
    var pageReviewsEl=document.querySelector('.page-rating .review-count')||document.querySelector('.review-count');
    var pageRating=pageRatingEl?parseFloat(pageRatingEl.textContent):4.5;
    var pageReviewsText=pageReviewsEl?pageReviewsEl.textContent:'0';
    var pageReviewsCount=parseInt(pageReviewsText.replace(/\D/g,''))||0;
    
    // Базовый рейтинг для генерации
    var baseRating=ratingBase||pageRating;
    
    // Количество генерируемых отзывов
    var count=genCount||Math.max(6,Math.min(12,Math.round(pageReviewsCount/8)));
    
    var gen=genReviews(count,baseRating);
    var local=getLocalReviews(seedKey);
    var all=local.concat(gen);
    
    // Средний рейтинг = рейтинг со страницы (не пересчитываем)
    var avg=pageRating;
    var total=pageReviewsCount>0?pageReviewsCount:all.length;

    var html='<div class="reviews-header"><h2>Отзывы</h2><div class="reviews-summary"><span class="big-rating">'+avg.toFixed(1)+'</span><span class="stars">'+renderStars(Math.round(avg))+'</span><span class="review-count">'+total+' отзывов</span></div></div>';

    all.forEach(function(r){
      html+='<div class="review-item"><div class="review-meta"><span class="review-name">'+r.name+'</span><span class="review-date">'+r.date+'</span></div><div class="review-stars">'+renderStars(r.rating)+'</div><div class="review-text">'+r.text+'</div></div>';
    });

    html+='<div class="review-form"><h3>Оставить отзыв</h3><input type="text" id="rev-name" placeholder="Ваше имя" maxlength="50"><select id="rev-rating"><option value="5">5 звёзд — отлично</option><option value="4">4 звезды — хорошо</option><option value="3">3 звезды — нормально</option><option value="2">2 звезды — плохо</option><option value="1">1 звезда — ужасно</option></select><textarea id="rev-text" placeholder="Напишите ваш отзыв..." maxlength="500"></textarea><button onclick="submitReview(\''+seedKey+'\')">Отправить отзыв</button></div>';

    container.innerHTML=html;
  };

  window.submitReview=function(key){
    var name=document.getElementById('rev-name').value.trim();
    var rating=parseInt(document.getElementById('rev-rating').value);
    var text=document.getElementById('rev-text').value.trim();
    if(!name||!text){alert('Заполните имя и текст отзыва');return}
    var months2=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    var now=new Date();
    var dateStr=now.getDate()+' '+months2[now.getMonth()]+' 2026';
    addLocalReview(key,{name:name,rating:rating,text:text,date:dateStr});
    location.reload();
  };

  // ============================================================
  // All-reviews page: generate mixed reviews from all services
  // ============================================================
  var serviceNames={
    'chatgpt':'ChatGPT','claude':'Claude','midjourney':'Midjourney','suno':'Suno',
    'deepseek':'DeepSeek','gigachat':'GigaChat','yandex-alice':'Яндекс Алиса',
    'kling':'Kling AI','recraft':'Recraft','minimax':'MiniMax','mistral':'Mistral AI',
    'krea':'Krea','bria':'Bria AI','meta':'Meta AI',
    'gptunnel':'GPTunnel','mashagpt':'MashaGPT','study24':'Study24','rugpt':'RuGPT',
    'aily':'Aily','era2':'Era2','fichi-ai':'Fichi AI','ranvik':'Ranvik',
    'air-fail':'Air Fail','gptportal':'GPT Portal','leingpt':'LeinGPT','floctor':'Floctor'
  };
  var serviceRatings={
    'chatgpt':4.9,'claude':4.8,'midjourney':4.9,'suno':4.5,
    'deepseek':4.4,'gigachat':4.3,'yandex-alice':4.2,
    'kling':4.5,'recraft':4.3,'minimax':4.2,'mistral':4.3,
    'krea':4.1,'bria':4.0,'meta':4.0,
    'gptunnel':3.4,'mashagpt':3.2,'study24':3.1,'rugpt':3.0,
    'aily':2.9,'era2':2.9,'fichi-ai':2.8,'ranvik':2.8,
    'air-fail':2.7,'gptportal':2.7,'leingpt':2.6,'floctor':2.6
  };
  var serviceUrls={
    'chatgpt':'../models/chatgpt/','claude':'../models/claude/','midjourney':'../models/midjourney/',
    'suno':'../models/suno/','deepseek':'../models/deepseek/','gigachat':'../models/gigachat/',
    'yandex-alice':'../models/yandex-alice/','kling':'../models/kling/','recraft':'../models/recraft/',
    'minimax':'../models/minimax/','mistral':'../models/mistral/','krea':'../models/krea/',
    'bria':'../models/bria/','meta':'../models/meta/',
    'gptunnel':'../competitors/gptunnel/','mashagpt':'../competitors/mashagpt/',
    'study24':'../competitors/study24/','rugpt':'../competitors/rugpt/',
    'aily':'../competitors/aily/','era2':'../competitors/era2/',
    'fichi-ai':'../competitors/fichi-ai/','ranvik':'../competitors/ranvik/',
    'air-fail':'../competitors/air-fail/','gptportal':'../competitors/gptportal/',
    'leingpt':'../competitors/leingpt/','floctor':'../competitors/floctor/'
  };

  window.initAllReviews=function(containerId,count){
    var container=document.getElementById(containerId);
    if(!container)return;
    var keys=Object.keys(serviceNames);
    var reviews=[];
    for(var i=0;i<count;i++){
      var key=pick(keys);
      var baseRating=serviceRatings[key]||4;
      var name=pick(names);
      var rating;
      if(baseRating>=4){rating=pick([5,5,4,4,4,3,5])}
      else if(baseRating>=3){rating=pick([4,4,3,3,3,5,2,4])}
      else{rating=pick([3,3,2,2,2,4,3,1])}
      var text=genReviewText(rating);
      var d=rand(1,28);
      var m=rand(0,7);
      var y=2026;
      reviews.push({name:name,rating:rating,text:text,date:d+' '+months[m]+' '+y,serviceKey:key,serviceName:serviceNames[key],serviceUrl:serviceUrls[key]});
    }
    // Sort by date (most recent first - approximated by random)
    reviews.sort(function(){return Math.random()-0.5});

    var html='<div class="reviews-header"><h2>Последние отзывы</h2><div class="reviews-summary"><span class="review-count">'+count+' отзывов</span></div></div>';
    reviews.forEach(function(r){
      html+='<div class="review-item"><div class="review-meta"><span class="review-name">'+r.name+'</span><span class="review-date">'+r.date+'</span></div><div class="review-stars">'+renderStars(r.rating)+'</div><a class="review-service" href="'+r.serviceUrl+'">'+r.serviceName+'</a><div class="review-text">'+r.text+'</div></div>';
    });

    container.innerHTML=html;
  };
})();
