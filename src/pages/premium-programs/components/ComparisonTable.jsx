import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProtectedButton from '../../../components/ProtectedButton';
import { homepagePremiumPrograms as programsData } from '../../../content/premiumPrograms';

// Normalize a set of key features that reflect our real offerings
const ROWS = [
  { key: 'fise', label: 'Fișe de matematică' },
  { key: 'simulari', label: 'Simulări complete' },
  { key: 'rezolvari', label: 'Rezolvări pas cu pas' },
  { key: 'teste', label: 'Teste de evaluare' },
  { key: 'sesiuni', label: 'Sesiuni live' },
  { key: 'suport', label: 'Suport prioritar / chat' },
  { key: 'exercitii', label: 'Exerciții interactive' },
  { key: 'materiale', label: 'Materiale descărcabile' },
  { key: 'rapoarte', label: 'Rapoarte de progres' },
  { key: 'program', label: 'Program de studiu personalizat' },
  { key: 'certificat', label: 'Certificat de completare' },
];

const hasKeyword = (features = [], words = []) =>
  features?.some(f => words?.some(w => f?.toLowerCase()?.includes(w)));

const deriveMatrix = (programs) => {
  return programs?.map(p => ({
    id: p.id,
    type: p.type,
    title: p.title,
    price: p.price,
    duration: p.duration,
    features: {
      fise: hasKeyword(p.features, ['fișe', 'fise']),
      simulari: hasKeyword(p.features, ['simulări', 'simulari']),
      rezolvari: hasKeyword(p.features, ['rezolvări', 'rezolvari']),
      teste: hasKeyword(p.features, ['test', 'evaluare']),
      sesiuni: hasKeyword(p.features, ['sesiuni live', 'live']),
      suport: hasKeyword(p.features, ['suport', 'chat']),
      exercitii: hasKeyword(p.features, ['exerciții interactive', 'exercitii interactive']),
      materiale: hasKeyword(p.features, ['materiale descărcabile', 'materiale descarcabile']),
      rapoarte: hasKeyword(p.features, ['rapoarte de progres', 'rapoarte']),
      program: hasKeyword(p.features, ['program', 'personalizate']),
      certificat: hasKeyword(p.features, ['certificat']),
    }
  }));
};

const renderCheck = (v) => v ? <Icon name="Check" size={18} className="text-accent mx-auto" /> : <Icon name="X" size={18} className="text-text-secondary/40 mx-auto" />;

const ComparisonTable = () => {
  const programs = deriveMatrix(programsData);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-bold text-text-primary mb-4">Comparație Programe Premium</h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">Trei programe, obiective diferite. Alege pachetul care ți se potrivește.</p>
        </div>

        {/* Comparison Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden warm-shadow">
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-border">
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg text-text-primary">Caracteristici</h3>
            </div>
            {programs?.map((p) => (
              <div key={p.id} className="p-6 text-center relative bg-muted/30 border-l border-border">
                <h4 className="font-headline font-bold text-lg mb-1 text-text-primary">{p.title}</h4>
                <div className="mb-2 text-text-secondary text-sm">{p.duration}</div>
                <div className="mb-3">
                  <span className="text-2xl font-bold text-text-primary">{new Intl.NumberFormat('ro-RO',{style:'currency',currency:'RON'})?.format(p.price)}</span>
                </div>
                <ProtectedButton
                  planId={p.id}
                  planType={p.type}
                  variant="default"
                  className="w-full"
                >
                  Alege Planul
                </ProtectedButton>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="divide-y divide-border">
            {ROWS.map(row => (
              <div key={row.key} className="grid grid-cols-4 hover:bg-muted/20 transition-colors duration-200">
                <div className="p-4 font-body text-text-secondary">{row.label}</div>
                {programs.map(p => (
                  <div key={p.id+row.key} className="p-4 text-center border-l border-border">
                    {renderCheck(p.features[row.key])}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-muted/30 p-6 text-center">
            <p className="font-body text-text-secondary mb-4">
              Toate planurile includ acces la comunitatea Mate cu succes și suport prietenos.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button asChild variant="outline" size="sm">
                <a href="/intrebari-frecvente">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Întrebări Frecvente
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 max-w-2xl mx-auto">
            <Icon name="Heart" size={24} className="text-accent mx-auto mb-3" />
            <h4 className="font-headline font-bold text-accent mb-2">Impact Social Garantat</h4>
            <p className="font-body text-text-secondary">
              Fiecare abonament Premium și Elite contribuie direct la fondul de burse pentru elevii cu nevoi speciale. 
              Până acum am oferit peste 1,250 de burse complete!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;