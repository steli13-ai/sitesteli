import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgramGrid = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');

  const programs = [
    {
      id: 1,
      title: "Intensiv BAC Matematică",
      subtitle: "Pregătire completă pentru Bacalaureat",
      grade: "12",
      duration: "6 luni",
      sessions: "48 ore",
      price: 2499,
      originalPrice: 3299,
      features: [
        "Sesiuni live cu profesori experți",
        "Materiale exclusive și teste practice",
        "Simulări complete de examen",
        "Suport individual 24/7",
        "Garanție de îmbunătățire a notei"
      ],
      highlights: [
        { icon: "Trophy", text: "98% rată de promovare" },
        { icon: "Users", text: "Max 12 elevi/grupă" },
        { icon: "Clock", text: "Flexibilitate orar" }
      ],
      badge: "Cel mai popular",
      badgeColor: "bg-warning text-warning-foreground",
      socialImpact: "3 burse complete pentru elevi defavorizați"
    },
    {
      id: 2,
      title: "Evaluare Națională Plus",
      subtitle: "Pregătire intensivă pentru clasa a VIII-a",
      grade: "8",
      duration: "4 luni",
      sessions: "32 ore",
      price: 1899,
      originalPrice: 2499,
      features: [
        "Curriculum adaptat la programa 2024",
        "Teste săptămânale de evaluare",
        "Sesiuni de remediere personalizate",
        "Acces la platforma de exerciții",
        "Consultații cu părinții"
      ],
      highlights: [
        { icon: "Target", text: "Medie 9.2 la absolvire" },
        { icon: "BookOpen", text: "500+ exerciții rezolvate" },
        { icon: "MessageCircle", text: "Chat direct cu profesorul" }
      ],
      badge: "Recomandat",
      badgeColor: "bg-accent text-accent-foreground",
      socialImpact: "2 burse complete pentru elevi din mediul rural"
    },
    {
      id: 3,
      title: "Matematică Avansată 5-7",
      subtitle: "Fundamente solide pentru gimnaziu",
      grade: "5-7",
      duration: "8 luni",
      sessions: "64 ore",
      price: 1699,
      originalPrice: 2199,
      features: [
        "Abordare pas cu pas pentru fiecare concept",
        "Jocuri educaționale interactive",
        "Progres urmărit în timp real",
        "Sesiuni de grup și individuale",
        "Implicarea părinților în proces"
      ],
      highlights: [
        { icon: "Smile", text: "Anxietatea redusă cu 85%" },
        { icon: "TrendingUp", text: "Îmbunătățire medie +2.3 puncte" },
        { icon: "Heart", text: "Suport emoțional inclus" }
      ],
      badge: "Nou",
      badgeColor: "bg-trust text-trust-foreground",
      socialImpact: "5 burse parțiale pentru familii monoparentale"
    },
    {
      id: 4,
      title: "Olimpiadă Matematică",
      subtitle: "Pentru elevii cu performanțe înalte",
      grade: "9-12",
      duration: "10 luni",
      sessions: "80 ore",
      price: 3299,
      originalPrice: 4199,
      features: [
        "Probleme de nivel olimpic",
        "Mentoring individual cu campioni",
        "Participare la concursuri naționale",
        "Tabere de pregătire intensive",
        "Certificare internațională"
      ],
      highlights: [
        { icon: "Award", text: "15 medalii în ultimul an" },
        { icon: "Brain", text: "Dezvoltare gândire critică" },
        { icon: "Globe", text: "Recunoaștere internațională" }
      ],
      badge: "Elite",
      badgeColor: "bg-secondary text-secondary-foreground",
      socialImpact: "1 bursă completă pentru talent excepțional"
    }
  ];

  const grades = [
    { value: 'all', label: 'Toate clasele' },
    { value: '5-7', label: 'Clasele 5-7' },
    { value: '8', label: 'Clasa a VIII-a' },
    { value: '9-12', label: 'Clasele 9-12' },
    { value: '12', label: 'Clasa a XII-a' }
  ];

  const filteredPrograms = selectedGrade === 'all' 
    ? programs 
    : programs?.filter(program => program?.grade === selectedGrade);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Alege Programul Perfect Pentru Tine
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Fiecare program este conceput să transforme anxietatea matematică în încredere solidă, 
            cu impact social garantat pentru comunitatea noastră.
          </p>

          {/* Grade Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {grades?.map((grade) => (
              <button
                key={grade?.value}
                onClick={() => setSelectedGrade(grade?.value)}
                className={`px-4 py-2 rounded-lg font-body font-medium transition-all duration-200 ${
                  selectedGrade === grade?.value
                    ? 'bg-primary text-primary-foreground warm-shadow'
                    : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {grade?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPrograms?.map((program) => (
            <div
              key={program?.id}
              className="bg-card border border-border rounded-2xl p-8 warm-shadow hover:warm-shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Badge */}
              {program?.badge && (
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-semibold ${program?.badgeColor}`}>
                  {program?.badge}
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="font-headline text-2xl font-bold text-text-primary mb-2">
                  {program?.title}
                </h3>
                <p className="font-body text-text-secondary mb-4">
                  {program?.subtitle}
                </p>

                {/* Program Details */}
                <div className="flex items-center space-x-6 text-sm text-text-secondary mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>{program?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{program?.sessions}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="GraduationCap" size={16} />
                    <span>Clasa {program?.grade}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {program?.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Icon name={highlight?.icon} size={16} className="text-primary" />
                      <span className="text-text-secondary">{highlight?.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-body font-semibold text-text-primary mb-3">Ce include:</h4>
                <ul className="space-y-2">
                  {program?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Impact */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <Icon name="Heart" size={16} className="text-accent mt-0.5" />
                  <div>
                    <h5 className="font-body font-semibold text-accent mb-1">Impact Social</h5>
                    <p className="text-sm text-text-secondary">{program?.socialImpact}</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-text-primary">{program?.price} RON</span>
                    <span className="text-lg text-text-secondary line-through">{program?.originalPrice} RON</span>
                  </div>
                  <p className="text-sm text-text-secondary">Plată în rate disponibilă</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-accent">
                    Economisești {program?.originalPrice - program?.price} RON
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Button 
                  variant="default" 
                  fullWidth
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold"
                >
                  Înscrie-te Acum
                </Button>
                <Button 
                  variant="outline" 
                  fullWidth
                  className="font-cta"
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Previzualizare Program
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-text-secondary mb-4">
            Nu găsești programul potrivit? Hai să vorbim!
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="font-cta font-semibold"
          >
            <Icon name="MessageCircle" size={20} className="mr-2" />
            Consultație Gratuită
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramGrid;