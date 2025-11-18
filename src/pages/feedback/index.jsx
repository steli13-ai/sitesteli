import React, { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHero from '@/components/ui/PageHero';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', rating: '5', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`[Feedback] ${form.subject || 'Fără subiect'}`);
    const body = encodeURIComponent([
      `Nume: ${form.name}`,
      `Email: ${form.email}`,
      `Rating: ${form.rating}/5`,
      '',
      'Mesaj:',
      form.message,
      '',
      'Informații tehnice:',
      `URL: ${typeof window !== 'undefined' ? window.location.origin : ''}`,
      `Browser: ${typeof navigator !== 'undefined' ? navigator.userAgent : ''}`,
    ].join('\n'));
    return `mailto:contact@matecusucces.ro?subject=${subject}&body=${body}`;
  }, [form]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setSending(true);
    window.location.href = mailtoHref;
    setTimeout(() => setSending(false), 500);
  }, [form, mailtoHref]);

  return (
    <>
      <Helmet>
        <title>Feedback | Mate cu Succes</title>
        <meta name="description" content="Trimite-ne feedbackul tău despre platformă. Ne ajută să devenim mai buni în fiecare zi." />
        <link rel="canonical" href="https://matecusucces.ro/feedback" />
      </Helmet>

      <PageHero title="Trimite Feedback" subtitle="Spune-ne ce ți-a plăcut sau ce am putea îmbunătăți." />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-border/60 bg-card p-6 max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Nume" name="name" value={form.name} onChange={handleChange} placeholder="Numele tău" />
            <Input label="Email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="adresa@exemplu.ro" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Subiect" name="subject" value={form.subject} onChange={handleChange} placeholder="Ex: Lecțiile sunt foarte clare" />
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="rating">Rating</label>
              <select id="rating" name="rating" value={form.rating} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} / 5</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="msg">Mesaj</label>
            <textarea id="msg" name="message" required value={form.message} onChange={handleChange} placeholder="Scrie aici mesajul tău..." className="min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={!form.email || !form.message || sending} loading={sending} iconName="send" iconPosition="right">Trimite feedback</Button>
            <Button asChild variant="outline"><a href={mailtoHref}>Deschide emailul (alternativ)</a></Button>
          </div>
        </form>
      </section>
    </>
  );
}
