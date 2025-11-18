import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseSortOptions = ({ sortBy, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'popularity', label: 'Popularitate', icon: 'TrendingUp' },
    { value: 'rating', label: 'Evaluare', icon: 'Star' },
    { value: 'newest', label: 'Cel mai nou', icon: 'Clock' },
    { value: 'price-low', label: 'Preț crescător', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Preț descrescător', icon: 'ArrowDown' },
    { value: 'alphabetical', label: 'Alfabetic', icon: 'AlphabeticalSort' }
  ];

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 warm-shadow">
      {/* Sort Options */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-text-primary">Sortează după:</span>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e?.target?.value)}
          className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {sortOptions?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
      </div>
      {/* View Mode Toggle */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-text-primary">Vizualizare:</span>
        <div className="flex items-center bg-muted rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-md transition-colors duration-200 ${
              viewMode === 'grid' ?'bg-background text-primary warm-shadow' :'text-muted-foreground hover:text-text-primary'
            }`}
            title="Vizualizare grilă"
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-md transition-colors duration-200 ${
              viewMode === 'list' ?'bg-background text-primary warm-shadow' :'text-muted-foreground hover:text-text-primary'
            }`}
            title="Vizualizare listă"
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSortOptions;