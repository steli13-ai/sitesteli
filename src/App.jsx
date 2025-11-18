import React, { Suspense } from "react";
const LazyAppRoutes = React.lazy(() => import('./AppRoutes'));

// A lightweight, contentful shell so Lighthouse records FCP even if chunks load slowly.
function InitialShell() {
  return (
    <div id="app-shell" className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-primary" role="status">Se încarcă Mate cu Succes…</h1>
      <p className="mt-2 text-text-secondary max-w-md text-center">
        Încărcăm interfața și resursele principale. Dacă această pagină rămâne prea mult timp, reîncarcă.
      </p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<InitialShell />}> 
      <LazyAppRoutes />
    </Suspense>
  );
}

export default App;
