import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '@/contexts/I18nContext';
import Header from '@/components/ui/Header';

describe('Dark mode toggle', () => {
  it('toggles dark class on documentElement', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/exam-preparation']}>
        <I18nProvider>
          <Header />
        </I18nProvider>
      </MemoryRouter>
    );
    const btn = getByRole('button', { name: /Comută pe mod/i });
    const hadDark = document.documentElement.classList.contains('dark');
    fireEvent.click(btn);
    const nowHasDark = document.documentElement.classList.contains('dark');
    expect(nowHasDark).not.toBe(hadDark);
  });
});
