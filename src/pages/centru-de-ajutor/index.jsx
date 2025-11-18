import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageHero from '@/components/ui/PageHero';
import Input from '@/components/ui/Input';

export default function HelpCenterPage() {
  return (
    <>
      <Helmet>
        <title>Centru de Ajutor | Mate cu Succes</title>
        <meta name="description" content="Găsește rapid ajutor: întrebări frecvente, contact, raportează o problemă și resurse utile pentru Mate cu Succes." />
        <link rel="canonical" href="https://matecusucces.ro/centru-de-ajutor" />
      </Helmet>

      <PageHero
        title="Centru de Ajutor"
        subtitle="Suntem aici să te ajutăm. Alege o opțiune sau caută răspunsul de care ai nevoie."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* (UI) Search box - nu indexează, doar navigațional */}
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <div className="max-w-2xl">
            <Input placeholder="Caută în întrebări (ex: abonament, parolă, plată)" aria-label="Caută" />
            <p className="mt-2 text-xs text-muted-foreground">Pentru acum, folosește căutarea din browser (Ctrl+F) pe pagina de Întrebări Frecvente.</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/intrebari-frecvente" className="group rounded-xl border border-border/60 bg-background p-5 hover:border-primary/40 transition-colors">
            <h3 className="font-heading text-lg text-text-primary group-hover:text-primary">Întrebări Frecvente</h3>
            <p className="text-sm text-text-secondary mt-1">Răspunsuri la cele mai comune întrebări despre cont, plăți și cursuri.</p>
          </Link>
          <Link to="/contact" className="group rounded-xl border border-border/60 bg-background p-5 hover:border-primary/40 transition-colors">
            <h3 className="font-heading text-lg text-text-primary group-hover:text-primary">Contact</h3>
            <p className="text-sm text-text-secondary mt-1">Nu ai găsit ce cauți? Trimite-ne un mesaj și te ajutăm.</p>
          </Link>
          <Link to="/raporteaza-o-problema" className="group rounded-xl border border-border/60 bg-background p-5 hover:border-primary/40 transition-colors">
            <h3 className="font-heading text-lg text-text-primary group-hover:text-primary">Raportează o Problemă</h3>
            <p className="text-sm text-text-secondary mt-1">Ai întâmpinat o eroare? Spune-ne ce s-a întâmplat.</p>
          </Link>
          <Link to="/free-resources" className="group rounded-xl border border-border/60 bg-background p-5 hover:border-primary/40 transition-colors">
            <h3 className="font-heading text-lg text-text-primary group-hover:text-primary">Resurse Gratuite</h3>
            <p className="text-sm text-text-secondary mt-1">Ghiduri și materiale care te pot ajuta rapid.</p>
          </Link>
          <Link to="/feedback" className="group rounded-xl border border-border/60 bg-background p-5 hover:border-primary/40 transition-colors">
            <h3 className="font-heading text-lg text-text-primary group-hover:text-primary">Trimite Feedback</h3>
            <p className="text-sm text-text-secondary mt-1">Idei de îmbunătățire sau aprecieri sunt binevenite.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
