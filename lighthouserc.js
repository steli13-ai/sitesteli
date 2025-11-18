module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4173/'],
      settings: {
        preset: 'desktop',
        throttlingMethod: 'provided',
        formFactor: 'desktop'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:seo': ['warn', { minScore: 0.9 }]
      }
    },
    upload: { target: 'temporary-public-storage' }
  }
};