import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import type { TawuniyaPolicy } from '../../types/tawuniya';

interface TawuniyaFormProps {
  onSubmit: (data: Partial<TawuniyaPolicy>) => void;
  initialData?: Partial<TawuniyaPolicy>;
}

export default function TawuniyaForm({ onSubmit, initialData }: TawuniyaFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      tawuniyaNetwork: 'A',
      status: 'ACTIVE',
      insuranceClass: 'B',
      coverageDetails: {
        outpatientCoverage: 90,
        inpatientCoverage: 100,
        medicationCoverage: 80,
        dentalCoverage: 80,
        opticalCoverage: 80,
      },
      benefitLimits: {
        annualLimit: 500000,
        outpatientDeductible: 100,
        inpatientDeductible: 0,
        pharmacyDeductible: 20,
        dentalDeductible: 200,
      }
    }
  });

  const networks = [
    { value: 'A', label: 'الشبكة A - المميزة' },
    { value: 'B', label: 'الشبكة B - الأساسية' },
    { value: 'C', label: 'الشبكة C - المحدودة' }
  ];

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            رقم بوليصة التعاونية
          </label>
          <input
            type="text"
            {...register('tawuniyaPolicyNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            رقم البطاقة
          </label>
          <input
            type="text"
            {...register('tawuniyaCardNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            الشبكة الطبية
          </label>
          <select
            {...register('tawuniyaNetwork')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {networks.map((network) => (
              <option key={network.value} value={network.value}>
                {network.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            الرقم الوظيفي
          </label>
          <input
            type="text"
            {...register('employeeNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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
        <h4 className="text-sm font-medium text-gray-900 mb-4">موافقة وزارة الصحة</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              رقم الموافقة
            </label>
            <input
              type="text"
              {...register('mohApprovalDetails.approvalNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              تاريخ انتهاء الموافقة
            </label>
            <input
              type="date"
              {...register('mohApprovalDetails.expiryDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">حدود المنافع</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              الحد السنوي
            </label>
            <input
              type="number"
              {...register('benefitLimits.annualLimit')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              التحمل للعيادات الخارجية
            </label>
            <input
              type="number"
              {...register('benefitLimits.outpatientDeductible')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              التحمل للتنويم
            </label>
            <input
              type="number"
              {...register('benefitLimits.inpatientDeductible')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              التحمل للأدوية
            </label>
            <input
              type="number"
              {...register('benefitLimits.pharmacyDeductible')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
}