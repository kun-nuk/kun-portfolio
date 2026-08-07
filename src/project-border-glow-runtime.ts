const PROJECT_CARD_SELECTOR = '#projects .project-card.project-link-card';

const getCenterOfElement = (element: HTMLElement) => {
  const { width, height } = element.getBoundingClientRect();
  return [width / 2, height / 2] as const;
};

const getEdgeProximity = (element: HTMLElement, x: number, y: number) => {
  const [centerX, centerY] = getCenterOfElement(element);
  const dx = x - centerX;
  const dy = y - centerY;
  const kx = dx === 0 ? Number.POSITIVE_INFINITY : centerX / Math.abs(dx);
  const ky = dy === 0 ? Number.POSITIVE_INFINITY : centerY / Math.abs(dy);

  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
};

const getCursorAngle = (element: HTMLElement, x: number, y: number) => {
  const [centerX, centerY] = getCenterOfElement(element);
  const dx = x - centerX;
  const dy = y - centerY;

  if (dx === 0 && dy === 0) {
    return 0;
  }

  let degrees = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  if (degrees < 0) {
    degrees += 360;
  }

  return degrees;
};

const bindProjectBorderGlow = () => {
  if (window.__kunProjectBorderGlowBound) {
    return;
  }

  window.__kunProjectBorderGlowBound = true;

  window.addEventListener(
    'pointermove',
    (event) => {
      const target = event.target as Element | null;
      const card = target?.closest?.(PROJECT_CARD_SELECTOR) as HTMLElement | null;

      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
    },
    { passive: true },
  );
};

declare global {
  interface Window {
    __kunProjectBorderGlowBound?: boolean;
  }
}

if (typeof window !== 'undefined') {
  bindProjectBorderGlow();
}

export {};
