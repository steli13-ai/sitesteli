import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyPlan = ({ examType, examDate, currentLevel, targetGrade, className = '' }) => {
  const [selectedWeek, setSelectedWeek] = useState(0);

  // Mock study plan data
  const studyPlan = [
    {
      week: 1,
      title: "Fundamentele matematicii",
      description: "Consolidarea conceptelor de bază și identificarea lacunelor",
      topics: [
        "Operații cu numere întregi și raționale",
        "Ecuații și inecuații de gradul I",
        "Sisteme de ecuații liniare",
        "Funcții liniare și afine"
      ],
      estimatedHours: 12,
      difficulty: "Ușor",
      resources: 8,
      completed: true
    },
    {
      week: 2,
      title: "Geometrie plană",
      description: "Teoreme fundamentale și aplicații practice",
      topics: [
        "Triunghiuri și proprietățile lor",
        "Paralelogramul și trapezul",
        "Cercul și proprietățile sale",
        "Arii și perimetri"
      ],
      estimatedHours: 15,
      difficulty: "Mediu",
      resources: 12,
      completed: true
    },
    {
      week: 3,
      title: "Funcții și grafice",
      description: "Studiul funcțiilor de gradul II și proprietățile lor",
      topics: [
        "Funcția de gradul II",
        "Reprezentarea grafică",
        "Ecuații și inecuații de gradul II",
        "Probleme de optimizare"
      ],
      estimatedHours: 18,
      difficulty: "Mediu",
      resources: 15,
      completed: false
    },
    {
      week: 4,
      title: "Probabilități și statistică",
      description: "Concepte de probabilitate și interpretarea datelor",
      topics: [
        "Evenimente și probabilități",
        "Probabilitatea condiționată",
        "Variabile aleatoare",
        "Reprezentări grafice ale datelor"
      ],
      estimatedHours: 10,
      difficulty: "Ușor",
      resources: 9,
      completed: false
    },
    {
      week: 5,
      title: "Geometrie în spațiu",
      description: "Corpuri geometrice și calculul volumelor",
      topics: [
        "Prisma și piramida",
        "Cilindrul și conul",
        "Sfera și aplicațiile sale",
        "Probleme complexe de geometrie"
      ],
      estimatedHours: 20,
      difficulty: "Dificil",
      resources: 18,
      completed: false
    },
    {
      week: 6,
      title: "Recapitulare și simulări",
      description: "Consolidarea cunoștințelor și pregătirea finală",
      topics: [
        "Teste de recapitulare",
        "Simulări de examen",
        "Rezolvarea problemelor dificile",
        "Strategii de examen"
      ],
      estimatedHours: 25,
      difficulty: "Dificil",
      resources: 20,
      completed: false
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Ușor': return 'text-success bg-success/10';
      case 'Mediu': return 'text-warning bg-warning/10';
      case 'Dificil': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const completedWeeks = studyPlan?.filter(week => week?.completed)?.length;
  const totalProgress = (completedWeeks / studyPlan?.length) * 100;

  return (
    <div className={`bg-card rounded-xl p-6 warm-shadow ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-headline font-semibold text-xl text-text-primary">
            Planul tău de studiu
          </h3>
          <p className="text-sm text-text-secondary">
            {examType} • Ținta: {targetGrade}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{Math.round(totalProgress)}%</div>
          <div className="text-xs text-text-secondary">Completat</div>
        </div>
      </div>
      {/* Progress Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Progres general</span>
          <span className="text-sm text-text-secondary">{completedWeeks} din {studyPlan?.length} săptămâni</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>
      {/* Week Navigation */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {studyPlan?.map((week, index) => (
          <button
            key={index}
            onClick={() => setSelectedWeek(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedWeek === index
                ? 'bg-primary text-primary-foreground'
                : week?.completed
                ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted text-text-secondary hover:bg-muted/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              {week?.completed && <Icon name="Check" size={14} />}
              <span>Săpt. {week?.week}</span>
            </div>
          </button>
        ))}
      </div>
      {/* Selected Week Details */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="font-headline font-semibold text-lg text-text-primary">
                {studyPlan?.[selectedWeek]?.title}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(studyPlan?.[selectedWeek]?.difficulty)}`}>
                {studyPlan?.[selectedWeek]?.difficulty}
              </span>
            </div>
            <p className="text-text-secondary mb-4">
              {studyPlan?.[selectedWeek]?.description}
            </p>
          </div>
          {studyPlan?.[selectedWeek]?.completed && (
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center ml-4">
              <Icon name="Check" size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Week Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {studyPlan?.[selectedWeek]?.estimatedHours} ore estimate
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {studyPlan?.[selectedWeek]?.resources} resurse
            </span>
          </div>
        </div>

        {/* Topics */}
        <div className="mb-4">
          <h5 className="text-sm font-medium text-text-primary mb-3">Subiecte de studiat:</h5>
          <div className="space-y-2">
            {studyPlan?.[selectedWeek]?.topics?.map((topic, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  studyPlan?.[selectedWeek]?.completed ? 'bg-success' : 'bg-muted'
                }`} />
                <span className="text-sm text-text-secondary">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={studyPlan?.[selectedWeek]?.completed ? "outline" : "default"}
          fullWidth
          className="font-cta"
        >
          {studyPlan?.[selectedWeek]?.completed ? (
            <>
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Revizuiește săptămâna
            </>
          ) : (
            <>
              <Icon name="Play" size={16} className="mr-2" />
              Începe săptămâna {studyPlan?.[selectedWeek]?.week}
            </>
          )}
        </Button>
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">
              {studyPlan?.reduce((acc, week) => acc + week?.estimatedHours, 0)}h
            </div>
            <div className="text-xs text-text-secondary">Total ore</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary">
              {studyPlan?.reduce((acc, week) => acc + week?.resources, 0)}
            </div>
            <div className="text-xs text-text-secondary">Resurse</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">
              {Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24 * 7))}
            </div>
            <div className="text-xs text-text-secondary">Săptămâni rămase</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;