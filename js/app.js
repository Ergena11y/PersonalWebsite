'use strict'

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let W, H;


const TAURUS = [
  { x: 0.62, y: 0.38, r: 2.8, name: 'Aldebaran' },
  { x: 0.55, y: 0.28, r: 1.8 },
  { x: 0.48, y: 0.22, r: 1.4 },
  { x: 0.72, y: 0.30, r: 1.6 },
  { x: 0.78, y: 0.25, r: 1.5 },
  { x: 0.68, y: 0.48, r: 1.4 },
  { x: 0.58, y: 0.55, r: 1.3 },
  { x: 0.50, y: 0.60, r: 1.2 },
  { x: 0.42, y: 0.52, r: 1.2 },
  { x: 0.38, y: 0.42, r: 1.3 },
  { x: 0.44, y: 0.35, r: 1.1 },
  { x: 0.82, y: 0.38, r: 1.4 },
  { x: 0.90, y: 0.30, r: 1.6 },
  { x: 0.75, y: 0.55, r: 1.2 },
  { x: 0.83, y: 0.62, r: 1.5 },
];


const LINES = [
  [0, 1], [1, 2], [0, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 1],
  [3, 11], [11, 12],
  [5, 13], [13, 14],
];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 180; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.2,
      baseO: Math.random() * 0.4 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 1.2 + 0.4,
      constellation: false
    });
  }
}

function getConstellationPos(star) {
  const offsetX = W * 0.15;
  const offsetY = H * 0.08;
  const scaleX = W * 0.55;
  const scaleY = H * 0.55;
  return {
    x: offsetX + star.x * scaleX,
    y: offsetY + star.y * scaleY
  };
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  const t = Date.now() * 0.001;


  ctx.save();
  LINES.forEach(([a, b]) => {
    const posA = getConstellationPos(TAURUS[a]);
    const posB = getConstellationPos(TAURUS[b]);
    ctx.beginPath();
    ctx.moveTo(posA.x, posA.y);
    ctx.lineTo(posB.x, posB.y);
    ctx.strokeStyle = 'rgba(126, 184, 247, 0.12)';
    ctx.lineWidth = 0.7;
    ctx.stroke();
  });
  ctx.restore();


  stars.forEach(s => {
    const o = s.baseO + Math.sin(t * s.speed + s.phase) * 0.35;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(126, 184, 247, ${Math.max(0, Math.min(1, o))})`;
    ctx.fill();
  });


  TAURUS.forEach((star, i) => {
    const pos = getConstellationPos(star);
    const o = 0.6 + Math.sin(t * 0.8 + i * 0.7) * 0.35;
    const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, star.r * 4);
    glow.addColorStop(0, `rgba(126, 184, 247, ${o * 0.6})`);
    glow.addColorStop(1, 'rgba(126, 184, 247, 0)');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, star.r * 4, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 220, 255, ${Math.min(1, o)})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

resize();
initStars();
draw();
window.addEventListener('resize', () => { resize(); initStars(); });
