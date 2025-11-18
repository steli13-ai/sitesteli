import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/contexts/AuthContext', async () => {
  return {
    useAuth: () => ({ user: null, loading: true }),
  };
});

vi.mock('@/lib/supabase', async () => {
  return {
    supabase: {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
    },
  };
});

import ProtectedRoute from '@/components/ProtectedRoute';

describe('ProtectedRoute', () => {
  it('shows loading while auth is loading', () => {
    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <ProtectedRoute>
          <div>Secret</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText(/Se încarcă/)).toBeInTheDocument();
  });
});
