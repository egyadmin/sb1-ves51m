import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, FileEdit, Download, Trash2 } from 'lucide-react';
import DataTable from '../DataTable';

interface ExamListProps {
  exams: any[];
  onView: (exam: any) => void;
  onEdit: (exam: any) => void;
  onDelete: (exam: any) => void;
  onDownload: (exam: any) => void;
}

export default function ExamList({
  exams,
  onView,
  onEdit,
  onDelete,
  onDownload
}: ExamListProps) {
  const { t } = useTranslation();

  const columns = [
    { key: 'patientName', header: 'اسم المريض' },
    { key: 'examType', header: 'نوع الفحص',
      render: (value: string) => {
        const types: Record<string, string> = {
          PERIODIC: 'فحص دوري',
          EMERGENCY: 'حالة طارئة',
          FOLLOW_UP: 'متابعة',
          CONSULTATION: 'استشارة'
        };
        return types[value] || value;
      }
    },
    { key: 'diagnosis', header: 'التشخيص' },
    { key: 'doctorName', header: 'الطبيب المعالج' },
    { key: 'followUpDate', header: 'موعد المتابعة' },
    {
      key: 'priority',
      header: 'الأولوية',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'emergency'
            ? 'bg-red-100 text-red-800'
            : value === 'urgent'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {value === 'emergency' ? 'طارئة' :
           value === 'urgent' ? 'عاجلة' : 'عادية'}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (_, exam) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(exam)}
            className="text-blue-600 hover:text-blue-900 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
            title="عرض التفاصيل"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => onEdit(exam)}
            className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-full hover:bg-indigo-50 transition-colors"
            title="تعديل"
          >
            <FileEdit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDownload(exam)}
            className="text-green-600 hover:text-green-900 p-1.5 rounded-full hover:bg-green-50 transition-colors"
            title="تحميل التقرير"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(exam)}
            className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-50 transition-colors"
            title="حذف"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )
    }
  ];

  return <DataTable data={exams} columns={columns} />;
}