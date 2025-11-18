import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedCourses = ({ courses, onEnroll, onPreview }) => {
  if (!courses || courses?.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 warm-shadow">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Sparkles" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-headline font-bold text-lg text-text-primary">
            Recomandate pentru tine
          </h3>
          <p className="text-text-secondary text-sm">
            Bazat pe preferințele și progresul tău
          </p>
        </div>
      </div>
      {/* Recommended Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course, index) => (
          <motion.div
            key={course?.id}
            className="bg-card border border-border rounded-lg p-4 warm-shadow hover:warm-shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            {/* Course Image */}
            <div className="relative mb-3">
              <Image
                src={course?.image}
                alt={course?.imageAlt}
                className="w-full h-32 rounded-lg object-cover"
              />
              
              {/* Recommendation Badge */}
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center space-x-1">
                  <Icon name="Target" size={12} />
                  <span>Recomandat</span>
                </span>
              </div>

              {/* Match Percentage */}
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                  {course?.matchPercentage}% potrivire
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Clasa {course?.grade}
                  </span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-muted-foreground text-xs">{course?.category}</span>
                </div>
                
                <h4 className="font-semibold text-text-primary text-sm line-clamp-2">
                  {course?.title}
                </h4>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{course?.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span>{course?.rating}</span>
                </div>
              </div>

              {/* Recommendation Reason */}
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-xs text-text-secondary">
                  <Icon name="Lightbulb" size={12} className="inline mr-1 text-warning" />
                  {course?.recommendationReason}
                </p>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-sm font-bold text-primary">
                  {course?.price === 0 ? 'GRATUIT' : `${course?.price} RON`}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onPreview(course)}
                    className="text-primary hover:bg-primary/10"
                  >
                    <Icon name="Eye" size={12} />
                  </Button>
                  <Button
                    variant="default"
                    size="xs"
                    onClick={() => onEnroll(course)}
                    className="bg-primary text-primary-foreground"
                  >
                    {course?.price === 0 ? 'Accesează' : 'Înscrie-te'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* View All button removed as requested */}
    </div>
  );
};

export default RecommendedCourses;