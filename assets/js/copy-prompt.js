// copy-prompt.js — кнопки «Копировать» и «Сгенерировать» у промптов
(function(){

  // ===== Копирование промпта =====
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.copy-btn');
    if(!btn) return;
    var box = btn.closest('.prompt-box');
    if(!box) return;
    var text = box.querySelector('.prompt-text');
    if(!text) return;

    var value = text.innerText.trim();
    var done = function(){
      var old = btn.textContent;
      btn.textContent = 'Скопировано';
      btn.classList.add('copied');
      setTimeout(function(){
        btn.textContent = old;
        btn.classList.remove('copied');
      }, 1800);
    };

    if(navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(value).then(done).catch(function(){ fallback(value, done); });
    } else {
      fallback(value, done);
    }
  });

  function fallback(value, done){
    var ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch(err){}
    document.body.removeChild(ta);
  }

  // ===== Переход на генерацию (ссылка скрыта от поисковиков) =====
  // URL закодирован в base64 в data-атрибуте, в разметке нет <a href>
  function decode(str){
    try {
      var bin = atob(str);
      var bytes = new Uint8Array(bin.length);
      for(var i = 0; i < bin.length; i++){ bytes[i] = bin.charCodeAt(i); }
      return new TextDecoder('utf-8').decode(bytes);
    } catch(e){ return ''; }
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest('.gen-btn');
    if(!btn) return;
    var payload = btn.getAttribute('data-g');
    if(!payload) return;
    var url = decode(payload);
    if(!url) return;

    var w = window.open('', '_blank');
    if(w){
      w.opener = null;
      w.location = url;
    } else {
      window.location.href = url;
    }
  });

})();
