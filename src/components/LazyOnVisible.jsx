import React, { useEffect, useRef, useState } from 'react';

// Mount children only when the wrapper becomes visible
export default function LazyOnVisible({ rootMargin = '200px', children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return; // already mounted
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
          break;
        }
      }
    }, { root: null, rootMargin, threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
}
