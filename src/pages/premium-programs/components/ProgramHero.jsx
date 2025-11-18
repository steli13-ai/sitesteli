import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgramHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/10 text-6xl font-bold math-symbol-float">
          ∫
        </div>
        <div className="absolute top-32 right-20 text-secondary/10 text-4xl font-bold math-symbol-float">
          ∞
        </div>
        <div className="absolute bottom-20 left-1/4 text-accent/10 text-5xl font-bold math-symbol-float">
          Σ
        </div>
        <div className="absolute top-40 left-1/2 text-trust/10 text-3xl font-bold math-symbol-float">
          π
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-warning/20 text-warning-foreground px-4 py-2 rounded-full mb-6 warm-shadow">
            <Icon name="Heart" size={16} className="text-warning" />
            <span className="font-cta font-semibold text-sm">Învață & Donează</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-headline text-4xl lg:text-6xl font-bold text-text-primary mb-6">
            Programe Premium cu
            <span className="text-primary block mt-2">Impact Social 💙</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg lg:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Transformă-ți anxietatea matematică în încredere solidă prin programele noastre intensive. 
            Fiecare înscriere contribuie la accesul gratuit pentru elevii cu nevoi speciale.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">2,847</div>
              <div className="text-sm text-text-secondary font-body">Elevi transformați</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-secondary mb-1">94%</div>
              <div className="text-sm text-text-secondary font-body">Rată de succes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-accent mb-1">1,250</div>
              <div className="text-sm text-text-secondary font-body">Burse oferite</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-trust mb-1">15</div>
              <div className="text-sm text-text-secondary font-body">Ani experiență</div>
            </div>
          </div>

          {/* CTA Button - keep only Success Stories linked to Parent Resources */}
          <div className="flex items-center justify-center">
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="font-cta font-semibold px-8"
            >
              <a href="/parent-resources">
                <Icon name="Play" size={20} className="mr-2" />
                Vezi Poveștile de Succes
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-text-secondary mb-4 font-body">Recunoscut de:</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-xs font-semibold text-text-secondary">Ministerul Educației</div>
              <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
              <div className="text-xs font-semibold text-text-secondary">Inspectoratul Școlar</div>
              <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
              <div className="text-xs font-semibold text-text-secondary">Asociația Profesorilor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramHero;