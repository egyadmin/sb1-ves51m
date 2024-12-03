import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import type { InsurancePolicy, InsuranceClass } from '../../types/insurance';

interface InsuranceFormProps {
  onSubmit: (data: Partial<InsurancePolicy>) => void;
  initialData?: Partial<InsurancePolicy>;
}

export default function InsuranceForm({ onSubmit, initialData }: InsuranceFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      policyNumber: '',
      insuranceClass: 'C',
      provider: '',
      status: 'ACTIVE',
      coverageDetails: {
        outpatientCoverage: 100,
        inpatientCoverage: 100,
        medicationCoverage: 100,
        dentalCoverage: 80,
        opticalCoverage: 80,
      }
    }
  });

  const insuranceClasses: { value: InsuranceClass; label: string }[] = [
    { value: 'C', label: 'الفئة C' },
    { value: 'B', label: 'الفئة B' },
    { value: 'B+', label: 'الفئة +B' },
    { value: 'VIP', label: 'VIP' }
  ];

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            رقم بوليصة التأمين
          </label>
          <input
            type="text"
            {...register('policyNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            فئة التأمين
          </label>
          <select
            {...register('insuranceClass')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {insuranceClasses.map((insuranceClass) => (
              <option key={insuranceClass.value} value={insuranceClass.value}>
                {insuranceClass.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            تاريخ الانتهاء
          </label>
          <input
            type="date"
            {...register('endDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          رقم موافقة وزارة الصحة
        </label>
        <input
          type="text"
          {...register('mohApprovalNumber')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">تفاصيل التغطية</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              العيادات الخارجية (%)
            </label>
            <input
              type="number"
              {...register('coverageDetails.outpatientCoverage')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              التنويم (%)
            </label>
            <input
              type="number"
              {...register('coverageDetails.inpatientCoverage')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              الأدوية (%)
            </label>
            <input
              type="number"
              {...register('coverageDetails.medicationCoverage')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              الأسنان (%)
            </label>
            <input
              type="number"
              {...register('coverageDetails.dentalCoverage')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
}