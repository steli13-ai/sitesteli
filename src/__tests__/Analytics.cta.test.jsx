import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/Button';

// Mock analytics to observe calls
vi.mock('@/utils/analytics', () => ({
  default: { ctaClick: vi.fn() },
}));

import analytics from '@/utils/analytics';

describe('CTA analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fires ctaClick when ctaId is provided', () => {
    const { getByText } = render(
      <Button ctaId="buy_now">Buy</Button>
    );

    fireEvent.click(getByText('Buy'));
    expect(analytics.ctaClick || analytics.default?.ctaClick).toBeDefined();
    const fn = analytics.ctaClick || analytics.default?.ctaClick;
    expect(fn).toHaveBeenCalledWith('buy_now');
  });
});
