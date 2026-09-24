(() => {
  const layer = document.getElementById('rain-layer');
  if (!layer) return;  

 
  const INTERVAL   = 90; 
  const ACTIVE_MS  = 250;     
  const RADIUS     = 70;      
  const MAX_DROPS    = 48;    
  const DURATION     = [1.3, 1.8];   
  const AMBIENT_MIN  = 250; 
  const AMBIENT_MAX  = 700;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const HTML = `<div class="drop"></div>
    <div class="waves"><div></div><div></div></div>
    <div class="splash"></div>
    <div class="particles"><div></div><div></div><div></div><div></div></div>`;

  function spawn(x, y, big, spread = 0) {
    const dur = DURATION[0] + Math.random() * (DURATION[1] - DURATION[0]);
    const scale = (big ? 1.4 : 0.7) + Math.random() * 0.5;
    const el = document.createElement('div');
    el.className = 'rain';
    el.style.setProperty('--duration', dur + 's');
    el.style.setProperty('--s', scale);
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * spread;
    el.style.left = (x + Math.cos(a) * r - 100) + 'px';
    el.style.top  = (y + Math.sin(a) * r * 0.6 - 60) + 'px';
    el.innerHTML = HTML;
    layer.appendChild(el);
    while (layer.children.length > MAX_DROPS) layer.firstChild.remove();
    setTimeout(() => el.remove(), dur * 1000 + 500);
  }


  let px = -9999, py = -9999, lastMove = -Infinity;
  addEventListener('pointermove', e => {
    px = e.clientX; py = e.clientY; lastMove = performance.now();
  }, { passive: true });

  
  setInterval(() => {
    if (!document.hidden && performance.now() - lastMove < ACTIVE_MS) spawn(px, py, false, RADIUS);
  }, reduce ? INTERVAL * 3 : INTERVAL);

  function ambient() {
    if (!document.hidden) {
      spawn(Math.random() * innerWidth, innerHeight * (0.1 + Math.random() * 0.85), false, 0);
    }
    const gap = AMBIENT_MIN + Math.random() * (AMBIENT_MAX - AMBIENT_MIN);
    setTimeout(ambient, reduce ? gap * 3 : gap);
  }
  if (AMBIENT_MAX > 0) ambient();
  
  addEventListener('pointerdown', e => spawn(e.clientX, e.clientY, true, 10), { passive: true });
})();
