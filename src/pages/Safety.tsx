import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldPlus, FileEdit, Trash2, Eye, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import SafetyIncidentForm from '../components/forms/SafetyIncidentForm';
import TableLanguageSelector from '../components/TableLanguageSelector';
import { useModal } from '../hooks/useModal';

export default function Safety() {
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedIncident, setSelectedIncident] = useState(null);

  const incidents = [
    {
      id: '1',
      date: '2024-03-15',
      location: 'مشروع الرياض',
      type: 'INJURY',
      severity: 'MINOR',
      description: 'إصابة طفيفة أثناء العمل',
      actions: 'تم تقديم الإسعافات الأولية',
      reportedBy: 'أحمد محمد',
      status: 'CLOSED',
      followUpDate: '2024-03-22',
      complianceStatus: 'COMPLIANT',
      mohReport: {
        reportNumber: 'MOH-2024-001',
        submissionDate: '2024-03-15',
        status: 'SUBMITTED'
      },
      motReport: {
        reportNumber: 'MOT-2024-001',
        submissionDate: '2024-03-15',
        status: 'APPROVED'
      }
    },
    {
      id: '2',
      date: '2024-03-14',
      location: 'مشروع جدة',
      type: 'NEAR_MISS',
      severity: 'POTENTIAL_SERIOUS',
      description: 'حادث وشيك في موقع البناء',
      actions: 'تم تعزيز إجراءات السلامة',
      reportedBy: 'محمد علي',
      status: 'IN_PROGRESS',
      followUpDate: '2024-03-21',
      complianceStatus: 'UNDER_REVIEW',
      mohReport: {
        reportNumber: 'MOH-2024-002',
        submissionDate: '2024-03-14',
        status: 'PENDING'
      },
      motReport: {
        reportNumber: 'MOT-2024-002',
        submissionDate: '2024-03-14',
        status: 'UNDER_REVIEW'
      }
    }
  ];

  const handleSubmit = (data: any) => {
    console.log('New safety incident:', data);
    closeModal();
  };

  const columns = [
    { key: 'date', header: t('safety.date') },
    { key: 'location', header: t('safety.location') },
    { 
      key: 'type',
      header: t('safety.type'),
      render: (value: string) => {
        const types: Record<string, string> = {
          'INJURY': 'إصابة',
          'NEAR_MISS': 'حادث وشيك',
          'HAZARD': 'خطر محتمل',
          'VIOLATION': 'مخالفة'
        };
        return types[value] || value;
      }
    },
    {
      key: 'severity',
      header: 'مستوى الخطورة',
      render: (value: string) => {
        const className = `px-2 py-1 rounded-full text-xs font-medium ${
          value === 'MINOR'
            ? 'bg-blue-100 text-blue-800'
            : value === 'MODERATE'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`;
        return (
          <span className={className}>
            {value === 'MINOR' ? 'طفيف' : 
             value === 'MODERATE' ? 'متوسط' : 'خطير'}
          </span>
        );
      }
    },
    {
      key: 'status',
      header: t('safety.status'),
      render: (value: string) => {
        const statusText = value === 'CLOSED' ? 'مغلق' : 'قيد المتابعة';
        const className = `px-2 py-1 rounded-full text-xs font-medium ${
          value === 'CLOSED'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`;
        return <span className={className}>{statusText}</span>;
      }
    },
    {
      key: 'actions',
      header: '',
      render: (_, incident) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedIncident(incident)}
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
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{t('safety.title')}</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة وإدارة حالات السلامة المهنية وفقاً لمتطلبات وزارة النقل والبلديات ومشاريع نيوم
          </p>
        </div>
        <ActionButton
          icon={ShieldPlus}
          label={t('safety.add')}
          onClick={openModal}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">حوادث نشطة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">قيد المتابعة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">تم إغلاقها</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <TableLanguageSelector />
        <div className="mt-4">
          <DataTable data={incidents} columns={columns} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={t('safety.add')}
      >
        <SafetyIncidentForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}