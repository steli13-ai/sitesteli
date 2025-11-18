import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ 
  studentName, 
  examType, 
  overallProgress, 
  subjectProgress, 
  recentScores, 
  strengths, 
  weaknesses,
  className = '' 
}) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success bg-success';
    if (percentage >= 60) return 'text-warning bg-warning';
    if (percentage >= 40) return 'text-secondary bg-secondary';
    return 'text-error bg-error';
  };

  const getScoreTrend = (scores) => {
    if (scores?.length < 2) return 'stable';
    const recent = scores?.slice(-3);
    const avg1 = recent?.slice(0, Math.ceil(recent?.length / 2))?.reduce((a, b) => a + b?.score, 0) / Math.ceil(recent?.length / 2);
    const avg2 = recent?.slice(Math.ceil(recent?.length / 2))?.reduce((a, b) => a + b?.score, 0) / Math.floor(recent?.length / 2);
    
    if (avg2 > avg1 + 5) return 'improving';
    if (avg2 < avg1 - 5) return 'declining';
    return 'stable';
  };

  const trend = getScoreTrend(recentScores);
  const getTrendIcon = () => {
    switch (trend) {
      case 'improving': return { icon: 'TrendingUp', color: 'text-success' };
      case 'declining': return { icon: 'TrendingDown', color: 'text-error' };
      default: return { icon: 'Minus', color: 'text-text-secondary' };
    }
  };

  const trendInfo = getTrendIcon();

  return (
    <div className={`bg-card rounded-xl p-6 warm-shadow ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-headline font-semibold text-xl text-text-primary">
            Progresul tău
          </h3>
          <p className="text-sm text-text-secondary">
            {studentName} • {examType}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name={trendInfo?.icon} size={20} className={trendInfo?.color} />
          <span className={`text-sm font-medium ${trendInfo?.color}`}>
            {trend === 'improving' ? 'În creștere' : trend === 'declining' ? 'În scădere' : 'Stabil'}
          </span>
        </div>
      </div>
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Progres general</span>
          <span className="text-sm font-semibold text-text-primary">{overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(overallProgress)?.split(' ')?.[1]}`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      {/* Subject Progress */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Progres pe materii</h4>
        <div className="space-y-3">
          {subjectProgress?.map((subject, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">{subject?.name}</span>
                <span className="text-sm font-medium text-text-primary">{subject?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(subject?.progress)?.split(' ')?.[1]}`}
                  style={{ width: `${subject?.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Scores */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Scoruri recente</h4>
        <div className="grid grid-cols-3 gap-3">
          {recentScores?.slice(-3)?.map((score, index) => (
            <div key={index} className="text-center p-3 bg-muted rounded-lg">
              <div className={`text-lg font-bold ${getProgressColor(score?.score)?.split(' ')?.[0]}`}>
                {score?.score}%
              </div>
              <div className="text-xs text-text-secondary">{score?.date}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="ThumbsUp" size={16} className="text-success mr-2" />
            Puncte forte
          </h4>
          <div className="space-y-2">
            {strengths?.slice(0, 3)?.map((strength, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full flex-shrink-0" />
                <span className="text-sm text-text-secondary">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
            De îmbunătățit
          </h4>
          <div className="space-y-2">
            {weaknesses?.slice(0, 3)?.map((weakness, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full flex-shrink-0" />
                <span className="text-sm text-text-secondary">{weakness}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Action Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors duration-200 group">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Vezi raportul detaliat</span>
            <Icon name="ArrowRight" size={14} className="text-primary group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProgressTracker;