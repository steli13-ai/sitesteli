import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ExamCountdown = ({ examType, examDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(examDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [examDate]);

  const timeUnits = [
    { value: timeLeft?.days, label: 'Zile', color: 'text-primary' },
    { value: timeLeft?.hours, label: 'Ore', color: 'text-secondary' },
    { value: timeLeft?.minutes, label: 'Minute', color: 'text-accent' },
    { value: timeLeft?.seconds, label: 'Secunde', color: 'text-trust' }
  ];

  return (
    <div className={`bg-card rounded-xl p-6 warm-shadow ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
          <Icon name="Clock" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="font-headline font-semibold text-lg text-text-primary">
            {examType}
          </h3>
          <p className="text-sm text-text-secondary">
            Timp rămas până la examen
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {timeUnits?.map((unit, index) => (
          <div key={index} className="text-center">
            <div className="bg-muted rounded-lg p-3 mb-2">
              <div className={`text-2xl font-bold ${unit?.color}`}>
                {unit?.value?.toString()?.padStart(2, '0')}
              </div>
            </div>
            <div className="text-xs font-medium text-text-secondary">
              {unit?.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-warning/10 rounded-lg">
        <p className="text-sm text-warning-foreground text-center">
          <Icon name="AlertTriangle" size={16} className="inline mr-2" />
          Pregătește-te din timp pentru rezultate excelente!
        </p>
      </div>
    </div>
  );
};

export default ExamCountdown;