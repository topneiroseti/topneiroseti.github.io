// components.js — вставляет шапку, подвал, баннеры на все страницы
// Меняем этот файл — обновляется на всех страницах сайта

(function(){
  // Рекламная строка сверху
  var topBanner = ''+
    '<div style="background:linear-gradient(90deg,#7c3aed,#5b21b6);color:#fff;text-align:center;padding:8px 20px;font-size:14px;">'+
    '<a href="https://stiva.ai" style="color:#fff;text-decoration:none;font-weight:600;">⚡ Все нейросети в одной подписке — STIVA.ai. 80+ моделей от 495 ₽. Оплата МИР и СБП →</a>'+
    '</div>';

  // Шапка
  var header = ''+
    '<header style="background:#161b22;border-bottom:1px solid #30363d;position:sticky;top:0;z-index:100;">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;max-width:1200px;margin:0 auto;gap:20px;flex-wrap:wrap;">'+
      '<a href="/" style="font-size:22px;font-weight:700;color:#e6edf3;text-decoration:none;">Топ<span style="color:#7c3aed;">Нейросети</span></a>'+
      '<nav style="display:flex;gap:20px;align-items:center;">'+
        '<a href="/models/" style="color:#8b949e;text-decoration:none;font-size:15px;">Нейросети</a>'+
        '<a href="/competitors/" style="color:#8b949e;text-decoration:none;font-size:15px;">Агрегаторы</a>'+
        '<a href="/rating/" style="color:#8b949e;text-decoration:none;font-size:15px;">Рейтинг</a>'+
        '<a href="/reviews/" style="color:#8b949e;text-decoration:none;font-size:15px;">Отзывы</a>'+
      '</nav>'+
      '<input type="text" id="site-search" placeholder="Поиск нейросети..." style="flex:1;max-width:300px;padding:8px 14px;background:#0d1117;border:1px solid #30363d;border-radius:8px;color:#e6edf3;font-size:14px;outline:none;" onfocus="window.location.href=\'/?search=\'">'+
    '</div>'+
    '</header>';

  // CTA-баннер внизу
  var ctaBanner = ''+
    '<div style="text-align:center;background:linear-gradient(135deg,#7c3aed,#5b21b6);border-radius:16px;padding:28px;margin:32px 20px;max-width:900px;margin-left:auto;margin-right:auto;">'+
    '<h3 style="color:#fff;font-size:22px;margin-bottom:8px;">Все нейросети в одной подписке</h3>'+
    '<p style="color:#e9d5ff;margin-bottom:16px;">STIVA.ai — 80+ моделей: текст, изображения, видео, аудио. Оплата МИР и СБП, без VPN.</p>'+
    '<a href="https://stiva.ai" style="display:inline-block;background:#fff;color:#7c3aed;padding:12px 32px;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none;">Попробовать бесплатно</a>'+
    '</div>';

  // Подвал
  var footer = ''+
    '<footer style="text-align:center;padding:32px 20px;border-top:1px solid #30363d;color:#8b949e;font-size:14px;margin-top:40px;">'+
    '<div style="max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-bottom:16px;">'+
      '<a href="/models/" style="color:#7c3aed;text-decoration:none;">Нейросети</a>'+
      '<a href="/competitors/" style="color:#7c3aed;text-decoration:none;">Агрегаторы</a>'+
      '<a href="/rating/" style="color:#7c3aed;text-decoration:none;">Рейтинг</a>'+
      '<a href="/reviews/" style="color:#7c3aed;text-decoration:none;">Отзывы</a>'+
      '<a href="https://stiva.ai" style="color:#7c3aed;text-decoration:none;">STIVA.ai</a>'+
    '</div>'+
    '<p>© 2026 Топ Нейросети — каталог нейросетей. Все права защищены.</p>'+
    '</footer>';

  // Вставляем
  function insertComponent(id, html){
    var el = document.getElementById(id);
    if(el) el.innerHTML = html;
  }

  // Favicon
  var fav = document.createElement('link');
  fav.rel = 'icon';
  fav.type = 'image/png';
  fav.href = '/assets/favicon.png';
  document.head.appendChild(fav);

  // Рекламная строка — в начало body
  var topEl = document.getElementById('top-banner');
  if(topEl){ topEl.innerHTML = topBanner; }

  // Шапка
  var headerEl = document.getElementById('site-header');
  if(headerEl){ headerEl.innerHTML = header; }

  // CTA
  var ctaEl = document.getElementById('site-cta');
  if(ctaEl){ ctaEl.innerHTML = ctaBanner; }

  // Подвал
  var footerEl = document.getElementById('site-footer');
  if(footerEl){ footerEl.innerHTML = footer; }
})();
