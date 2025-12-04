import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabase';
import { logger } from '@/utils/logger';
import useUser from '@/hooks/useUser';

// Years & subjects mock data – can be replaced with API later
const AVAILABLE_YEARS = [2024, 2023, 2022, 2021, 2020, 2019];
const SUBJECTS = ['Matematică', 'Limba Română'];

const STORAGE_KEY = 'm4a_exam_sim_state';
const CHANNEL_NAME = 'exam-sim';

function SimulareExamenPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [year, setYear] = useState(null);
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLimit, setTimeLimit] = useState(90); // minutes
  const [secondsLeft, setSecondsLeft] = useState(timeLimit * 60);
  const [fileInfo, setFileInfo] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const intervalRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [extendedMinutes, setExtendedMinutes] = useState(0); // total minutes added post start
  const bcRef = useRef(null);

  // Load persisted state (if user refreshed)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.startedAt && !data?.completed) {
          setYear(data.year);
          setSubject(data.subject);
          setTimeLimit(data.timeLimit || 90);
          setExtendedMinutes(data.extendedMinutes || 0);
          const elapsed = Math.floor((Date.now() - data.startedAt) / 1000);
          const effectiveLimitSeconds = (data.timeLimit + (data.extendedMinutes||0)) * 60;
          const remaining = Math.max(effectiveLimitSeconds - elapsed, 0);
          setSecondsLeft(remaining);
          setStartedAt(data.startedAt);
          if (remaining > 0) setIsRunning(true);
        }
      }
    } catch (_) {}
    // Setup BroadcastChannel for multi-tab sync
    try { bcRef.current = new BroadcastChannel(CHANNEL_NAME); } catch {}
    if (bcRef.current) {
      bcRef.current.onmessage = (ev) => {
        const data = ev.data;
        if (data?.type === 'STATE_SYNC' && data?.payload) {
          const p = data.payload;
          setYear(p.year);
          setSubject(p.subject);
          setTimeLimit(p.timeLimit);
          setExtendedMinutes(p.extendedMinutes||0);
          setStartedAt(p.startedAt);
          // recompute
          const elapsed = Math.floor((Date.now() - p.startedAt) / 1000);
          const effectiveLimitSeconds = (p.timeLimit + (p.extendedMinutes||0)) * 60;
          const remaining = Math.max(effectiveLimitSeconds - elapsed, 0);
          setSecondsLeft(remaining);
          setIsRunning(remaining > 0 && !p.completed);
        }
      };
    }
    // Listen to storage events (fallback if BroadcastChannel unsupported)
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const p = JSON.parse(e.newValue);
          if (p?.startedAt && !p?.completed) {
            setYear(p.year); setSubject(p.subject); setTimeLimit(p.timeLimit); setExtendedMinutes(p.extendedMinutes||0); setStartedAt(p.startedAt);
            const elapsed = Math.floor((Date.now() - p.startedAt) / 1000);
            const effectiveLimitSeconds = (p.timeLimit + (p.extendedMinutes||0)) * 60;
            setSecondsLeft(Math.max(effectiveLimitSeconds - elapsed, 0));
            setIsRunning(true);
          }
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener('storage', onStorage); bcRef.current?.close(); };
  }, []);

  // Persist state whenever relevant changes
  useEffect(() => {
    const payload = {
      year,
      subject,
      timeLimit,
      startedAt,
      extendedMinutes,
      completed: !!fileInfo || secondsLeft === 0,
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (_) {}
    try { bcRef.current?.postMessage({ type: 'STATE_SYNC', payload }); } catch {}
  }, [year, subject, timeLimit, startedAt, fileInfo, secondsLeft, extendedMinutes]);

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  };

  const startSimulation = () => {
    if (!year) return;
    setErrorMsg('');
    setStartedAt(Date.now());
    setSecondsLeft((timeLimit + extendedMinutes) * 60);
    setIsRunning(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');
    setUploadProgress(0);
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxBytes = 10 * 1024 * 1024;
    if (!allowed.includes(file.type) || file.size > maxBytes) {
      setErrorMsg('Fișier invalid. Acceptat: PDF/JPG/PNG și max 10MB.');
      return;
    }

    // Build storage path: userId/year/subject/timestamp.ext
    const stamp = Date.now();
    const ext = file.name.split('.').pop();
    const uid = user?.id || 'anon';
    // RLS requires first path segment == user id
    const path = `${uid}/${year || 'no-year'}/${subject.replace(/\s+/g,'-').toLowerCase()}/${stamp}.${ext}`;
    try {
      // Upload with progress (supabase-js lacks native progress; fallback to optimistic progress simulation)
      // We'll read the file to simulate progress locally, then upload the original file.
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onprogress = (ev) => {
          if (ev.lengthComputable) {
            const pct = Math.round((ev.loaded / ev.total) * 70); // up to 70% while reading
            setUploadProgress(pct);
          }
        };
        reader.onloadend = () => resolve();
        reader.readAsArrayBuffer(file);
      });

      const { data, error } = await supabase.storage.from('exam-submissions').upload(path, file, { upsert: true });
      if (error) throw error;
      setUploadProgress(85);
      // Insert metadata row (if authenticated & table exists). Use RPC for RLS-safe insert.
      const timeSpentSeconds = startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0;
      if (user?.id) {
        try {
          await supabase.rpc('create_exam_submission', {
            p_exam_year: year,
            p_subject: subject,
            p_duration_seconds: timeSpentSeconds,
            p_file_path: path,
            p_file_size_bytes: file.size,
            p_mime_type: file.type
          });
        } catch (_) { /* silent - metadata optional */ }
      }
      const { data: signed } = await supabase.storage.from('exam-submissions').createSignedUrl(path, 60 * 60); // 1h
      setUploadProgress(100);
      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        path: data?.path,
        signedUrl: signed?.signedUrl || '',
        timeSpentSeconds,
        year,
        subject,
      });
      setIsRunning(false);
      clearInterval(intervalRef.current);
    } catch (err) {
      setErrorMsg(err?.message || 'Eroare la încărcare.');
    }
  };

  const extendTime = () => {
    // Guard: allow extension only in last 5 minutes, max +60
    if (!startedAt) return;
    if (extendedMinutes >= 60) {
      setErrorMsg('Ai atins limita de extindere (+60 min).');
      return;
    }
    if (secondsLeft > 5 * 60) {
      setErrorMsg('Extensia este disponibilă doar în ultimele 5 minute.');
      logger.warn('ExtendTime blocked: secondsLeft', secondsLeft);
      return;
    }
    const add = 15;
    setExtendedMinutes(m => m + add);
    setSecondsLeft(s => s + add * 60);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setSecondsLeft((timeLimit) * 60);
    setFileInfo(null);
    setExtendedMinutes(0);
    setStartedAt(null);
    setUploadProgress(0);
    setErrorMsg('');
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 lg:px-6 bg-background">
      <Helmet>
        <title>Simulare Examen Matematică – Cronometru & Upload | Mate cu Succes</title>
        <meta name="description" content="Simulează examenul la matematică cu cronometru real: alege anul subiectului, lucrează sub presiune, apoi încarcă rezolvarea (PDF/JPG/PNG) pentru evaluare personală." />
        <link rel="canonical" href="https://matecusucces.ro/simulare-examen" />
        <meta property="og:title" content="Simulare Examen Matematică – Cronometru & Upload" />
        <meta property="og:description" content="Cronometru, selecție subiect pe ani, upload rapid al rezolvării. Exersează condițiile reale de examen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matecusucces.ro/simulare-examen" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Simulare examen matematică',
            description: 'Pagina de simulare examen matematică cu cronometru și încărcare rezolvare.',
            url: 'https://matecusucces.ro/simulare-examen'
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="font-headline font-bold text-3xl md:text-4xl text-text-primary mb-4">Simulare examen real</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Alege anul subiectului, pornește cronometrul și lucrează pe foaie.
            La final încarcă rezolvarea (poză/PDF). Cronometrul se oprește automat la upload.</p>
        </div>

        {/* Selection Panel */}
        {!startedAt && (
          <div className="bg-card rounded-xl p-6 warm-shadow mb-8">
            <h2 className="font-headline font-semibold text-xl mb-4 flex items-center"><Icon name="Target" size={20} className="mr-2"/>Alege subiectul</h2>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {AVAILABLE_YEARS.map(y => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${year === y ? 'bg-primary text-white border-primary' : 'bg-background border-border hover:border-primary/50'}`}
                >{y}</button>
              ))}
            </div>
            {errorMsg && <div className="mb-4 text-sm text-error bg-error/10 border border-error/30 rounded p-2">{errorMsg}</div>}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Materie</label>
              <select
                value={subject}
                onChange={(e)=> setSubject(e.target.value)}
                className="w-full p-3 rounded-lg border bg-background border-border focus:border-primary outline-none"
              >
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Timp limită (minute)</label>
              <input
                type="number"
                min={30}
                max={240}
                value={timeLimit}
                onChange={(e)=> setTimeLimit(Number(e.target.value)||90)}
                className="w-full p-3 rounded-lg border bg-background border-border focus:border-primary outline-none"
              />
            </div>
            <Button
              variant="default"
              onClick={startSimulation}
              disabled={!year}
              className="w-full font-cta font-semibold"
            >
              Începe simularea
              <Icon name="Play" size={18} className="ml-2"/>
            </Button>
          </div>
        )}

        {/* Active Simulation */}
        {startedAt && (
          <div className="bg-card rounded-xl p-6 warm-shadow mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} className="text-warning"/>
                <span data-testid="exam-timer" className="font-mono text-lg font-semibold">{formatTime(secondsLeft)}</span>
              </div>
              <div className="text-sm text-text-secondary mt-4 md:mt-0 flex items-center space-x-3">
                <span className="px-3 py-1 rounded-md bg-muted font-medium">An {year}</span>
                <span className="px-3 py-1 rounded-md bg-muted font-medium">{subject}</span>
                <span className="px-3 py-1 rounded-md bg-muted font-medium">Limită {timeLimit + extendedMinutes} min</span>
              </div>
            </div>

            {!fileInfo && (
              <div className="mb-6">
                <label htmlFor="exam-upload" className="block text-sm font-medium mb-2">Încarcă rezolvarea (PDF/JPG/PNG)</label>
                <input
                  id="exam-upload"
                  data-testid="exam-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
                />
                <p className="text-xs text-text-secondary mt-2">Cronometrul se va opri automat la încărcare.</p>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-3 h-3 w-full bg-muted rounded overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${uploadProgress}%` }} />
                  </div>
                )}
                {errorMsg && <div className="mt-3 text-xs text-error bg-error/10 border border-error/30 rounded p-2">{errorMsg}</div>}
              </div>
            )}

            {fileInfo && (
              <div className="p-4 rounded-lg bg-muted border border-border mb-6">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success"/>
                  <div>
                    <p className="text-sm font-medium">Fișier încărcat: {fileInfo.name}</p>
                    {fileInfo.signedUrl && (
                      <p className="text-xs"><a href={fileInfo.signedUrl} target="_blank" rel="noopener" className="text-primary underline">Deschide fișier (link temporar)</a></p>
                    )}
                    <p className="text-xs text-text-secondary">Timp folosit: {formatTime(fileInfo.timeSpentSeconds || (timeLimit*60 - secondsLeft))}</p>
                    <p className="text-xs text-text-secondary">Subiect: {fileInfo.year} · {fileInfo.subject}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={()=> navigate('/exam-preparation')} className="flex items-center">
                <Icon name="ArrowLeft" size={16} className="mr-2"/>Înapoi
              </Button>
              {!fileInfo && (
                <Button variant="outline" onClick={()=> { setIsRunning(!isRunning); }}>
                  {isRunning ? 'Pauză' : 'Reia'}
                </Button>
              )}
              {!fileInfo && startedAt && extendedMinutes < 60 && secondsLeft <= 5*60 && (
                <Button variant="outline" onClick={extendTime} className="flex items-center">
                  Extinde (+15 min)
                </Button>
              )}
              <Button variant="default" onClick={resetSimulation} className="bg-error text-white hover:bg-error/90">
                Reset
              </Button>
            </div>
          </div>
        )}

        {/* Help / Tips */}
        <div className="bg-card rounded-xl p-6 warm-shadow">
          <h3 className="font-headline font-semibold text-lg mb-4 flex items-center"><Icon name="Lightbulb" size={18} className="mr-2"/>Sfaturi rapide</h3>
          <ul className="space-y-2 text-sm text-text-secondary list-disc pl-5">
            <li>Pregătește foile și instrumentele înainte de a porni cronometrul.</li>
            <li>Notează timpul la care ai început pe foaie pentru verificare.</li>
            <li>Scanează sau fotografiază clar rezolvarea înainte de încărcare.</li>
            <li>Dacă se închide pagina, timpul continuă – se recalculează la revenire.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SimulareExamenPage;
