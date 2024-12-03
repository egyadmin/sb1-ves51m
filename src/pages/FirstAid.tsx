import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import DataTable from '../components/DataTable';

export default function FirstAid() {
  const { t } = useTranslation();

  const firstAidCases = [
    {
      id: '1',
      date: '2024-03-20',
      patientName: 'أحمد محمد',
      location: 'مشروع الرياض',
      type: 'إصابة بسيطة',
      treatment: 'تضميد وتطهير',
      status: 'مكتمل'
    },
    {
      id: '2',
      date: '2024-03-20',
      patientName: 'محمد علي',
      location: 'مشروع جدة',
      type: 'حالة إغماء',
      treatment: 'إسعافات أولية',
      status: 'تحت المتابعة'
    }
  ];

  const columns = [
    { key: 'date', header: 'التاريخ' },
    { key: 'patientName', header: 'اسم المريض' },
    { key: 'location', header: 'الموقع' },
    { key: 'type', header: 'نوع الحالة' },
    { key: 'treatment', header: 'العلاج المقدم' },
    {
      key: 'status',
      header: 'الحالة',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'مكتمل'
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">الإسعافات الأولية</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة حالات الإسعافات الأولية والتدخل السريع
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-red-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">حالات اليوم</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">قيد المتابعة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">مكتملة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">حالات طارئة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">سجل الحالات</h3>
        <DataTable data={firstAidCases} columns={columns} />
      </div>
    </div>
  );
}