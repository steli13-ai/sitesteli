import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

function Boom() {
  throw new Error('Boom');
}

describe('ErrorBoundary', () => {
  it('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );
    // Accept localized heading (RO) or EN fallback
    const heading = screen.queryByText(/A apărut o eroare/i) || screen.queryByText(/Something went wrong/i);
    expect(heading).toBeInTheDocument();
    // Back button localized label
    const backBtn = screen.getByRole('button', { name: /Înapoi|Back/i });
    expect(backBtn).toBeInTheDocument();
  });
});
