import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseListView = ({ course, onEnroll, onPreview }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Începător': return 'bg-success text-success-foreground';
      case 'Intermediar': return 'bg-warning text-warning-foreground';
      case 'Avansat': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getGradeColor = (grade) => {
    const colors = [
      'bg-primary', 'bg-secondary', 'bg-accent', 'bg-trust', 'bg-warning'
    ];
    return colors?.[grade % colors?.length];
  };

  return (
    <motion.div
      className="bg-card border border-border rounded-xl warm-shadow hover:warm-shadow-lg transition-all duration-300 overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      layout
    >
      <div className="flex items-start p-6 space-x-6">
        {/* Course Image */}
        <div className="relative flex-shrink-0">
          <Image
            src={course?.image}
            alt={course?.imageAlt}
            className="w-32 h-24 rounded-lg object-cover"
          />
          
          {/* Badges */}
          <div className="absolute -top-2 -right-2 flex flex-col space-y-1">
            {course?.isNew && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                NOU
              </span>
            )}
            {course?.isBestseller && (
              <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-semibold rounded-full">
                BESTSELLER
              </span>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-3 py-1 ${getGradeColor(course?.grade)} text-white text-sm font-semibold rounded-full`}>
                  Clasa {course?.grade}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(course?.difficulty)}`}>
                  {course?.difficulty}
                </span>
                <span className="text-muted-foreground text-sm">•</span>
                <span className="text-muted-foreground text-sm">{course?.category}</span>
              </div>
              
              <h3 className="font-headline font-bold text-xl text-text-primary mb-2 line-clamp-1">
                {course?.title}
              </h3>
              
              <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                {course?.description}
              </p>
            </div>

            {/* Price */}
            <div className="text-right ml-4">
              {course?.originalPrice && (
                <div className="text-sm text-muted-foreground line-through">
                  {course?.originalPrice} RON
                </div>
              )}
              <div className="font-bold text-lg text-primary">
                {course?.price === 0 ? 'GRATUIT' : `${course?.price} RON`}
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{course?.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Users" size={14} />
              <span>{course?.studentsCount}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span>{course?.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="BookOpen" size={14} />
              <span>{course?.lessonsCount} lecții</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src={course?.instructor?.avatar}
              alt={course?.instructor?.avatarAlt}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-text-primary text-sm">{course?.instructor?.name}</p>
              <p className="text-muted-foreground text-xs">{course?.instructor?.title}</p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {course?.outcomes?.slice(0, 4)?.map((outcome, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={12} className="text-accent mt-1 flex-shrink-0" />
                  <span className="text-xs text-text-secondary line-clamp-1">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress removed on product list items */}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Preview button removed in landscape (list) view */}
              <Button
                variant="default"
                size="sm"
                onClick={() => onEnroll(course)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="BookOpen" size={14} className="mr-2" />
                {course?.price === 0 ? 'Accesează' : 'Înscrie-te'}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
                title="Adaugă la favorite"
              >
                <Icon name="Heart" size={16} />
              </button>
              <button
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
                title="Partajează"
              >
                <Icon name="Share2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseListView;