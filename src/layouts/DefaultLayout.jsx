import React, { memo, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/ui/Header';
import SubscribePopup from '@/components/ui/SubscribePopup';
import { Helmet } from 'react-helmet';
import RoutePrefetcher from '@/components/RoutePrefetcher';

const DefaultLayout = memo(function DefaultLayout({ children }) {
  const supabaseOrigin = useMemo(() => {
    try {
      const url = import.meta.env?.VITE_SUPABASE_URL;
      return url ? new URL(url).origin : null;
    } catch {
      return null;
    }
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mate cu Succes</title>
        <meta name="description" content="Platformă educațională modernă pentru matematică: lecții, fișe și pregătire pentru examene." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mate cu Succes" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Temporarily simplified Helmet to avoid Symbol-to-string error; we'll restore after root cause is clear. */}
      </Helmet>
  <Header role="banner" />
  <SubscribePopup />
  <RoutePrefetcher />
      <main className="pt-16" role="main" id="main-content" tabIndex={-1}>{children}</main>
      <footer role="contentinfo" className="mt-12" aria-label="Informații site">
        {/* Footer is provided by Header component or elsewhere; this acts as a landmark placeholder. */}
      </footer>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </div>
  );
});

export default DefaultLayout;
