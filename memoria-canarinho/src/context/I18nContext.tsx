import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { pt, en, es } from '../locales';

type Language = 'pt' | 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, ...args: string[]) => string;
}

const dictionaries = { pt, en, es };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // SessionStorage automatically clears when tab is closed
    const storedLang = sessionStorage.getItem('cbf_lang') as Language;
    if (storedLang && ['pt', 'en', 'es'].includes(storedLang)) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    sessionStorage.setItem('cbf_lang', lang);
  };

  const t = (key: string, ...args: string[]) => {
    const dict = dictionaries[language] as Record<string, string>;
    let text = dict[key];
    
    // Fallback to Portuguese if missing
    if (!text) {
      text = dictionaries['pt'][key as keyof typeof pt] || key;
    }

    if (args.length > 0) {
      args.forEach((arg, i) => {
        text = text.replace(`{${i}}`, arg);
      });
    }

    return text;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
