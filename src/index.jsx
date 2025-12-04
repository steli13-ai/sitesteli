import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { I18nProvider } from '@/contexts/I18nContext';
import { prefetchRoutes } from '@/lib/prefetchRoutes';
import { initMonitoring } from './lib/monitoring';
import { initWebVitals } from './lib/webVitals';
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

initMonitoring();
initWebVitals();
root.render(
	<I18nProvider>
		<App />
	</I18nProvider>
);
// Schedule non-critical route prefetching
try { prefetchRoutes(); } catch {}

// Global progressive enhancement: lazy-load non-critical images
try {
	const applyLazy = (img) => {
		if (!img) return;
		if (img.dataset && img.dataset.priority === 'true') return;
		if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
		if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
	};
	const enhanceAll = () => document.querySelectorAll('img').forEach(applyLazy);
	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		enhanceAll();
	} else {
		window.addEventListener('DOMContentLoaded', enhanceAll);
	}
	const mo = new MutationObserver((muts) => {
		muts.forEach((m) => m.addedNodes && m.addedNodes.forEach((n) => {
			if (n && n.tagName === 'IMG') applyLazy(n);
			if (n && n.querySelectorAll) n.querySelectorAll('img').forEach(applyLazy);
		}));
	});
	mo.observe(document.documentElement, { childList: true, subtree: true });
} catch {}

// Development-only progress logging consolidated (tree-shaken from production)
if (import.meta.env.DEV) {
	// eslint-disable-next-line no-console
	if (import.meta.env.DEV) console.log('[DEV Progress] Phases complete: Structure✓ Performance✓ PWA/SEO✓ Auth✓');
}
