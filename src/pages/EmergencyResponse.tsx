import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Clock, Activity } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';

export default function EmergencyResponse() {
  const { t } = useTranslation();

  const emergencyResponses = [
    {
      id: '1',
      location: 'مشروع الرياض',
      responseTime: '5 دقائق',
      type: 'حادث عمل',
      status: 'مكتمل',
      outcome: 'تم نقل المصاب للمستشفى'
    },
    {
      id: '2',
      location: 'سكن العمال - جدة',
      responseTime: '3 دقائق',
      type: 'حالة طبية طارئة',
      status: 'جاري المتابعة',
      outcome: 'تحت الرعاية الطبية'
    }
  ];

  const columns = [
    { key: 'location', header: 'الموقع' },
    { key: 'responseTime', header: 'وقت الاستجابة' },
    { key: 'type', header: 'نوع الحالة' },
    { key: 'status', header: 'الحالة' },
    { key: 'outcome', header: 'النتيجة' }
  ];

  const stats = [
    {
      title: 'متوسط وقت الاستجابة',
      value: '4.2 دقائق',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'الحالات النشطة',
      value: '3',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'حالات اليوم',
      value: '8',
      icon: AlertTriangle,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className={`h-6 w-6 ${stat.color}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="mr-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          سجل الاستجابة للحالات الطارئة
        </h3>
        <DataTable data={emergencyResponses} columns={columns} />
      </div>
    </div>
  );
}