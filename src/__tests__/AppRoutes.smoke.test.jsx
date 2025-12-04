import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@/App';

// Simple smoke test ensuring the App mounts without throwing.
describe('AppRoutes smoke', () => {
  it('renders fallback shell (lazy routes load)', () => {
    render(<App />);
    // Suspense fallback should appear with role status and loading message
    const status = screen.getByRole('status');
    expect(status.textContent).toMatch(/Se încarcă Mate cu Succes/i);
  });
});
