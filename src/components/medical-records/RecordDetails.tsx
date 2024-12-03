import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download } from 'lucide-react';
import type { MedicalRecord } from '../../types/medical-record';
import { generatePrintableRecord } from '../../utils/printUtils';

interface RecordDetailsProps {
  record: MedicalRecord;
  onEdit?: () => void;
}

export default function RecordDetails({ record, onEdit }: RecordDetailsProps) {
  const { t } = useTranslation();

  const handlePrint = () => {
    generatePrintableRecord(record);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          تفاصيل السجل الطبي
        </h3>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <FileText className="h-4 w-4 ml-1.5" />
              تعديل
            </button>
          )}
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700"
          >
            <Download className="h-4 w-4 ml-1.5" />
            تحميل PDF
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            الحالة النفسية
          </h4>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">الحالة:</span>
              <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${
                record.mentalHealth.status === 'STABLE'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {record.mentalHealth.status === 'STABLE' ? 'مستقر' : 'يحتاج متابعة'}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">التقييم:</span>
              <p className="mt-1">{record.mentalHealth.assessment}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">التوصيات:</span>
              <p className="mt-1">{record.mentalHealth.recommendations}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            اللياقة البدنية
          </h4>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">الحالة:</span>
              <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${
                record.physicalFitness.status === 'FIT'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {record.physicalFitness.status === 'FIT' ? 'لائق' : 'لائق مع قيود'}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">القيود:</span>
              <ul className="mt-1 list-disc list-inside">
                {record.physicalFitness.limitations.map((limitation, index) => (
                  <li key={index} className="text-gray-700">{limitation}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-sm text-gray-500">التوصيات:</span>
              <p className="mt-1">{record.physicalFitness.recommendations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}