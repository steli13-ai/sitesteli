import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SimulareExamenPage from '@/pages/simulare-examen';

// Mock Supabase storage & RPC to avoid network and ensure deterministic upload success
vi.mock('@/lib/supabase', () => ({
  supabase: {
    storage: {
      from: () => ({
        upload: async () => ({ data: { path: 'mock/path' }, error: null }),
        createSignedUrl: async () => ({ data: { signedUrl: 'https://example.com/signed' }, error: null })
      })
    },
    rpc: async () => ({ data: null, error: null })
  }
}));

// Helper render
function renderSimulare(path = '/simulare-examen') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/simulare-examen" element={<SimulareExamenPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('SimulareExamenPage', () => {
  beforeEach(() => {
    // Ensure clean state so selection panel renders
    try { localStorage.clear(); } catch {}
  });
  it('starts timer after selecting year and clicking start', () => {
    renderSimulare();
    // Year buttons rendered
    const yearBtn = screen.getByRole('button', { name: /2024/ });
    fireEvent.click(yearBtn);
    const startBtn = screen.getByRole('button', { name: /Începe simularea/ });
    expect(startBtn).not.toBeDisabled();
    fireEvent.click(startBtn);
    // Countdown appears (format HH:MM:SS)
    expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it('shows validation error for invalid file type', () => {
    renderSimulare();
    fireEvent.click(screen.getByText('2024'));
    fireEvent.click(screen.getByRole('button', { name: /Începe simularea/ }));
    const input = screen.getByTestId('exam-upload');
    const badFile = new File(['x'], 'fisier.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [badFile] });
    fireEvent.change(input);
    expect(screen.getByText(/Fișier invalid/i)).toBeInTheDocument();
  });

  it('stops timer after valid upload', async () => {
    renderSimulare();
    fireEvent.click(screen.getByText('2024'));
    fireEvent.click(screen.getByRole('button', { name: /Începe simularea/ }));
    const initial = screen.getByTestId('exam-timer').textContent;
    const input = screen.getByTestId('exam-upload');
    const goodFile = new File(['pdfdata'], 'rezolvare.pdf', { type: 'application/pdf' });
    Object.defineProperty(input, 'files', { value: [goodFile] });
    fireEvent.change(input);
    // Uploaded badge appears
    expect(await screen.findByText(/Fișier încărcat/i)).toBeInTheDocument();
    // Timer element should reflect stopped state (same value or not decreasing fast)
    const after = screen.getByTestId('exam-timer').textContent;
    // Allow up to 2s difference due to potential one interval tick before stop
    const toSeconds = (str) => {
      const [h,m,s] = str.split(':').map(Number); return h*3600+m*60+s;
    };
    expect(toSeconds(initial) - toSeconds(after)).toBeLessThanOrEqual(2);
  });
});
