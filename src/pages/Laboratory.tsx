import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Upload, Download, FileEdit, Trash2, Microscope, Eye } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import LabTestForm from '../components/forms/LabTestForm';
import TableLanguageSelector from '../components/TableLanguageSelector';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useModal } from '../hooks/useModal';
import { useDataStore } from '../hooks/useDataStore';
import { useConfirmation } from '../hooks/useConfirmation';

interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  testType: string;
  date: string;
  requestedBy: string;
  status: 'PENDING' | 'COMPLETED';
  result?: string;
  priority: 'normal' | 'urgent' | 'emergency';
  notes?: string;
  attachments: File[];
}

export default function Laboratory() {
  const { t } = useTranslation();
  const { isOpen: isFormOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isViewOpen, openModal: openViewModal, closeModal: closeViewModal } = useModal();
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const { confirm } = useConfirmation();

  const { data: labTests, addItem: addTest, updateItem: updateTest, deleteItem: removeTest } = useDataStore<LabTest[]>('LAB_TESTS', []);

  const handleSubmit = (data: any) => {
    const newTest = {
      ...data,
      id: selectedTest?.id || crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING'
    };

    if (selectedTest) {
      updateTest(selectedTest.id, newTest);
    } else {
      addTest(newTest);
    }
    closeFormModal();
    setSelectedTest(null);
  };

  const handleView = (test: LabTest) => {
    setSelectedTest(test);
    openViewModal();
  };

  const handleEdit = (test: LabTest) => {
    setSelectedTest(test);
    openFormModal();
  };

  const handleDelete = (test: LabTest) => {
    setSelectedTest(test);
    openDeleteModal();
  };

  const confirmDelete = () => {
    if (selectedTest) {
      removeTest(selectedTest.id);
      closeDeleteModal();
      setSelectedTest(null);
    }
  };

  const columns = [
    { key: 'patientName', header: 'اسم المريض' },
    { 
      key: 'testType',
      header: 'نوع التحليل',
      render: (value: string) => {
        const types: Record<string, string> = {
          'BLOOD': 'تحليل دم',
          'URINE': 'تحليل بول',
          'STOOL': 'تحليل براز',
          'BIOCHEMISTRY': 'تحليل كيميائي'
        };
        return types[value] || value;
      }
    },
    { key: 'date', header: 'التاريخ' },
    { key: 'requestedBy', header: 'طلب بواسطة' },
    {
      key: 'priority',
      header: 'الأولوية',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'emergency' ? 'bg-red-100 text-red-800' :
          value === 'urgent' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {value === 'emergency' ? 'طارئة' :
           value === 'urgent' ? 'عاجلة' : 'عادية'}
        </span>
      )
    },
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
    { key: 'result', header: 'النتيجة' },
    {
      key: 'actions',
      header: '',
      render: (_, test: LabTest) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(test)}
            className="text-blue-600 hover:text-blue-800"
            title="عرض التفاصيل"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleEdit(test)}
            className="text-blue-600 hover:text-blue-800"
            title="تعديل"
          >
            <FileEdit className="h-5 w-5" />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            title="تحميل النتائج"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(test)}
            className="text-red-600 hover:text-red-800"
            title="حذف"
          >
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
          <h2 className="text-2xl font-semibold text-gray-900">المختبر</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة التحاليل المخبرية ونتائجها
          </p>
        </div>
        <ActionButton
          icon={Microscope}
          label="تحليل جديد"
          onClick={openFormModal}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">
                  تحاليل اليوم
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {labTests.filter(test => test.date === new Date().toISOString().split('T')[0]).length}
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
                  نتائج جاهزة
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {labTests.filter(test => test.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Microscope className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">
                  قيد التحليل
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {labTests.filter(test => test.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <TableLanguageSelector />
        <div className="mt-4">
          <DataTable data={labTests} columns={columns} />
        </div>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={closeFormModal}
        title={selectedTest ? "تعديل تحليل" : "تحليل مخبري جديد"}
      >
        <LabTestForm onSubmit={handleSubmit} initialData={selectedTest} />
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemType="التحليل"
        itemName={selectedTest?.patientName}
      />
    </div>
  );
}