import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import FileUploadPreview from '../FileUploadPreview';

interface LabTestFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function LabTestForm({ onSubmit, initialData }: LabTestFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData || {
      patientId: '',
      patientName: '',
      testType: '',
      requestedBy: '',
      priority: 'normal',
      notes: '',
      attachments: []
    }
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleFormSubmit = (data: any) => {
    onSubmit({ ...data, attachments: files });
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
            اسم المريض
          </label>
          <input
            type="text"
            {...register('patientName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          نوع التحليل
        </label>
        <select
          {...register('testType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">اختر نوع التحليل</option>
          <option value="BLOOD">تحليل دم</option>
          <option value="URINE">تحليل بول</option>
          <option value="STOOL">تحليل براز</option>
          <option value="BIOCHEMISTRY">تحليل كيميائي</option>
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
          نتائج التحليل
        </label>
        <FileUploadPreview
          files={files}
          onFilesChange={setFiles}
          accept={{
            'image/*': ['.jpeg', '.jpg', '.png'],
            'application/pdf': ['.pdf']
          }}
          previewType="both"
        />
      </div>
    </form>
  );
}