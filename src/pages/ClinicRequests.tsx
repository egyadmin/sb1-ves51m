import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquarePlus, Clock, AlertTriangle, CheckCircle2, FileEdit, Trash2, Eye } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import ClinicRequestForm from '../components/forms/ClinicRequestForm';
import TableLanguageSelector from '../components/TableLanguageSelector';
import { useModal } from '../hooks/useModal';

export default function ClinicRequests() {
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const requests = [
    {
      id: 'REQ001',
      clinicName: 'عيادة مشروع الرياض',
      requestType: 'SUPPLIES',
      priority: 'عاجلة',
      status: 'قيد المراجعة',
      date: '2024-03-20',
      description: 'طلب مستلزمات طبية عاجلة',
    },
    {
      id: 'REQ002',
      clinicName: 'عيادة مشروع جدة',
      requestType: 'MAINTENANCE',
      priority: 'عادية',
      status: 'تمت الموافقة',
      date: '2024-03-19',
      description: 'صيانة دورية للأجهزة',
    }
  ];

  const handleSubmit = (data: any) => {
    console.log('New clinic request:', data);
    closeModal();
  };

  const columns = [
    { key: 'id', header: 'رقم الطلب' },
    { key: 'clinicName', header: 'اسم العيادة' },
    { 
      key: 'requestType',
      header: 'نوع الطلب',
      render: (value: string) => {
        const types: Record<string, string> = {
          SUPPLIES: 'مستلزمات',
          MAINTENANCE: 'صيانة',
          STAFF: 'كوادر طبية',
          EMERGENCY: 'طارئة'
        };
        return types[value] || value;
      }
    },
    {
      key: 'priority',
      header: 'الأولوية',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'عاجلة'
            ? 'bg-red-100 text-red-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'date', header: 'التاريخ' },
    {
      key: 'status',
      header: 'الحالة',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'تمت الموافقة'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (_, request) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedRequest(request)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye className="h-5 w-5" />
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
        <h2 className="text-2xl font-semibold text-gray-900">طلبات العيادات</h2>
        <ActionButton
          icon={MessageSquarePlus}
          label="استقبال طلب جديد"
          onClick={openModal}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">قيد المراجعة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">طلبات عاجلة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">تمت المعالجة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <TableLanguageSelector />
        <div className="mt-4">
          <DataTable data={requests} columns={columns} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="استقبال طلب جديد"
      >
        <ClinicRequestForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}