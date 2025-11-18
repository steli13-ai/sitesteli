import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
  {
    id: 1,
    name: "Maria Popescu",
    age: 17,
    grade: "Clasa a XII-a",
    program: "Intensiv BAC Matematică",
    beforeGrade: 6.5,
    afterGrade: 9.2,
    examScore: 9.4,
    avatar: "https://images.unsplash.com/photo-1727446847385-f529dfab462d",
    avatarAlt: "Teenage girl with long brown hair smiling confidently in school uniform",
    quote: `Înainte de Mate cu succes, matematica era coșmarul meu. Aveam atacuri de panică înainte de fiecare test. 
      Acum, după 6 luni în programul intensiv, am luat 9.4 la BAC! Nu doar că am învățat matematică, 
      am învățat să îmi controlez anxietatea și să am încredere în mine.`,
    achievement: "Admisă la Politehnica București",
    socialImpact: "A mentorat 3 elevi din clasa a IX-a",
    transformation: [
    { aspect: "Încredere", before: 2, after: 9 },
    { aspect: "Performanță", before: 6.5, after: 9.2 },
    { aspect: "Anxietate", before: 9, after: 2 }]

  },
  {
    id: 2,
    name: "Andrei Ionescu",
    age: 14,
    grade: "Clasa a VIII-a",
    program: "Evaluare Națională Plus",
    beforeGrade: 7.2,
    afterGrade: 9.6,
    examScore: 9.8,
    avatar: "https://images.unsplash.com/photo-1532241896000-30dde118e3d9",
    avatarAlt: "Young teenage boy with short dark hair wearing blue school sweater, smiling warmly",
    quote: `Părinții mei erau foarte stresați pentru Evaluarea Națională. Eu eram și mai stresat! 
      Programul Mate cu succes nu doar că m-a ajutat să înțeleg matematica, dar m-a învățat și tehnici de gestionare 
      a stresului. Am luat 9.8 la evaluare și acum ajut și alți colegi.`,
    achievement: "Admis la Colegiul Național",
    socialImpact: "Voluntar în programul de burse",
    transformation: [
    { aspect: "Încredere", before: 4, after: 9 },
    { aspect: "Performanță", before: 7.2, after: 9.6 },
    { aspect: "Anxietate", before: 8, after: 3 }]

  },
  {
    id: 3,
    name: "Elena Dumitrescu",
    age: 12,
    grade: "Clasa a VI-a",
    program: "Matematică Avansată 5-7",
    beforeGrade: 5.8,
    afterGrade: 8.9,
    examScore: null,
    avatar: "https://images.unsplash.com/photo-1642884876088-9df82fbf003e",
    avatarAlt: "Young girl with blonde hair in ponytail, wearing pink sweater and bright smile",
    quote: `Matematica era materia pe care o uram cel mai mult. Plângeam în fiecare seară când făceam temele. 
      Acum, după programul Mate cu succes, matematica este materia mea preferată! Profesorii sunt foarte răbdători 
      și explică totul pas cu pas.`,
    achievement: "Prima la olimpiada județeană",
    socialImpact: "Participă la atelierele pentru părinți",
    transformation: [
    { aspect: "Încredere", before: 2, after: 8 },
    { aspect: "Performanță", before: 5.8, after: 8.9 },
    { aspect: "Anxietate", before: 9, after: 2 }]

  },
  {
    id: 4,
    name: "Radu Gheorghe",
    age: 16,
    grade: "Clasa a X-a",
    program: "Olimpiadă Matematică",
    beforeGrade: 8.5,
    afterGrade: 9.8,
    examScore: null,
    avatar: "https://images.unsplash.com/flagged/photo-1569957347658-a632a85717a4",
    avatarAlt: "Teenage boy with curly brown hair wearing glasses and navy blue shirt, confident expression",
    quote: `Eram deja bun la matematică, dar voiam să particip la olimpiade. Programul Elite de la Mate cu succes 
      m-a dus la un alt nivel. Am câștigat medalia de aur la olimpiada națională și acum mă pregătesc pentru 
      cea internațională. Mentorii sunt excepționali!`,
    achievement: "Medalie de aur la Olimpiada Națională",
    socialImpact: "Mentor pentru 5 elevi din programul standard",
    transformation: [
    { aspect: "Încredere", before: 7, after: 10 },
    { aspect: "Performanță", before: 8.5, after: 9.8 },
    { aspect: "Anxietate", before: 4, after: 1 }]

  }];


  const currentStory = stories?.[activeStory];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Poveștile Noastre de Succes
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Fiecare poveste este o transformare reală - de la anxietate la încredere, 
            de la frică la performanță excepțională.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Story Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {stories?.map((story, index) =>
            <button
              key={story?.id}
              onClick={() => setActiveStory(index)}
              className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
              activeStory === index ?
              'bg-primary text-primary-foreground warm-shadow' :
              'bg-card hover:bg-muted border border-border'}`
              }>

                <Image
                src={story?.avatar}
                alt={story?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover" />

                <div className="text-left">
                  <div className="font-body font-semibold text-sm">
                    {story?.name}
                  </div>
                  <div className="text-xs opacity-80">
                    {story?.grade}
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Main Story Display */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden warm-shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Story Content */}
              <div className="p-8 lg:p-12">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src={currentStory?.avatar}
                    alt={currentStory?.avatarAlt}
                    className="w-16 h-16 rounded-full object-cover" />

                  <div>
                    <h3 className="font-headline text-2xl font-bold text-text-primary">
                      {currentStory?.name}
                    </h3>
                    <p className="text-text-secondary font-body">
                      {currentStory?.age} ani • {currentStory?.grade}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                        {currentStory?.program}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-text-secondary font-body leading-relaxed mb-6 italic">
                  "{currentStory?.quote}"
                </blockquote>

                {/* Achievement */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Trophy" size={20} className="text-accent" />
                    <h4 className="font-body font-semibold text-accent">Realizare Majoră</h4>
                  </div>
                  <p className="text-text-secondary text-sm">{currentStory?.achievement}</p>
                </div>

                {/* Social Impact */}
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Heart" size={20} className="text-secondary" />
                    <h4 className="font-body font-semibold text-secondary">Impact Social</h4>
                  </div>
                  <p className="text-text-secondary text-sm">{currentStory?.socialImpact}</p>
                </div>
              </div>

              {/* Transformation Metrics */}
              <div className="bg-muted/30 p-8 lg:p-12">
                <h4 className="font-headline text-xl font-bold text-text-primary mb-6">
                  Transformarea în Cifre
                </h4>

                {/* Grade Improvement */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body font-semibold text-text-primary">Media Generală</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">{currentStory?.beforeGrade}</span>
                      <Icon name="ArrowRight" size={16} className="text-text-secondary" />
                      <span className="text-lg font-bold text-accent">{currentStory?.afterGrade}</span>
                    </div>
                  </div>
                  <div className="bg-background rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent h-full transition-all duration-1000 ease-out"
                      style={{ width: `${currentStory?.afterGrade / 10 * 100}%` }}>
                    </div>
                  </div>
                </div>

                {/* Exam Score */}
                {currentStory?.examScore &&
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body font-semibold text-text-primary">Nota la Examen</span>
                      <span className="text-2xl font-bold text-primary">{currentStory?.examScore}</span>
                    </div>
                    <div className="bg-background rounded-full h-2 overflow-hidden">
                      <div
                      className="bg-primary h-full transition-all duration-1000 ease-out"
                      style={{ width: `${currentStory?.examScore / 10 * 100}%` }}>
                    </div>
                    </div>
                  </div>
                }

                {/* Transformation Aspects */}
                <div className="space-y-4">
                  {currentStory?.transformation?.map((aspect, index) =>
                  <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body text-sm text-text-secondary">{aspect?.aspect}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-text-secondary">{aspect?.before}</span>
                          <Icon name="ArrowRight" size={12} className="text-text-secondary" />
                          <span className="text-sm font-bold text-text-primary">{aspect?.after}</span>
                        </div>
                      </div>
                      <div className="bg-background rounded-full h-1.5 overflow-hidden">
                        <div
                        className="bg-gradient-to-r from-secondary to-accent h-full transition-all duration-1000 ease-out"
                        style={{ width: `${aspect?.after / 10 * 100}%` }}>
                      </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-text-secondary mb-4">
                    Vrei să ai și tu o poveste de succes?
                  </p>
                  <Button asChild variant="default" fullWidth className="bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold">
                    <a href="/course-catalog">
                      <Icon name="Sparkles" size={16} className="mr-2" />
                      Începe Transformarea Ta
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={() => setActiveStory(activeStory > 0 ? activeStory - 1 : stories?.length - 1)}
              className="p-3 bg-card border border-border rounded-full hover:bg-muted transition-colors duration-200">

              <Icon name="ChevronLeft" size={20} className="text-text-primary" />
            </button>
            <div className="flex items-center space-x-2">
              {stories?.map((_, index) =>
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                activeStory === index ? 'bg-primary w-6' : 'bg-text-secondary/30'}`
                } />

              )}
            </div>
            <button
              onClick={() => setActiveStory(activeStory < stories?.length - 1 ? activeStory + 1 : 0)}
              className="p-3 bg-card border border-border rounded-full hover:bg-muted transition-colors duration-200">

              <Icon name="ChevronRight" size={20} className="text-text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>);

};

export default SuccessStories;