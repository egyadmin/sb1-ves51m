import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stethoscope, Users, Activity, ClipboardCheck } from 'lucide-react';
import DataTable from '../components/DataTable';

export default function MedicalCare() {
  const { t } = useTranslation();

  const medicalCases = [
    {
      id: '1',
      date: '2024-03-20',
      patientName: 'أحمد محمد',
      diagnosis: 'التهاب الجهاز التنفسي',
      doctor: 'د. علي أحمد',
      treatment: 'مضاد حيوي + راحة',
      followUp: '2024-03-25',
      status: 'تحت العلاج'
    },
    {
      id: '2',
      date: '2024-03-19',
      patientName: 'محمد علي',
      diagnosis: 'ارتفاع ضغط الدم',
      doctor: 'د. خالد محمد',
      treatment: 'أدوية ضغط + حمية غذائية',
      followUp: '2024-03-26',
      status: 'مكتمل'
    }
  ];

  const columns = [
    { key: 'date', header: 'التاريخ' },
    { key: 'patientName', header: 'اسم المريض' },
    { key: 'diagnosis', header: 'التشخيص' },
    { key: 'doctor', header: 'الطبيب المعالج' },
    { key: 'treatment', header: 'العلاج' },
    { key: 'followUp', header: 'موعد المتابعة' },
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
          <h2 className="text-2xl font-semibold text-gray-900">الرعاية الطبية</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة الرعاية الطبية والمتابعة العلاجية
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">المرضى النشطين</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Stethoscope className="h-6 w-6 text-green-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">فحوصات اليوم</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-purple-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">تحت العلاج</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <ClipboardCheck className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">متابعات اليوم</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">سجل الحالات الطبية</h3>
        <DataTable data={medicalCases} columns={columns} />
      </div>
    </div>
  );
}