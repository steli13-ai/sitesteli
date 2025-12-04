import React from 'react';

let cachedModule = null;

export async function loadMotion() {
  if (cachedModule) return cachedModule;
  cachedModule = await import('framer-motion');
  return cachedModule;
}

export function useMotion() {
  const [mod, setMod] = React.useState(cachedModule);
  React.useEffect(() => {
    if (!mod) {
      let mounted = true;
      loadMotion().then((m) => { if (mounted) setMod(m); }).catch(() => {});
      return () => { mounted = false; };
    }
  }, [mod]);
  return mod; // { motion, AnimatePresence, ... }
}

export function MotionWrapper({ children, fallback = null }) {
  const mod = useMotion();
  if (!mod) return fallback;
  // Be tolerant to whitespace/newlines that make children an array.
  let renderer = children;
  if (Array.isArray(renderer)) {
    renderer = renderer.find((c) => typeof c === 'function') ?? renderer[0];
  }
  if (typeof renderer === 'function') {
    return renderer(mod);
  }
  // If a function child isn't provided, just render the children as-is.
  return renderer ?? null;
}
