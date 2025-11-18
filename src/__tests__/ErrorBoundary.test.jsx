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
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
  });
});
