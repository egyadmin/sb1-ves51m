import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface SafetyIncidentFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function SafetyIncidentForm({ onSubmit, initialData }: SafetyIncidentFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData || {
      date: new Date().toISOString().split('T')[0],
      location: '',
      type: '',
      severity: 'MINOR',
      description: '',
      immediateActions: '',
      reportedBy: '',
      attachments: []
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      setValue('attachments', acceptedFiles);
    }
  });

  const incidentTypes = [
    { value: 'INJURY', label: 'إصابة' },
    { value: 'NEAR_MISS', label: 'حادث وشيك' },
    { value: 'HAZARD', label: 'خطر محتمل' },
    { value: 'VIOLATION', label: 'مخالفة' }
  ];

  const severityLevels = [
    { value: 'MINOR', label: 'طفيف' },
    { value: 'MODERATE', label: 'متوسط' },
    { value: 'SERIOUS', label: 'خطير' }
  ];

  const locations = [
    { value: 'RIYADH_PROJECT', label: 'مشروع الرياض' },
    { value: 'JEDDAH_PROJECT', label: 'مشروع جدة' },
    { value: 'NEOM_PROJECT', label: 'مشروع نيوم' }
  ];

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            التاريخ
          </label>
          <input
            type="date"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            الموقع
          </label>
          <select
            {...register('location')}
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            نوع الحادث
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">اختر النوع</option>
            {incidentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            مستوى الخطورة
          </label>
          <select
            {...register('severity')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {severityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          وصف الحادث
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          الإجراءات الفورية المتخذة
        </label>
        <textarea
          {...register('immediateActions')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          تم الإبلاغ بواسطة
        </label>
        <input
          type="text"
          {...register('reportedBy')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          المرفقات
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            اسحب وأفلت الملفات هنا، أو انقر للاختيار
          </p>
          <p className="mt-1 text-xs text-gray-500">
            PDF, JPEG, PNG (الحد الأقصى 10MB)
          </p>
        </div>
      </div>
    </form>
  );
}