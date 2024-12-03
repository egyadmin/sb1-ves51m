import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileBarChart, FileEdit, Trash2, Download } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import ReportForm from '../components/forms/ReportForm';
import { useModal } from '../hooks/useModal';

export default function Reports() {
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();

  const reports = [
    {
      id: '1',
      title: 'تقرير الفحوصات الشهرية',
      date: '2024-03-01',
      type: 'شهري',
      status: 'مكتمل'
    },
    {
      id: '2',
      title: 'تقرير السلامة المهنية',
      date: '2024-03-15',
      type: 'أسبوعي',
      status: 'مكتمل'
    }
  ];

  const handleSubmit = (data: any) => {
    console.log('New report:', data);
    closeModal();
  };

  const columns = [
    { key: 'title', header: t('reports.title') },
    { key: 'date', header: t('reports.date') },
    { key: 'type', header: t('reports.type') },
    { key: 'status', header: t('reports.status') },
    {
      key: 'actions',
      header: '',
      render: () => (
        <div className="flex gap-2">
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
        <h2 className="text-2xl font-semibold text-gray-900">{t('reports.pageTitle')}</h2>
        <ActionButton
          icon={FileBarChart}
          label={t('reports.generate')}
          onClick={openModal}
        />
      </div>
      <DataTable data={reports} columns={columns} />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={t('reports.generate')}
      >
        <ReportForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}