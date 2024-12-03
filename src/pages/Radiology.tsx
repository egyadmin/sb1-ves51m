import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileImage, Upload, Eye, Download, FileEdit, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import RadiologyForm from '../components/forms/RadiologyForm';
import ImageViewer from '../components/ImageViewer';
import TableLanguageSelector from '../components/TableLanguageSelector';
import { useModal } from '../hooks/useModal';

export default function Radiology() {
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewerVisible, setViewerVisible] = useState(false);

  const radiologyRecords = [
    {
      id: '1',
      patientId: 'P001',
      patientName: 'أحمد محمد',
      examType: 'X-RAY',
      bodyPart: 'CHEST',
      date: '2024-03-20',
      requestedBy: 'د. علي',
      status: 'COMPLETED',
      imageUrl: 'https://example.com/xray1.jpg'
    },
    {
      id: '2',
      patientId: 'P002',
      patientName: 'محمد علي',
      examType: 'MRI',
      bodyPart: 'KNEE',
      date: '2024-03-19',
      requestedBy: 'د. أحمد',
      status: 'PENDING',
      imageUrl: 'https://example.com/mri1.jpg'
    }
  ];

  const handleSubmit = (data: any) => {
    console.log('New radiology record:', data);
    closeModal();
  };

  const columns = [
    { key: 'patientName', header: 'اسم المريض' },
    { 
      key: 'examType',
      header: 'نوع الفحص',
      render: (value: string) => {
        const types: Record<string, string> = {
          'X-RAY': 'أشعة سينية',
          'MRI': 'رنين مغناطيسي',
          'CT': 'أشعة مقطعية',
          'ULTRASOUND': 'موجات صوتية'
        };
        return types[value] || value;
      }
    },
    { key: 'bodyPart', header: 'موضع الفحص' },
    { key: 'date', header: 'التاريخ' },
    { key: 'requestedBy', header: 'طلب بواسطة' },
    {
      key: 'status',
      header: 'الحالة',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'COMPLETED'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value === 'COMPLETED' ? 'مكتمل' : 'قيد الانتظار'}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedImage(record.imageUrl);
              setViewerVisible(true);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            <Download className="h-5 w-5" />
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            <FileEdit className="h-5 w-5" />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">قسم الأشعة</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة الفحوصات الإشعاعية وصور الأشعة
          </p>
        </div>
        <ActionButton
          icon={FileImage}
          label="فحص جديد"
          onClick={openModal}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <FileImage className="h-6 w-6 text-blue-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">
                  فحوصات اليوم
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  12
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Upload className="h-6 w-6 text-green-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">
                  تم رفعها
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  8
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Eye className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">
                  قيد المراجعة
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  4
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <TableLanguageSelector />
        <div className="mt-4">
          <DataTable data={radiologyRecords} columns={columns} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="فحص أشعة جديد"
      >
        <RadiologyForm onSubmit={handleSubmit} />
      </Modal>

      <ImageViewer
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
        images={selectedImage ? [selectedImage] : []}
      />
    </div>
  );
}