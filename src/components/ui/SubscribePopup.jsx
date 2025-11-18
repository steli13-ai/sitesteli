import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Input from './Input';
import { useSubscribe } from '@/hooks/useSubscribe';
import { toast } from 'react-hot-toast';

const LS_KEY = 'mcs_subscribe_dismissed_v1';

const SubscribePopup = ({ delayMs = 10000 }) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pulse, setPulse] = useState(false);
  const nameRef = useRef(null);

  // Time trigger
  useEffect(() => {
    const dismissed = localStorage.getItem(LS_KEY);
    if (dismissed) return;
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  // Scroll depth trigger (50%)
  useEffect(() => {
    const onScroll = () => {
      if (open) return;
      const dismissed = localStorage.getItem(LS_KEY);
      if (dismissed) return;
      const d = document.documentElement;
      const scrolled = (d.scrollTop || document.body.scrollTop);
      const max = d.scrollHeight - d.clientHeight;
      if (max > 0 && scrolled / max >= 0.5) {
        setOpen(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    if (open && nameRef.current) {
      nameRef.current.focus();
    }
  }, [open]);

  // Gentle attention pulse shortly after opening (accessibility-friendly)
  useEffect(() => {
    if (!open) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 1800);
    return () => clearTimeout(t);
  }, [open]);

  const onClose = () => {
    setOpen(false);
    localStorage.setItem(LS_KEY, '1');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="absolute inset-0 bg-background/40 backdrop-blur-md" 
            onClick={onClose} 
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribe-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="relative bg-card text-foreground w-full max-w-md rounded-2xl p-6 warm-shadow-lg border border-border"
          >
            <button
              onClick={onClose}
              aria-label="Închide pop-up abonare"
              className="absolute top-3 right-3 p-2 rounded-lg hover:bg-muted"
            >
              ×
            </button>
            <div className="space-y-4">
              <h2 id="subscribe-title" className="text-2xl font-headline font-bold">
                Primești 10% reducere la prima comandă 🪄
              </h2>
              <p className="text-text-secondary">
                Află primul când postăm materiale noi
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = form.name.value?.trim();
                  const email = form.email.value?.trim();
                  setSubmitting(true);
                  setPulse(true);
                  setTimeout(() => setPulse(false), 300);
                  try {
                    await useSubscribe(email, name);
                    toast.success('Mulțumim că te-ai abonat!');
                    onClose();
                  } catch (err) {
                    toast.error('Ne pare rău, a apărut o eroare. Încearcă din nou.');
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="space-y-3"
              >
                <Input ref={nameRef} placeholder="Nume" name="name" aria-label="Nume" />
                <Input type="email" placeholder="Email" name="email" required aria-label="Email" />
                <Button type="submit" fullWidth disabled={submitting} className={`bg-primary text-white hover:bg-secondary ${pulse ? 'animate-pulse' : ''}`}>
                  {submitting ? 'Se trimite…' : 'Mă abonez'}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscribePopup;
