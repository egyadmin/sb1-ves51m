import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import FileUploadPreview from '../FileUploadPreview';

interface RadiologyFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function RadiologyForm({ onSubmit, initialData }: RadiologyFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData || {
      patientId: '',
      examType: '',
      bodyPart: '',
      requestedBy: '',
      priority: 'normal',
      notes: '',
      images: []
    }
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleFormSubmit = (data: any) => {
    onSubmit({ ...data, images: files });
  };

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            رقم المريض
          </label>
          <input
            type="text"
            {...register('patientId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            نوع الفحص
          </label>
          <select
            {...register('examType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">اختر نوع الفحص</option>
            <option value="X-RAY">أشعة سينية</option>
            <option value="MRI">رنين مغناطيسي</option>
            <option value="CT">أشعة مقطعية</option>
            <option value="ULTRASOUND">موجات صوتية</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            موضع الفحص
          </label>
          <select
            {...register('bodyPart')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">اختر موضع الفحص</option>
            <option value="CHEST">الصدر</option>
            <option value="HEAD">الرأس</option>
            <option value="SPINE">العمود الفقري</option>
            <option value="KNEE">الركبة</option>
            <option value="SHOULDER">الكتف</option>
            <option value="ABDOMEN">البطن</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            الطبيب المعالج
          </label>
          <input
            type="text"
            {...register('requestedBy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          صور الأشعة
        </label>
        <FileUploadPreview
          files={files}
          onFilesChange={setFiles}
          accept={{
            'image/*': ['.jpeg', '.jpg', '.png', '.dicom']
          }}
          previewType="image"
        />
      </div>
    </form>
  );
}