// copy-prompt.js — кнопка «Копировать» у промптов
(function(){
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.copy-btn');
    if(!btn) return;
    var box = btn.closest('.prompt-box');
    if(!box) return;
    var text = box.querySelector('p');
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
})();
