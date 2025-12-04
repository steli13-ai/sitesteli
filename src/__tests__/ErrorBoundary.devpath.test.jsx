import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

function Boom() { throw new Error('Boom'); }

// Force DEV path: the component shows dev-only details when import.meta.env.DEV is true.
describe('ErrorBoundary dev-only path', () => {
  it('renders dev-only error details block when DEV', () => {
    const original = globalThis.importMetaEnvDEV;
    // Shim DEV flag for jsdom environment
    // Vitest exposes import.meta.env via Vite; emulate truthy DEV for this test
    const prevImportMeta = globalThis.importMeta;
    globalThis.importMeta = { env: { DEV: true } };

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    // Fallback heading
    expect(screen.getByText(/A apărut o eroare/i)).toBeTruthy();
    // Dev-only details panel
    expect(screen.getByText(/Detalii eroare/i)).toBeTruthy();

    // restore
    globalThis.importMeta = prevImportMeta;
    globalThis.importMetaEnvDEV = original;
  });
});
