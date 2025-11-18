import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceGrid = ({ resources, onDownload, onPreview, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-xl warm-shadow overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-8 bg-muted rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (resources?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-text-secondary" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
        </div>
        <h3 className="font-headline font-semibold text-xl text-text-primary mb-2">
          Nu am găsit resurse
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Încearcă să modifici filtrele pentru a găsi resurse potrivite pentru tine.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources?.map((resource) => (
        <ResourceCard
          key={resource?.id}
          resource={resource}
          onDownload={onDownload}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
};

export default ResourceGrid;