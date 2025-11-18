import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';

import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

// Import all components
import ParentDashboard from './components/ParentDashboard';
import CommunicationTools from './components/CommunicationTools';
import ResourceLibrary from './components/ResourceLibrary';
import WebinarSchedule from './components/WebinarSchedule';
import CommunityForum from './components/CommunityForum';
import TestimonialShowcase from './components/TestimonialShowcase';

const ParentResourcesPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState('ro');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ro';
    setCurrentLanguage(savedLanguage);
  }, []);

  const navigationSections = [
    { id: 'dashboard', label: 'Tablou de Bord', icon: 'BarChart3', description: 'Progresul copiilor' },
    { id: 'communication', label: 'Comunicare', icon: 'MessageSquare', description: 'Chat cu profesorii' },
    { id: 'resources', label: 'Resurse', icon: 'BookOpen', description: 'Biblioteca părinților' },
    { id: 'webinars', label: 'Webinarii', icon: 'Video', description: 'Sesiuni educative' },
    { id: 'community', label: 'Comunitate', icon: 'Users', description: 'Forum părinți' },
    { id: 'testimonials', label: 'Povești', icon: 'Heart', description: 'Transformări reale' }
  ];

  const quickStats = [
    {
      icon: 'Users',
      value: '12,847',
      label: 'Părinți Activi',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'MessageSquare',
      value: '3,241',
      label: 'Discuții Lunare',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: 'Trophy',
      value: '89%',
      label: 'Îmbunătățire Note',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Heart',
      value: '4.9/5',
      label: 'Satisfacție Părinți',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <ParentDashboard />;
      case 'communication':
        return <CommunicationTools />;
      case 'resources':
        return <ResourceLibrary />;
      case 'webinars':
        return <WebinarSchedule />;
      case 'community':
        return <CommunityForum />;
      case 'testimonials':
        return <TestimonialShowcase />;
      default:
        return <ParentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
  {/* Header provided by layout */}
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 text-primary/20 text-6xl font-bold math-symbol-float">
            ∑
          </div>
          <div className="absolute top-40 right-20 text-secondary/20 text-4xl font-bold math-symbol-float">
            π
          </div>
          <div className="absolute bottom-20 left-1/3 text-accent/20 text-5xl font-bold math-symbol-float">
            √
          </div>
          <div className="absolute top-60 right-1/4 text-warning/20 text-3xl font-bold math-symbol-float">
            ∞
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center warm-shadow">
                <Icon name="Users" size={32} className="text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
                  Colțul Părinților
                </h1>
                <p className="text-xl text-text-secondary">
                  Sprijin și resurse pentru familii
                </p>
              </div>
            </div>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Bine ați venit în spațiul dedicat părinților care vor să își sprijine copiii în călătoria către stăpânirea matematicii. 
              Aici găsiți toate instrumentele necesare pentru a transforma anxietatea matematică în încredere și succes.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {quickStats?.map((stat, index) => (
                <div key={index} className="bg-card rounded-lg p-4 warm-shadow">
                  <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <Icon name={stat?.icon} size={20} className={stat?.color} />
                  </div>
                  <div className="text-2xl font-bold text-text-primary">{stat?.value}</div>
                  <div className="text-sm text-text-secondary">{stat?.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg" iconName="Play" iconPosition="left">
                <Link to="/free-resources">Începe Acum</Link>
              </Button>
              <Button asChild variant="outline" size="lg" iconName="MessageCircle" iconPosition="left">
                <Link to="/consiliere">Vorbeste cu un Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation Tabs */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {navigationSections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-body font-medium transition-all duration-200 ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground warm-shadow'
                    : 'bg-muted text-text-secondary hover:text-primary hover:bg-primary/10'
                }`}
              >
                <Icon name={section?.icon} size={20} />
                <div className="text-left">
                  <div>{section?.label}</div>
                  <div className="text-xs opacity-75">{section?.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {renderActiveSection()}
        </div>
      </section>
      {/* Support Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Icon name="HeartHandshake" size={48} className="text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-headline font-bold text-text-primary mb-4">
                Suport Dedicat pentru Părinți
              </h2>
              <p className="text-lg text-text-secondary">
                Nu sunteți singuri în această călătorie. Echipa noastră de experți și comunitatea de părinți 
                sunt aici pentru a vă sprijini la fiecare pas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-text-primary mb-2">
                  Suport 24/7
                </h3>
                <p className="text-text-secondary">
                  Echipa noastră este disponibilă oricând aveți nevoie de ajutor sau sfaturi.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={24} className="text-secondary" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-text-primary mb-2">
                  Comunitate Activă
                </h3>
                <p className="text-text-secondary">
                  Conectați-vă cu alți părinți care trec prin experiențe similare.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="GraduationCap" size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-text-primary mb-2">
                  Experți Educaționali
                </h3>
                <p className="text-text-secondary">
                  Accesați sfaturile profesorilor și psihologilor educaționali.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="default" size="lg" iconName="MessageSquare" iconPosition="left">
                <Link to="/suport-parinti">Contactează Echipa de Suport</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer intentionally omitted on this page */}
    </div>
  );
};

export default ParentResourcesPage;