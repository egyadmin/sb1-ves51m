import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'ar', name: 'العربية', dir: 'rtl' },
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'fil', name: 'Filipino', dir: 'ltr' },
    { code: 'ur', name: 'اردو', dir: 'rtl' }
  ];

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow-sm p-2">
      <div className="flex items-center gap-2">
        <Languages className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`px-4 py-2 text-sm rounded-md transition-colors min-w-[100px] ${
              currentLanguage === language.code
                ? 'bg-blue-600 text-white font-medium'
                : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
}