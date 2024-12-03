import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface PatientSearchProps {
  onSearch: (query: string) => void;
}

export default function PatientSearch({ onSearch }: PatientSearchProps) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={t('patients.searchByEmployeeId')}
        onChange={(e) => onSearch(e.target.value)}
        className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}