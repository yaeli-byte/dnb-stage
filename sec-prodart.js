
(function () {
  var art = window.DNB_PROD_ART;
  var sec = document.getElementById('ns-prod-sec');
  if (!art || !sec) return;

  var blocks = [].slice.call(sec.querySelectorAll('.ns-prod-block'));
  if (!blocks.length) return;

  function nameOf(b) {
    var h = b.querySelector('h3');
    return h ? (h.textContent || '').replace(/\s+/g, ' ').trim() : '';
  }

  blocks.forEach(function (b) {
    var media = b.querySelector('.ns-prod-media');
    if (!media) return;
    if (/מערכת ניהול סיכונים/.test(nameOf(b))) {
      media.innerHTML = art;
      media.classList.add('has-prodart');
      
      media.style.background = '#F6F8FA';
      media.style.backgroundImage = 'none';
      media.style.overflow = 'hidden';
      
      var box = media.firstElementChild;
      if (box) {
        box.style.height = '600px';
        box.style.borderRadius = '0';
        box.style.transformOrigin = 'top center';
        box.style.transform = 'scale(' + (520 / 600).toFixed(4) + ')';
        box.style.width = (100 * 600 / 520).toFixed(2) + '%';   
        box.style.marginInline = 'auto';
      }
    } else {
      var flag = document.createElement('p');
      flag.className = 'ns-art-slot';
      flag.style.cssText = 'position:absolute;left:16px;right:16px;bottom:12px;margin:0;' +
        'font:400 13.3px/19.91px "Heebo",sans-serif;color:#AF2D1D;text-align:center;direction:rtl';
      flag.textContent = '⚠ אין עדיין ויזואל ייעודי למוצר הזה — הכרטיס הכללי הוא סלוט, לא תמונת המוצר.';
      media.appendChild(flag);
    }
  });
})();
