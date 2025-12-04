import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '@/contexts/I18nContext';
import Header from '@/components/ui/Header';
import { axe } from 'jest-axe';

// Accessibility tests for navigation and theme toggle

describe('Header navigation accessibility', () => {
  const renderHeader = (initialPath = '/exam-preparation') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <I18nProvider>
          <Header />
        </I18nProvider>
      </MemoryRouter>
    );
  };

  it('marks active navigation item with aria-current="page"', async () => {
    renderHeader('/exam-preparation');
    // Desktop buttons are rendered; simulate large viewport semantics
    const active = screen.getByRole('button', { name: /Pregătire Examene/i });
    expect(active).toHaveAttribute('aria-current', 'page');
  });

  it('applies aria-pressed on theme toggle button', async () => {
    renderHeader('/exam-preparation');
    const toggle = screen.getByRole('button', { name: /Comută pe mod/i });
    // aria-pressed reflects current darkMode state (initial based on localStorage)
    expect(toggle).toHaveAttribute('aria-pressed');
  });

  it('has no basic a11y violations (axe) for header fragment', async () => {
    const { container } = renderHeader('/exam-preparation');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
