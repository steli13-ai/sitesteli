import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SuccessStories = ({ stories, className = '' }) => {
  const getGradeColor = (grade) => {
    if (grade >= 9) return 'text-success bg-success/10';
    if (grade >= 8) return 'text-warning bg-warning/10';
    if (grade >= 7) return 'text-trust bg-trust/10';
    return 'text-text-secondary bg-muted';
  };

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="font-headline font-semibold text-3xl text-text-primary mb-4">
          Povești de succes
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Descoperă cum alți elevi au reușit să-și depășească temerile și să obțină rezultate excelente la examene
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories?.map((story, index) => (
          <div key={index} className="bg-card rounded-xl p-6 warm-shadow confidence-hover">
            {/* Student Info */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <Image
                  src={story?.avatar}
                  alt={story?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-headline font-semibold text-text-primary">
                  {story?.name}
                </h4>
                <p className="text-sm text-text-secondary">
                  {story?.examType} • {story?.year}
                </p>
              </div>
            </div>

            {/* Before/After Grades */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-text-secondary mb-1">
                  {story?.gradeBefore}
                </div>
                <div className="text-xs text-text-secondary">Înainte</div>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <div className="text-lg font-bold text-success mb-1">
                  {story?.gradeAfter}
                </div>
                <div className="text-xs text-success-foreground">După</div>
              </div>
            </div>

            {/* Improvement */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  +{(story?.gradeAfter - story?.gradeBefore)?.toFixed(1)} puncte
                </span>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-sm text-text-secondary italic mb-4 leading-relaxed">
              "{story?.testimonial}"
            </blockquote>

            {/* Study Duration */}
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{story?.studyDuration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="BookOpen" size={14} />
                <span>{story?.coursesCompleted} cursuri</span>
              </div>
            </div>

            {/* Subject Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {story?.subjects?.map((subject, subIndex) => (
                <span 
                  key={subIndex}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Stats Summary */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-card rounded-xl warm-shadow">
          <div className="text-3xl font-bold text-success mb-2">94%</div>
          <div className="text-sm text-text-secondary">Rata de promovare</div>
        </div>
        <div className="text-center p-6 bg-card rounded-xl warm-shadow">
          <div className="text-3xl font-bold text-primary mb-2">8.7</div>
          <div className="text-sm text-text-secondary">Nota medie</div>
        </div>
        <div className="text-center p-6 bg-card rounded-xl warm-shadow">
          <div className="text-3xl font-bold text-warning mb-2">2.3</div>
          <div className="text-sm text-text-secondary">Creștere medie</div>
        </div>
        <div className="text-center p-6 bg-card rounded-xl warm-shadow">
          <div className="text-3xl font-bold text-trust mb-2">1.247</div>
          <div className="text-sm text-text-secondary">Elevi ajutați</div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;