import re
b=open('base.html').read()
css=open('new.css').read()
js=open('new1.js').read()+"\n"+open('new2.js').read()
b=b.replace('</style>',css+'</style>',1)
# Farben
old=b[b.index("var COLORS = ["):b.index("var color = COLORS[7][1];")]
new="""var COLORS = [
  ['Rot','#ff4d4d'], ['Orange','#ff9a3c'], ['Gelb','#ffd23f'], ['Grün','#3ecf6d'], ['Hellgrün','#a6e86a'],
  ['Blau','#3f8cff'], ['Hellblau','#8fd0ff'], ['Türkis','#22c7c1'], ['Lila','#a46bff'], ['Magenta','#e0289c'],
  ['Rosa','#ff8fc7'], ['Braun','#8a5a3c'], ['Beige','#e9cfa8'], ['Grau','#9a9aa8'], ['Schwarz','#2b2b3a'], ['Weiß','#ffffff'],
  ['Glitzer Rosa','url(#glRosa)','repeating-linear-gradient(45deg,#ff8fc7 0 8px,#ffd1e8 8px 12px)'],
  ['Glitzer Blau','url(#glBlau)','repeating-linear-gradient(45deg,#3f8cff 0 8px,#b9dcff 8px 12px)'],
  ['Glitzer Gold','url(#glGold)','repeating-linear-gradient(45deg,#ffc93c 0 8px,#fff2b0 8px 12px)'],
  ['Regenbogen Glitzer','url(#glRegen)','linear-gradient(90deg,#ff4d4d,#ff9a3c,#ffd23f,#3ecf6d,#3f8cff,#a46bff)']
];
"""
b=b.replace(old,new)
b=b.replace("b.style.background = c[1];","b.style.background = c[2] || c[1];")
b=b.replace("var color = COLORS[7][1];","var color = COLORS[10][1];")
def pat(i,base,dots):
    return f'<pattern id="{i}" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="{base}"/>{dots}</pattern>'
star=lambda x,y,c,s=4: f'<polygon points="{x},{y-s*2} {x+s*.6},{y-s*.6} {x+s*2},{y} {x+s*.6},{y+s*.6} {x},{y+s*2} {x-s*.6},{y+s*.6} {x-s*2},{y} {x-s*.6},{y-s*.6}" fill="{c}"/>'
defs='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'
defs+=pat('glRosa','#ff8fc7',star(6,7,'#fff')+star(20,19,'#ffe6f3',3)+'<circle cx="20" cy="5" r="2" fill="#fff"/>')
defs+=pat('glBlau','#3f8cff',star(6,7,'#fff')+star(20,19,'#cfe6ff',3)+'<circle cx="20" cy="5" r="2" fill="#fff"/>')
defs+=pat('glGold','#ffc93c',star(6,7,'#fff')+star(20,19,'#fff6c9',3)+'<circle cx="20" cy="5" r="2" fill="#fff"/>')
defs+='<pattern id="glRegen" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#ff8fc7"/><rect width="26" height="5" fill="#ff4d4d"/><rect y="5" width="26" height="5" fill="#ff9a3c"/><rect y="10" width="26" height="5" fill="#ffd23f"/><rect y="15" width="26" height="5" fill="#3ecf6d"/><rect y="20" width="26" height="6" fill="#3f8cff"/>'+star(6,12,'#fff')+star(20,18,'#fff',3)+'</pattern>'
defs+='</defs></svg>'
b=b.replace('<body>','<body>\n'+defs,1)
b=b.replace('</body>','<script>\n'+js+'\n</script>\n</body>',1)
open('../index.html','w').write(b)
print(len(b))
