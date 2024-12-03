```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import type { MedicalRecord } from '../../types/medical-record';

interface EditRecordFormProps {
  record: MedicalRecord;
  onSubmit: (data: Partial<MedicalRecord>) => void;
}

export default function EditRecordForm({ record, onSubmit }: EditRecordFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: record
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      setValue('attachments', [
        ...record.attachments,
        ...acceptedFiles.map(file => ({
          id: crypto.randomUUID(),
          type: 'OTHER',
          name: file.name,
          url: URL.createObjectURL(file)
        }))
      ]);
    }
  });

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Mental Health Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">الصحة العقلية</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              الحالة النفسية
            </label>
            <select
              {...register('mentalHealth.status')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="STABLE">مستقر</option>
              <option value="NEEDS_SUPPORT">يحتاج إلى دعم</option>
              <option value="UNDER_TREATMENT">تحت العلاج</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              التقييم
            </label>
            <textarea
              {...register('mentalHealth.assessment')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              التوصيات
            </label>
            <textarea
              {...register('mentalHealth.recommendations')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Physical Fitness Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">اللياقة البدنية</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              حالة اللياقة
            </label>
            <select
              {...register('physicalFitness.status')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="FIT">لائق</option>
              <option value="FIT_WITH_LIMITATIONS">لائق مع قيود</option>
              <option value="TEMPORARILY_UNFIT">غير لائق مؤقتاً</option>
              <option value="UNFIT">غير لائق</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              القيود والتوصيات
            </label>
            <textarea
              {...register('physicalFitness.recommendations')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Physical Strain Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">الإجهاد الجسدي</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              مستوى الإجهاد
            </label>
            <select
              {...register('physicalStrain.level')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="LOW">منخفض</option>
              <option value="MEDIUM">متوسط</option>
              <option value="HIGH">مرتفع</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              العوامل المسببة
            </label>
            <textarea
              {...register('physicalStrain.factors')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="اكتب كل عامل في سطر جديد"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              التوصيات
            </label>
            <textarea
              {...register('physicalStrain.recommendations')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Attachments Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          إضافة مرفقات جديدة
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

      {/* Notes Section */}
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
```