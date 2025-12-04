import React, { Suspense } from "react";
import OfflineBanner from '@/components/ui/OfflineBanner';
const LazyAppRoutes = React.lazy(() => import('./AppRoutes'));

// A lightweight, contentful shell so Lighthouse records FCP even if chunks load slowly.
// Uses inline styles to avoid dependency on CSS bundle loading.
function InitialShell() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f0fdf4'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1CA37B',
        marginBottom: '8px'
      }} role="status">
        Se încarcă Mate cu Succes…
      </h1>
      <p style={{
        marginTop: '8px',
        color: '#6b7280',
        maxWidth: '500px',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        Încărcăm interfața și resursele principale. Dacă această pagină rămâne prea mult timp, reîncarcă.
      </p>
    </div>
  );
}

function App() {
  return (
    <>
      <OfflineBanner />
      <Suspense fallback={<InitialShell />}> 
        <LazyAppRoutes />
      </Suspense>
    </>
  );
}

export default App;
