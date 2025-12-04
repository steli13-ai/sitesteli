import React, { useEffect, useState } from 'react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleOnline = () => { setIsOnline(true); setShow(false); };
    const handleOffline = () => { setIsOnline(false); setShow(true); };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    // initial state
    if (!navigator.onLine) { setShow(true); }
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]">
      <div className="flex items-center gap-3 bg-warning text-warning-foreground px-4 py-3 rounded-xl shadow-lg">
        <span className="inline-flex h-2 w-2 rounded-full bg-warning-foreground animate-pulse" />
        <p className="text-sm font-medium">Esti offline. Continuă în modul offline — datele se vor sincroniza când revii online.</p>
        <button
          type="button"
          onClick={() => setShow(false)}
          className="ml-2 text-warning-foreground/90 hover:text-warning-foreground underline text-sm"
          aria-label="Ascunde bannerul offline"
        >Închide</button>
      </div>
    </div>
  );
}
