'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function NavProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  function start() {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    setVisible(true);
    setWidth(15);

    let current = 15;
    intervalRef.current = setInterval(() => {
      // Trickle: slows down as it approaches 90%
      const increment = (90 - current) * 0.08;
      current = Math.min(current + increment, 90);
      setWidth(current);
    }, 200);
  }

  function finish() {
    clearInterval(intervalRef.current);
    setWidth(100);
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 300);
  }

  // Complete bar when pathname changes (navigation finished)
  useEffect(() => {
    finish();
  }, [pathname]);

  // Intercept history.pushState / replaceState to detect navigation start
  useEffect(() => {
    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);

    history.pushState = (...args) => {
      start();
      return origPush(...args);
    };
    history.replaceState = (...args) => {
      return origReplace(...args);
    };

    return () => {
      history.pushState = origPush;
      history.replaceState = origReplace;
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  if (!visible && width === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px]"
      style={{
        width: `${width}%`,
        background: 'linear-gradient(90deg, #818cf8, #22d3ee)',
        opacity: visible ? 1 : 0,
        transition:
          width === 100 ? 'width 200ms ease-out, opacity 300ms ease 200ms' : 'width 200ms ease-out',
        boxShadow: '0 0 8px rgba(129,140,248,0.6)',
      }}
    />
  );
}
