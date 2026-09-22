import { useEffect, useRef } from 'react';

const CORES = ['#ffd83d', '#1f7fd6', '#2fb35a', '#f28aa0', '#a58be0', '#5fb8f0'];

export function Confete({ duracaoMs }: { duracaoMs: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;

    cv.width = innerWidth;
    cv.height = innerHeight;
    const pecas = Array.from({ length: 160 }, () => ({
      x: Math.random() * cv.width,
      y: -20 - Math.random() * cv.height * 0.5,
      vx: (Math.random() - 0.5) * 4,
      vy: 3 + Math.random() * 4,
      r: 6 + Math.random() * 8,
      a: Math.random() * 6,
      va: (Math.random() - 0.5) * 0.3,
      c: CORES[(Math.random() * CORES.length) | 0],
    }));

    const fim = performance.now() + duracaoMs;
    let quadro = 0;
    const passo = (t: number) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of pecas) {
        p.x += p.vx; p.y += p.vy; p.a += p.va;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        ctx.restore();
      }
      if (t < fim) quadro = requestAnimationFrame(passo);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [duracaoMs]);

  return <canvas ref={ref} className="confete" aria-hidden />;
}
