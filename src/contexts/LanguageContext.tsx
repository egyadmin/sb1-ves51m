import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const languages = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fil', name: 'Filipino', dir: 'ltr' },
  { code: 'ur', name: 'اردو', dir: 'rtl' }
] as const;

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (code: string) => void;
  direction: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'ar');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');

  const changeLanguage = useCallback(async (code: string) => {
    const selectedLanguage = languages.find(lang => lang.code === code);
    if (selectedLanguage) {
      await i18n.changeLanguage(code);
      setCurrentLanguage(code);
      setDirection(selectedLanguage.dir);
      
      // Update document direction and language
      document.documentElement.dir = selectedLanguage.dir;
      document.documentElement.lang = code;
      
      // Update CSS classes for RTL/LTR
      if (selectedLanguage.dir === 'rtl') {
        document.documentElement.classList.add('rtl');
        document.documentElement.classList.remove('ltr');
      } else {
        document.documentElement.classList.add('ltr');
        document.documentElement.classList.remove('rtl');
      }
    }
  }, [i18n]);

  useEffect(() => {
    // Set initial direction and language
    const selectedLanguage = languages.find(lang => lang.code === currentLanguage);
    if (selectedLanguage) {
      setDirection(selectedLanguage.dir);
      document.documentElement.dir = selectedLanguage.dir;
      document.documentElement.lang = currentLanguage;
      
      if (selectedLanguage.dir === 'rtl') {
        document.documentElement.classList.add('rtl');
        document.documentElement.classList.remove('ltr');
      } else {
        document.documentElement.classList.add('ltr');
        document.documentElement.classList.remove('rtl');
      }
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}