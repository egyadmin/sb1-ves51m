import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { User, Building2, Briefcase } from 'lucide-react';
import Modal from '../Modal';
import type { Patient } from '../../types/patient';

interface PatientPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

export default function PatientPreviewModal({
  isOpen,
  onClose,
  patient
}: PatientPreviewModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="معلومات المريض"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center">
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

        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
          <p className="text-sm text-gray-500">الرقم الوظيفي: {patient.employeeId}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
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

        <div className="flex justify-center">
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
            <p className="mt-2 text-sm text-gray-500 text-center">
              امسح الرمز للوصول إلى السجل الطبي
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}