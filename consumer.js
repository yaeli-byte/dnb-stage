
(function(){function fit(){var m=document.querySelector('#d .ns-hero-media'),h=m&&m.querySelector('.ba-hero');if(!h)return;var w=m.clientWidth||571,s=Math.min(1,w/571);h.style.transform='scale('+s+')';m.style.height=(450*s)+'px';}
window.addEventListener('resize',fit);if(window.ResizeObserver){var m=document.querySelector('#d .ns-hero-media');if(m)new ResizeObserver(fit).observe(m);}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fit);else fit();})();
