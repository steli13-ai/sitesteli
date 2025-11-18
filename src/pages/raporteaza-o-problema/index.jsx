import React, { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHero from '@/components/ui/PageHero';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const ISSUE_TYPES = [
  { value: 'functional', label: 'Eroare funcțională (buton, pagină, autentificare)' },
  { value: 'continut', label: 'Problemă conținut (lecție, exercițiu, text)' },
  { value: 'plata', label: 'Plată/abonament' },
  { value: 'performanta', label: 'Viteză/performanță' },
  { value: 'altul', label: 'Alt tip de problemă' },
];

export default function ReportProblemPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    type: ISSUE_TYPES[0].value,
    description: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  const mailtoHref = useMemo(() => {
    const lines = [
      `Nume: ${form.name}`,
      `Email: ${form.email}`,
      `Tip problemă: ${form.type}`,
      `Subiect: ${form.subject}`,
      '',
      'Descriere:',
      form.description,
      '',
      'Informații tehnice:',
      `URL: ${typeof window !== 'undefined' ? window.location.origin : ''}`,
      `Browser: ${typeof navigator !== 'undefined' ? navigator.userAgent : ''}`,
    ];
    const subject = encodeURIComponent(`[Raportare] ${form.type} — ${form.subject || 'Fără subiect'}`);
    const body = encodeURIComponent(lines.join('\n'));
    return `mailto:contact@matecusucces.ro?subject=${subject}&body=${body}`;
  }, [form]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!form.email || !form.description) return;
    setSubmitting(true);
    // Open mail client with prefilled message
    window.location.href = mailtoHref;
    setTimeout(() => setSubmitting(false), 500);
  }, [form, mailtoHref]);

  return (
    <>
      <Helmet>
        <title>Raportează o Problemă | Mate cu Succes</title>
        <meta name="description" content="Ai întâmpinat o problemă pe platformă? Trimite-ne rapid detalii ca să o rezolvăm." />
        <link rel="canonical" href="https://matecusucces.ro/raporteaza-o-problema" />
      </Helmet>

      <PageHero
        title="Raportează o Problemă"
        subtitle="Spune-ne ce nu a mers și rezolvăm în cel mai scurt timp. Te rugăm să oferi cât mai multe detalii."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr,340px]">
          <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-border/60 bg-card p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Nume" name="name" value={form.name} onChange={handleChange} placeholder="Numele tău" />
              <Input label="Email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="adresa@exemplu.ro" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Subiect" name="subject" value={form.subject} onChange={handleChange} placeholder="Ex: Formularul nu se trimite" />
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tip problemă</label>
                <select name="type" value={form.type} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  {ISSUE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="desc">Descriere</label>
              <textarea
                id="desc"
                name="description"
                required
                value={form.description}
                onChange={handleChange}
                placeholder="Descrie pașii pe care i-ai urmat și ce s-a întâmplat. Include linkul paginii și eventuale mesaje de eroare."
                className="min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <p className="text-xs text-muted-foreground">Poți atașa capturi de ecran în emailul care se va deschide după trimitere.</p>
            </div>

            <div className="flex items-center gap-3">
              <input id="consent" type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="h-4 w-4 rounded border border-input text-primary focus:ring-2 focus:ring-ring" />
              <label htmlFor="consent" className="text-sm text-text-secondary">Sunt de acord ca datele oferite să fie folosite pentru a investiga această problemă.</label>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" disabled={!form.email || !form.description || submitting} loading={submitting} iconName="send" iconPosition="right">
                Trimite raportul
              </Button>
              <Button asChild variant="outline">
                <a href={mailtoHref}>Deschide emailul (alternativ)</a>
              </Button>
              <Button asChild variant="ghost">
                <a href="/contact">Contactează-ne</a>
              </Button>
            </div>
          </form>

          <aside className="space-y-4 h-fit rounded-xl border border-border/60 bg-background p-5">
            <h3 className="font-heading text-lg text-text-primary">Sfaturi pentru un raport util</h3>
            <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1">
              <li>Spune-ne ce ai vrut să faci și ce s-a întâmplat.</li>
              <li>Include linkul paginii și orice mesaj de eroare.</li>
              <li>Adaugă capturi de ecran sau un scurt video dacă poți.</li>
              <li>Menționează dispozitivul, browserul și conexiunea.</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
