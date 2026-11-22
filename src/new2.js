/* ================= Teil 2: Puppe, Bad, Rosa, Auto, Tage, Zaehlen, Schreiben, Galerie ================= */
(function(){
'use strict';
var A = window.__A, $ = A.$, el = A.el, rnd = A.rnd, shuf = A.shuf, addView = A.addView, centerOf = A.centerOf;

/* ================= Puppe anziehen ================= */
var SKIN = '#ffd6b0';
var HAIRCOL = [['Braune Haare', '#7a4a2a'], ['Blonde Haare', '#f3c75a'], ['Schwarze Haare', '#2b2b3a'], ['Rote Haare', '#d9552b']];
function hairBack(c){ return '<ellipse cx="120" cy="70" rx="60" ry="60" fill="' + c + '"/><circle cx="62" cy="108" r="17" fill="' + c + '"/><circle cx="178" cy="108" r="17" fill="' + c + '"/>'; }
function bangs(c){ return '<path d="M66 70 C64 18 176 18 174 70 C152 48 122 56 102 38 C94 54 80 62 66 70Z" fill="' + c + '"/><circle cx="66" cy="108" r="14" fill="' + c + '" opacity="0"/>'; }
function tie(x, c){ return '<circle cx="' + x + '" cy="90" r="9" fill="' + c + '"/>'; }
var HAIRS = HAIRCOL.map(function(h){ return {n: h[0], back: hairBack(h[1]) + tie(62, '#ff6fae') + tie(178, '#ff6fae'), front: bangs(h[1]), pv: h[1]}; });

function topShirt(c, long, extra){
  var m = '<rect x="82" y="124" width="76" height="76" rx="22" fill="' + c + '"/>';
  if (long) m += '<rect x="56" y="128" width="32" height="74" rx="15" fill="' + c + '"/><rect x="152" y="128" width="32" height="74" rx="15" fill="' + c + '"/><rect x="56" y="184" width="32" height="14" rx="7" fill="rgba(255,255,255,.55)"/><rect x="152" y="184" width="32" height="14" rx="7" fill="rgba(255,255,255,.55)"/>';
  else m += '<rect x="56" y="128" width="32" height="34" rx="16" fill="' + c + '"/><rect x="152" y="128" width="32" height="34" rx="16" fill="' + c + '"/>';
  return m + (extra || '');
}
var STAR = '<polygon points="120,146 125,158 138,159 128,167 131,180 120,173 109,180 112,167 102,159 115,158" fill="#fff"/>';
var HEART = '<path d="M120 178 C96 160 106 146 120 158 C134 146 144 160 120 178Z" fill="#fff"/>';
var STRIPES = '<rect x="82" y="146" width="76" height="9" fill="rgba(255,255,255,.65)"/><rect x="82" y="166" width="76" height="9" fill="rgba(255,255,255,.65)"/>';
var JACKET_W = '<rect x="76" y="122" width="88" height="86" rx="26" fill="#3f8cff"/><rect x="50" y="126" width="38" height="80" rx="19" fill="#3f8cff"/><rect x="152" y="126" width="38" height="80" rx="19" fill="#3f8cff"/><path d="M76 150 H164 M76 178 H164" stroke="#2f6fd6" stroke-width="5"/><line x1="120" y1="122" x2="120" y2="208" stroke="#fff" stroke-width="5"/><rect x="96" y="116" width="48" height="14" rx="7" fill="#fff"/>';
var JACKET_R = '<rect x="78" y="122" width="84" height="88" rx="22" fill="#ffd23f"/><rect x="54" y="126" width="36" height="78" rx="17" fill="#ffd23f"/><rect x="150" y="126" width="36" height="78" rx="17" fill="#ffd23f"/><path d="M92 124 Q120 156 148 124" fill="none" stroke="#e0a800" stroke-width="6"/><line x1="120" y1="146" x2="120" y2="210" stroke="#e0a800" stroke-width="4"/><circle cx="120" cy="170" r="5" fill="#fff"/><circle cx="120" cy="190" r="5" fill="#fff"/>';
var TOPS = [
  {n: 'Kein Oberteil', m: ''},
  {n: 'Rosa T-Shirt', m: topShirt('#ff8fc7', false, HEART)},
  {n: 'Blaues T-Shirt', m: topShirt('#3f8cff', false, STAR)},
  {n: 'Gelbes T-Shirt', m: topShirt('#ffd23f', false, STRIPES)},
  {n: 'Grüner Pulli', m: topShirt('#3ecf6d', true, STAR)},
  {n: 'Lila Pulli', m: topShirt('#a46bff', true, STRIPES)},
  {n: 'Blaue Winterjacke', m: JACKET_W},
  {n: 'Gelbe Regenjacke', m: JACKET_R}
];
function longPants(c){ return '<rect x="86" y="192" width="33" height="96" rx="14" fill="' + c + '"/><rect x="121" y="192" width="33" height="96" rx="14" fill="' + c + '"/><rect x="86" y="190" width="68" height="16" rx="8" fill="rgba(255,255,255,.35)"/>'; }
function shorts(c, stripe){ return '<rect x="86" y="192" width="33" height="48" rx="14" fill="' + c + '"/><rect x="121" y="192" width="33" height="48" rx="14" fill="' + c + '"/><rect x="86" y="190" width="68" height="14" rx="7" fill="rgba(255,255,255,.35)"/>' + (stripe ? '<rect x="96" y="204" width="6" height="34" fill="#fff"/><rect x="138" y="204" width="6" height="34" fill="#fff"/>' : ''); }
function skirt(c){ return '<path d="M84 194 H156 L176 252 Q120 266 64 252Z" fill="' + c + '"/><path d="M84 194 H156" stroke="rgba(255,255,255,.5)" stroke-width="8"/>'; }
var BOTTOMS = [
  {n: 'Keine Hose', m: ''},
  {n: 'Blaue Hose', m: longPants('#3f8cff')},
  {n: 'Rote Hose', m: longPants('#ff4d4d')},
  {n: 'Grüne Hose', m: longPants('#3ecf6d')},
  {n: 'Türkise Shorts', m: shorts('#22c7c1', false)},
  {n: 'Blaue Badehose', m: shorts('#3f8cff', true)},
  {n: 'Rosa Rock', m: skirt('#ff8fc7')},
  {n: 'Lila Rock', m: skirt('#a46bff')}
];
function dress(c, c2){ return '<path d="M84 126 H156 V204 L182 270 Q120 288 58 270 L84 204Z" fill="' + c + '"/><rect x="58" y="128" width="30" height="30" rx="15" fill="' + c + '"/><rect x="152" y="128" width="30" height="30" rx="15" fill="' + c + '"/><rect x="82" y="190" width="76" height="10" fill="' + c2 + '"/><circle cx="120" cy="150" r="7" fill="' + c2 + '"/>'; }
var DRESSES = [
  {n: 'Kein Kleid', m: ''},
  {n: 'Rosa Kleid', m: dress('#ff8fc7', '#fff')},
  {n: 'Gelbes Kleid', m: dress('#ffd23f', '#ff6fae')},
  {n: 'Türkises Kleid', m: dress('#22c7c1', '#fff')},
  {n: 'Roter Badeanzug', m: '<rect x="84" y="124" width="72" height="84" rx="24" fill="#ff4d4d"/><path d="M84 160 q9 -8 18 0 t18 0 t18 0 t18 0" fill="none" stroke="#fff" stroke-width="5"/><path d="M84 182 q9 -8 18 0 t18 0 t18 0 t18 0" fill="none" stroke="#fff" stroke-width="5"/>'}
];
function sneaker(c){ return '<ellipse cx="102" cy="290" rx="23" ry="12" fill="' + c + '"/><ellipse cx="138" cy="290" rx="23" ry="12" fill="' + c + '"/><path d="M80 298 H124 M116 298 H160" stroke="#fff" stroke-width="4"/>'; }
var SHOES = [
  {n: 'Keine Schuhe', m: ''},
  {n: 'Rote Turnschuhe', m: sneaker('#ff4d4d')},
  {n: 'Rosa Ballerinas', m: '<ellipse cx="102" cy="291" rx="22" ry="10" fill="#ffb3d3"/><ellipse cx="138" cy="291" rx="22" ry="10" fill="#ffb3d3"/><circle cx="104" cy="283" r="4" fill="#ff6fae"/><circle cx="136" cy="283" r="4" fill="#ff6fae"/>'},
  {n: 'Gelbe Gummistiefel', m: '<rect x="86" y="248" width="33" height="48" rx="10" fill="#ffd23f"/><rect x="121" y="248" width="33" height="48" rx="10" fill="#ffd23f"/><ellipse cx="96" cy="296" rx="24" ry="9" fill="#e0a800"/><ellipse cx="144" cy="296" rx="24" ry="9" fill="#e0a800"/>'},
  {n: 'Braune Winterstiefel', m: '<rect x="84" y="250" width="36" height="46" rx="12" fill="#8a5a3c"/><rect x="120" y="250" width="36" height="46" rx="12" fill="#8a5a3c"/><rect x="82" y="246" width="40" height="14" rx="7" fill="#fff"/><rect x="118" y="246" width="40" height="14" rx="7" fill="#fff"/>'},
  {n: 'Blaue Sandalen', m: '<ellipse cx="102" cy="292" rx="22" ry="8" fill="#3f8cff"/><ellipse cx="138" cy="292" rx="22" ry="8" fill="#3f8cff"/><path d="M92 292 L102 276 L112 292 M128 292 L138 276 L148 292" stroke="#3f8cff" stroke-width="5" fill="none"/>'}
];
var HATS = [
  {n: 'Keine Mütze', m: ''},
  {n: 'Rote Mütze', m: '<path d="M62 64 C58 6 182 6 178 64Z" fill="#ff4d4d"/><rect x="58" y="52" width="124" height="20" rx="10" fill="#ff8a8a"/><circle cx="120" cy="10" r="14" fill="#fff"/>'},
  {n: 'Gelber Sonnenhut', m: '<ellipse cx="120" cy="44" rx="90" ry="15" fill="#ffd23f"/><path d="M74 44 C74 0 166 0 166 44Z" fill="#ffd23f"/><rect x="74" y="32" width="92" height="10" fill="#ff6fae"/>'},
  {n: 'Goldene Krone', m: '<path d="M72 40 L82 4 L102 26 L120 -4 L138 26 L158 4 L168 40Z" fill="#ffc93c" stroke="#e0a000" stroke-width="3"/><circle cx="120" cy="16" r="6" fill="#ff6fae"/>'},
  {n: 'Rosa Schleife', m: '<path d="M120 24 L84 6 L84 42Z M120 24 L156 6 L156 42Z" fill="#ff6fae"/><circle cx="120" cy="24" r="10" fill="#ff3d8f"/>'},
  {n: 'Blaue Regenmütze', m: '<path d="M62 64 C58 6 182 6 178 64Z" fill="#3f8cff"/><rect x="58" y="52" width="124" height="18" rx="9" fill="#2f6fd6"/>'}
];
var SLOTS = [
  {k: 'hat', l: '🧢 Mütze', items: HATS, vb: '36 -10 168 84'},
  {k: 'top', l: '👕 Oberteil', items: TOPS, vb: '40 112 160 104'},
  {k: 'bottom', l: '👖 Unten', items: BOTTOMS, vb: '56 184 128 116'},
  {k: 'dress', l: '👗 Kleid', items: DRESSES, vb: '40 112 160 180'},
  {k: 'shoes', l: '👟 Schuhe', items: SHOES, vb: '66 236 108 72'},
  {k: 'hair', l: '💇 Haare', items: HAIRS, vb: '36 -4 168 140'}
];
var dollState = {hat: 0, top: 0, bottom: 0, dress: 0, shoes: 0, hair: 0}, curSlot = 'top';
function dollBody(){
  return '<rect x="90" y="196" width="28" height="92" rx="13" fill="' + SKIN + '"/><rect x="122" y="196" width="28" height="92" rx="13" fill="' + SKIN + '"/>' +
    '<rect x="60" y="130" width="26" height="72" rx="13" fill="' + SKIN + '"/><rect x="154" y="130" width="26" height="72" rx="13" fill="' + SKIN + '"/>' +
    '<rect x="84" y="118" width="72" height="92" rx="26" fill="' + SKIN + '"/>' +
    '<rect x="86" y="128" width="68" height="44" rx="16" fill="#fff"/><rect x="86" y="190" width="68" height="22" rx="10" fill="#fff"/>';
}
var FACE = '<ellipse cx="102" cy="78" rx="5.5" ry="6.5" fill="#4a2d5c"/><ellipse cx="138" cy="78" rx="5.5" ry="6.5" fill="#4a2d5c"/><circle cx="104" cy="75" r="2" fill="#fff"/><circle cx="140" cy="75" r="2" fill="#fff"/><circle cx="88" cy="94" r="9" fill="#ffadc0" opacity=".75"/><circle cx="152" cy="94" r="9" fill="#ffadc0" opacity=".75"/><path d="M108 96 Q120 110 132 96" fill="none" stroke="#4a2d5c" stroke-width="4" stroke-linecap="round"/>';
function dollSVG(){
  var hr = HAIRS[dollState.hair], d = dollState.dress > 0;
  var m = hr.back + dollBody();
  if (!d){ m += BOTTOMS[dollState.bottom].m + TOPS[dollState.top].m; } else m += DRESSES[dollState.dress].m;
  m += SHOES[dollState.shoes].m;
  m += '<circle cx="120" cy="74" r="52" fill="' + SKIN + '"/><circle cx="70" cy="80" r="8" fill="' + SKIN + '"/><circle cx="170" cy="80" r="8" fill="' + SKIN + '"/>' + FACE + hr.front + HATS[dollState.hat].m;
  return m;
}
function slotByK(k){ return SLOTS.filter(function(s){ return s.k === k; })[0]; }
var dollV = addView('doll');
dollV.innerHTML = '<div class="dollside"><svg id="dollSvg" viewBox="20 -14 200 330" role="img" aria-label="Puppe zum Anziehen"></svg></div><div class="dollpanel"><div class="slots" id="slots"></div><div class="items" id="dollItems"></div><div class="bar"><button class="pick" id="dollRnd">🎲 Zufall</button><button class="pick" id="dollReset">Ausziehen</button></div></div>';
function drawDoll(){ $('#dollSvg').innerHTML = dollSVG(); }
function drawItems(){
  var sl = slotByK(curSlot), box = $('#dollItems'); box.innerHTML = '';
  sl.items.forEach(function(it, i){
    var b = el('button', 'itm'); b.setAttribute('aria-label', it.n); b.setAttribute('aria-pressed', dollState[curSlot] === i ? 'true' : 'false');
    if (!it.m && !it.back){ b.textContent = '✕'; }
    else {
      var inner = it.back ? '<circle cx="120" cy="74" r="52" fill="' + SKIN + '"/>' + it.back.replace(/<circle cx="(62|178)"[^>]*\/>/g, '') + it.front : it.m;
      if (it.back) inner = it.back + '<circle cx="120" cy="74" r="52" fill="' + SKIN + '"/>' + it.front;
      b.innerHTML = '<svg viewBox="' + sl.vb + '">' + inner + '</svg>';
    }
    b.addEventListener('click', function(){ choose(curSlot, i); });
    box.appendChild(b);
  });
}
function choose(k, i){
  dollState[k] = i;
  if (k === 'dress' && i > 0){ dollState.top = 0; dollState.bottom = 0; }
  if ((k === 'top' || k === 'bottom') && i > 0) dollState.dress = 0;
  drawDoll(); drawItems();
  say(slotByK(k).items[i].n);
  var c = centerOf($('#dollSvg')); burst(c[0], c[1] - 40, 10);
}
SLOTS.forEach(function(s){
  var b = el('button', 'slotb', s.l); b.dataset.k = s.k; b.setAttribute('aria-pressed', s.k === curSlot ? 'true' : 'false');
  b.addEventListener('click', function(){
    curSlot = s.k; document.querySelectorAll('.slotb').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    drawItems(); say(s.l.replace(/^\S+\s/, ''));
  });
  $('#slots', dollV).appendChild(b);
});
$('#dollRnd').addEventListener('click', function(){
  dollState.hat = Math.random() * HATS.length | 0; dollState.shoes = 1 + (Math.random() * (SHOES.length - 1) | 0);
  dollState.hair = Math.random() * HAIRS.length | 0;
  if (Math.random() < .4){ dollState.dress = 1 + (Math.random() * (DRESSES.length - 1) | 0); dollState.top = 0; dollState.bottom = 0; }
  else { dollState.dress = 0; dollState.top = 1 + (Math.random() * (TOPS.length - 1) | 0); dollState.bottom = 1 + (Math.random() * (BOTTOMS.length - 1) | 0); }
  drawDoll(); drawItems(); say('Schau mal, was für ein Outfit!');
});
$('#dollReset').addEventListener('click', function(){ for (var k in dollState) if (k !== 'hair') dollState[k] = 0; drawDoll(); drawItems(); say('Alles ausgezogen'); });
$('#dollSvg').addEventListener('click', function(e){ say('Hallo Alma! Zieh mich an!'); burst(e.clientX, e.clientY, 14); });
function initDoll(){ drawDoll(); drawItems(); }

/* ================= Bad fertig machen ================= */
var BAD = [
  {e: '🚽', s: 'Toilette', t: 'Geh auf die Toilette und mach Pipi.', n: 2, say: 'Super, Pipi in die Toilette!'},
  {e: '🧻', s: 'Abwischen', t: 'Nimm Toilettenpapier und wisch dich ab.', n: 2, say: 'Prima, schön sauber!'},
  {e: '🚽', s: 'Spülen', t: 'Drück auf die Spülung.', n: 1, say: 'Tschüss Pipi! Es rauscht!', splash: 1},
  {e: '🧼', s: 'Hände', t: 'Wasch dir die Hände mit Seife.', n: 4, say: 'Saubere Hände!', bub: 1},
  {e: '🪥', s: 'Zähne', t: 'Putz dir die Zähne. Schrubbel, schrubbel.', n: 6, say: 'Blitzblanke Zähne!', bub: 1},
  {e: '💦', s: 'Gesicht', t: 'Wasch dir dein Gesicht.', n: 3, say: 'Ein frisches Gesicht!', bub: 1},
  {e: '💇‍♀️', s: 'Haare', t: 'Kämm dir die Haare.', n: 4, say: 'Schöne Haare!'}
];
var badV = addView('bad'), badI = 0, badTaps = 0;
badV.innerHTML = '<div class="steps" id="badSteps"></div><div class="say2" id="badText"></div><button class="bigtarget" id="badTarget" aria-label="Tippen"></button><div class="dots" id="badDots"></div>';
function badDraw(){
  var box = $('#badSteps'); box.innerHTML = '';
  BAD.forEach(function(s, i){ box.appendChild(el('span', 'stp' + (i < badI ? ' done' : i === badI ? ' cur' : ''), (i < badI ? '✔ ' : '') + s.s)); });
  if (badI >= BAD.length){
    $('#badText').textContent = 'Fertig, Alma! Alles geschafft!'; $('#badTarget').textContent = '🌟'; $('#badDots').innerHTML = '';
    say('Fertig, Alma! Du hast alles geschafft!'); rain(160); return;
  }
  var s = BAD[badI]; $('#badText').textContent = s.t; $('#badTarget').textContent = s.e;
  var d = $('#badDots'); d.innerHTML = ''; for (var i = 0; i < s.n; i++) d.appendChild(el('i', i < badTaps ? 'd' : ''));
}
function badStart(){ badI = 0; badTaps = 0; badDraw(); say(BAD[0].t); }
$('#badTarget').addEventListener('click', function(e){
  if (badI >= BAD.length){ badStart(); return; }
  var s = BAD[badI]; badTaps++;
  var c = centerOf(e.currentTarget);
  if (s.bub) A.bubbles(c[0], c[1], 5); else burst(c[0], c[1], 8);
  if (badTaps >= s.n){
    badTaps = 0; badI++; burst(c[0], c[1], 24); say(s.say);
    setTimeout(function(){ badDraw(); if (badI < BAD.length) say(BAD[badI].t); }, 1600);
    badDraw();
  } else badDraw();
});

/* ================= Memorie in Rosa ================= */
var PINK = [['🦄','Einhorn','#ffe3f1'],['🌈','Regenbogen','#e1f3ff'],['🧚','Fee','#f2e6ff'],['🌸','Blüte','#ffe9ee'],['🎀','Schleife','#fff0f6'],['👑','Krone','#fff5cf'],
  ['⭐','Stern','#fffbd0'],['🦋','Schmetterling','#e8f4ff'],['🌷','Tulpe','#ffe6f2'],['🍭','Lutscher','#ffefe0'],['🧁','Törtchen','#fde8ff'],['💖','Herz','#ffe1ea']];
var pinkV = addView('memoryPink'), pPairs = 6, pFirst = null, pLock = false, pFound = 0;
pinkV.className = 'view pink';
pinkV.innerHTML = '<div class="bar"><button class="pick pp" data-n="4" aria-pressed="false">4 Paare</button><button class="pick pp" data-n="6" aria-pressed="true">6 Paare</button><button class="pick pp" data-n="8" aria-pressed="false">8 Paare</button><button class="pick pp" data-n="10" aria-pressed="false">10 Paare</button><button class="pick pp" data-n="12" aria-pressed="false">12 Paare</button><button class="pick" id="pAgain">Neu mischen</button></div><div id="pWin" style="font-size:clamp(34px,6vw,60px);font-weight:700;color:#ff3d8f;min-height:1.2em;text-align:center"></div><div class="pboard" id="pBoard"></div>';
function pinkNew(){
  var n = pPairs, cards = shuf(PINK).slice(0, n); cards = shuf(cards.concat(cards));
  var cols = n <= 4 ? 4 : n <= 6 ? 4 : n <= 8 ? 4 : n <= 10 ? 5 : 6, rows = Math.ceil(cards.length / cols);
  var b = $('#pBoard'); b.style.setProperty('--cols', cols); b.style.setProperty('--rows', rows); b.innerHTML = '';
  $('#pWin').textContent = ''; pFirst = null; pLock = false; pFound = 0;
  cards.forEach(function(c){
    var d = el('button', 'card'); d.dataset.k = c[1]; d.setAttribute('aria-label', 'Karte');
    d.innerHTML = '<div class="in"><div class="face front"></div><div class="face back" style="background:' + c[2] + '"><span class="em">' + c[0] + '</span></div></div>';
    d.addEventListener('click', function(){ pickCard(d, c); });
    b.appendChild(d);
  });
}
function pickCard(d, c){
  if (pLock || d.classList.contains('open') || d.classList.contains('done')) return;
  d.classList.add('open'); say(c[1]);
  if (!pFirst){ pFirst = d; return; }
  if (pFirst.dataset.k === d.dataset.k){
    var a = pFirst; pFirst = null; pFound++;
    setTimeout(function(){ a.classList.add('done'); d.classList.add('done'); var p = centerOf(d); burst(p[0], p[1], 22); }, 500);
    if (pFound === pPairs){ setTimeout(function(){ $('#pWin').textContent = 'Super, Alma!'; say('Toll gemacht, Alma!'); rain(180); }, 1200); }
  } else {
    var a2 = pFirst; pFirst = null; pLock = true;
    setTimeout(function(){ a2.classList.remove('open'); d.classList.remove('open'); pLock = false; }, 1100);
  }
}
pinkV.querySelectorAll('.pp').forEach(function(b){
  b.addEventListener('click', function(){
    pPairs = +b.dataset.n; pinkV.querySelectorAll('.pp').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    pinkNew();
  });
});
$('#pAgain').addEventListener('click', pinkNew);

/* ================= Autofahren ================= */
var carV = addView('car'), carRun = false, carScore = 0, flies = [], lastT = 0, spawnT = 0;
carV.innerHTML = '<div id="carWorld"><div id="carScore">⭐ 0</div><div id="carRoad"></div><button id="carCar" aria-label="Auto">🚗</button></div>';
var CARITEMS = [['🌳','Baum'],['🐑','Schaf'],['🌼','Blume'],['⭐','Stern'],['🏠','Haus'],['🐄','Kuh'],['🦆','Ente'],['🎈','Ballon'],['🦋','Schmetterling'],['🐇','Hase']];
function carLoop(t){
  if (current !== 'car'){ carRun = false; return; }
  var w = $('#carWorld'), W = w.clientWidth, H = w.clientHeight, dt = Math.min(50, t - lastT) / 1000; lastT = t;
  spawnT -= dt;
  if (spawnT <= 0 && flies.length < 5){
    var it = CARITEMS[Math.random() * CARITEMS.length | 0], b = el('button', 'fly', it[0]);
    b.setAttribute('aria-label', it[1]);
    var f = {b: b, x: W + 20, y: rnd(H * .08, H * .5), name: it[1]};
    b.style.top = f.y + 'px'; b.style.left = '0px'; b.style.transform = 'translateX(' + f.x + 'px)';
    (function(ff){ b.addEventListener('pointerdown', function(e){ e.preventDefault(); carTake(ff, e); }); })(f);
    w.appendChild(b); flies.push(f); spawnT = rnd(1.6, 2.6);
  }
  var sp = Math.max(60, W / 16);
  flies = flies.filter(function(f){
    if (f.gone) return false;
    f.x -= sp * dt; f.b.style.transform = 'translateX(' + f.x + 'px)';
    if (f.x < -160){ f.b.remove(); return false; }
    return true;
  });
  requestAnimationFrame(carLoop);
}
function carTake(f, e){
  if (f.gone) return; f.gone = true;
  f.b.style.setProperty('--x', f.x + 'px'); f.b.style.setProperty('--y', '-40px');
  f.b.style.transform = ''; f.b.style.left = f.x + 'px';
  f.b.classList.add('pop'); setTimeout(function(){ f.b.remove(); }, 450);
  carScore++; $('#carScore').textContent = '⭐ ' + carScore; burst(e.clientX, e.clientY, 14); say(f.name);
  if (carScore % 10 === 0){ setTimeout(function(){ say('Toll gemacht, Alma! ' + carScore + ' Sachen gesammelt!'); rain(80); }, 900); }
}
$('#carCar').addEventListener('click', function(e){
  var c = $('#carCar'); c.classList.remove('hop'); void c.offsetWidth; c.classList.add('hop'); say('Tuut tuut! Brumm brumm!'); burst(e.clientX, e.clientY, 10);
});
function initCar(){
  carScore = 0; $('#carScore').textContent = '⭐ 0';
  flies.forEach(function(f){ f.b.remove(); }); flies = []; spawnT = .3;
  if (!carRun){ carRun = true; lastT = performance.now(); requestAnimationFrame(carLoop); }
  say('Wir fahren los! Tipp auf die Sachen am Straßenrand.');
}

/* ================= Wochentage ================= */
var DAYS = [['Montag','Mo',1],['Dienstag','Di',1],['Mittwoch','Mi',1],['Donnerstag','Do',1],['Freitag','Fr',1],['Samstag','Sa',0],['Sonntag','So',0]];
var daysV = addView('days'), dayNext = -1;
daysV.innerHTML = '<div class="say2" id="dayTxt">Tipp auf einen Tag</div><div class="week" id="week"></div><div class="bar"><button class="pick" id="dayGame">Der Reihe nach</button><button class="pick" id="daySing">Alle vorlesen</button></div>';
function daysDraw(){
  var w = $('#week'), today = (new Date().getDay() + 6) % 7; w.innerHTML = '';
  DAYS.forEach(function(d, i){
    var b = el('button', 'day ' + (d[2] ? 'work' : 'free') + (i === today ? ' today' : '') + (i === dayNext ? ' next' : ''), '<span>' + d[1] + '</span><small>' + (d[2] ? 'Alltag' : 'Frei') + '</small>');
    b.addEventListener('click', function(){ dayTap(i, b); });
    w.appendChild(b);
  });
}
function dayTap(i, b){
  var d = DAYS[i], today = (new Date().getDay() + 6) % 7, p = centerOf(b);
  if (dayNext >= 0){
    if (i !== dayNext){ say('Als Nächstes kommt ' + DAYS[dayNext][0] + '.'); return; }
    burst(p[0], p[1], 18); say(d[0]);
    dayNext = i === 6 ? -1 : i + 1;
    if (dayNext < 0){ $('#dayTxt').textContent = 'Geschafft! Eine ganze Woche!'; setTimeout(function(){ say('Geschafft, Alma! Eine ganze Woche!'); rain(120); }, 900); }
    else $('#dayTxt').textContent = 'Und dann kommt?';
    daysDraw(); return;
  }
  burst(p[0], p[1], 16);
  var t = d[0] + '. ' + (d[2] ? 'Unter der Woche ist Alltag.' : 'Am Wochenende ist frei.') + (i === today ? ' Und heute ist ' + d[0] + '!' : '');
  $('#dayTxt').textContent = t; say(t);
}
$('#dayGame').addEventListener('click', function(){ dayNext = 0; $('#dayTxt').textContent = 'Tipp auf Montag'; say('Tipp auf Montag. Dann geht es der Reihe nach weiter.'); daysDraw(); });
$('#daySing').addEventListener('click', function(){ say('Montag, Dienstag, Mittwoch, Donnerstag, Freitag. Das ist die Woche. Samstag und Sonntag, da ist Wochenende.'); });

/* ================= Zaehlen bis 10 ================= */
var CNT = [['🍎','Äpfel'],['🐟','Fische'],['⭐','Sterne'],['🌸','Blumen'],['🐥','Küken'],['🎈','Luftballons'],['🍓','Erdbeeren'],['🦋','Schmetterlinge'],['🐞','Marienkäfer'],['🍪','Kekse']];
var NUMW = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn'];
var cntV = addView('count'), cMax = 5, cN = 0, cDone = 0, cLast = 0, cItem = null;
cntV.innerHTML = '<div class="bar"><button class="pick cm" data-n="3" aria-pressed="false">bis 3</button><button class="pick cm" data-n="5" aria-pressed="true">bis 5</button><button class="pick cm" data-n="10" aria-pressed="false">bis 10</button><button class="pick" id="cAgain">Neu</button></div><div class="say2" id="cTxt">Zähl mit!</div><div id="cArea"></div><div class="dots" id="cDots"></div>';
function countNew(){
  var n; do { n = 1 + (Math.random() * cMax | 0); } while (n === cLast && cMax > 1); cLast = n; cN = n; cDone = 0;
  cItem = CNT[Math.random() * CNT.length | 0];
  var area = $('#cArea'); area.innerHTML = '';
  var cols = n <= 3 ? n : n <= 6 ? 3 : 4, rows = Math.ceil(n / cols);
  var cells = []; for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) cells.push([r, c]);
  shuf(cells).slice(0, n).forEach(function(cell){
    var o = el('button', 'cobj', cItem[0]); o.setAttribute('aria-label', cItem[1]);
    o.style.left = ((cell[1] + .5) / cols * 100 + rnd(-3, 3)) + '%'; o.style.top = ((cell[0] + .5) / rows * 100 + rnd(-4, 4)) + '%';
    o.addEventListener('click', function(e){ countTap(o, e); });
    area.appendChild(o);
  });
  var d = $('#cDots'); d.innerHTML = ''; for (var i = 0; i < n; i++) d.appendChild(el('i', ''));
  $('#cTxt').textContent = 'Zähl mit!'; say('Wie viele ' + cItem[1] + ' sind das? Tipp sie der Reihe nach an.');
}
function countTap(o, e){
  if (o.classList.contains('on')) return;
  o.classList.add('on'); cDone++; say(NUMW[cDone]); burst(e.clientX, e.clientY, 8);
  var ds = $('#cDots').children; if (ds[cDone - 1]) ds[cDone - 1].classList.add('d');
  $('#cTxt').textContent = NUMW[cDone].charAt(0).toUpperCase() + NUMW[cDone].slice(1);
  if (cDone === cN){
    setTimeout(function(){ say('Das sind ' + NUMW[cN] + ' ' + cItem[1] + '! Super!'); rain(70); $('#cTxt').textContent = NUMW[cN].charAt(0).toUpperCase() + NUMW[cN].slice(1) + ' ' + cItem[1] + '!'; }, 700);
    setTimeout(countNew, 4800);
  }
}
cntV.querySelectorAll('.cm').forEach(function(b){
  b.addEventListener('click', function(){ cMax = +b.dataset.n; cntV.querySelectorAll('.cm').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); countNew(); });
});
$('#cAgain').addEventListener('click', countNew);

/* ================= Schreiben ================= */
var wV = addView('write'), wTxt = '', wCols = ['#ff4d4d','#ff9a3c','#e0a800','#3ecf6d','#3f8cff','#a46bff','#ff6fae','#22c7c1'];
wV.innerHTML = '<div id="wText" class="empty">Tipp auf die Buchstaben</div><div id="keys"></div>';
var ROWS = ['QWERTZUIOPÜ', 'ASDFGHJKLÖÄ', 'YXCVBNM'];
function wDraw(){
  var t = $('#wText');
  if (!wTxt){ t.className = 'empty'; t.textContent = 'Tipp auf die Buchstaben'; return; }
  t.className = ''; t.innerHTML = '';
  for (var i = 0; i < wTxt.length; i++){ var s = el('span'); s.style.color = wCols[i % wCols.length]; s.textContent = wTxt[i]; t.appendChild(s); }
}
function wAdd(ch){ if (wTxt.length < 200){ wTxt += ch; wDraw(); } }
function wKey(label, cls, fn){ var b = el('button', 'key ' + (cls || ''), label); b.addEventListener('click', fn); return b; }
(function(){
  var box = $('#keys', wV);
  ROWS.forEach(function(r){
    var row = el('div', 'krow');
    r.split('').forEach(function(ch){ row.appendChild(wKey(ch, '', function(){ wAdd(ch); say(ch); })); });
    box.appendChild(row);
  });
  var last = el('div', 'krow');
  last.appendChild(wKey('Leerzeichen', 'wide', function(){ wAdd(' '); }));
  last.appendChild(wKey('⌫', 'act', function(){ wTxt = wTxt.slice(0, -1); wDraw(); }));
  last.appendChild(wKey('🧹', 'act', function(){ wTxt = ''; wDraw(); say('Alles weg'); }));
  last.appendChild(wKey('🔊 Vorlesen', 'act', function(){ if (wTxt.trim()) say(wTxt); }));
  box.appendChild(last);
  box.style.cssText = 'display:flex;flex-direction:column;gap:7px;width:100%';
})();
addEventListener('keydown', function(e){
  if (current !== 'write' || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'Backspace'){ wTxt = wTxt.slice(0, -1); wDraw(); e.preventDefault(); }
  else if (e.key === ' ' || e.key === 'Enter'){ wAdd(e.key === ' ' ? ' ' : '\n'); e.preventDefault(); }
  else if (e.key.length === 1 && /[A-Za-zÄÖÜäöüß0-9!?.,]/.test(e.key)){ var ch = e.key.toUpperCase(); wAdd(ch); say(ch); }
});

/* ================= Bildergalerie ================= */
var gV = addView('gallery'), gal = {assets: null, db: null, items: [], local: [], inited: false, delArm: null};
gV.innerHTML = '<div class="gbar"><label class="big" style="cursor:pointer">📷 Bild oder Video hinzufügen<input id="gFile" type="file" accept="image/*,video/*" multiple hidden></label></div><div class="gnote" id="gNote"></div><div class="ggrid" id="gGrid"></div>';
var viewer = el('div'); viewer.id = 'gview';
viewer.innerHTML = '<div id="gMedia"></div><div class="gbar"><button class="pick" id="gClose">✕ Schließen</button><button class="pick" id="gDel">🗑 Löschen</button></div>';
document.body.appendChild(viewer);
function gNote(t){ $('#gNote').textContent = t || ''; $('#gNote').style.display = t ? '' : 'none'; }
function gInfo(){
  if (!gal.assets || !gal.db) gNote('Hier werden Bilder nur gespeichert, wenn die Seite von Papa geöffnet wird. Sonst bleiben sie nur, solange die Seite offen ist.');
  else gNote('');
}
function gRender(){
  var all = gal.items.concat(gal.local), g = $('#gGrid'); g.innerHTML = '';
  if (!all.length){ var em = el('div', 'say2', 'Noch keine Bilder. Tipp oben auf die Taste.'); em.style.gridColumn = '1/-1'; g.appendChild(em); return; }
  all.forEach(function(it){
    var b = el('button', 'gi'); b.setAttribute('aria-label', 'Bild öffnen');
    b.innerHTML = (it.kind === 'video' ? '<video src="' + it.url + '#t=0.1" preload="metadata" muted playsinline></video><span class="play">▶</span>' : '<img src="' + it.url + '" alt="">');
    b.addEventListener('click', function(){ gOpen(it); });
    g.appendChild(b);
  });
}
var gCur = null;
function gOpen(it){
  gCur = it; gal.delArm = null; $('#gDel').textContent = '🗑 Löschen';
  $('#gMedia').innerHTML = it.kind === 'video' ? '<video src="' + it.url + '" controls playsinline autoplay></video>' : '<img src="' + it.url + '" alt="">';
  viewer.classList.add('on');
}
function gClose(){ viewer.classList.remove('on'); $('#gMedia').innerHTML = ''; gCur = null; }
$('#gClose').addEventListener('click', gClose);
$('#gDel').addEventListener('click', function(){
  if (!gCur) return;
  if (gal.delArm !== gCur){ gal.delArm = gCur; this.textContent = 'Wirklich löschen?'; return; }
  var it = gCur; gClose();
  if (it.local){ gal.local = gal.local.filter(function(x){ return x !== it; }); gRender(); return; }
  try {
    if (gal.db) gal.db.collection('gallery').doc(it.id).delete();
    if (gal.assets && it.aid) gal.assets.delete(it.aid).catch(function(){});
  } catch (e) {}
});
$('#gFile').addEventListener('change', function(ev){
  var files = Array.prototype.slice.call(ev.target.files || []); ev.target.value = '';
  files.forEach(function(f){
    var kind = f.type.indexOf('video') === 0 ? 'video' : f.type.indexOf('image') === 0 ? 'image' : null;
    if (!kind) return;
    if (gal.assets && gal.db){
      gNote('Wird gespeichert ...');
      gal.assets.upload(f).then(function(res){
        var id = 'g' + Date.now().toString(36) + (Math.random() * 1e4 | 0);
        return gal.db.collection('gallery').doc(id).set({aid: res.id, kind: kind, t: Date.now()});
      }).then(function(){ gInfo(); say('Gespeichert!'); }).catch(function(){ gNote('Das hat leider nicht geklappt. Vielleicht ist die Datei zu groß.'); });
    } else {
      gal.local.push({local: true, kind: kind, url: URL.createObjectURL(f)}); gRender();
    }
  });
});
function gInit(){
  gRender(); gInfo();
  if (gal.inited) return; gal.inited = true;
  try {
    if (window.claude && claude.use){
      claude.use('assets').then(function(a){ gal.assets = a; gInfo(); }).catch(function(){});
      claude.use('db').then(function(d){
        gal.db = d; gInfo(); if (!d) return;
        d.collection('gallery').orderBy('t', 'desc').limit(300).onSnapshot(function(snap){
          gal.items = snap.docs.map(function(x){ var o = x.data(); return {id: x.id, aid: o.aid, kind: o.kind, url: '/_blob/' + o.aid}; });
          gRender();
        }, function(){});
      }).catch(function(){});
    }
  } catch (e) {}
}

/* ================= Startseite: Kacheln und Umschalter ================= */
var tilesBox = $('.tiles');
var env = el('div', 'envbar');
env.innerHTML = '<span class="sectionhead" style="flex-basis:auto">Jahreszeit:</span>';
A.SEASONS.forEach(function(s){
  var b = el('button', 'pick seasonBtn', s.e + ' ' + s.n); b.dataset.k = s.k;
  b.addEventListener('click', function(){ A.setSeason(s.k); say(s.n); });
  env.appendChild(b);
});
var nb = el('button', 'pick'); nb.id = 'nightBtn';
nb.addEventListener('click', function(){ A.setNight(!A.getNight()); say(A.getNight() ? 'Es ist Nacht. Gute Nacht!' : 'Es ist Tag. Guten Morgen!'); });
env.appendChild(nb);
tilesBox.insertBefore(env, tilesBox.firstChild);
var NEWTILES = [
  ['doll', '👧', 'Puppe', 'Puppe anziehen', 't-c1'], ['bad', '🛁', 'Bad', 'Bad fertig machen', 't-c8'],
  ['memoryPink', '🦄', 'Rosa Memorie', 'Rosa Memorie', 't-c1'], ['seasons', '🌦️', 'Jahreszeiten', 'Jahreszeiten', 't-c6'],
  ['food', '🍎', 'Essen', 'Woher kommt das Essen?', 't-c7'], ['animals', '🦊', 'Tiere', 'Tiere', 't-c2'],
  ['car', '🚗', 'Autofahren', 'Wir fahren Auto', 't-c3'], ['days', '📅', 'Wochentage', 'Wochentage', 't-c5'],
  ['count', '🔢', 'Zählen', 'Zählen', 't-c4'], ['write', '✏️', 'Schreiben', 'Schreiben', 't-c6'],
  ['gallery', '🖼️', 'Bilder', 'Meine Bilder', 't-c8']
];
NEWTILES.forEach(function(t){
  var b = el('button', 'tile ' + t[4], '<span class="em" aria-hidden="true">' + t[1] + '</span>' + t[2]);
  b.addEventListener('click', function(){ say(t[3]); show(t[0]); });
  tilesBox.appendChild(b);
});

/* ---------- show erweitern ---------- */
var INIT = {doll: initDoll, bad: badStart, memoryPink: pinkNew, seasons: function(){ ALMA_QUIZ.seasons.start(); }, food: function(){ ALMA_QUIZ.food.start(); },
  animals: function(){ ALMA_QUIZ.animals.start(); }, car: initCar, days: function(){ dayNext = -1; $('#dayTxt').textContent = 'Tipp auf einen Tag'; daysDraw(); }, count: countNew,
  write: function(){ wDraw(); }, gallery: gInit};
var oldShow = show;
show = function(id){ oldShow(id); if (INIT[id]) INIT[id](); };
A.applyEnv();
})();
