import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Icon from '@/components/AppIcon';

const DonatePage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [story, setStory] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (val) => !val || /.+@.+\..+/.test(String(val || '').toLowerCase());

  const onSubmit = (e) => {
    e?.preventDefault?.();
    setError('');

    if (!story || story.trim().length < 20) {
      setError('Scrie câteva rânduri (minim 20 de caractere) despre poveste sau motivul donației.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Email invalid. Poți lăsa gol dacă nu vrei să-l completezi.');
      return;
    }
    if (!consent) {
      setError('Trebuie să îți exprimi acordul pentru a trimite formulatul.');
      return;
    }
    if (honeypot) return; // ignore bots

  const subject = encodeURIComponent('[Poveste donație] Mate cu succes');
    const bodyLines = [
      fullName ? `Nume: ${fullName}` : null,
      email ? `Email: ${email}` : null,
      `\nPoveste:`,
      story,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join('\n'));
    try { window.open(`mailto:contact@matecusucces.ro?subject=${subject}&body=${body}`, '_blank'); } catch {}
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Donează | Mate cu succes</title>
        <meta name="description" content="Află misiunea Mate cu succes și contribuie la susținerea resurselor gratuite pentru elevi. Trimite-ne povestea ta dacă vrei să donezi." />
      </Helmet>

      <PageHero
        title="Împreună facem binele posibil"
        subtitle="Susține misiunea Mate cu succes de a oferi resurse gratuite și șanse egale pentru fiecare elev."
        icon="Heart"
      />

      <section className="py-12 px-4 lg:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl p-6 warm-shadow">
              <h2 className="font-headline font-semibold text-2xl text-text-primary mb-3">Misiunea noastră</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Credem că educația de calitate ar trebui să fie accesibilă tuturor. Cu ajutorul tău, putem
                crea și menține materiale gratuite, simulări de examene, ghiduri și instrumente care îi ajută pe elevi
                să își atingă potențialul. Donațiile susțin atât costurile de dezvoltare, cât și inițiativele sociale
                (ex: rechizite pentru copii din medii defavorizate).
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Resurse gratuite actualizate pentru Evaluare Națională și Bacalaureat</li>
                <li>Simulări și explicații pas cu pas pentru înțelegere profundă</li>
                <li>Burse și sprijin punctual pentru elevi cu posibilități reduse</li>
              </ul>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
              <h3 className="font-headline font-semibold text-xl text-text-primary mb-3">Cum poți ajuta</h3>
              <p className="text-text-secondary mb-4">
                Dacă vrei să donezi, spune-ne în câteva rânduri povestea sau motivația ta. Îți vom scrie înapoi cu
                detaliile (cont bancar și opțiuni de plată) și îți vom arăta cum contribuția ta face diferența.
              </p>
              {submitted ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="CheckCircle" size={28} className="text-success-foreground" />
                  </div>
                  <p className="text-text-primary font-medium">Mulțumim! Te vom contacta în curând.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Nume (opțional)" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Nume Prenume" />
                    <Input type="email" label="Email (opțional)" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="adresa@email.com" />
                  </div>
                  {/* honeypot */}
                  <input type="text" value={honeypot} onChange={(e)=>setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Povestea ta (obligatoriu)</label>
                    <textarea
                      className="w-full rounded-md border border-input bg-background p-3 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[140px]"
                      value={story}
                      onChange={(e)=>setStory(e.target.value)}
                      placeholder="Spune-ne de ce vrei să donezi și la ce te gândești să contribuie donația ta..."
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input id="consent" type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} className="mt-1 h-4 w-4" />
                    <label htmlFor="consent" className="text-xs text-text-secondary">
                      Sunt de acord să fiu contactat(ă) conform <a className="underline text-primary" href="/politica-confidentialitate">Politicii de Confidențialitate</a>.
                    </label>
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}

                  <div className="flex gap-3">
                    <Button type="submit" iconName="Send" iconPosition="right" className="font-cta font-semibold">Trimite Povestea</Button>
                    <Button
                      variant="outline"
                      asChild
                    >
                      <a href="mailto:contact@matecusucces.ro?subject=Vreau%20sa%20donez%20-%20Mate%20cu%20succes">Scrie-ne direct</a>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-card rounded-xl p-6">
              <h4 className="font-headline font-semibold text-lg text-text-primary mb-2">Transparență</h4>
              <p className="text-sm text-text-secondary">
                Publicăm periodic un rezumat al impactului: numărul elevilor ajutați, resurse noi create și proiecte
                sprijinite din fondurile primite.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6">
              <h4 className="font-headline font-semibold text-lg text-text-primary mb-2">Întrebări?</h4>
              <p className="text-sm text-text-secondary mb-3">Ne poți scrie oricând și pe email: contact@matecusucces.ro</p>
              <Button asChild variant="link" iconName="HelpCircle">
                <a href="/intrebari-frecvente">Vezi întrebările frecvente</a>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default DonatePage;
