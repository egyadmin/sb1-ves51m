import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, FileEdit, Trash2, Eye, Plus } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import TawuniyaForm from '../components/insurance/TawuniyaForm';
import TawuniyaCard from '../components/insurance/TawuniyaCard';
import TableLanguageSelector from '../components/TableLanguageSelector';
import { useModal } from '../hooks/useModal';
import type { TawuniyaPolicy } from '../types/tawuniya';

export default function Insurance() {
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedPolicy, setSelectedPolicy] = useState<TawuniyaPolicy | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');

  const insurancePolicies = [
    {
      id: '1',
      tawuniyaPolicyNumber: 'TAW001',
      tawuniyaCardNumber: 'CARD001',
      tawuniyaNetwork: 'A',
      employeeNumber: 'EMP001',
      companyName: 'شبه الجزيرة للمقاولات',
      companyId: 'COMP001',
      patientName: 'أحمد محمد',
      insuranceClass: 'VIP',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'ACTIVE',
      mohApprovalDetails: {
        approvalNumber: 'MOH001',
        issueDate: '2024-01-01',
        expiryDate: '2024-12-31',
        status: 'ACTIVE'
      },
      benefitLimits: {
        annualLimit: 500000,
        outpatientDeductible: 100,
        inpatientDeductible: 0,
        pharmacyDeductible: 20,
        dentalDeductible: 200
      }
    }
  ] as TawuniyaPolicy[];

  const handleSubmit = (data: Partial<TawuniyaPolicy>) => {
    console.log('New insurance policy:', data);
    closeModal();
  };

  const columns = [
    { key: 'patientName', header: 'اسم المريض' },
    { key: 'tawuniyaPolicyNumber', header: 'رقم البوليصة' },
    { key: 'tawuniyaNetwork', header: 'الشبكة',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'A' ? 'bg-purple-100 text-purple-800' :
          value === 'B' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          شبكة {value}
        </span>
      )
    },
    { key: 'insuranceClass', header: 'الفئة' },
    { key: 'endDate', header: 'تاريخ الانتهاء' },
    {
      key: 'status',
      header: 'الحالة',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'ACTIVE' ? 'bg-green-100 text-green-800' :
          value === 'EXPIRED' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value === 'ACTIVE' ? 'نشط' :
           value === 'EXPIRED' ? 'منتهي' : 'معلق'}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (_, policy) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedPolicy(policy);
              setViewMode('details');
            }}
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

  if (viewMode === 'details' && selectedPolicy) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">تفاصيل التأمين</h2>
          <button
            onClick={() => setViewMode('list')}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            العودة للقائمة
          </button>
        </div>
        <TawuniyaCard policy={selectedPolicy} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">التأمين الطبي</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة بوالص التأمين الطبي مع شركة التعاونية
          </p>
        </div>
        <ActionButton
          icon={Plus}
          label="إضافة تأمين جديد"
          onClick={openModal}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-green-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">بوالص نشطة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">تنتهي قريباً</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-red-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">منتهية</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <TableLanguageSelector />
        <div className="mt-4">
          <DataTable data={insurancePolicies} columns={columns} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="إضافة تأمين جديد"
      >
        <TawuniyaForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}