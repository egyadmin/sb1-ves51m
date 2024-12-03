import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilePlus, FileEdit, Trash2, Eye } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import MedicalRecordForm from '../components/forms/MedicalRecordForm';
import RecordDetails from '../components/medical-records/RecordDetails';
import RecordFilters from '../components/medical-records/RecordFilters';
import TableLanguageSelector from '../components/TableLanguageSelector';
import { useModal } from '../hooks/useModal';
import type { MedicalRecord } from '../types';

export default function MedicalRecords() {
  const { t } = useTranslation();
  const { isOpen: isFormOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();
  const { isOpen: isViewOpen, openModal: openViewModal, closeModal: closeViewModal } = useModal();
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const records: MedicalRecord[] = [
    {
      id: '1',
      patientId: 'P001',
      date: '2024-03-15',
      recordType: 'PERIODIC',
      mentalHealth: {
        status: 'STABLE',
        assessment: 'المريض في حالة مستقرة نفسياً',
        recommendations: 'متابعة روتينية كل 3 أشهر',
      },
      medicalHistory: {
        chronicDiseases: ['ضغط الدم المرتفع'],
        allergies: ['البنسلين'],
        previousSurgeries: [],
        familyHistory: 'لا يوجد أمراض وراثية',
      },
      periodicCheckup: {
        lastCheckupDate: '2024-03-15',
        nextCheckupDate: '2024-06-15',
        vitals: {
          bloodPressure: '120/80',
          heartRate: 72,
          temperature: 37,
          respiratoryRate: 16,
          oxygenSaturation: 98,
        },
        findings: 'جميع المؤشرات الحيوية طبيعية',
      },
      physicalFitness: {
        status: 'FIT',
        limitations: [],
        recommendations: 'لائق للعمل بدون قيود',
      },
      physicalStrain: {
        level: 'LOW',
        factors: ['العمل لساعات طويلة'],
        recommendations: 'أخذ فترات راحة منتظمة',
      },
      treatment: {
        diagnosis: 'فحص دوري روتيني',
        medications: [],
        procedures: [],
        notes: 'الحالة الصحية جيدة',
      },
      attachments: [],
      notes: '',
      createdBy: 'د. أحمد',
      updatedAt: '2024-03-15',
    },
    {
      id: '2',
      patientId: 'P002',
      date: '2024-03-14',
      recordType: 'EMERGENCY',
      mentalHealth: {
        status: 'NEEDS_SUPPORT',
        assessment: 'يعاني من ضغوط العمل',
        recommendations: 'جلسات دعم نفسي أسبوعية',
        followUpDate: '2024-03-21',
      },
      medicalHistory: {
        chronicDiseases: [],
        allergies: [],
        previousSurgeries: [],
        familyHistory: '',
      },
      periodicCheckup: {
        lastCheckupDate: '2024-03-14',
        nextCheckupDate: '2024-03-21',
        vitals: {
          bloodPressure: '130/85',
          heartRate: 80,
          temperature: 37.2,
          respiratoryRate: 18,
          oxygenSaturation: 97,
        },
        findings: 'يحتاج متابعة للضغط النفسي',
      },
      physicalFitness: {
        status: 'FIT_WITH_LIMITATIONS',
        limitations: ['تجنب العمل لساعات إضافية'],
        recommendations: 'تخفيف ضغط العمل',
        reassessmentDate: '2024-03-28',
      },
      physicalStrain: {
        level: 'MEDIUM',
        factors: ['ضغط العمل', 'قلة النوم'],
        recommendations: 'تنظيم ساعات العمل وأخذ قسط كافٍ من الراحة',
      },
      treatment: {
        diagnosis: 'إجهاد نفسي',
        medications: [
          {
            name: 'مهدئ خفيف',
            dosage: '5mg',
            frequency: 'عند الحاجة',
            duration: 'أسبوع',
          },
        ],
        procedures: ['جلسة دعم نفسي'],
        notes: 'يحتاج متابعة أسبوعية',
      },
      attachments: [],
      notes: 'يجب متابعة الحالة النفسية',
      createdBy: 'د. محمد',
      updatedAt: '2024-03-14',
    },
  ];

  const handleSubmit = (data: Partial<MedicalRecord>) => {
    console.log('New medical record:', data);
    closeFormModal();
  };

  const handleView = (record: MedicalRecord) => {
    setSelectedRecord(record);
    openViewModal();
  };

  const columns = [
    { key: 'patientId', header: t('records.patientId') },
    { key: 'date', header: t('records.date') },
    { 
      key: 'recordType',
      header: t('records.type'),
      render: (value: string) => {
        const types: Record<string, string> = {
          REGULAR: 'فحص عادي',
          EMERGENCY: 'حالة طارئة',
          FOLLOW_UP: 'متابعة',
          PERIODIC: 'فحص دوري',
        };
        return types[value] || value;
      }
    },
    {
      key: 'mentalHealth',
      header: 'الحالة النفسية',
      render: (value: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value.status === 'STABLE'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value.status === 'STABLE' ? 'مستقر' : 'يحتاج متابعة'}
        </span>
      ),
    },
    {
      key: 'physicalFitness',
      header: 'اللياقة البدنية',
      render: (value: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value.status === 'FIT'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value.status === 'FIT' ? 'لائق' : 'لائق مع قيود'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (_, record: MedicalRecord) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(record)}
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
        <h2 className="text-2xl font-semibold text-gray-900">{t('records.title')}</h2>
        <ActionButton
          icon={FilePlus}
          label={t('records.add')}
          onClick={openFormModal}
        />
      </div>

      <TableLanguageSelector />
      <RecordFilters onFilterChange={console.log} />
      <DataTable data={records} columns={columns} />

      <Modal
        isOpen={isFormOpen}
        onClose={closeFormModal}
        title={t('records.add')}
      >
        <MedicalRecordForm onSubmit={handleSubmit} />
      </Modal>

      <Modal
        isOpen={isViewOpen}
        onClose={closeViewModal}
        title="تفاصيل السجل الطبي"
      >
        {selectedRecord && <RecordDetails record={selectedRecord} />}
      </Modal>
    </div>
  );
}