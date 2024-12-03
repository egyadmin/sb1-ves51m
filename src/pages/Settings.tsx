import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

export default function Settings() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{t('settings.title')}</h2>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('settings.language.title')}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {t('settings.language.description')}
            </p>
            <p className="text-sm font-medium text-gray-900">
              {t('settings.language.current')}: {currentLanguage}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('settings.notifications.title')}
            </h3>
            <div className="space-y-4">
              {/* Add notification settings here */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('settings.system.title')}
            </h3>
            <div className="space-y-4">
              {/* Add system settings here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}