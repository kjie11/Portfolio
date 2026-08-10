import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const outputDir = resolve('output/flowcharts/ai-usage-reminders')

const accent = {
  purple: 'var(--purple)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  amber: 'var(--amber)',
  orange: 'var(--orange)',
  teal: 'var(--teal)',
  red: 'var(--red)',
}

const charts = [
  {
    slug: 'general-ai-usage',
    positions: {
      a: [190, 250, 240], b: [500, 250, 260], c: [830, 250, 240], d: [1140, 250, 270],
      e: [1140, 620, 270], f: [850, 610, 164], g: [500, 630, 270],
    },
    edges: [
      ['a', 'b', 'normal'], ['b', 'c', 'normal'], ['c', 'd', 'normal'],
      ['d', 'e', 'normal'], ['e', 'f', 'normal'], ['f', 'g', 'normal'],
      ['f', 'b', 'feedback'],
    ],
    labels: [
      ['符合', 720, 690, 'green'], ['不符合', 685, 500, 'red'],
    ],
    nodes: {
      a: ['体验目标与约束', ['我定义'], 'purple', '◎'],
      b: ['检索与拆解', ['AI 提出可执行方案'], 'blue', '⌕'],
      c: ['范围与取舍', ['我确认'], 'amber', '✎'],
      d: ['代码、工具、文档', ['AI 辅助实现'], 'purple', '⚙'],
      e: ['编译与自动测试', ['运行画面验证'], 'teal', '✓'],
      f: ['试玩与风险判断', ['我验收'], 'orange', '', 'decision'],
      g: ['形成可复用模块', ['记录证据边界'], 'green', '✓'],
    },
  },
  {
    slug: 'claw-machine-ai-usage',
    positions: {
      a: [330, 250, 260], b: [700, 250, 270], c: [1070, 250, 270],
      d: [1070, 620, 270], e: [700, 620, 270], f: [330, 620, 270],
    },
    edges: [
      ['a', 'b', 'normal'], ['b', 'c', 'normal'], ['c', 'd', 'normal'],
      ['d', 'e', 'normal'], ['e', 'f', 'normal'],
    ],
    labels: [],
    nodes: {
      a: ['检查现有实现', ['Mesh 与 Shader'], 'purple', '◎'],
      b: ['逐个验证假设', ['常量、坐标与距离'], 'blue', '⌕'],
      c: ['修正 CPU 诊断', ['排除失真变量'], 'amber', '✎'],
      d: ['尝试权重表达', ['一次只改一个变量'], 'purple', '⚙'],
      e: ['选择稳定方案', ['三轴平滑权重'], 'teal', '✓'],
      f: ['建立验收门槛', ['独立场景、测试与像素差'], 'green', '✓'],
    },
  },
  {
    slug: 'four-way-kitchen-ai-usage',
    positions: {
      a: [330, 250, 270], b: [700, 250, 270], c: [1070, 250, 280],
      d: [1070, 620, 280], e: [700, 620, 280], f: [330, 620, 280],
    },
    edges: [
      ['a', 'b', 'normal'], ['b', 'c', 'normal'], ['c', 'd', 'normal'],
      ['d', 'e', 'normal'], ['e', 'f', 'normal'],
    ],
    labels: [],
    nodes: {
      a: ['检查多个代码库', ['Bridge、Hub 与 Unity'], 'purple', '◎'],
      b: ['对齐输入协议', ['手别、端口与 event ID'], 'blue', '⌕'],
      c: ['建立模拟链路', ['Pointer 区域与 FIFO'], 'amber', '✎'],
      d: ['增加运行诊断', ['失效与断线释放'], 'purple', '⚙'],
      e: ['分析斜拖问题', ['坐标比例与切格阈值'], 'teal', '✓'],
      f: ['限定修正范围', ['仅手套加入对角意图辅助'], 'green', '✓'],
    },
  },
  {
    slug: 'cat-teaser-ai-usage',
    positions: {
      a: [260, 250, 280], b: [620, 250, 280], c: [980, 250, 280],
      d: [980, 620, 280], e: [620, 620, 290],
    },
    edges: [
      ['a', 'b', 'normal'], ['b', 'c', 'normal'], ['c', 'd', 'normal'], ['d', 'e', 'normal'],
    ],
    labels: [],
    nodes: {
      a: ['拆解体验要求', ['绳索、甩动与猫行为状态'], 'purple', '◎'],
      b: ['逐步扩展状态机', ['鱼、第二只猫和鸟'], 'blue', '⌕'],
      c: ['分析几何问题', ['IMU 射线与虚拟平面'], 'amber', '✎'],
      d: ['收缩输入链路', ['改为 WebSocket pointer'], 'purple', '⚙'],
      e: ['补齐可靠性', ['线程安全、超时释放与测试'], 'green', '✓'],
    },
  },
]

function nodeMarkup(id, [title, lines, color, icon, type], positions) {
  const [left, top, width] = positions[id]
  if (type === 'decision') {
    return `<article class="node diamond" id="${id}" style="--accent:${accent[color]}; left:${left}px; top:${top}px; width:${width}px;">
      <div class="diamond-shape" aria-hidden="true"></div>
      <h2 contenteditable="true">${title}</h2>
    </article>`
  }
  const className = id === 'note' ? 'node note' : 'node'
  const content = lines.length === 1
    ? `<p contenteditable="true">${lines[0]}</p>`
    : `<ul>${lines.map(line => `<li contenteditable="true">${line}</li>`).join('')}</ul>`
  return `<article class="${className}" id="${id}" style="left:${left}px; top:${top}px; width:${width}px;">
    <h2 contenteditable="true">${title}</h2>${content}
  </article>`
}

function htmlFor(chart) {
  const nodes = Object.entries(chart.nodes).map(([id, node]) => nodeMarkup(id, node, chart.positions)).join('\n')
  const labels = chart.labels.map(([text, left, top, color], index) => `<div class="edge-label" id="label-${index}" contenteditable="true" style="--label:${accent[color]}; left:${left}px; top:${top}px;">${text}</div>`).join('\n')
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${chart.nodes.a[0]} - AI 使用流程</title>
  <style>
    :root { --paper:#fafafa; --ink:#151515; --muted:#4e4e4e; }
    * { box-sizing:border-box; }
    html,body { width:100%; height:100%; margin:0; overflow:hidden; background:var(--paper); color:var(--ink); font-family:"Avenir Next","Helvetica Neue","PingFang SC","Microsoft YaHei",sans-serif; word-break:keep-all; user-select:none; }
    body { display:grid; place-items:center; }
    .canvas { position:relative; width:1920px; height:1056px; transform-origin:center; background:var(--paper); }
    #edges { position:absolute; inset:0; width:100%; height:100%; overflow:visible; pointer-events:none; z-index:1; }
    .node { position:absolute; min-height:78px; padding:16px 18px; color:var(--ink); background:#fff; border:2px solid var(--ink); border-radius:2px; box-shadow:none; cursor:grab; z-index:2; }
    .node.dragging { cursor:grabbing; opacity:.92; z-index:4; }
    .node h2 { margin:0 0 8px; color:var(--ink); font-size:24px; line-height:1.08; font-weight:800; letter-spacing:0; white-space:nowrap; text-decoration:none; }
    .node p,.node li { margin:0; color:var(--muted); font-size:16px; line-height:1.52; white-space:nowrap; }
    .node ul { margin:0; padding-left:19px; }
    .node [contenteditable="true"] { user-select:text; cursor:text; outline:none; border-radius:4px; }
    .node [contenteditable="true"]:focus { background:#fff9c9; box-shadow:0 0 0 3px rgba(0,0,0,.08); }
    .diamond { width:146px !important; height:146px; min-height:146px; padding:0; border:0; background:transparent; display:grid; place-items:center; box-shadow:none; }
    .diamond h2 { position:relative; margin:0; width:124px; text-align:center; white-space:normal; line-height:1.15; font-size:22px; z-index:2; }
    .diamond-shape { position:absolute; left:21px; top:21px; width:104px; height:104px; transform:rotate(45deg); border:2px solid var(--ink); background:#fff; pointer-events:none; z-index:1; }
    .note { min-height:0; border-style:dashed; box-shadow:none; background:#fff; }
    .note h2 { margin-bottom:8px; font-size:20px; text-decoration:none; white-space:normal; }
    .note p { color:var(--muted); white-space:normal; }
    .edge { fill:none; stroke:var(--ink); stroke-width:2.5; stroke-linecap:round; stroke-linejoin:round; }
    .edge.feedback { stroke:var(--muted); stroke-dasharray:7 8; stroke-width:2.2; }
    .edge-label { position:absolute; z-index:3; min-width:24px; padding:2px 6px; color:var(--ink); background:var(--paper); font-size:17px; font-weight:800; line-height:1; text-align:center; cursor:text; user-select:text; }
    .edge-label:focus { outline:none; background:#fff9c9; box-shadow:0 0 0 3px rgba(0,0,0,.08); }
    .toolbar { position:fixed; right:14px; bottom:14px; z-index:20; display:flex; gap:8px; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
    .toolbar button { border:1px solid rgba(0,0,0,.22); border-radius:6px; background:rgba(255,255,255,.92); color:var(--ink); padding:7px 10px; font-size:13px; cursor:pointer; box-shadow:0 6px 18px rgba(0,0,0,.08); }
  </style>
</head>
<body>
  <div class="canvas" id="canvas">
    <svg id="edges" viewBox="0 0 1920 1056" aria-hidden="true"><defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="7.2" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M1,1 L7.2,4 L1,7 Z" fill="#151515" /></marker>
      <marker id="arrowFeedback" markerWidth="8" markerHeight="8" refX="7.2" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M1,1 L7.2,4 L1,7 Z" fill="#4e4e4e" /></marker>
    </defs></svg>
    ${nodes}
    ${labels}
  </div>
  <div class="toolbar"><button id="saveBtn">保存</button><button id="resetBtn">重置</button><button id="exportBtn">导出 JSON</button><button id="exportPngBtn">导出 PNG</button></div>
  <script>
    const canvas=document.getElementById('canvas'); const svg=document.getElementById('edges'); const STORAGE_KEY='${chart.slug}-mono-editable-v1'; const exportName='${chart.slug}.png';
    const edges=${JSON.stringify(chart.edges)};
    function scaleCanvas(){const scale=Math.min(window.innerWidth/1920,window.innerHeight/1056);canvas.style.transform='scale('+scale+')'}
    function rect(id){const el=document.getElementById(id);return{el,x:parseFloat(el.style.left),y:parseFloat(el.style.top),w:el.offsetWidth,h:el.offsetHeight}}
    function port(r,side){if(r.el.classList.contains('diamond')){if(side==='left')return[r.x,r.y+r.h/2];if(side==='right')return[r.x+r.w,r.y+r.h/2];if(side==='top')return[r.x+r.w/2,r.y];return[r.x+r.w/2,r.y+r.h]}if(side==='left')return[r.x,r.y+r.h/2];if(side==='right')return[r.x+r.w,r.y+r.h/2];if(side==='top')return[r.x+r.w/2,r.y];return[r.x+r.w/2,r.y+r.h]}
    function outsidePort(r,side,gap=3){const [x,y]=port(r,side);if(side==='left')return[x-gap,y];if(side==='right')return[x+gap,y];if(side==='top')return[x,y-gap];return[x,y+gap]}
    function sides(a,b){const dx=b.x+b.w/2-(a.x+a.w/2),dy=b.y+b.h/2-(a.y+a.h/2);if(Math.abs(dx)>=Math.abs(dy))return dx>0?['right','left']:['left','right'];return dy>0?['bottom','top']:['top','bottom']}
    function pathBetween(a,b,kind){const [from,to]=sides(a,b),s=outsidePort(a,from),t=outsidePort(b,to);if(from==='right'||from==='left'){const mx=(s[0]+t[0])/2;return 'M'+s[0]+','+s[1]+' C'+mx+','+s[1]+' '+mx+','+t[1]+' '+t[0]+','+t[1]}const my=(s[1]+t[1])/2;return 'M'+s[0]+','+s[1]+' C'+s[0]+','+my+' '+t[0]+','+my+' '+t[0]+','+t[1]}
    function renderEdges(){svg.querySelectorAll('path.edge').forEach(p=>p.remove());for(const[from,to,kind]of edges){const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('class','edge '+kind);p.setAttribute('d',pathBetween(rect(from),rect(to),kind));p.setAttribute('marker-end',kind==='feedback'?'url(#arrowFeedback)':'url(#arrow)');svg.appendChild(p)}}
    function makeDraggable(node){let start=null;node.addEventListener('pointerdown',event=>{if(event.target.closest('[contenteditable="true"]'))return;const scale=canvas.getBoundingClientRect().width/1920;start={x:event.clientX,y:event.clientY,left:parseFloat(node.style.left),top:parseFloat(node.style.top),scale};node.classList.add('dragging');node.setPointerCapture(event.pointerId)});node.addEventListener('pointermove',event=>{if(!start)return;const left=start.left+(event.clientX-start.x)/start.scale,top=start.top+(event.clientY-start.y)/start.scale;node.style.left=Math.max(0,Math.min(1900-node.offsetWidth,left))+'px';node.style.top=Math.max(0,Math.min(1040-node.offsetHeight,top))+'px';renderEdges()});node.addEventListener('pointerup',()=>{start=null;node.classList.remove('dragging')})}
    function collectState(){return{nodes:[...document.querySelectorAll('.node')].map(node=>({id:node.id,left:node.style.left,top:node.style.top,html:node.innerHTML})),labels:[...document.querySelectorAll('.edge-label')].map(label=>({id:label.id,left:label.style.left,top:label.style.top,text:label.textContent}))}}
    function applyState(state){if(!state)return;for(const item of state.nodes||[]){const node=document.getElementById(item.id);if(!node)continue;node.style.left=item.left;node.style.top=item.top;if(!node.classList.contains('diamond'))node.innerHTML=item.html}for(const item of state.labels||[]){const label=document.getElementById(item.id);if(!label)continue;label.style.left=item.left;label.style.top=item.top;label.textContent=item.text}}
    function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(collectState()))}
    function inlineStyles(source,clone){const sourceEls=[source,...source.querySelectorAll('*')],cloneEls=[clone,...clone.querySelectorAll('*')];sourceEls.forEach((sourceEl,index)=>{const cloneEl=cloneEls[index];if(!cloneEl||!(sourceEl instanceof Element))return;const computed=getComputedStyle(sourceEl);cloneEl.setAttribute('style',Array.from(computed).map(name=>name+':'+computed.getPropertyValue(name)).join(';'))})}
    async function exportPng(){save();renderEdges();const clone=canvas.cloneNode(true);clone.style.transform='none';clone.style.position='relative';clone.style.left='0';clone.style.top='0';inlineStyles(canvas,clone);clone.style.background='transparent';clone.querySelector('#edges').style.opacity='0';const foreign='<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1056" viewBox="0 0 1920 1056"><foreignObject width="1920" height="1056"><div xmlns="http://www.w3.org/1999/xhtml">'+clone.outerHTML+'</div></foreignObject></svg>';const url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(foreign),img=new Image();await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=url});const out=document.createElement('canvas');out.width=1920;out.height=1056;const ctx=out.getContext('2d');ctx.fillStyle='#fafafa';ctx.fillRect(0,0,1920,1056);svg.querySelectorAll('path.edge').forEach(path=>{const feedback=path.classList.contains('feedback'),shape=new Path2D(path.getAttribute('d')),length=path.getTotalLength(),end=path.getPointAtLength(length),before=path.getPointAtLength(Math.max(0,length-12)),angle=Math.atan2(end.y-before.y,end.x-before.x);ctx.save();ctx.strokeStyle=feedback?'#4e4e4e':'#151515';ctx.lineWidth=feedback?2.2:2.5;ctx.lineCap='round';ctx.lineJoin='round';ctx.setLineDash(feedback?[7,8]:[]);ctx.stroke(shape);ctx.setLineDash([]);ctx.translate(end.x,end.y);ctx.rotate(angle);ctx.fillStyle=feedback?'#4e4e4e':'#151515';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-13,-6);ctx.lineTo(-13,6);ctx.closePath();ctx.fill();ctx.restore()});ctx.drawImage(img,0,0);const a=document.createElement('a');a.href=out.toDataURL('image/png');a.download=exportName;a.click()}
    document.querySelectorAll('.node').forEach(makeDraggable);document.querySelectorAll('[contenteditable="true"]').forEach(el=>{el.addEventListener('input',renderEdges);el.addEventListener('blur',save)});document.getElementById('saveBtn').addEventListener('click',save);document.getElementById('resetBtn').addEventListener('click',()=>{localStorage.removeItem(STORAGE_KEY);location.reload()});document.getElementById('exportBtn').addEventListener('click',async()=>{await navigator.clipboard.writeText(JSON.stringify(collectState(),null,2));alert('已复制 JSON 到剪贴板')});document.getElementById('exportPngBtn').addEventListener('click',()=>exportPng().catch(error=>{console.error(error);alert('导出 PNG 失败')}));applyState(JSON.parse(localStorage.getItem(STORAGE_KEY)||'null'));window.addEventListener('resize',scaleCanvas);scaleCanvas();renderEdges();
  </script>
</body>
</html>`
}

await mkdir(outputDir, { recursive: true })
for (const chart of charts) {
  await writeFile(resolve(outputDir, `${chart.slug}.html`), htmlFor(chart), 'utf8')
}

console.log(`Generated ${charts.length} editable flowcharts in ${outputDir}`)
