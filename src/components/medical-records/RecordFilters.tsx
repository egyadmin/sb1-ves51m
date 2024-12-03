import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter } from 'lucide-react';

interface RecordFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function RecordFilters({ onFilterChange }: RecordFiltersProps) {
  const { t } = useTranslation();

  const recordTypes = [
    { value: 'ALL', label: 'جميع السجلات' },
    { value: 'REGULAR', label: 'فحص عادي' },
    { value: 'EMERGENCY', label: 'حالة طارئة' },
    { value: 'FOLLOW_UP', label: 'متابعة' },
    { value: 'PERIODIC', label: 'فحص دوري' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="بحث في السجلات..."
              className="block w-full pr-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => onFilterChange({ type: e.target.value })}
          >
            {recordTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}