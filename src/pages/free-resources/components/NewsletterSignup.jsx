import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { supabase } from '@/lib/supabase';

const NewsletterSignup = ({ source = 'free-resources' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(true);

  const isValidEmail = (val) => /.+@.+\..+/.test(String(val || '').toLowerCase());

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    if (!email || !isValidEmail(email)) {
      setError('Te rugăm să introduci un email valid.');
      return;
    }
    if (!consent) {
      setError('Trebuie să îți exprimi acordul pentru a continua.');
      return;
    }

    // Basic bot protection
    if (honeypot) {
      return; // silently drop
    }

    setIsLoading(true);
    try {
      // Client-side minimal rate limit/dedupe (per device)
      const key = `newsletter_last_${email.toLowerCase()}`;
      const last = Number(localStorage.getItem(key) || 0);
      if (Date.now() - last < 60_000) {
        setIsSubscribed(true);
        setIsLoading(false);
        return;
      }

      // Try to save in Supabase when keys are configured
      const { data, error: dbError } = await supabase
        .from('newsletter_subscribers')
        .insert({ email, source, created_at: new Date().toISOString() })
        .select()
        .single();

      // Treat duplicate as success
      const isDuplicate = dbError && /duplicate|unique/i.test(dbError.message || '');
      if (dbError && !isDuplicate) {
        // As a graceful fallback (in preview or when env is missing), open a prefilled email
        const subject = encodeURIComponent('[Abonare Newsletter] Mate cu Succes');
        const body = encodeURIComponent(`Email: ${email}\nSursa: ${source}\nData: ${new Date().toISOString()}`);
        try { window.open(`mailto:contact@matecusucces.ro?subject=${subject}&body=${body}`, '_blank'); } catch {}
      }

      // Store last subscribe time
      try { localStorage.setItem(key, String(Date.now())); } catch {}
      setIsSubscribed(true);
    } catch (e) {
      setError('A apărut o problemă. Încearcă din nou mai târziu.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-accent-foreground" />
        </div>
        <h3 className="font-headline font-bold text-xl text-text-primary mb-2">
          Mulțumim pentru abonare! 🎉
        </h3>
        <p className="text-text-secondary">
          Vei primi săptămânal cele mai noi resurse matematice direct în inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} className="text-primary-foreground" />
        </div>
        <h3 className="font-headline font-bold text-xl text-text-primary mb-2">
          Primește resurse noi săptămânal
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Abonează-te la newsletter-ul nostru și fii primul care află despre noile materiale educaționale.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="adresa@email.com"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            required
            className="flex-1"
            autoComplete="email"
          />
          {/* Honeypot field (hidden) */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            disabled={!isValidEmail(email) || isLoading}
            iconName="Send"
            iconPosition="right"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold"
          >
            {isLoading ? 'Se abonează...' : 'Abonează-te'}
          </Button>
        </div>
        <div className="mt-2 flex items-start gap-2 justify-center">
          <input id="consent" type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} className="mt-0.5 h-4 w-4" />
          <label htmlFor="consent" className="text-xs text-text-secondary">
            Sunt de acord să primesc emailuri conform <a className="underline text-primary" href="/politica-confidentialitate">Politicii de Confidențialitate</a>.
          </label>
        </div>
        {error ? (
          <p className="text-xs text-destructive mt-2 text-center">{error}</p>
        ) : null}
        <p className="text-xs text-text-secondary mt-3 text-center">
          Nu spam, doar conținut educațional de calitate. Poți să te dezabonezi oricând.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;