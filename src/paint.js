(function(){
'use strict';
var stage = document.getElementById('stage'), picker = document.getElementById('picker'), pic = document.getElementById('pic'), tools = document.querySelector('#paint .tools');
if (!stage || !pic || !tools || typeof PIC_ORDER === 'undefined' || typeof drawPic !== 'function') return;
if (picker) picker.style.display = 'none';
var NS = 'http://www.w3.org/2000/svg';
var baseDraw = drawPic;
drawPic = function(n){
  baseDraw(n);
  var r = document.createElementNS(NS, 'rect');
  r.setAttribute('class', 'r'); r.setAttribute('data-bg', '1');
  r.setAttribute('x', -1000); r.setAttribute('y', -1000); r.setAttribute('width', 2400); r.setAttribute('height', 2400);
  pic.insertBefore(r, pic.firstChild);
};
function go(d){
  var i = PIC_ORDER.indexOf(picName), n = PIC_ORDER[(i + d + PIC_ORDER.length) % PIC_ORDER.length];
  drawPic(n); say(PIC_SAY[n] || n);
}
function nav(cls, label, d, path){
  var b = document.createElement('button'); b.className = 'navb ' + cls; b.setAttribute('aria-label', label);
  b.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="' + path + '" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  b.addEventListener('click', function(){ go(d); }); stage.appendChild(b);
}
nav('l', 'Voriges Bild', -1, 'M25 8 L12 20 L25 32');
nav('r', 'Nächstes Bild', 1, 'M15 8 L28 20 L15 32');
var acts = document.createElement('div'); acts.id = 'acts';
acts.innerHTML = '<button class="mode" id="pNew">🗑 Neu</button><button class="mode" id="pSave">💾 Speichern</button>';
tools.insertBefore(acts, tools.firstChild);
document.getElementById('pNew').addEventListener('click', function(){ drawPic(picName); say('Neu'); });

function paintBlob(cb){
  var svg = pic.cloneNode(true); svg.removeAttribute('id'); svg.setAttribute('xmlns', NS); svg.setAttribute('width', 800); svg.setAttribute('height', 800);
  var defs = svg.querySelector('defs');
  if (!defs){ defs = document.createElementNS(NS, 'defs'); svg.insertBefore(defs, svg.firstChild); }
  document.querySelectorAll('svg[width="0"] pattern').forEach(function(p){ defs.appendChild(p.cloneNode(true)); });
  var st = document.createElementNS(NS, 'style');
  st.textContent = '.r{fill:#fff;stroke:#4a2d5c;stroke-width:9;stroke-linejoin:round;stroke-linecap:round}.line{fill:none;stroke:#4a2d5c;stroke-width:9;stroke-linecap:round}.dot{fill:#4a2d5c}.r[data-bg]{stroke:none}.ol[data-bg]{display:none}.ol{fill:none;stroke:#4a2d5c;stroke-width:9;stroke-linejoin:round}';
  var bg = document.createElementNS(NS, 'rect'); bg.setAttribute('width', 400); bg.setAttribute('height', 400); bg.setAttribute('fill', '#fff');
  svg.insertBefore(bg, svg.firstChild); svg.insertBefore(st, svg.firstChild);
  var img = new Image();
  img.onload = function(){
    var c = document.createElement('canvas'); c.width = c.height = 800;
    c.getContext('2d').drawImage(img, 0, 0, 800, 800);
    c.toBlob(cb, 'image/png');
  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
}
function done(btn, text){ btn.textContent = text; setTimeout(function(){ btn.textContent = '💾 Speichern'; }, 2500); }
function download(blob){
  try { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'almas-bild.png'; document.body.appendChild(a); a.click(); a.remove(); } catch (e) {}
}
document.getElementById('pSave').addEventListener('click', function(){
  var btn = this; btn.textContent = '⏳ ...';
  paintBlob(function(blob){
    if (!blob){ done(btn, 'Hat nicht geklappt'); return; }
    var ok = function(){ done(btn, '✔ Gespeichert'); say('Gespeichert! Dein Bild ist in der Galerie.'); burst(innerWidth / 2, innerHeight / 3, 30); };
    var fallback = function(){ download(blob); done(btn, '✔ Heruntergeladen'); say('Dein Bild ist heruntergeladen.'); };
    if (!(window.claude && claude.use)){ fallback(); return; }
    Promise.all([claude.use('assets'), claude.use('db')]).then(function(r){
      if (!r[0] || !r[1]){ fallback(); return; }
      return r[0].upload(blob).then(function(res){
        var id = 'g' + Date.now().toString(36) + (Math.random() * 1e4 | 0);
        return r[1].collection('gallery').doc(id).set({aid: res.id, kind: 'image', t: Date.now()});
      }).then(ok);
    }).catch(function(){ fallback(); });
  });
});
})();
