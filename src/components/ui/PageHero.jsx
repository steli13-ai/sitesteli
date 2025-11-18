import React from 'react';

/**
 * Simple hero/header section used on content pages to keep a consistent look.
 * Props:
 * - title: string
 * - subtitle?: string
 */
const PageHero = ({ title, subtitle }) => {
  return (
    <section className="relative border-b border-background/20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-3 text-sm">
          <a href="/" className="text-text-secondary hover:text-primary transition-colors">Acasă</a>
          <span className="text-text-secondary">/</span>
          <span className="text-text-primary/80">{title}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-base text-text-secondary max-w-3xl">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;
