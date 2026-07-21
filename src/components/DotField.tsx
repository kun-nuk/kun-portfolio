import { memo, useEffect, useRef } from 'react';
import type { HTMLAttributes } from 'react';

import './DotField.css';

const TWO_PI = Math.PI * 2;

type Dot = {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type DotFieldProps = HTMLAttributes<HTMLDivElement> & {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
};

type DotFieldRuntimeProps = Required<
  Pick<
    DotFieldProps,
    | 'dotRadius'
    | 'dotSpacing'
    | 'cursorRadius'
    | 'cursorForce'
    | 'bulgeOnly'
    | 'bulgeStrength'
    | 'sparkle'
    | 'waveAmplitude'
    | 'gradientFrom'
    | 'gradientTo'
  >
>;

const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  ...rest
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    speed: 0,
  });
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const rebuildRef = useRef<null | (() => void)>(null);
  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);
  const propsRef = useRef<DotFieldRuntimeProps>({
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  });

  propsRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;

    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d', { alpha: true });

    if (!ctx) {
      return undefined;
    }

    const context = ctx;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
    let resizeTimer = 0;
    let isRunning = false;

    function scheduleTick() {
      if (!isRunning) {
        isRunning = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array<Dot>(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
          idx += 1;
        }
      }

      dotsRef.current = dots;
    }

    function doResize() {
      const parent = canvas?.parentElement;

      if (!parent) {
        return;
      }

      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      buildDots(w, h);
      scheduleTick();
    }

    function resize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(doResize, 100);
    }

    function onMouseMove(event: MouseEvent) {
      const s = sizeRef.current;
      const m = mouseRef.current;
      const nextX = event.pageX - s.offsetX;
      const nextY = event.pageY - s.offsetY;
      const hasPointer = m.x > -9000 && m.y > -9000;
      const dx = nextX - m.x;
      const dy = nextY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += ((hasPointer ? dist : 0) - m.speed) * 0.55;
      m.x = nextX;
      m.y = nextY;
      scheduleTick();
    }

    let frameCount = 0;

    function tick() {
      frameCount += 1;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;
      const t = frameCount * 0.02;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;

      if (engagement.current < 0.001) {
        engagement.current = 0;
      }

      const eng = engagement.current;
      glowOpacity.current += (eng - glowOpacity.current) * 0.08;

      if (glowEl) {
        glowEl.setAttribute('cx', String(m.x));
        glowEl.setAttribute('cy', String(m.y));
        glowEl.style.opacity = String(glowOpacity.current);
      }

      context.clearRect(0, 0, w, h);

      const grad = context.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      context.fillStyle = grad;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      const isBulge = p.bulgeOnly;
      let hasDotMotion = false;

      context.beginPath();

      for (let i = 0; i < len; i += 1) {
        const d = dots[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);

          if (isBulge) {
            const localT = 1 - dist / cr;
            const push = localT * localT * p.bulgeStrength * eng;
            const angle = Math.atan2(dy, dx);
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / Math.max(dist, 1)) * (m.speed * p.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;

        if (p.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }

        if (
          Math.abs(d.sx - d.ax) > 0.03 ||
          Math.abs(d.sy - d.ay) > 0.03 ||
          Math.abs(d.vx) > 0.03 ||
          Math.abs(d.vy) > 0.03
        ) {
          hasDotMotion = true;
        }

        if (p.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;

          if (hash % 100 < 3) {
            context.moveTo(drawX + rad * 1.8, drawY);
            context.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            context.moveTo(drawX + rad, drawY);
            context.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          context.moveTo(drawX + rad, drawY);
          context.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      context.fill();
      m.speed *= 0.84;

      if (m.speed < 0.001) {
        m.speed = 0;
      }

      const shouldContinue =
        p.waveAmplitude > 0 ||
        eng > 0.002 ||
        glowOpacity.current > 0.002 ||
        m.speed > 0.002 ||
        hasDotMotion;

      if (!shouldContinue) {
        isRunning = false;
        rafRef.current = 0;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;

      if (w > 0 && h > 0) {
        buildDots(w, h);
        scheduleTick();
      }
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className="dot-field-container" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

export default DotField;
