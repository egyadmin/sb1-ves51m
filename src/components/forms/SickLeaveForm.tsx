import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SickLeave } from '../../types';

interface SickLeaveFormProps {
  onSubmit: (data: Partial<SickLeave>) => void;
  initialData?: Partial<SickLeave>;
}

export default function SickLeaveForm({ onSubmit, initialData }: SickLeaveFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          تاريخ البداية
        </label>
        <input
          type="date"
          {...register('startDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          تاريخ النهاية
        </label>
        <input
          type="date"
          {...register('endDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          سبب الإجازة المرضية
        </label>
        <textarea
          {...register('reason')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          المستندات الداعمة
        </label>
        <input
          type="file"
          multiple
          {...register('documents')}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
    </form>
  );
}