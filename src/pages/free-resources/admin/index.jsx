import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import Icon from '@/components/AppIcon';
import { useAuth } from '@/contexts/AuthContext';

const BUCKET = 'free-resources';

const AdminFreeResources = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'worksheet',
    grade: '9',
    subject: 'Algebră',
    duration_minutes: '',
    pages: '',
    published: true,
    thumbnailFile: null,
    file: null,
  });

  useEffect(() => {
    let mounted = true;
    const checkAdmin = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user?.id)
          .single();
        if (!mounted) return;
        if (error) return setIsAdmin(false);
        setIsAdmin(data?.role === 'admin');
      } catch {
        setIsAdmin(false);
      }
    };
    if (user?.id) checkAdmin();
    return () => { mounted = false; };
  }, [user?.id]);

  const uploadToStorage = async (path, file) => {
    const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
    if (error) throw error;
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return { path: data?.path, publicUrl: pub?.publicUrl };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!isAdmin) {
      return setMessage('Acces restricționat. Doar administratorii pot încărca resurse.');
    }
    if (!form.title || !form.file) {
      return setMessage('Completează titlul și alege fișierul.');
    }
    setSubmitting(true);
    try {
      const stamp = Date.now();
      const base = `${user?.id || 'anon'}/${stamp}`;

      // 1) Upload main file
      const ext = form.file.name.split('.').pop();
      const fileRes = await uploadToStorage(`${base}/resource.${ext}`, form.file);

      // 2) Upload thumbnail if provided
      let thumbUrl = '';
      if (form.thumbnailFile) {
        const tExt = form.thumbnailFile.name.split('.').pop();
        const thumb = await uploadToStorage(`${base}/thumb.${tExt}`, form.thumbnailFile);
        thumbUrl = thumb.publicUrl;
      }

      // 3) Insert row
      const payload = {
        title: form.title,
        description: form.description,
        type: form.type,
        grade: String(form.grade),
        subject: form.subject,
        thumbnail_url: thumbUrl || null,
        file_path: fileRes.path,
        download_url: fileRes.publicUrl,
        duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
        pages: form.pages ? Number(form.pages) : null,
        published: !!form.published,
      };

      const { error: insertError } = await supabase.from('resources').insert(payload);
      if (insertError) throw insertError;

      setMessage('Resursa a fost încărcată cu succes!');
      setForm({
        title: '', description: '', type: 'worksheet', grade: '9', subject: 'Algebră',
        duration_minutes: '', pages: '', published: true, thumbnailFile: null, file: null,
      });
    } catch (err) {
      setMessage(err?.message || 'Eroare la încărcare.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Resurse Gratuite | Mate cu succes</title>
      </Helmet>
      <div className="max-w-3xl mx-auto pt-24 px-4 pb-16">
        <h1 className="font-headline text-3xl font-bold mb-6 text-text-primary flex items-center gap-2">
          <Icon name="Upload" /> Încărcare Resursă Gratuită
        </h1>

        <div className="mb-6 p-4 rounded-lg bg-muted/40 text-sm text-text-secondary">
          <p className="mb-2">Pași necesari (o singură dată) în Supabase:</p>
          <ol className="list-decimal ml-5 space-y-1">
            <li>În Storage creați bucket-ul public „{BUCKET}”.</li>
            <li>Asigurați-vă că politica de citire pentru obiecte este publică (read public).</li>
            <li>Aplicați migrarea din repo pentru tabela <code>resources</code>.</li>
          </ol>
        </div>

        {!isAdmin && (
          <div className="mb-6 p-4 rounded-lg bg-warning/10 text-warning-foreground">
            Aveți nevoie de rol de Administrator pentru a accesa această pagină.
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Titlu</label>
            <input className="w-full px-3 py-2 rounded border border-border bg-input" value={form.title}
                   onChange={(e)=>setForm(f=>({...f,title:e.target.value}))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descriere</label>
            <textarea rows={4} className="w-full px-3 py-2 rounded border border-border bg-input" value={form.description}
                      onChange={(e)=>setForm(f=>({...f,description:e.target.value}))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tip</label>
              <select className="w-full px-3 py-2 rounded border border-border bg-input" value={form.type}
                      onChange={(e)=>setForm(f=>({...f,type:e.target.value}))}>
                <option value="worksheet">Fișă de lucru</option>
                <option value="video">Video</option>
                <option value="interactive">Interactiv</option>
                <option value="test">Test</option>
                <option value="other">Altele</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Clasa</label>
              <select className="w-full px-3 py-2 rounded border border-border bg-input" value={form.grade}
                      onChange={(e)=>setForm(f=>({...f,grade:e.target.value}))}>
                {[5,6,7,8,9,10,11,12].map(g=> <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Materie</label>
              <input className="w-full px-3 py-2 rounded border border-border bg-input" value={form.subject}
                     onChange={(e)=>setForm(f=>({...f,subject:e.target.value}))} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Durată (minute) – pentru video</label>
              <input type="number" min="0" className="w-full px-3 py-2 rounded border border-border bg-input" value={form.duration_minutes}
                     onChange={(e)=>setForm(f=>({...f,duration_minutes:e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pagini – pentru fișe/teste</label>
              <input type="number" min="0" className="w-full px-3 py-2 rounded border border-border bg-input" value={form.pages}
                     onChange={(e)=>setForm(f=>({...f,pages:e.target.value}))} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fișier (PDF/ZIP/video etc.)</label>
              <input type="file" accept=".pdf,.zip,.mp4,.mov,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg"
                     onChange={(e)=>setForm(f=>({...f,file:e.target.files?.[0] || null}))} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Thumbnail (opțional)</label>
              <input type="file" accept="image/*"
                     onChange={(e)=>setForm(f=>({...f,thumbnailFile:e.target.files?.[0] || null}))} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input id="published" type="checkbox" checked={form.published}
                   onChange={(e)=>setForm(f=>({...f,published:e.target.checked}))} />
            <label htmlFor="published" className="text-sm">Publică imediat</label>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="default" className="font-cta" loading={submitting}
                    iconName="Upload" iconPosition="left">
              Publică resursa
            </Button>
            {message && <span className="text-sm text-text-secondary">{message}</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFreeResources;
