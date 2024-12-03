import React from 'react';
import { useTranslation } from 'react-i18next';
import { Printer, X } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  type: 'medical' | 'safety' | 'pharmacy' | 'emergency';
  title: string;
}

export default function ReportPreviewModal({
  isOpen,
  onClose,
  data,
  type,
  title
}: ReportPreviewModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full min-h-[80vh] print:shadow-none">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b print:hidden">
            <h3 className="text-lg font-medium">{title}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Printer className="h-4 w-4 ml-2" />
                طباعة
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Report Content - This will be printed */}
          <div className="p-6 print:p-0 print-content">
            {/* Company Header */}
            <div className="text-center mb-8">
              <img
                src="https://www2.0zz0.com/2024/11/20/07/988856043.png"
                alt="Company Logo"
                className="h-20 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                شركة شبه الجزيرة للمقاولات
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                نظام إدارة العيادات
              </p>
            </div>

            {/* Report Title */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(), 'PPP', { locale: ar })}
              </p>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">إجمالي السجلات</p>
                <p className="text-2xl font-bold text-blue-800">{data.length}</p>
              </div>
              {type === 'medical' && (
                <>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600">فحوصات دورية</p>
                    <p className="text-2xl font-bold text-green-800">
                      {data.filter(item => item.type === 'PERIODIC').length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-600">حالات طارئة</p>
                    <p className="text-2xl font-bold text-yellow-800">
                      {data.filter(item => item.type === 'EMERGENCY').length}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600">متابعات</p>
                    <p className="text-2xl font-bold text-purple-800">
                      {data.filter(item => item.type === 'FOLLOW_UP').length}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {getTableHeaders(type).map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={index}>
                      {getTableRow(item, type).map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>تم إنشاء هذا التقرير في: {format(new Date(), 'PPP', { locale: ar })}</p>
              <p>شركة شبه الجزيرة للمقاولات - نظام إدارة العيادات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTableHeaders(type: string): string[] {
  switch (type) {
    case 'medical':
      return ['رقم المريض', 'التاريخ', 'نوع السجل', 'التشخيص', 'الحالة'];
    case 'safety':
      return ['التاريخ', 'الموقع', 'النوع', 'الخطورة', 'الحالة'];
    case 'pharmacy':
      return ['الصنف', 'التصنيف', 'الكمية', 'الحالة'];
    case 'emergency':
      return ['التاريخ', 'الموقع', 'وقت الاستجابة', 'النوع', 'النتيجة'];
    default:
      return [];
  }
}

function getTableRow(item: any, type: string): any[] {
  switch (type) {
    case 'medical':
      return [
        item.patientId,
        format(new Date(item.date), 'PPP', { locale: ar }),
        translateRecordType(item.recordType),
        item.diagnosis,
        translateStatus(item.status)
      ];
    case 'safety':
      return [
        format(new Date(item.date), 'PPP', { locale: ar }),
        item.location,
        translateIncidentType(item.type),
        translateSeverity(item.severity),
        translateStatus(item.status)
      ];
    default:
      return Object.values(item);
  }
}

function translateRecordType(type: string): string {
  const types: Record<string, string> = {
    PERIODIC: 'فحص دوري',
    EMERGENCY: 'حالة طارئة',
    FOLLOW_UP: 'متابعة'
  };
  return types[type] || type;
}

function translateStatus(status: string): string {
  const statuses: Record<string, string> = {
    ACTIVE: 'نشط',
    COMPLETED: 'مكتمل',
    PENDING: 'قيد الانتظار',
    CLOSED: 'مغلق'
  };
  return statuses[status] || status;
}

function translateIncidentType(type: string): string {
  const types: Record<string, string> = {
    INJURY: 'إصابة',
    NEAR_MISS: 'حادث وشيك',
    HAZARD: 'خطر محتمل'
  };
  return types[type] || type;
}

function translateSeverity(severity: string): string {
  const severities: Record<string, string> = {
    HIGH: 'خطير',
    MEDIUM: 'متوسط',
    LOW: 'بسيط'
  };
  return severities[severity] || severity;
}