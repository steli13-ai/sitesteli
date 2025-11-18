import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

// Simple smoke test ensuring the App mounts without throwing.
describe('AppRoutes smoke', () => {
  it('renders root without crashing', () => {
    render(<App />);
    // Root container rendered via index.html; we can assert something from lazy fallback skeleton if present.
    // Because routes are lazy, Suspense fallback should appear first.
    // We just check document body contains the React root marker or fallback text.
    expect(document.getElementById('root')).toBeTruthy();
  });
});
