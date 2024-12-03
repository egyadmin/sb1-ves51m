import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { User, Building2, Briefcase, Download, FileEdit, Trash2 } from 'lucide-react';
import type { Patient } from '../../types/patient';
import { generatePatientReport } from '../../utils/printUtils';

interface PatientDetailsProps {
  patient: Patient;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export default function PatientDetails({
  patient,
  onEdit,
  onDelete,
  onBack
}: PatientDetailsProps) {
  const { t } = useTranslation();

  const handleDownload = () => {
    generatePatientReport(patient);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          العودة للقائمة
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <Download className="h-4 w-4 ml-2" />
            تحميل التقرير
          </button>
          <button
            onClick={onEdit}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <FileEdit className="h-4 w-4 ml-2" />
            تعديل
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 ml-2" />
            حذف
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start space-x-6 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            {patient.photo ? (
              <img
                src={patient.photo}
                alt={patient.name}
                className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=random`;
                }}
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                <User className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              الرقم الوظيفي: {patient.employeeId}
            </p>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Building2 className="h-5 w-5 text-gray-400 ml-2" />
                <div>
                  <p className="text-sm text-gray-500">الموقع</p>
                  <p className="font-medium">{patient.location}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-400 ml-2" />
                <div>
                  <p className="text-sm text-gray-500">القسم</p>
                  <p className="font-medium">{patient.department}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 text-center">
            <div className="bg-gray-50 p-4 rounded-lg">
              <QRCodeSVG
                value={JSON.stringify({
                  id: patient.id,
                  employeeId: patient.employeeId,
                  name: patient.name
                })}
                size={120}
                level="H"
                includeMargin
              />
              <p className="mt-2 text-sm text-gray-500">
                امسح الرمز للوصول إلى السجل الطبي
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}