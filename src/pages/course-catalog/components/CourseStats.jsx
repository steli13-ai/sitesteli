import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CourseStats = ({ totalCourses, filteredCount, filters }) => {
  const stats = [
    {
      icon: 'BookOpen',
      label: 'Total cursuri',
      value: totalCourses,
      color: 'text-primary'
    },
    {
      icon: 'Filter',
      label: 'Cursuri filtrate',
      value: filteredCount,
      color: 'text-secondary'
    },
    {
      icon: 'Users',
      label: 'Studenți activi',
      value: '12,450',
      color: 'text-accent'
    },
    {
      icon: 'Award',
      label: 'Rata de succes',
      value: '94%',
      color: 'text-trust'
    }
  ];

  const getActiveFiltersText = () => {
    const activeFilters = [];
    
    if (filters?.grade && filters?.grade !== 'all') {
      activeFilters?.push(`Clasa ${filters?.grade}`);
    }
    if (filters?.category && filters?.category !== 'all') {
      const categoryNames = {
        'algebra': 'Algebră',
        'geometry': 'Geometrie',
        'analysis': 'Analiză matematică',
        'statistics': 'Statistică',
        'trigonometry': 'Trigonometrie'
      };
      activeFilters?.push(categoryNames?.[filters?.category] || filters?.category);
    }
    if (filters?.difficulty && filters?.difficulty !== 'all') {
      activeFilters?.push(filters?.difficulty);
    }
    if (filters?.price && filters?.price !== 'all') {
      const priceNames = {
        'free': 'Gratuit',
        '0-50': '0-50 RON',
        '50-100': '50-100 RON',
        '100+': '100+ RON'
      };
      activeFilters?.push(priceNames?.[filters?.price] || filters?.price);
    }

    return activeFilters?.length > 0 ? activeFilters?.join(', ') : 'Toate cursurile';
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <motion.div
            key={stat?.label}
            className="bg-card border border-border rounded-lg p-4 warm-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-muted/50 ${stat?.color}`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div>
                <div className="font-bold text-lg text-text-primary">
                  {stat?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Active Filters Summary */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Search" size={16} className="text-muted-foreground" />
            <div>
              <span className="text-sm font-medium text-text-primary">
                Se afișează {filteredCount} din {totalCourses} cursuri
              </span>
              {filters?.search && (
                <div className="text-xs text-muted-foreground mt-1">
                  Căutare: "{filters?.search}"
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              Filtre active:
            </div>
            <div className="text-sm font-medium text-text-primary">
              {getActiveFiltersText()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;