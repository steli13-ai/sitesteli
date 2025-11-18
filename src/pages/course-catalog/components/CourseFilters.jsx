import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CourseFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const gradeOptions = [
    { value: 'all', label: 'Toate clasele', count: 156 },
    { value: '5', label: 'Clasa 5', count: 24 },
    { value: '6', label: 'Clasa 6', count: 22 },
    { value: '7', label: 'Clasa 7', count: 20 },
    { value: '8', label: 'Clasa 8', count: 18 },
    { value: '9', label: 'Clasa 9', count: 16 },
    { value: '10', label: 'Clasa 10', count: 15 },
    { value: '11', label: 'Clasa 11', count: 14 },
    { value: '12', label: 'Clasa 12', count: 12 }
  ];

  const categoryOptions = [
    { value: 'all', label: 'Toate categoriile', count: 156 },
    { value: 'algebra', label: 'Algebră', count: 45 },
    { value: 'geometry', label: 'Geometrie', count: 38 },
    { value: 'analysis', label: 'Analiză matematică', count: 32 },
    { value: 'statistics', label: 'Statistică', count: 25 },
    { value: 'trigonometry', label: 'Trigonometrie', count: 16 }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'Toate nivelurile', count: 156 },
    { value: 'Începător', label: 'Începător', count: 68 },
    { value: 'Intermediar', label: 'Intermediar', count: 54 },
    { value: 'Avansat', label: 'Avansat', count: 34 }
  ];

  const priceOptions = [
    { value: 'all', label: 'Toate prețurile', count: 156 },
    { value: 'free', label: 'Gratuit', count: 42 },
    { value: '0-50', label: '0-50 RON', count: 38 },
    { value: '50-100', label: '50-100 RON', count: 45 },
    { value: '100+', label: '100+ RON', count: 31 }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => value && value !== 'all')?.length;
  };

  const FilterSection = ({ title, options, filterKey, icon }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon name={icon} size={16} className="text-primary" />
        <h4 className="font-medium text-text-primary">{title}</h4>
      </div>
      <div className="space-y-2">
        {options?.map((option) => (
          <label
            key={option?.value}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name={filterKey}
                value={option?.value}
                checked={filters?.[filterKey] === option?.value}
                onChange={(e) => handleFilterChange(filterKey, e?.target?.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text-primary">{option?.label}</span>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {option?.count}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-xl p-6 warm-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-headline font-bold text-lg text-text-primary">
            Filtrează cursurile
          </h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-text-primary"
            >
              <Icon name="X" size={16} className="mr-1" />
              Șterge
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Search */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Caută cursuri..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filters Content */}
      <AnimatePresence>
        <motion.div
          className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FilterSection
            title="Clasa"
            options={gradeOptions}
            filterKey="grade"
            icon="GraduationCap"
          />

          <div className="border-t border-border pt-6">
            <FilterSection
              title="Categorie"
              options={categoryOptions}
              filterKey="category"
              icon="BookOpen"
            />
          </div>

          <div className="border-t border-border pt-6">
            <FilterSection
              title="Nivel dificultate"
              options={difficultyOptions}
              filterKey="difficulty"
              icon="TrendingUp"
            />
          </div>

          <div className="border-t border-border pt-6">
            <FilterSection
              title="Preț"
              options={priceOptions}
              filterKey="price"
              icon="DollarSign"
            />
          </div>

          {/* Special Filters */}
          <div className="border-t border-border pt-6 space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-primary" />
              <h4 className="font-medium text-text-primary">Caracteristici speciale</h4>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={filters?.isNew || false}
                  onChange={(e) => handleFilterChange('isNew', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2 rounded"
                />
                <span className="text-sm text-text-primary">Cursuri noi</span>
              </label>
              
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={filters?.isBestseller || false}
                  onChange={(e) => handleFilterChange('isBestseller', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2 rounded"
                />
                <span className="text-sm text-text-primary">Bestseller</span>
              </label>
              
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={filters?.hasPreview || false}
                  onChange={(e) => handleFilterChange('hasPreview', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2 rounded"
                />
                <span className="text-sm text-text-primary">Cu previzualizare</span>
              </label>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CourseFilters;