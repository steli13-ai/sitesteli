import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const SupportParentsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [botField, setBotField] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const categories = [
    { value: 'cont', label: 'Cont și autentificare' },
    { value: 'plata', label: 'Plată/abonament' },
    { value: 'resurse', label: 'Resurse și conținut' },
    { value: 'tehnic', label: 'Problemă tehnică' },
    { value: 'altul', label: 'Altă solicitare' },
  ];

  const isValidEmail = (v) => /.+@.+\..+/.test((v || '').toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (botField) return; // honeypot
    if (!name || !email || !isValidEmail(email) || !category || !subject || !message || !consent) {
      setError('Completează toate câmpurile obligatorii și bifează consimțământul.');
      return;
    }

    const body = [
      `Nume: ${name}`,
      `Email: ${email}`,
      `Categorie: ${category}`,
      `Subiect: ${subject}`,
      '',
      message,
    ].join('\n');

    const mailto = `mailto:contact@matecusucces.ro?subject=${encodeURIComponent('[Suport Părinți] ' + subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Suport Părinți | Mate cu Succes</title>
        <meta name="description" content="Trimite o solicitare către echipa de suport pentru părinți. Spune-ne problema și datele de contact." />
        <link rel="canonical" href={`${window.location.origin}/suport-parinti`} />
      </Helmet>

      <section className="pt-20 pb-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <Icon name="HeartHandshake" size={40} className="text-primary mx-auto mb-2" />
            <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">Contactează Echipa de Suport</h1>
            <p className="text-text-secondary">Completează formularul de mai jos și revenim cât mai curând.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-border p-6 space-y-4">
            {/* Honeypot */}
            <input type="text" value={botField} onChange={(e)=>setBotField(e.target.value)} className="hidden" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nume și Prenume" required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Numele dvs" />
              <Input label="Email" required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="adresa@email.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Categorie" required value={category} onChange={setCategory}
                options={categories} placeholder="Alege categoria" />
              <Input label="Subiect" required value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Pe scurt despre problemă" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Mesaj</label>
              <textarea
                className="w-full min-h-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Descrie problema cât mai clar (pași, mesaje de eroare, dispozitiv, browser etc.)"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start gap-3">
              <Input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} />
              <span className="text-sm text-text-secondary">Sunt de acord cu prelucrarea datelor conform <a href="/politica-confidentialitate" className="underline text-primary">Politicii de Confidențialitate</a>.</span>
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
            )}

            <div className="flex justify-end">
              <Button type="submit" size="lg" iconName="Send" className="bg-primary text-white">Trimite solicitarea</Button>
            </div>

            {sent && (
              <div className="mt-3 p-3 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm">
                Solicitarea a fost pregătită în clientul tău de email. Dacă nu s-a deschis, ne poți scrie direct la contact@matecusucces.ro.
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default SupportParentsPage;
