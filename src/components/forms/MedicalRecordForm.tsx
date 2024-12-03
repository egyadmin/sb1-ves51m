import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import type { MedicalRecord } from '../../types/medical-record';

interface MedicalRecordFormProps {
  onSubmit: (data: Partial<MedicalRecord>) => void;
  initialData?: Partial<MedicalRecord>;
}

export default function MedicalRecordForm({ onSubmit, initialData }: MedicalRecordFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      recordType: 'PERIODIC',
      mentalHealth: {
        status: 'STABLE',
        assessment: '',
        recommendations: ''
      },
      physicalFitness: {
        status: 'FIT',
        limitations: [],
        recommendations: ''
      }
    }
  });

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          نوع السجل
        </label>
        <select
          {...register('recordType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="PERIODIC">فحص دوري</option>
          <option value="EMERGENCY">حالة طارئة</option>
          <option value="FOLLOW_UP">متابعة</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          الحالة النفسية
        </label>
        <select
          {...register('mentalHealth.status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="STABLE">مستقر</option>
          <option value="NEEDS_SUPPORT">يحتاج متابعة</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          التقييم النفسي
        </label>
        <textarea
          {...register('mentalHealth.assessment')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          اللياقة البدنية
        </label>
        <select
          {...register('physicalFitness.status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="FIT">لائق</option>
          <option value="FIT_WITH_LIMITATIONS">لائق مع قيود</option>
          <option value="UNFIT">غير لائق</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          التوصيات
        </label>
        <textarea
          {...register('physicalFitness.recommendations')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}