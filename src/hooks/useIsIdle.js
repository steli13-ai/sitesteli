import { useEffect, useState } from 'react';

export function useIsIdle(timeout = 800) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const cb = () => setIdle(true);
    const h = 'requestIdleCallback' in window
      ? window.requestIdleCallback(cb, { timeout })
      : setTimeout(cb, timeout);
    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(h);
      else clearTimeout(h);
    };
  }, [timeout]);
  return idle;
}
