/* ================= Erweiterung: alles neue ================= */
(function(){
'use strict';
var $ = function(s, r){ return (r || document).querySelector(s); };
function el(tag, cls, html){ var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
function rnd(a, b){ return a + Math.random() * (b - a); }
function shuf(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.random() * (i + 1) | 0, t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function addView(id){ var m = el('main', 'view'); m.id = id; $('#app').appendChild(m); return m; }
function store(k, v){ try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
function centerOf(node){ var r = node.getBoundingClientRect(); return [r.left + r.width/2, r.top + r.height/2]; }
function bubbles(x, y, n){
  for (var i = 0; i < n; i++){
    var b = el('i', 'bub'), s = rnd(14, 38);
    b.style.cssText = 'left:' + (x + rnd(-50, 50)) + 'px;top:' + (y + rnd(-30, 30)) + 'px;width:' + s + 'px;height:' + s + 'px;animation-delay:' + (i * 40) + 'ms';
    document.body.appendChild(b);
    (function(bb){ setTimeout(function(){ bb.remove(); }, 2000); })(b);
  }
}

/* ---------- Jahreszeit und Tag/Nacht ---------- */
var SEASONS = [
  {k: 'fruehling', n: 'Frühling', e: '🌷', c: '#8fe08a'},
  {k: 'sommer', n: 'Sommer', e: '☀️', c: '#ffd23f'},
  {k: 'herbst', n: 'Herbst', e: '🍂', c: '#ff9a3c'},
  {k: 'winter', n: 'Winter', e: '❄️', c: '#8fd0ff'}
];
function autoSeason(){ var m = new Date().getMonth(); return m === 11 || m < 2 ? 'winter' : m < 5 ? 'fruehling' : m < 8 ? 'sommer' : 'herbst'; }
function autoNight(){ var h = new Date().getHours(); return h < 7 || h >= 19; }
var season = store('alma-season') || autoSeason();
var night = store('alma-night') ? store('alma-night') === '1' : autoNight();

var bgEl = el('div'); bgEl.id = 'bg';
document.body.insertBefore(bgEl, document.body.firstChild);

function flower(x, y, c){
  return '<g transform="translate(' + x + ' ' + y + ')"><rect x="-2" y="0" width="4" height="26" fill="#3f9a4a"/>' +
    [0,72,144,216,288].map(function(a){ return '<ellipse cx="0" cy="-9" rx="6" ry="9" fill="' + c + '" transform="rotate(' + a + ')"/>'; }).join('') +
    '<circle r="5" fill="#ffd23f"/></g>';
}
function tree(x, y, crown, trunk, s){
  s = s || 1;
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-8" y="-10" width="16" height="60" rx="5" fill="' + trunk + '"/><circle cx="0" cy="-34" r="42" fill="' + crown + '"/><circle cx="-26" cy="-14" r="28" fill="' + crown + '"/><circle cx="26" cy="-14" r="28" fill="' + crown + '"/></g>';
}
function bgSVG(s, n){
  var sky = {
    fruehling: ['#bfe8ff', '#f2fcff'], sommer: ['#4fa8ff', '#c4eaff'],
    herbst: ['#ffd9a8', '#fff2df'], winter: ['#bfdcf5', '#f1f8ff']
  }[s];
  if (n) sky = ['#17143f', '#4a3b8c'];
  var ground = {fruehling: '#8fe08a', sommer: '#62c95e', herbst: '#d79a4e', winter: '#ffffff'}[s];
  var ground2 = {fruehling: '#74cc72', sommer: '#4fb34d', herbst: '#bd7e36', winter: '#e4f0fb'}[s];
  var o = '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
  o += '<defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + sky[0] + '"/><stop offset="1" stop-color="' + sky[1] + '"/></linearGradient></defs>';
  o += '<rect width="800" height="500" fill="url(#skyg)"/>';
  var cel = '';
  if (n){
    var st = [[60,50],[150,120],[240,40],[330,100],[420,30],[510,90],[600,45],[700,130],[760,60],[110,200],[300,180],[560,170],[690,230],[40,150],[470,160]];
    st.forEach(function(p, i){ cel += '<polygon class="tw" style="animation-delay:' + (i * 0.3) + 's" points="0,-9 2.5,-2.5 9,0 2.5,2.5 0,9 -2.5,2.5 -9,0 -2.5,-2.5" fill="#fff6c8" transform="translate(' + p[0] + ' ' + p[1] + ')"/>'; });
    cel += '<defs><mask id="mm"><rect width="800" height="500" fill="#fff"/><circle cx="684" cy="80" r="40" fill="#000"/></mask></defs><circle cx="660" cy="95" r="46" fill="#fff4c9" mask="url(#mm)"/>';
  } else if (s === 'sommer'){
    o += '<g transform="translate(660 90)"><g stroke="#ffd23f" stroke-width="8" stroke-linecap="round">' +
      [0,45,90,135,180,225,270,315].map(function(a){ return '<line x1="0" y1="-62" x2="0" y2="-82" transform="rotate(' + a + ')"/>'; }).join('') +
      '</g><circle r="52" fill="#ffd23f"/><circle cx="-16" cy="-8" r="5" fill="#4a2d5c"/><circle cx="16" cy="-8" r="5" fill="#4a2d5c"/><path d="M-18 14 Q0 30 18 14" fill="none" stroke="#4a2d5c" stroke-width="5" stroke-linecap="round"/></g>';
  } else {
    var sc = s === 'winter' ? '#fff3b0' : '#ffd23f', rr = s === 'winter' ? 34 : 42;
    o += '<circle cx="680" cy="90" r="' + rr + '" fill="' + sc + '"/>';
  }
  if (!n && s !== 'herbst'){ o += '<g fill="#fff" opacity=".9"><ellipse cx="160" cy="90" rx="60" ry="22"/><ellipse cx="200" cy="76" rx="40" ry="22"/><ellipse cx="450" cy="130" rx="54" ry="18"/><ellipse cx="480" cy="116" rx="34" ry="18"/></g>'; }
  if (s === 'herbst' && !n){ o += '<g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".85"><path d="M60 70 C120 50 160 100 230 70 S320 60 340 80"/><path d="M420 150 C470 130 520 175 600 150"/><path d="M90 150 C130 140 170 165 210 150"/></g>'; }
  o += '<path d="M0 330 C140 270 260 300 400 320 S650 290 800 320 V500 H0Z" fill="' + ground2 + '"/>';
  o += '<path d="M0 380 C200 340 380 400 560 370 S720 360 800 372 V500 H0Z" fill="' + ground + '"/>';
  if (s === 'winter'){
    o += tree(90, 320, '#3b8b57', '#6b4a30', 1);
    o += '<g fill="#fff"><ellipse cx="90" cy="276" rx="30" ry="10"/><ellipse cx="62" cy="300" rx="20" ry="8"/><ellipse cx="118" cy="300" rx="20" ry="8"/></g>';
    o += '<g transform="translate(250 400)"><circle cy="30" r="44" fill="#fff" stroke="#b7cbe0" stroke-width="3"/><circle cy="-30" r="32" fill="#fff" stroke="#b7cbe0" stroke-width="3"/><circle cx="-11" cy="-37" r="4" fill="#333"/><circle cx="11" cy="-37" r="4" fill="#333"/><polygon points="0,-30 26,-26 0,-22" fill="#ff8a2a"/><circle cy="20" r="4" fill="#333"/><circle cy="38" r="4" fill="#333"/><rect x="-26" y="-64" width="52" height="8" fill="#333"/><rect x="-16" y="-92" width="32" height="30" fill="#333"/><path d="M-30 -8 Q0 6 30 -8 L30 2 Q0 16 -30 2Z" fill="#ff4d4d"/></g>';
    o += '<g stroke="#8a5a3c" stroke-width="5" stroke-linecap="round"><line x1="205" y1="395" x2="170" y2="360"/><line x1="295" y1="395" x2="330" y2="360"/></g>';
  } else if (s === 'herbst'){
    o += tree(110, 330, '#ff9a3c', '#6b4a30', 1.2) + tree(690, 340, '#e8452c', '#6b4a30', 1) + tree(560, 350, '#ffc93c', '#6b4a30', .8);
    o += '<g fill="#c0392b"><ellipse cx="300" cy="420" rx="16" ry="8"/></g><g fill="#ff9a3c"><ellipse cx="250" cy="440" rx="14" ry="7"/><ellipse cx="380" cy="430" rx="14" ry="7"/></g><g fill="#ffc93c"><ellipse cx="440" cy="450" rx="14" ry="7"/></g>';
  } else if (s === 'sommer'){
    o += tree(90, 330, '#3fae4a', '#7a5230', 1.1);
    o += '<g transform="translate(470 395)"><rect x="-10" y="0" width="290" height="96" rx="22" fill="#ffffff"/><rect x="0" y="10" width="270" height="76" rx="16" fill="#3fb8ff"/><path d="M14 40 q16 -12 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/><path d="M14 66 q16 -12 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/><g stroke="#c9d3de" stroke-width="5" fill="none"><path d="M240 10 V-26 q0 -10 10 -10 M264 10 V-26 q0 -10 -10 -10"/></g></g>';
    o += '<g transform="translate(230 392)"><line x1="-30" y1="-60" x2="130" y2="-60" stroke="#8a5a3c" stroke-width="5"/><line x1="-26" y1="-60" x2="-26" y2="40" stroke="#8a5a3c" stroke-width="6"/><path d="M20 -58 h56 l-4 40 q-12 8 -24 0 q-12 8 -24 0Z" fill="#ff4d4d"/><path d="M20 -48 h56 M24 -34 h48" stroke="#fff" stroke-width="4"/></g>';
  } else {
    o += flower(80, 430, '#ff6fae') + flower(150, 455, '#ffd23f') + flower(260, 425, '#fff') + flower(360, 450, '#b48cff') + flower(520, 440, '#ff6fae') + flower(620, 460, '#ffd23f') + flower(720, 430, '#fff') + flower(450, 480, '#ff9a3c');
    o += tree(110, 335, '#58c26a', '#7a5230', 1);
    o += '<g fill="#ffb3d3"><circle cx="86" cy="296" r="7"/><circle cx="118" cy="288" r="7"/><circle cx="140" cy="310" r="7"/><circle cx="70" cy="320" r="7"/></g>';
  }
  if (n) o += '<rect width="800" height="500" fill="#0c0a2e" opacity=".42"/>' + cel;
  return o + '</svg>';
}
function fallGlyphs(s, n){
  if (n) return [];
  return {winter: ['❄️'], herbst: ['🍂', '🍁', '🍃'], fruehling: ['🌸', '🦋'], sommer: []}[s];
}
function applyEnv(){
  bgEl.innerHTML = bgSVG(season, night);
  var g = fallGlyphs(season, night);
  if (g.length){
    var f = el('div'); f.id = 'fall';
    var count = season === 'herbst' ? 14 : 18;
    for (var i = 0; i < count; i++){
      var sp = el('span', null, g[i % g.length]);
      var wind = season === 'herbst' ? 260 : 50;
      sp.style.cssText = 'left:' + rnd(0, 98) + '%;font-size:' + rnd(22, 42) + 'px;animation-duration:' + rnd(season === 'herbst' ? 6 : 9, season === 'herbst' ? 11 : 16) + 's;animation-delay:-' + rnd(0, 14) + 's;--dx:' + rnd(wind * .3, wind) + 'px;--rot:' + rnd(120, 520) + 'deg';
      f.appendChild(sp);
    }
    bgEl.appendChild(f);
  }
  document.body.classList.toggle('night', night);
  document.querySelectorAll('.seasonBtn').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.k === season ? 'true' : 'false'); });
  var nb = $('#nightBtn'); if (nb){ nb.innerHTML = night ? '🌙 Nacht' : '☀️ Tag'; nb.setAttribute('aria-pressed', night ? 'true' : 'false'); }
}

/* ---------- Quiz-Motor ---------- */
function makeQuiz(viewId, modes, intro){
  var v = addView(viewId);
  v.innerHTML = '<div class="qmodes"></div><div class="qprog"></div><div class="qcard"><div class="qe"></div><div class="qn"></div></div><div class="qchoices"></div><div class="qexp" aria-live="polite"></div><button class="big qnext" hidden>Weiter</button>';
  var mBar = $('.qmodes', v), prog = $('.qprog', v), qe = $('.qe', v), qn = $('.qn', v), ch = $('.qchoices', v), ex = $('.qexp', v), nx = $('.qnext', v);
  var mode = modes[0], queue = [], idx = 0, wrong = 0, locked = false, ROUND = 8;
  modes.forEach(function(m, i){
    var b = el('button', 'pick', m.label); b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function(){
      mode = m; mBar.querySelectorAll('.pick').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      say(m.label); start();
    });
    mBar.appendChild(b);
  });
  function dots(){ prog.innerHTML = ''; for (var i = 0; i < queue.length; i++) prog.appendChild(el('i', i < idx ? 'd' : i === idx ? 'c' : '')); }
  function start(){ queue = shuf(mode.items).slice(0, ROUND); idx = 0; nx.hidden = true; item(); }
  function item(){
    wrong = 0; locked = false; nx.hidden = true; ex.textContent = '';
    if (idx >= queue.length){
      prog.innerHTML = ''; qe.textContent = '🎉'; qn.textContent = 'Geschafft!'; ch.innerHTML = '';
      var again = el('button', 'big', 'Nochmal'); again.addEventListener('click', function(){ say('Nochmal!'); start(); });
      ch.appendChild(again); say('Toll gemacht, Alma!'); rain(120); return;
    }
    dots();
    var it = queue[idx];
    qe.textContent = it.e; qn.textContent = it.n; ch.innerHTML = '';
    var list = it.c || mode.choices;
    list.forEach(function(c){
      var b = el('button', 'qc', '<span class="ce">' + c.e + '</span><span>' + c.l + '</span>');
      b.style.background = c.c || '#fff'; b.dataset.k = c.k;
      b.addEventListener('click', function(){ pick(b, c, it); });
      ch.appendChild(b);
    });
    say(mode.prompt(it));
  }
  function pick(b, c, it){
    if (locked) return;
    var list = it.c || mode.choices;
    if (c.k === it.a){
      locked = true; b.classList.add('ok'); b.classList.remove('hint');
      var p = centerOf(b); burst(p[0], p[1], 26);
      ex.textContent = it.t; say('Richtig! ' + it.t);
      nx.hidden = false; nx.textContent = idx + 1 >= queue.length ? 'Fertig' : 'Weiter';
    } else {
      wrong++;
      b.classList.add('shake'); setTimeout(function(){ b.classList.remove('shake'); }, 400);
      if (wrong >= 2){
        var right = ch.querySelector('[data-k="' + it.a + '"]'); if (right) right.classList.add('hint');
        say('Schau mal, es ist ' + (list.filter(function(x){ return x.k === it.a; })[0] || {l: ''}).l + '.');
      } else say('Probier es nochmal.');
    }
  }
  nx.addEventListener('click', function(){ idx++; item(); });
  return {start: start, view: v};
}

var SEAS_CH = SEASONS.map(function(s){ return {k: s.k, e: s.e, l: s.n, c: s.c}; });
function SI(e, n, a, t){ return {e: e, n: n, a: a, t: t}; }

var quizSeasons = makeQuiz('seasons', [{
  label: 'Jahreszeiten', choices: SEAS_CH,
  prompt: function(it){ return 'Zu welcher Jahreszeit gehört ' + it.n + '?'; },
  items: [
    SI('⛄','Schneemann','winter','Im Winter ist es kalt und es schneit. Dann bauen wir einen Schneemann.'),
    SI('🛷','Schlitten','winter','Im Winter fahren wir mit dem Schlitten, wenn Schnee liegt.'),
    SI('🧣','Schal','winter','Im Winter ist es kalt. Da tragen wir Schal, Mütze und Handschuhe.'),
    SI('🧤','Handschuhe','winter','Im Winter frieren die Finger. Handschuhe halten sie warm.'),
    SI('❄️','Schneeflocke','winter','Schneeflocken fallen im Winter vom Himmel.'),
    SI('🦔','Igel','winter','Im Winter hält der Igel Winterschlaf. Er schläft ganz lange.'),
    SI('🎄','Tannenbaum','winter','Im Winter ist Weihnachten. Dann steht ein Tannenbaum im Zimmer.'),
    SI('🌷','Tulpe','fruehling','Im Frühling wachsen die ersten Blumen aus der Erde.'),
    SI('🐥','Küken','fruehling','Im Frühling schlüpfen kleine Küken aus den Eiern.'),
    SI('🐰','Osterhase','fruehling','Ostern ist im Frühling. Da versteckt der Osterhase Eier.'),
    SI('🪺','Vogelnest','fruehling','Im Frühling bauen die Vögel Nester für ihre Eier.'),
    SI('🌱','Keimling','fruehling','Im Frühling wachsen kleine Pflanzen aus der Erde. Sie suchen das Licht.'),
    SI('🐑','Lämmchen','fruehling','Im Frühling werden kleine Lämmer geboren.'),
    SI('🐦','Vogelgesang','fruehling','Im Frühling singen die Vögel schon früh am Morgen: zwitscher, zwitscher.'),
    SI('☀️','Sonne','sommer','Im Sommer scheint die Sonne lange und warm.'),
    SI('🍦','Eis','sommer','Im Sommer ist es heiß. Da essen wir gern ein kühles Eis.'),
    SI('🩳','Badehose','sommer','Im Sommer ist es heiß. Da ziehen wir die Badehose an und gehen schwimmen.'),
    SI('🏊','Schwimmbad','sommer','Im Sommer gehen wir ins Schwimmbad und planschen im Wasser.'),
    SI('🕶️','Sonnenbrille','sommer','Im Sommer blendet die Sonne. Die Sonnenbrille schützt die Augen.'),
    SI('🐝','Biene','sommer','Im Sommer summen viele Bienen von Blume zu Blume.'),
    SI('🌻','Sonnenblume','sommer','Im Sommer blühen die großen Sonnenblumen.'),
    SI('⛈️','Gewitter','sommer','Im Sommer gibt es manchmal ein Gewitter. Es blitzt und donnert laut.'),
    SI('🍂','Bunte Blätter','herbst','Im Herbst werden die Blätter bunt und fallen vom Baum.'),
    SI('🪁','Drachen','herbst','Im Herbst weht der Wind. Dann lassen wir Drachen steigen.'),
    SI('🎃','Kürbis','herbst','Im Herbst ernten wir Kürbisse. Man kann sie auch schnitzen.'),
    SI('☂️','Regenschirm','herbst','Im Herbst regnet es oft. Da nehmen wir den Regenschirm mit.'),
    SI('🐿️','Eichhörnchen','herbst','Im Herbst sammelt das Eichhörnchen Nüsse für den Winter.'),
    SI('💨','Wind','herbst','Im Herbst weht der Wind stark. Er pfeift: wuuuh.'),
    SI('🍄','Pilz','herbst','Im Herbst wachsen Pilze im Wald. Wir fassen Pilze nie an und essen sie nie.')
  ]
}]);

var FOOD_WHEN = [
  SI('🍓','Erdbeere','sommer','Erdbeeren wachsen nah am Boden. Im Sommer werden sie rot und süß.'),
  SI('🍒','Kirschen','sommer','Kirschen hängen im Sommer am Kirschbaum.'),
  SI('🫐','Heidelbeeren','sommer','Heidelbeeren wachsen im Sommer an kleinen Büschen.'),
  SI('🍅','Tomate','sommer','Tomaten brauchen viel Sonne. Darum werden sie im Sommer reif.'),
  SI('🥒','Gurke','sommer','Gurken wachsen im Sommer und brauchen viel Wasser.'),
  SI('🌽','Mais','sommer','Mais wächst im Sommer ganz hoch auf dem Feld.'),
  SI('🍎','Apfel','herbst','Äpfel hängen am Baum. Im Herbst sind sie reif und wir können sie pflücken.'),
  SI('🍐','Birne','herbst','Birnen sind im Herbst reif und saftig.'),
  SI('🍇','Weintrauben','herbst','Weintrauben werden im Herbst geerntet.'),
  SI('🎃','Kürbis','herbst','Kürbisse wachsen am Boden und werden im Herbst geerntet.'),
  SI('🥔','Kartoffel','herbst','Kartoffeln wachsen unter der Erde. Im Herbst graben wir sie aus.'),
  SI('🌰','Nüsse','herbst','Nüsse fallen im Herbst vom Baum.'),
  SI('🍄','Pilze','herbst','Pilze wachsen im Herbst im Wald. Wir fassen sie nie an und essen sie nie. Nur Erwachsene, die sich gut auskennen, dürfen sie sammeln.'),
  SI('🌸','Apfelblüte','fruehling','Im Frühling blühen die Apfelbäume. Aus den Blüten werden später die Äpfel.'),
  SI('🥬','Salat','fruehling','Salat wächst schon im Frühling, wenn es wieder wärmer wird.'),
  SI('🌱','Kresse','fruehling','Kresse wächst im Frühling ganz schnell aus winzigen Samen.'),
  SI('🥬','Grünkohl','winter','Grünkohl wächst auch im Winter draußen. Die Kälte macht ihn besonders lecker.')
];
var FOOD_FROM = [
  SI('🥛','Milch','kuh','Die Kuh frisst Gras und gibt uns Milch.'),
  SI('🧀','Käse','kuh','Käse wird aus Milch gemacht. Die Milch kommt von der Kuh.'),
  SI('🧈','Butter','kuh','Butter wird aus Milch gemacht. Die Milch kommt von der Kuh.'),
  SI('🥚','Ei','huhn','Das Huhn legt Eier.'),
  SI('🍯','Honig','biene','Bienen sammeln Nektar von den Blumen und machen daraus Honig.'),
  SI('🧶','Wolle','schaf','Vom Schaf kommt die Wolle. Daraus machen wir warme Pullover.'),
  SI('🍞','Brot','korn','Aus dem Korn vom Feld mahlt man Mehl. Daraus backt der Bäcker Brot.'),
  SI('🍝','Nudeln','korn','Nudeln werden aus Mehl gemacht. Das Mehl kommt vom Korn.'),
  SI('🧃','Apfelsaft','baum','Äpfel wachsen am Baum. Aus den Äpfeln wird Saft gepresst.')
];
var FROM_CH = [
  {k: 'kuh', e: '🐄', l: 'Kuh', c: '#e9f7e4'}, {k: 'huhn', e: '🐔', l: 'Huhn', c: '#fff0d0'},
  {k: 'biene', e: '🐝', l: 'Biene', c: '#fff7bf'}, {k: 'schaf', e: '🐑', l: 'Schaf', c: '#f0eaff'},
  {k: 'korn', e: '🌾', l: 'Getreide', c: '#ffeccc'}, {k: 'baum', e: '🌳', l: 'Baum', c: '#dcf5d5'}
];
var quizFood = makeQuiz('food', [
  {label: 'Wann wächst das?', choices: SEAS_CH, items: FOOD_WHEN, prompt: function(it){ return 'Wann wächst ' + it.n + '?'; }},
  {label: 'Woher kommt das?', choices: FROM_CH, items: FOOD_FROM, prompt: function(it){ return 'Woher kommt ' + it.n + '?'; }}
]);

var HOME_CH = [
  {k: 'wald', e: '🌲', l: 'Wald', c: '#cdeccb'}, {k: 'wiese', e: '🌼', l: 'Wiese', c: '#fff3a8'},
  {k: 'wasser', e: '🌊', l: 'Wasser', c: '#c6e8ff'}, {k: 'hof', e: '🏡', l: 'Bauernhof', c: '#ffd9b8'}
];
var FD = {
  gras: {k: 'gras', e: '🌱', l: 'Gras'}, nuss: {k: 'nuss', e: '🌰', l: 'Nüsse'}, moehre: {k: 'moehre', e: '🥕', l: 'Möhre'},
  maus: {k: 'maus', e: '🐭', l: 'Maus'}, koerner: {k: 'koerner', e: '🌾', l: 'Körner'}, bluete: {k: 'bluete', e: '🌸', l: 'Blüten'},
  banane: {k: 'banane', e: '🍌', l: 'Banane'}, wurm: {k: 'wurm', e: '🪱', l: 'Würmer'}, bambus: {k: 'bambus', e: '🎋', l: 'Bambus'},
  fisch: {k: 'fisch', e: '🐟', l: 'Fisch'}, kaese: {k: 'kaese', e: '🧀', l: 'Käse'}, apfel: {k: 'apfel', e: '🍎', l: 'Apfel'}
};
function FI(e, n, a, others, t){
  var c = shuf([a].concat(others)).map(function(k){ var o = {}, s = FD[k]; for (var p in s) o[p] = s[p]; o.c = '#fff'; return o; });
  return {e: e, n: n, a: a, t: t, c: c};
}
var quizAnimals = makeQuiz('animals', [
  {label: 'Wo wohnt das Tier?', choices: HOME_CH, prompt: function(it){ return 'Wo wohnt ' + it.n + '?'; }, items: [
    SI('🦌','Reh','wald','Das Reh wohnt im Wald. Es ist scheu und frisst Gräser und Blätter.'),
    SI('🦊','Fuchs','wald','Der Fuchs wohnt im Wald in einer Höhle. Dort ist sein Bau.'),
    SI('🦉','Eule','wald','Die Eule wohnt im Wald. Sie ist nachts wach und schläft am Tag.'),
    SI('🐿️','Eichhörnchen','wald','Das Eichhörnchen wohnt auf Bäumen im Wald und klettert flink.'),
    SI('🦔','Igel','wald','Der Igel wohnt im Wald und im Garten. Er hat ganz viele Stacheln.'),
    SI('🐇','Hase','wiese','Der Hase lebt auf der Wiese und hoppelt schnell davon.'),
    SI('🦋','Schmetterling','wiese','Der Schmetterling flattert über die Wiese von Blume zu Blume.'),
    SI('🐝','Biene','wiese','Die Biene fliegt über die Wiese und sammelt Nektar aus den Blüten.'),
    SI('🐞','Marienkäfer','wiese','Der Marienkäfer krabbelt auf der Wiese. Er hat sieben Punkte.'),
    SI('🐟','Fisch','wasser','Der Fisch lebt im Wasser und atmet mit Kiemen.'),
    SI('🦆','Ente','wasser','Die Ente schwimmt auf dem Teich. Ihre Federn halten sie trocken.'),
    SI('🐸','Frosch','wasser','Der Frosch lebt am Teich. Er quakt und hüpft ins Wasser.'),
    SI('🐬','Delfin','wasser','Der Delfin lebt im Meer. Er kann schnell schwimmen und hoch springen.'),
    SI('🐄','Kuh','hof','Die Kuh wohnt auf dem Bauernhof. Sie gibt uns Milch.'),
    SI('🐖','Schwein','hof','Das Schwein wohnt auf dem Bauernhof und grunzt: oink.'),
    SI('🐔','Huhn','hof','Das Huhn wohnt auf dem Bauernhof und legt Eier.'),
    SI('🐑','Schaf','hof','Das Schaf wohnt auf dem Bauernhof. Sein Fell heißt Wolle.'),
    SI('🐴','Pferd','hof','Das Pferd wohnt im Stall auf dem Bauernhof. Man kann auf ihm reiten.')
  ]},
  {label: 'Was frisst das Tier?', choices: [], prompt: function(it){ return 'Was frisst ' + it.n + '?'; }, items: [
    FI('🐄','Kuh','gras',['fisch','banane'],'Die Kuh frisst Gras und Heu. Daraus macht sie Milch.'),
    FI('🐿️','Eichhörnchen','nuss',['fisch','kaese'],'Das Eichhörnchen frisst Nüsse und versteckt sie im Herbst für den Winter.'),
    FI('🐇','Hase','moehre',['fisch','maus'],'Der Hase mag Möhren, Kräuter und Gras.'),
    FI('🦊','Fuchs','maus',['banane','gras'],'Der Fuchs jagt Mäuse. Er schleicht sich leise an.'),
    FI('🐝','Biene','bluete',['fisch','maus'],'Die Biene trinkt Nektar aus den Blüten. Dabei sammelt sie auch Blütenstaub.'),
    FI('🐦','Vogel','koerner',['fisch','kaese'],'Kleine Vögel picken Körner und Samen. Im Winter füttern wir sie.'),
    FI('🐒','Affe','banane',['fisch','maus'],'Der Affe isst gern Früchte, zum Beispiel Bananen.'),
    FI('🦔','Igel','wurm',['banane','moehre'],'Der Igel frisst Käfer, Schnecken und Würmer.'),
    FI('🐼','Panda','bambus',['fisch','maus'],'Der Panda frisst fast den ganzen Tag Bambus.'),
    FI('🐴','Pferd','gras',['fisch','maus'],'Das Pferd frisst Gras und Heu. Äpfel mag es als Leckerli.'),
    FI('🐭','Maus','kaese',['fisch','banane'],'Mäuse knabbern gern Körner und auch mal ein Stückchen Käse.')
  ]}
]);

window.ALMA_QUIZ = {seasons: quizSeasons, food: quizFood, animals: quizAnimals};
window.__A = {$: $, el: el, rnd: rnd, shuf: shuf, addView: addView, store: store, centerOf: centerOf, bubbles: bubbles, applyEnv: applyEnv, SEASONS: SEASONS,
  getSeason: function(){ return season; }, setSeason: function(s){ season = s; store('alma-season', s); applyEnv(); },
  getNight: function(){ return night; }, setNight: function(n){ night = n; store('alma-night', n ? '1' : '0'); applyEnv(); }};
})();
