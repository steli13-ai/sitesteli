import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

// Dynamic auth context mocking
let mockUser = null;
let mockLoading = false;
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: mockUser, loading: mockLoading, signOut: vi.fn() })
}));

vi.mock('@/lib/supabase', () => ({
  supabase: { auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) } }
}));

describe('ProtectedRoute', () => {
  const ShowLocation = () => {
    const loc = useLocation();
    return <span data-testid="loc">{loc.pathname + loc.search}</span>;
  };
  it('shows loading while auth is loading', () => {
    mockUser = null; mockLoading = true;
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route path="/secret" element={<ProtectedRoute><div>Secret</div></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Se încarcă/)).toBeInTheDocument();
  });

  it('redirects unauthenticated after loading', async () => {
    mockUser = null; mockLoading = false;
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route path="/secret" element={<ProtectedRoute><div>Secret</div></ProtectedRoute>} />
          <Route path="/account" element={<><div>Login Page</div><ShowLocation /></>} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/Login Page/)).toBeInTheDocument();
    await waitFor(() => {
      const loc = screen.getByTestId('loc').textContent;
      expect(loc.startsWith('/account')).toBe(true);
      expect(loc).toMatch(/auth=login/);
    });
  });

  it('renders children when authenticated', async () => {
    mockUser = { id: 'u1' }; mockLoading = false;
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route path="/secret" element={<ProtectedRoute><div>Secret</div></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });
});
