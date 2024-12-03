import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

interface AddItemFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function AddItemForm({ onSubmit, initialData }: AddItemFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      category: '',
      item: '',
      quantity: 0,
      minimumRequired: 0,
      location: '',
      expiryDate: '',
      manufacturer: '',
      specifications: '',
      storageConditions: '',
    }
  });

  const categories = [
    { value: 'OXYGEN', label: 'أكسجين طبي' },
    { value: 'INJECTIONS', label: 'حقن طبية' },
    { value: 'SOLUTIONS', label: 'محاليل طبية' },
    { value: 'MEDICATIONS', label: 'أدوية' },
    { value: 'CLEANING', label: 'مواد تنظيف وتعقيم' },
    { value: 'EQUIPMENT', label: 'أجهزة طبية' },
    { value: 'NEBULIZER', label: 'أجهزة استنشاق' },
    { value: 'STERILIZATION', label: 'مواد تعقيم' }
  ];

  const locations = [
    { value: 'ALL', label: 'جميع المواقع' },
    { value: 'RIYADH', label: 'مشروع الرياض' },
    { value: 'JEDDAH', label: 'مشروع جدة' },
    { value: 'NEOM', label: 'مشروع نيوم' }
  ];

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            التصنيف
          </label>
          <select
            {...register('category', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">اختر التصنيف</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            اسم الصنف
          </label>
          <input
            type="text"
            {...register('item', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            الكمية الحالية
          </label>
          <input
            type="number"
            {...register('quantity', { required: true, min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            الحد الأدنى المطلوب
          </label>
          <input
            type="number"
            {...register('minimumRequired', { required: true, min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            الموقع
          </label>
          <select
            {...register('location', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">اختر الموقع</option>
            {locations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            تاريخ انتهاء الصلاحية
          </label>
          <input
            type="date"
            {...register('expiryDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          الشركة المصنعة
        </label>
        <input
          type="text"
          {...register('manufacturer')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          المواصفات
        </label>
        <textarea
          {...register('specifications')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          شروط التخزين
        </label>
        <textarea
          {...register('storageConditions')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="درجة الحرارة، الرطوبة، متطلبات خاصة..."
        />
      </div>
    </form>
  );
}