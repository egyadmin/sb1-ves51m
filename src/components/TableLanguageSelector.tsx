import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TableLanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' },
    { code: 'fil', name: 'Filipino' },
    { code: 'ur', name: 'اردو' }
  ];

  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-2 mb-4">
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