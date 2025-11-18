import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamTypeCard = ({ 
  examType, 
  grade, 
  subjects, 
  difficulty, 
  successRate, 
  studentsCount, 
  description,
  features,
  onStartPreparation,
  className = '' 
}) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Ușor': return 'text-success bg-success/10';
      case 'Mediu': return 'text-warning bg-warning/10';
      case 'Dificil': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getGradeIcon = (grade) => {
    if (grade?.includes('8')) return 'GraduationCap';
    if (grade?.includes('12')) return 'Award';
    return 'BookOpen';
  };

  return (
    <div className={`bg-card rounded-xl p-6 warm-shadow hover:warm-shadow-lg confidence-hover ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name={getGradeIcon(grade)} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-headline font-semibold text-xl text-text-primary">
              {examType}
            </h3>
            <p className="text-sm text-text-secondary">{grade}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </div>
      </div>
      {/* Description */}
      <p className="text-text-secondary mb-4 leading-relaxed">
        {description}
      </p>
      {/* Subjects */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Materii incluse:</h4>
        <div className="flex flex-wrap gap-2">
          {subjects?.map((subject, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-text-secondary"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
      {/* Features */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Ce vei primi:</h4>
        <div className="space-y-2">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="text-2xl font-bold text-success">{successRate}%</div>
          <div className="text-xs text-success-foreground">Rata de succes</div>
        </div>
        <div className="text-center p-3 bg-trust/10 rounded-lg">
          <div className="text-2xl font-bold text-trust">{studentsCount?.toLocaleString('ro-RO')}</div>
          <div className="text-xs text-trust-foreground">Elevi pregătiți</div>
        </div>
      </div>
      {/* CTA */}
      <Button 
        variant="default" 
        fullWidth
        onClick={onStartPreparation}
        className="font-cta font-semibold"
      >
        Începe Pregătirea
        <Icon name="ArrowRight" size={16} className="ml-2" />
      </Button>
    </div>
  );
};

export default ExamTypeCard;