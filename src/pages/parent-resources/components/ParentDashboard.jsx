import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0);

  const childrenData = [
  {
    id: 1,
    name: "Ana Maria Popescu",
    grade: "Clasa 8",
    avatar: "https://images.unsplash.com/photo-1663229047996-8f858d3335cd",
    avatarAlt: "Young teenage girl with brown hair smiling at camera in school uniform",
    overallProgress: 78,
    currentCourse: "Algebra și Geometrie - Clasa 8",
    weeklyActivity: 12,
    lastActive: "Azi, 14:30",
    subjects: [
    { name: "Algebra", progress: 85, color: "bg-primary" },
    { name: "Geometrie", progress: 72, color: "bg-secondary" },
    { name: "Probleme", progress: 76, color: "bg-accent" }],

    recentAchievements: [
    { title: "Ecuații de gradul I", date: "15 Oct", points: 95 },
    { title: "Teorema lui Pitagora", date: "12 Oct", points: 88 }]

  },
  {
    id: 2,
    name: "Mihai Alexandru Ionescu",
    grade: "Clasa 11",
    avatar: "https://images.unsplash.com/photo-1654534355685-825ec140fbd7",
    avatarAlt: "Teenage boy with short dark hair wearing blue shirt smiling confidently",
    overallProgress: 92,
    currentCourse: "Matematică - Pregătire BAC",
    weeklyActivity: 18,
    lastActive: "Azi, 16:45",
    subjects: [
    { name: "Analiză", progress: 94, color: "bg-primary" },
    { name: "Algebră", progress: 89, color: "bg-secondary" },
    { name: "Geometrie", progress: 93, color: "bg-accent" }],

    recentAchievements: [
    { title: "Funcții exponențiale", date: "16 Oct", points: 98 },
    { title: "Limite și continuitate", date: "14 Oct", points: 92 }]

  }];


  const currentChild = childrenData?.[selectedChild];

  return (
    <div className="bg-card rounded-xl warm-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-bold text-primary">
          Progresul Copiilor
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="RefreshCw" size={20} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">Actualizat: {currentChild?.lastActive}</span>
        </div>
      </div>
      {/* Child Selector */}
      <div className="flex space-x-4 mb-6">
        {childrenData?.map((child, index) =>
        <button
          key={child?.id}
          onClick={() => setSelectedChild(index)}
          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 ${
          selectedChild === index ?
          'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`
          }>

            <Image
            src={child?.avatar}
            alt={child?.avatarAlt}
            className="w-12 h-12 rounded-full object-cover" />

            <div className="text-left">
              <h3 className="font-body font-semibold text-text-primary">{child?.name}</h3>
              <p className="text-sm text-text-secondary">{child?.grade}</p>
            </div>
          </button>
        )}
      </div>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <span className="text-2xl font-bold text-primary">{currentChild?.overallProgress}%</span>
          </div>
          <p className="text-sm font-medium text-text-primary">Progres General</p>
        </div>

        <div className="bg-accent/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={20} className="text-accent" />
            <span className="text-2xl font-bold text-accent">{currentChild?.weeklyActivity}h</span>
          </div>
          <p className="text-sm font-medium text-text-primary">Ore Săptămâna</p>
        </div>

        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Award" size={20} className="text-warning" />
            <span className="text-2xl font-bold text-warning">{currentChild?.recentAchievements?.length}</span>
          </div>
          <p className="text-sm font-medium text-text-primary">Realizări Noi</p>
        </div>

        <div className="bg-secondary/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="BookOpen" size={20} className="text-secondary" />
            <span className="text-xs font-medium text-secondary text-center leading-tight">
              {currentChild?.currentCourse?.split(' - ')?.[0]}
            </span>
          </div>
          <p className="text-sm font-medium text-text-primary">Curs Activ</p>
        </div>
      </div>
      {/* Subject Progress */}
      <div className="mb-6">
        <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">
          Progres pe Materii
        </h3>
        <div className="space-y-4">
          {currentChild?.subjects?.map((subject, index) =>
          <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${subject?.color}`}></div>
                <span className="font-body font-medium text-text-primary">{subject?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div
                  className={`h-2 rounded-full ${subject?.color}`}
                  style={{ width: `${subject?.progress}%` }}>
                </div>
                </div>
                <span className="text-sm font-semibold text-text-primary w-12 text-right">
                  {subject?.progress}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Recent Achievements */}
      <div>
        <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">
          Realizări Recente
        </h3>
        <div className="space-y-3">
          {currentChild?.recentAchievements?.map((achievement, index) =>
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Trophy" size={16} className="text-success-foreground" />
                </div>
                <div>
                  <h4 className="font-body font-medium text-text-primary">{achievement?.title}</h4>
                  <p className="text-sm text-text-secondary">{achievement?.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-success">{achievement?.points}</span>
                <p className="text-xs text-text-secondary">puncte</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default ParentDashboard;