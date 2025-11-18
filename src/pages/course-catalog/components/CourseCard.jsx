import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onEnroll, onPreview }) => {
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
      className="bg-card border border-border rounded-xl warm-shadow hover:warm-shadow-lg transition-all duration-300 overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      layout
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course?.image}
          alt={course?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width={640}
          height={192}
          sizes="(min-width: 1024px) 320px, 100vw"
        />
        
        {/* Overlay with Quick Actions */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(course)}
            className="bg-white/90 text-text-primary border-white/20 hover:bg-white"
          >
            <Icon name="Play" size={16} className="mr-2" />
            Previzualizare
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onEnroll(course)}
            className="bg-primary text-primary-foreground"
          >
            <Icon name="BookOpen" size={16} className="mr-2" />
            Înscrie-te
          </Button>
        </div>

        {/* Course Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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
          {course?.isPopular && (
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
              POPULAR
            </span>
          )}
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(course?.difficulty)}`}>
            {course?.difficulty}
          </span>
        </div>
      </div>
      {/* Course Content */}
      <div className="p-6">
        {/* Grade Level */}
        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-3 py-1 ${getGradeColor(course?.grade)} text-white text-sm font-semibold rounded-full`}>
            Clasa {course?.grade}
          </span>
          <span className="text-muted-foreground text-sm">•</span>
          <span className="text-muted-foreground text-sm">{course?.category}</span>
        </div>

        {/* Course Title */}
        <h3 className="font-headline font-bold text-xl text-text-primary mb-2 line-clamp-2">
          {course?.title}
        </h3>

        {/* Course Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {course?.description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{course?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{course?.studentsCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span>{course?.rating}</span>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        {course?.prerequisites && course?.prerequisites?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-accent" />
              <span className="text-sm font-medium text-text-primary">Cerințe prealabile:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {course?.prerequisites?.map((prereq, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Instructor */}
        <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/50 rounded-lg">
          <Image
            src={course?.instructor?.avatar}
            alt={course?.instructor?.avatarAlt}
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
            sizes="40px"
          />
          <div className="flex-1">
            <p className="font-medium text-text-primary text-sm">{course?.instructor?.name}</p>
            <p className="text-muted-foreground text-xs">{course?.instructor?.title}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} className="text-trust" />
            <span className="text-xs text-muted-foreground">{course?.instructor?.experience}</span>
          </div>
        </div>

        {/* Course Outcomes */}
        <div className="mb-4">
          <h4 className="font-medium text-text-primary text-sm mb-2">Ce vei învăța:</h4>
          <ul className="space-y-1">
            {course?.outcomes?.slice(0, 3)?.map((outcome, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            {course?.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                {course?.originalPrice} RON
              </span>
            )}
            <span className="font-bold text-lg text-primary">
              {course?.price === 0 ? 'GRATUIT' : `${course?.price} RON`}
            </span>
          </div>
          
          <Button
            variant="default"
            size="sm"
            onClick={() => onEnroll(course)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {course?.price === 0 ? 'Accesează' : 'Înscrie-te'}
          </Button>
        </div>

        {/* Progress removed on product cards */}
      </div>
    </motion.div>
  );
};

export default CourseCard;