import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { User, Building2, Briefcase } from 'lucide-react';
import type { Patient } from '../../types/patient';

interface PatientCardProps {
  patient: Patient;
  onEdit?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
}

export default function PatientCard({ patient, onEdit, onDelete, onPrint }: PatientCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          {patient.photo ? (
            <img
              src={patient.photo}
              alt={patient.name}
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div className="mr-4">
            <h2 className="text-xl font-semibold text-gray-900">{patient.name}</h2>
            <p className="text-sm text-gray-500">الرقم الوظيفي: {patient.employeeId}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800 p-1"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
          {onPrint && (
            <button
              onClick={onPrint}
              className="text-green-600 hover:text-green-800 p-1"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
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

          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-gray-400 ml-2" />
            <div>
              <p className="text-sm text-gray-500">المنصب</p>
              <p className="font-medium">{patient.position}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
          <QRCodeSVG
            value={JSON.stringify({
              id: patient.id,
              employeeId: patient.employeeId,
              name: patient.name
            })}
            size={150}
            level="H"
            includeMargin
          />
          <p className="mt-2 text-sm text-gray-500">
            امسح الرمز للوصول إلى السجل الطبي
          </p>
        </div>
      </div>
    </div>
  );
}