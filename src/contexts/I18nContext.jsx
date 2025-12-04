import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import ro from '@/i18n/ro.json';
import en from '@/i18n/en.json';

const I18nContext = createContext({ t: (k) => k, lang: 'ro', setLang: () => {} });

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ro');
  useEffect(() => { try { localStorage.setItem('lang', lang); } catch {} }, [lang]);
  const dict = lang === 'en' ? en : ro;
  const t = useMemo(() => (key) => {
    const parts = key.split('.');
    let cur = dict;
    for (const p of parts) { cur = (cur && cur[p]) || null; }
    return cur || key;
  }, [dict]);
  const value = useMemo(() => ({ t, lang, setLang }), [t, lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useT = () => useContext(I18nContext);
