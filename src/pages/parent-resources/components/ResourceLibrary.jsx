import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('guides');

  const categories = [
  { id: 'guides', label: 'Ghiduri pentru Părinți', icon: 'BookOpen' },
  { id: 'tips', label: 'Sfaturi Educaționale', icon: 'Lightbulb' },
  { id: 'activities', label: 'Activități Acasă', icon: 'Home' },
  { id: 'psychology', label: 'Psihologie Educațională', icon: 'Brain' }];


  const resources = {
    guides: [
    {
      id: 1,
      title: "Cum să Sprijiniți Copilul la Matematică",
      description: "Ghid complet pentru părinții care vor să își ajute copiii să depășească anxietatea matematică și să dezvolte încrederea în sine.",
      image: "https://images.unsplash.com/photo-1589206955150-8e6de735f19a",
      imageAlt: "Parent and child studying together at desk with math books and calculator",
      type: "PDF",
      duration: "15 min citire",
      downloads: 2847,
      rating: 4.8,
      tags: ["Anxietate", "Încredere", "Metode"]
    },
    {
      id: 2,
      title: "Înțelegerea Sistemului de Evaluare",
      description: "Explicații clare despre cum funcționează evaluarea la matematică în sistemul educațional românesc și cum să interpretați notele.",
      image: "https://images.unsplash.com/photo-1469047822848-dc1415c45575",
      imageAlt: "School report card with grades and mathematical equations on desk",
      type: "PDF",
      duration: "12 min citire",
      downloads: 1923,
      rating: 4.6,
      tags: ["Evaluare", "Note", "Sistem"]
    },
    {
      id: 3,
      title: "Comunicarea cu Profesorii",
      description: "Strategii eficiente pentru a construi o relație pozitivă cu profesorii de matematică și a colabora pentru succesul copilului.",
      image: "https://images.unsplash.com/photo-1714974528718-b3b52f91c334",
      imageAlt: "Parent-teacher conference meeting with documents and charts on table",
      type: "PDF",
      duration: "10 min citire",
      downloads: 1654,
      rating: 4.7,
      tags: ["Comunicare", "Profesori", "Colaborare"]
    }],

    tips: [
    {
      id: 4,
      title: "5 Moduri de a Motiva Copilul",
      description: "Tehnici practice pentru a menține motivația copilului pentru învățarea matematicii, chiar și în momentele dificile.",
      image: "https://images.unsplash.com/photo-1587955415524-bb264e518428",
      imageAlt: "Motivational sticky notes and colorful pens arranged on study desk",
      type: "Articol",
      duration: "8 min citire",
      downloads: 3241,
      rating: 4.9,
      tags: ["Motivație", "Încurajare", "Psihologie"]
    },
    {
      id: 5,
      title: "Gestionarea Stresului de Examen",
      description: "Sfaturi pentru a ajuta copilul să gestioneze anxietatea înainte de examene și să performeze la potențialul maxim.",
      image: "https://images.unsplash.com/photo-1610564319294-913f1e502b47",
      imageAlt: "Calm study environment with relaxation techniques and exam preparation materials",
      type: "Video",
      duration: "15 min",
      downloads: 2156,
      rating: 4.8,
      tags: ["Stres", "Examene", "Relaxare"]
    }],

    activities: [
    {
      id: 6,
      title: "Jocuri Matematice pentru Acasă",
      description: "Colecție de jocuri distractive care transformă învățarea matematicii într-o activitate plăcută pentru întreaga familie.",
      image: "https://images.unsplash.com/photo-1577897113292-3b95936e5206",
      imageAlt: "Family playing educational math board games together at dining table",
      type: "Kit Activități",
      duration: "Variabil",
      downloads: 4532,
      rating: 4.9,
      tags: ["Jocuri", "Familie", "Distractiv"]
    },
    {
      id: 7,
      title: "Exerciții de Logică Zilnice",
      description: "Activități scurte de 10 minute care dezvoltă gândirea logică și pot fi integrate ușor în rutina zilnică.",
      image: "https://images.unsplash.com/photo-1670329504930-c469a0a195f7",
      imageAlt: "Logic puzzles and brain teasers spread on wooden table with pencils",
      type: "Worksheet",
      duration: "10 min/zi",
      downloads: 2876,
      rating: 4.7,
      tags: ["Logică", "Rutină", "Dezvoltare"]
    }],

    psychology: [
    {
      id: 8,
      title: "Înțelegerea Stilurilor de Învățare",
      description: "Cum să identificați stilul de învățare al copilului și să adaptați metodele de studiu pentru rezultate optime.",
      image: "https://images.unsplash.com/photo-1714929818864-48d3664c6c41",
      imageAlt: "Different learning style illustrations with visual, auditory and kinesthetic methods",
      type: "Ghid",
      duration: "20 min citire",
      downloads: 1987,
      rating: 4.8,
      tags: ["Stiluri", "Învățare", "Adaptare"]
    },
    {
      id: 9,
      title: "Construirea Încrederii în Sine",
      description: "Strategii psihologice pentru a ajuta copilul să dezvolte o imagine de sine pozitivă în relația cu matematica.",
      image: "https://images.unsplash.com/photo-1536337005238-94b997371b40",
      imageAlt: "Confident young student smiling while solving math problems at desk",
      type: "Workshop",
      duration: "45 min",
      downloads: 2341,
      rating: 4.9,
      tags: ["Încredere", "Imagine", "Dezvoltare"]
    }]

  };

  const currentResources = resources?.[activeCategory] || [];

  return (
    <div className="bg-card rounded-xl warm-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-bold text-primary">
          Biblioteca de Resurse pentru Părinți
        </h2>
        <Button variant="outline" iconName="Download" iconPosition="left">
          Descarcă Tot
        </Button>
      </div>
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) =>
        <button
          key={category?.id}
          onClick={() => setActiveCategory(category?.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-all duration-200 ${
          activeCategory === category?.id ?
          'bg-primary text-primary-foreground' :
          'bg-muted text-text-secondary hover:text-primary hover:bg-primary/10'}`
          }>

            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        )}
      </div>
      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentResources?.map((resource) =>
        <div key={resource?.id} className="bg-background rounded-lg border border-border overflow-hidden hover:warm-shadow transition-all duration-200">
            <div className="relative">
              <Image
              src={resource?.image}
              alt={resource?.imageAlt}
              className="w-full h-48 object-cover" />

              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                  {resource?.type}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs font-medium">{resource?.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-headline font-semibold text-text-primary mb-2 line-clamp-2">
                {resource?.title}
              </h3>
              <p className="text-sm text-text-secondary mb-3 line-clamp-3">
                {resource?.description}
              </p>

              <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{resource?.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={12} />
                  <span>{resource?.downloads?.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource?.tags?.map((tag, index) =>
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded">

                    {tag}
                  </span>
              )}
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" iconName="Eye" fullWidth>
                  Previzualizare
                </Button>
                <Button variant="default" size="sm" iconName="Download" fullWidth>
                  Descarcă
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Quick Access Section */}
      <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-headline font-semibold text-primary">
            Acces Rapid
          </h3>
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
            <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="HelpCircle" size={16} className="text-warning" />
            </div>
            <div>
              <h4 className="font-body font-medium text-text-primary">Întrebări Frecvente</h4>
              <p className="text-sm text-text-secondary">Răspunsuri rapide</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="font-body font-medium text-text-primary">Chat cu Experții</h4>
              <p className="text-sm text-text-secondary">Suport live</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={16} className="text-secondary" />
            </div>
            <div>
              <h4 className="font-body font-medium text-text-primary">Webinarii</h4>
              <p className="text-sm text-text-secondary">Sesiuni educative</p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ResourceLibrary;