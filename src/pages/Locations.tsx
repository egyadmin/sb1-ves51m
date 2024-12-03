import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, FileEdit, Trash2, Eye, MapPin } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import LocationForm from '../components/forms/LocationForm';
import TableLanguageSelector from '../components/TableLanguageSelector';
import { useModal } from '../hooks/useModal';
import type { Location } from '../types';

export default function Locations() {
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const locations = [
    {
      id: '1',
      name: 'مشروع الرياض',
      type: 'PROJECT',
      address: 'الرياض، المملكة العربية السعودية',
      capacity: '500',
      clinicType: 'PRIMARY',
      facilities: ['عيادة عامة', 'غرفة طوارئ', 'صيدلية'],
      staffCount: 12,
      operatingHours: '24/7',
      lastInspection: '2024-02-15',
      complianceStatus: 'COMPLIANT'
    },
    {
      id: '2',
      name: 'سكن العمال - جدة',
      type: 'ACCOMMODATION',
      address: 'جدة، المملكة العربية السعودية',
      capacity: '200',
      clinicType: 'SECONDARY',
      facilities: ['عيادة عامة', 'صيدلية'],
      staffCount: 6,
      operatingHours: '8:00 - 20:00',
      lastInspection: '2024-03-01',
      complianceStatus: 'PARTIAL'
    },
    {
      id: '3',
      name: 'مشروع نيوم',
      type: 'PROJECT',
      address: 'نيوم، المملكة العربية السعودية',
      capacity: '1000',
      clinicType: 'ADVANCED',
      facilities: ['عيادة عامة', 'غرفة طوارئ', 'مختبر', 'أشعة', 'صيدلية'],
      staffCount: 25,
      operatingHours: '24/7',
      lastInspection: '2024-03-10',
      complianceStatus: 'COMPLIANT'
    }
  ];

  const handleSubmit = (data: Partial<Location>) => {
    console.log('New location:', data);
    closeModal();
  };

  const columns = [
    { key: 'name', header: t('locations.name') },
    { 
      key: 'type',
      header: t('locations.type'),
      render: (value: string) => {
        const types: Record<string, string> = {
          PROJECT: 'مشروع',
          ACCOMMODATION: 'سكن',
          ADMIN_BUILDING: 'مبنى إدارة'
        };
        return types[value] || value;
      }
    },
    { 
      key: 'clinicType',
      header: 'مستوى العيادة',
      render: (value: string) => {
        const types: Record<string, string> = {
          PRIMARY: 'أولية',
          SECONDARY: 'ثانوية',
          ADVANCED: 'متقدمة'
        };
        return types[value] || value;
      }
    },
    { key: 'staffCount', header: 'عدد الكادر الطبي' },
    { key: 'operatingHours', header: 'ساعات العمل' },
    {
      key: 'complianceStatus',
      header: 'حالة التوافق',
      render: (value: string) => {
        const className = `px-2 py-1 rounded-full text-xs font-medium ${
          value === 'COMPLIANT'
            ? 'bg-green-100 text-green-800'
            : value === 'PARTIAL'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`;
        return (
          <span className={className}>
            {value === 'COMPLIANT' ? 'متوافق' : value === 'PARTIAL' ? 'متوافق جزئياً' : 'غير متوافق'}
          </span>
        );
      }
    },
    {
      key: 'actions',
      header: '',
      render: (_, location) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedLocation(location)}
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
          <h2 className="text-2xl font-semibold text-gray-900">{t('locations.title')}</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة مواقع العيادات والمرافق الطبية
          </p>
        </div>
        <ActionButton
          icon={Building2}
          label={t('locations.add')}
          onClick={openModal}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-blue-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">إجمالي المواقع</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">15</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-green-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">مواقع نشطة</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-yellow-600" />
              <div className="mr-5">
                <p className="text-sm font-medium text-gray-500">تحت الإنشاء</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <TableLanguageSelector />
        <div className="mt-4">
          <DataTable data={locations} columns={columns} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={t('locations.add')}
      >
        <LocationForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}