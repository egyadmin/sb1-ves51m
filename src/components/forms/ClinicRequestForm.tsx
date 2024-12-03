import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

interface ClinicRequestFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function ClinicRequestForm({ onSubmit, initialData }: ClinicRequestFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      clinicName: '',
      requestType: '',
      priority: 'normal',
      description: '',
      requiredItems: '',
      location: '',
    }
  });

  const requestTypes = [
    { value: 'SUPPLIES', label: 'طلب مستلزمات' },
    { value: 'MAINTENANCE', label: 'صيانة' },
    { value: 'STAFF', label: 'طلب كوادر طبية' },
    { value: 'EMERGENCY', label: 'حالة طارئة' },
  ];

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          اسم العيادة
        </label>
        <input
          type="text"
          {...register('clinicName', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          نوع الطلب
        </label>
        <select
          {...register('requestType', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">اختر نوع الطلب</option>
          {requestTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          الأولوية
        </label>
        <select
          {...register('priority')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="normal">عادية</option>
          <option value="urgent">عاجلة</option>
          <option value="emergency">طارئة</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          وصف الطلب
        </label>
        <textarea
          {...register('description', { required: true })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          المستلزمات المطلوبة
        </label>
        <textarea
          {...register('requiredItems')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="اكتب كل صنف في سطر جديد"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          الموقع
        </label>
        <input
          type="text"
          {...register('location', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}