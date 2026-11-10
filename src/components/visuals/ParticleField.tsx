import { useEffect, useRef } from 'react';

/**
 * Fondo interactivo: red de partículas que se conectan entre sí y reaccionan al puntero.
 * Toma los colores del tema activo (--app-primary / --app-secondary) y se actualiza al cambiar de tema.
 */

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

function readColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function hexToRgb(color: string) {
  const hex = color.replace('#', '');
  if (!/^[0-9a-f]{3,8}$/i.test(hex)) return [37, 99, 235];
  const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex.slice(0, 6);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

export function ParticleField({ density = 1, className = '' }: { density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let primary = hexToRgb(readColor('--app-primary', '#2563EB'));
    let secondary = hexToRgb(readColor('--app-secondary', '#3B82F6'));
    const pointer = { x: -9999, y: -9999, active: false };
    const ripples: Array<{ x: number; y: number; r: number; a: number }> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(28, (width * height) / 16000)) * density);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 1.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(150, Math.max(90, width / 11));
      const [pr, pg, pb] = primary;
      const [sr, sg, sb] = secondary;

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < 180 && d > 0.1) {
              // atracción suave hacia el puntero
              p.x += (dx / d) * 0.6;
              p.y += (dy / d) * 0.6;
            }
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(${pr},${pg},${pb},${(1 - d / linkDist) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (pointer.active) {
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (d < 200) {
            ctx.strokeStyle = `rgba(${sr},${sg},${sb},${(1 - d / 200) * 0.6})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${sr},${sg},${sb},0.85)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 4;
        rp.a -= 0.018;
        if (rp.a <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${pr},${pg},${pb},${rp.a})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (!reduceMotion && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ripples.push({ x, y, r: 4, a: 0.5 });
      // empuja las partículas cercanas (onda expansiva)
      for (const p of particles) {
        const dx = p.x - x;
        const dy = p.y - y;
        const d = Math.hypot(dx, dy);
        if (d < 160 && d > 0.1) {
          p.vx += (dx / d) * 1.2;
          p.vy += (dy / d) * 1.2;
        }
      }
      window.setTimeout(() => {
        for (const p of particles) {
          p.vx = Math.max(-0.5, Math.min(0.5, p.vx * 0.4));
          p.vy = Math.max(-0.5, Math.min(0.5, p.vy * 0.4));
        }
      }, 900);
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };

    const themeObserver = new MutationObserver(() => {
      primary = hexToRgb(readColor('--app-primary', '#2563EB'));
      secondary = hexToRgb(readColor('--app-secondary', '#3B82F6'));
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    resizeObserver.observe(canvas);

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
