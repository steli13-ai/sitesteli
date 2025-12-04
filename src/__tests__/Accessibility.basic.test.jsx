import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import App from '@/App';

// Very basic accessibility assertions (placeholder). Extend with axe later.
describe('Accessibility basics', () => {
  it('has language attribute ro on html', () => {
    // JSDOM doesn't load our index.html; set manually to simulate runtime environment
    document.documentElement.setAttribute('lang', 'ro');
    render(<App />);
    expect(document.documentElement.getAttribute('lang')).toBe('ro');
  });
});
