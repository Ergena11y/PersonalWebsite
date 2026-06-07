'use strict'

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3,
      baseO: Math.random() * 0.4 + 0.05,
      o: 0,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.1
    });
  }
  stars.forEach(s => s.o = s.baseO);
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  const t = Date.now() * 0.001;
  stars.forEach(s => {
    s.o = s.baseO + Math.sin(t * s.speed + s.phase) * 0.15;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(126, 184, 247, ${Math.max(0, Math.min(1, s.o))})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
}

resize();
initStars();
draw();
window.addEventListener('resize', () => { resize(); initStars(); });
