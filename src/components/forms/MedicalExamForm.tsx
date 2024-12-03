import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface MedicalExamFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function MedicalExamForm({ onSubmit, initialData }: MedicalExamFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: initialData || {
      patientId: '',
      patientName: '',
      examType: '',
      symptoms: '',
      diagnosis: '',
      treatment: '',
      notes: '',
      attachments: [],
      followUpDate: '',
      doctorName: '',
      priority: 'normal'
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

  const examTypes = [
    { value: 'PERIODIC', label: 'فحص دوري' },
    { value: 'EMERGENCY', label: 'حالة طارئة' },
    { value: 'FOLLOW_UP', label: 'متابعة' },
    { value: 'CONSULTATION', label: 'استشارة' }
  ];

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            نوع الفحص
          </label>
          <select
            {...register('examType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">اختر نوع الفحص</option>
            {examTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          الأعراض
        </label>
        <textarea
          {...register('symptoms')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          التشخيص
        </label>
        <textarea
          {...register('diagnosis')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          العلاج
        </label>
        <textarea
          {...register('treatment')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            موعد المتابعة
          </label>
          <input
            type="date"
            {...register('followUpDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            الطبيب المعالج
          </label>
          <input
            type="text"
            {...register('doctorName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          ملاحظات إضافية
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