import React from 'react';

const SkeletonPage = () => {
  return (
    <div className="min-h-screen pt-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-8 w-1/3 bg-muted rounded mb-6" />
        <div className="h-5 w-2/3 bg-muted rounded mb-4" />
        <div className="h-5 w-1/2 bg-muted rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-40 bg-muted rounded" />
          <div className="h-40 bg-muted rounded" />
          <div className="h-40 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPage;
