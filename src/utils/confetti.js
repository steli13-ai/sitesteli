// Lightweight confetti utility using canvas for celebratory micro-interactions
// Usage: import { triggerConfetti } from '@/utils/confetti'; triggerConfetti({ particles: 40 });

export function triggerConfetti({
  particles = 50,
  spread = 60,
  startVelocity = 35,
  decay = 0.9,
  gravity = 0.5,
  colors = ['#1CA37B', '#F59E0B', '#6366F1', '#10B981', '#EC4899'],
  scalar = 1.1,
  ticks = 200
} = {}) {
  const root = document.body;
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  root.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const cw = canvas.width = window.innerWidth;
  const ch = canvas.height = window.innerHeight;

  const randomRange = (min, max) => Math.random() * (max - min) + min;

  const particlesArr = [];
  for (let i = 0; i < particles; i++) {
    particlesArr.push({
      x: cw / 2,
      y: ch / 2,
      angle: randomRange(-spread, spread) * (Math.PI / 180),
      velocity: randomRange(startVelocity * 0.5, startVelocity),
      tiltAngle: randomRange(0, Math.PI),
      color: colors[Math.floor(Math.random() * colors.length)],
      tick: 0,
      totalTicks: ticks,
      decay,
      gravity,
      scalar: randomRange(0.8, scalar),
      size: randomRange(6, 10)
    });
  }

  function update() {
    ctx.clearRect(0, 0, cw, ch);
    particlesArr.forEach(p => {
      p.x += Math.cos(p.angle) * p.velocity;
      p.y += Math.sin(p.angle) * p.velocity + p.gravity;
      p.velocity *= p.decay;
      p.tiltAngle += 0.05;
      p.tick++;
      const lifeRatio = 1 - p.tick / p.totalTicks;

      ctx.save();
      ctx.globalAlpha = Math.max(lifeRatio, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tiltAngle);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.rect(-p.size / 2, -p.size / 2, p.size * p.scalar, p.size);
      ctx.fill();
      ctx.restore();
    });

    const alive = particlesArr.some(p => p.tick < p.totalTicks && p.y < ch + 40);
    if (alive) {
      requestAnimationFrame(update);
    } else {
      canvas.remove();
    }
  }

  update();
}
