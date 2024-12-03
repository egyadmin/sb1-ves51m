import React from 'react';
import { Eye, FileEdit, Download, Trash2, User } from 'lucide-react';
import type { Patient } from '../../types/patient';

interface PatientListItemProps {
  patient: Patient;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onDownload: (patient: Patient) => void;
}

export default function PatientListItem({
  patient,
  onView,
  onEdit,
  onDelete,
  onDownload
}: PatientListItemProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            {patient.photo ? (
              <img
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                src={patient.photo}
                alt={patient.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=random`;
                }}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                <User className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="mr-4">
            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
            <div className="text-sm text-gray-500 mt-0.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {patient.employeeId}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {patient.department}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {patient.position}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {patient.location}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(patient)}
            className="text-blue-600 hover:text-blue-900 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
            title="عرض التفاصيل"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => onEdit(patient)}
            className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-full hover:bg-indigo-50 transition-colors"
            title="تعديل"
          >
            <FileEdit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDownload(patient)}
            className="text-green-600 hover:text-green-900 p-1.5 rounded-full hover:bg-green-50 transition-colors"
            title="تحميل السجل الطبي"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(patient)}
            className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-50 transition-colors"
            title="حذف"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}