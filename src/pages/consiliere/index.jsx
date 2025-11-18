import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Icon from '@/components/AppIcon';
import { supabase } from '@/lib/supabase';
import { safeInsert } from '@/lib/supabaseSafe';
import { toast } from 'react-hot-toast';

const ConsilierePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    topic: 'scolar',
    preferred_time: '',
    message: '',
  });

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  // Generate 30-minute time slots for a full day (00:00 - 24:00)
  const timeOptions = useMemo(() => {
    const opts = [];
    const step = 30; // minutes
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += step) {
        const start = `${h}:${String(m).padStart(2, '0')}`;
        let endH = h;
        let endM = m + step;
        if (endM >= 60) {
          endM -= 60;
          endH = (h + 1) % 24;
        }
        const end = `${endH}:${String(endM).padStart(2, '0')}`;
        const label = `${start}-${end}`; // e.g. 1:00-1:30
        opts.push({ value: label, label });
      }
    }
    return opts;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await safeInsert(
        supabase?.from('consultations')?.insert({ ...form, status: 'new' }).select().single(),
        'create consultation'
      );
      if (error) throw error;
      toast.success('Cererea ta a fost înregistrată. Te vom contacta în curând.');
      navigate('/');
    } catch (err) {
      toast.error('Nu am putut salva cererea. Te rugăm folosește pagina de contact.');
      navigate('/contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Vorbește cu un Consilier | Mate cu Succes</title>
        <meta name="description" content="Programează o discuție cu un consilier educațional și află ce ți se potrivește." />
      </Helmet>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Vorbește cu un Consilier</h1>
          <p className="text-text-secondary mb-6">Lasă-ne câteva detalii și te contactăm noi pentru o recomandare personalizată.</p>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 warm-shadow grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Nume complet</label>
                <Input name="full_name" value={form.full_name} onChange={onChange} required placeholder="Nume și prenume" />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Email</label>
                <Input type="email" name="email" value={form.email} onChange={onChange} required placeholder="ex: elev@exemplu.ro" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Telefon</label>
                <Input name="phone" value={form.phone} onChange={onChange} placeholder="07xx xxx xxx" />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Subiect</label>
                <Select
                  name="topic"
                  value={form.topic}
                  onChange={(val) => setForm((s) => ({ ...s, topic: val }))}
                  options={[
                    { value: 'scolar', label: 'Școlar' },
                    { value: 'personal', label: 'Personal' },
                    { value: 'familial', label: 'Familial' },
                  ]}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Interval preferat</label>
                <Select
                  name="preferred_time"
                  value={form.preferred_time}
                  onChange={(val) => setForm((s) => ({ ...s, preferred_time: val }))}
                  options={timeOptions}
                  searchable
                  clearable
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">Mesaj</label>
              <textarea name="message" value={form.message} onChange={onChange} rows={5} className="w-full border border-border rounded-md p-3 bg-background text-text-primary" placeholder="Spune-ne pe scurt cum te putem ajuta" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="Shield" size={14} />
                <span>Trimitem răspunsul prin email. Datele sunt protejate conform GDPR.</span>
              </div>
              <Button type="submit" size="lg" className="font-semibold" loading={loading}>
                Trimite cererea
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ConsilierePage;
