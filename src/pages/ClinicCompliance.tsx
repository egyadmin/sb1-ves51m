import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import DataTable from '../components/DataTable';

export default function ClinicCompliance() {
  const { t } = useTranslation();

  const complianceData = [
    {
      id: '1',
      authority: 'وزارة الصحة',
      lastInspection: '2024-02-15',
      nextInspection: '2024-05-15',
      status: 'متوافق'
    },
    {
      id: '2',
      authority: 'وزارة النقل',
      lastInspection: '2024-03-01',
      nextInspection: '2024-06-01',
      status: 'متوافق جزئياً'
    }
  ];

  const columns = [
    { key: 'authority', header: 'الجهة' },
    { key: 'lastInspection', header: 'آخر تفتيش' },
    { key: 'nextInspection', header: 'التفتيش القادم' },
    { 
      key: 'status',
      header: 'الحالة',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'متوافق' 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        توافق العيادات مع المتطلبات
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">
                  متوافق بالكامل
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  8 عيادات
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">
                  متوافق جزئياً
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  3 عيادات
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">
                  تفتيش قادم
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  5 عيادات
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <DataTable data={complianceData} columns={columns} />
      </div>
    </div>
  );
}