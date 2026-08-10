// components.js — вставляет шапку, подвал на все страницы
// Меняем этот файл — обновляется на всех страницах сайта

(function(){
  // ===== Рекламная строка сверху (СКРЫТА — пока не нужна) =====
  // Чтобы включить: расскомментируйте блок ниже
  /*
  var topBanner = '<div class="top-banner"><a href="https://stiva.ai">⚡ Все нейросети в одной подписке — STIVA.ai. 80+ моделей от 495 ₽. Оплата МИР и СБП →</a></div>';
  var bannerDiv = document.createElement('div');
  bannerDiv.innerHTML = topBanner;
  if(document.body && document.body.firstChild){
    document.body.insertBefore(bannerDiv.firstChild, document.body.firstChild);
  }
  */

  // ===== Шапка с навигацией =====
  var headerHTML = ''+
    '<div class="header-inner">'+
      '<a href="/" class="logo">Топ<span>Нейросети</span></a>'+
      '<nav class="nav" id="nav">'+
        '<a href="/models/" class="nav-link">Нейросети</a>'+
        '<a href="/competitors/" class="nav-link">Агрегаторы</a>'+
        '<div class="nav-dropdown-wrap">'+
          '<a href="/categories/" class="nav-link">Категории ▾</a>'+
          '<div class="nav-dropdown">'+
            '<div class="nav-dropdown-col">'+
              '<h5>Текст</h5>'+
              '<a href="/categories/text/chat/">Чат с ИИ</a>'+
              '<a href="/categories/text/articles/">Статьи</a>'+
              '<a href="/categories/text/copywriting/">Копирайтинг</a>'+
              '<a href="/categories/text/documents/">Анализ документов</a>'+
              '<a href="/categories/text/essays/">Рефераты</a>'+
              '<a href="/categories/text/legal/">Юридические документы</a>'+
              '<a href="/categories/text/translate/">Перевод текста</a>'+
              '<a href="/categories/text/photo-prompt/">Промпт по фото</a>'+
              '<a href="/categories/text/presentations/">Презентации</a>'+
            '</div>'+
            '<div class="nav-dropdown-col">'+
              '<h5>Изображения</h5>'+
              '<a href="/categories/image/photo/">ИИ-фото</a>'+
              '<a href="/categories/image/editor/">Редактор фото</a>'+
              '<a href="/categories/image/face-swap/">Замена лица</a>'+
              '<a href="/categories/image/remove-bg/">Удаление фона</a>'+
              '<a href="/categories/image/enhance/">Улучшение качества</a>'+
            '</div>'+
            '<div class="nav-dropdown-col">'+
              '<h5>Видео</h5>'+
              '<a href="/categories/video/editor/">Редактор видео</a>'+
              '<a href="/categories/video/avatar/">ИИ-Аватар</a>'+
              '<a href="/categories/video/dance/">ИИ-танцы</a>'+
              '<a href="/categories/video/animate/">Оживление фото</a>'+
              '<a href="/categories/video/enhance/">Улучшение качества</a>'+
            '</div>'+
            '<div class="nav-dropdown-col">'+
              '<h5>Музыка</h5>'+
              '<a href="/categories/music/songs/">Создание песен</a>'+
              '<a href="/categories/music/tts/">Озвучка текста</a>'+
              '<a href="/categories/music/voice-clone/">Клон голоса</a>'+
              '<a href="/categories/music/effects/">Музыкальные эффекты</a>'+
              '<a href="/categories/music/noise/">Удаление шума</a>'+
            '</div>'+
            '<div class="nav-dropdown-col">'+
              '<h5>Другое</h5>'+
              '<a href="/categories/programming/">Программирование</a>'+
              '<a href="/categories/agents/">ИИ-агенты</a>'+
              '<a href="/categories/api/">API</a>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<a href="/rating/" class="nav-link">Рейтинг</a>'+
        '<a href="/reviews/" class="nav-link">Отзывы</a>'+
      '</nav>'+
      '<button class="hamburger" id="hamburger" aria-label="Меню" onclick="toggleMenu()">'+
        '<span></span><span></span><span></span>'+
      '</button>'+
    '</div>';

  // ===== Подвал =====
  var footerHTML = ''+
    '<div class="footer-inner">'+
      '<div class="footer-col">'+
        '<div class="logo">Топ<span>Нейросети</span></div>'+
        '<p>Каталог нейросетей 2026: обзоры, отзывы, рейтинги.</p>'+
      '</div>'+
      '<div class="footer-col">'+
        '<h4>Разделы</h4>'+
        '<a href="/models/">Нейросети</a>'+
        '<a href="/competitors/">Агрегаторы</a>'+
        '<a href="/rating/">Рейтинг</a>'+
        '<a href="/reviews/">Отзывы</a>'+
      '</div>'+
      '<div class="footer-col">'+
        '<h4>Категории</h4>'+
        '<a href="/categories/text/chat/">Текст</a>'+
        '<a href="/categories/image/photo/">Изображения</a>'+
        '<a href="/categories/video/editor/">Видео</a>'+
        '<a href="/categories/music/songs/">Аудио</a>'+
      '</div>'+
      '<div class="footer-col">'+
        '<h4>О проекте</h4>'+
        '<p>© 2026 ТопНейросети</p>'+
        '<a href="https://stiva.ai">STIVA.ai</a>'+
      '</div>'+
    '</div>';

  // ===== Favicon =====
  var fav = document.createElement('link');
  fav.rel = 'icon';
  fav.type = 'image/png';
  fav.href = '/assets/favicon.png';
  document.head.appendChild(fav);

  // ===== Вставляем шапку =====
  // Ищем .header ИЛИ #site-header — заменяем содержимое
  var headerEl = document.querySelector('.header') || document.querySelector('#site-header');
  if(headerEl){
    headerEl.innerHTML = headerHTML;
    headerEl.classList.add('header');
  }

  // ===== Вставляем подвал =====
  var footerEl = document.querySelector('.footer') || document.querySelector('#site-footer');
  if(footerEl){
    footerEl.innerHTML = footerHTML;
    footerEl.classList.add('footer');
  }

  // ===== Удаляем старые CTA-баннеры =====
  document.querySelectorAll('.cta').forEach(function(el){ el.remove(); });

  // ===== Мобильное меню — переключатель =====
  window.toggleMenu = function(){
    var nav = document.getElementById('nav');
    var ham = document.getElementById('hamburger');
    if(nav){
      if(nav.classList.contains('nav-open')){
        nav.classList.remove('nav-open');
        ham.classList.remove('open');
      } else {
        nav.classList.add('nav-open');
        ham.classList.add('open');
      }
    }
  };
})();
