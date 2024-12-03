import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Minus } from 'lucide-react';

interface SupplyOrderFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function SupplyOrderForm({ onSubmit, initialData }: SupplyOrderFormProps) {
  const { t } = useTranslation();
  const { register, control, handleSubmit: formHandleSubmit } = useForm({
    defaultValues: initialData || {
      items: [{ item: '', quantity: 1, category: '' }],
      priority: 'normal',
      notes: ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const handleSubmit = formHandleSubmit(onSubmit);

  const categories = [
    { value: 'OXYGEN', label: 'أكسجين طبي' },
    { value: 'INJECTIONS', label: 'حقن طبية' },
    { value: 'SOLUTIONS', label: 'محاليل طبية' },
    { value: 'MEDICATIONS', label: 'أدوية' },
    { value: 'CLEANING', label: 'مواد تنظيف وتعقيم' },
    { value: 'EQUIPMENT', label: 'أجهزة طبية' },
    { value: 'NEBULIZER', label: 'أجهزة استنشاق' }
  ];

  return (
    <form id="modal-form" onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          الأصناف المطلوبة
        </label>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 mb-4">
            <div className="flex-1">
              <select
                {...register(`items.${index}.category`)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر التصنيف</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <input
                type="text"
                {...register(`items.${index}.item`)}
                placeholder="اسم الصنف"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-24">
              <input
                type="number"
                {...register(`items.${index}.quantity`)}
                min="1"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ item: '', quantity: 1, category: '' })}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <Plus className="h-5 w-5 ml-1" />
          إضافة صنف
        </button>
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