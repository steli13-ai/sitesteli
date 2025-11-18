import React, { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Icon from '@/components/AppIcon';
import ProtectedButton from '@/components/ProtectedButton';
import { premiumPrograms } from '@/content/premiumPrograms';

const OrientationTestPage = () => {
  const [grade, setGrade] = useState('');
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState('');
  const [style, setStyle] = useState('');
  const [done, setDone] = useState(false);

  const gradeOptions = useMemo(() => (
    [5,6,7,8,9,10,11,12].map(n => ({ label: `Clasa a ${n === 5 ? 'V-a' : n === 6 ? 'VI-a' : n === 7 ? 'VII-a' : n === 8 ? 'VIII-a' : n === 9 ? 'IX-a' : n === 10 ? 'X-a' : n === 11 ? 'XI-a' : 'XII-a'}`, value: String(n) }))
  ), []);

  const isMiddle = useMemo(() => {
    const g = parseInt(grade, 10);
    return !isNaN(g) && g >= 5 && g <= 8;
  }, [grade]);

  const isHigh = useMemo(() => {
    const g = parseInt(grade, 10);
    return !isNaN(g) && g >= 9 && g <= 12;
  }, [grade]);

  const goalOptions = useMemo(() => {
    if (isMiddle) {
      return [
        { label: 'Să-mi măresc notele', value: 'note' },
        { label: 'Aprofundare', value: 'aprofundare' },
        { label: 'Pregătire olimpiade', value: 'olimpiade' },
        { label: 'Evaluare Națională', value: 'evaluare' },
      ];
    }
    if (isHigh) {
      return [
        { label: 'Să-mi măresc notele', value: 'note' },
        { label: 'Pregătire olimpiade', value: 'olimpiade' },
        { label: 'Aprofundare', value: 'aprofundare' },
        { label: 'Pregătire BAC', value: 'bac' },
      ];
    }
    // fallback when no grade chosen yet
    return [
      { label: 'Să-mi măresc notele', value: 'note' },
      { label: 'Aprofundare', value: 'aprofundare' },
      { label: 'Pregătire olimpiade', value: 'olimpiade' },
      { label: 'Evaluare Națională / BAC', value: 'examen' },
    ];
  }, [isMiddle, isHigh]);

  // Reset goal if it no longer matches group
  useEffect(() => {
    if (isMiddle && goal === 'bac') setGoal('');
    if (isHigh && goal === 'evaluare') setGoal('');
  }, [isMiddle, isHigh]);

  const timeOptions = [
    { label: '2 ore', value: '2h' },
    { label: '6 ore', value: '6h' },
    { label: '10 ore minim', value: '10h' },
    { label: 'Nu am timp', value: 'no-time' },
  ];

  const styleOptions = [
    { label: 'Curs', value: 'curs' },
    { label: 'Pregătire individuală', value: 'individual' },
    { label: 'Pregătire grupă (2-4 persoane)', value: 'grupa' },
  ];

  const recommend = useMemo(() => {
    if (goal === 'bac') return 'bac_2025';
    if (goal === 'evaluare') return 'evaluare_nationala';
    // pentru note/aprofundare/olimpiade recomandăm cursuri premium ca default
    return 'premium_cursuri';
  }, [goal]);

  const program = premiumPrograms.find(p => p.id === recommend);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Test de Orientare | Mate cu Succes</title>
        <meta name="description" content="Fă testul rapid de orientare și primește o recomandare de program personalizată." />
      </Helmet>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="text-3xl font-bold text-text-primary mb-2">
            Nu știi de unde să începi?
          </motion.h1>
          <p className="text-text-secondary mb-8">Răspunde la câteva întrebări (2 minute) și îți recomandăm programul potrivit.</p>

          <div className="bg-card border border-border rounded-2xl p-6 warm-shadow">
            <div className="grid gap-5">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Clasa</label>
                <Select
                  value={grade}
                  onChange={setGrade}
                  options={gradeOptions}
                  placeholder="Selectează clasa"
                  clearable
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Obiectivul tău principal</label>
                <Select
                  value={goal}
                  onChange={setGoal}
                  options={goalOptions}
                  placeholder={isMiddle ? 'Ex: Evaluare Națională' : isHigh ? 'Ex: Pregătire BAC' : 'Selectează obiectivul'}
                  clearable
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Timp pe săptămână</label>
                <Select
                  value={time}
                  onChange={setTime}
                  options={timeOptions}
                  placeholder="Alege timpul disponibil"
                  clearable
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Preferință de învățare (online exclusiv)</label>
                <Select
                  value={style}
                  onChange={setStyle}
                  options={styleOptions}
                  placeholder="Alege preferința de învățare"
                  clearable
                />
              </div>
              <div className="pt-2">
                <Button onClick={() => setDone(true)} size="lg" className="w-full font-semibold">
                  <Icon name="Compass" size={18} className="mr-2" /> Vezi recomandarea mea
                </Button>
              </div>
            </div>
          </div>

          {done && program && (
            <div className="mt-8 bg-muted/30 border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-text-primary mb-2">Recomandarea noastră</h2>
              <p className="text-text-secondary mb-4">Pe baza răspunsurilor tale îți recomandăm:</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-text-primary">{program.title}</div>
                  <div className="text-sm text-text-secondary">{program.subtitle || program.description}</div>
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline">
                    <a href={`/premium-programs?plan=${program.id}`}>Vezi detalii</a>
                  </Button>
                  <ProtectedButton planId={program.id} planType={program.id} className="font-semibold">
                    Începe acum
                  </ProtectedButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrientationTestPage;
