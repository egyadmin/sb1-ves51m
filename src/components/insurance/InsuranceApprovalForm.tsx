import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import type { InsuranceApproval } from '../../types/insurance';

interface InsuranceApprovalFormProps {
  onSubmit: (data: Partial<InsuranceApproval>) => void;
  initialData?: Partial<InsuranceApproval>;
}

export default function InsuranceApprovalForm({ onSubmit, initialData }: InsuranceApprovalFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      serviceType: '',
      status: 'PENDING',
      notes: ''
    }
  });

  const serviceTypes = [
    { value: 'CONSULTATION', label: 'استشارة طبية' },
    { value: 'PROCEDURE', label: 'إجراء طبي' },
    { value: 'MEDICATION', label: 'أدوية' },
    { value: 'LAB_TEST', label: 'تحاليل مخبرية' },
    { value: 'RADIOLOGY', label: 'أشعة' },
    { value: 'DENTAL', label: 'أسنان' }
  ];

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          نوع الخدمة
        </label>
        <select
          {...register('serviceType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">اختر نوع الخدمة</option>
          {serviceTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          ملاحظات
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}