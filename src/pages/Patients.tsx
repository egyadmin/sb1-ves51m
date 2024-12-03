import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import PatientForm from '../components/forms/PatientForm';
import PatientSearch from '../components/PatientSearch';
import PatientListItem from '../components/patients/PatientListItem';
import PatientPreviewModal from '../components/patients/PatientPreviewModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import TableLanguageSelector from '../components/TableLanguageSelector';
import { useModal } from '../hooks/useModal';
import { useDataStore } from '../hooks/useDataStore';
import { useConfirmation } from '../hooks/useConfirmation';
import { generatePatientReport } from '../utils/printUtils';
import type { Patient } from '../types/patient';

export default function Patients() {
  const { t } = useTranslation();
  const { isOpen: isFormOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isPreviewOpen, openModal: openPreviewModal, closeModal: closePreviewModal } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { confirm } = useConfirmation();

  const { data: patients, addItem: addPatient, updateItem: updatePatient, deleteItem: removePatient } = useDataStore<Patient[]>('PATIENTS', []);

  const filteredPatients = patients.filter(patient => 
    patient.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.name.includes(searchQuery)
  );

  const handleSubmit = (data: Partial<Patient>) => {
    if (selectedPatient) {
      updatePatient(selectedPatient.id, data);
    } else {
      addPatient(data);
    }
    closeFormModal();
    setSelectedPatient(null);
  };

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    openPreviewModal();
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    openFormModal();
  };

  const handleDelete = (patient: Patient) => {
    setSelectedPatient(patient);
    openDeleteModal();
  };

  const handleDownload = (patient: Patient) => {
    generatePatientReport(patient);
  };

  const confirmDelete = () => {
    if (selectedPatient) {
      removePatient(selectedPatient.id);
      closeDeleteModal();
      setSelectedPatient(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">المرضى</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة سجلات المرضى والموظفين
          </p>
        </div>
        <ActionButton
          icon={UserPlus}
          label="إضافة مريض"
          onClick={openFormModal}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <TableLanguageSelector />
        </div>
        
        <div className="mb-6">
          <PatientSearch onSearch={setSearchQuery} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المريض
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  القسم
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المنصب
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموقع
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <PatientListItem
                  key={patient.id}
                  patient={patient}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={closeFormModal}
        title={selectedPatient ? "تعديل بيانات المريض" : "إضافة مريض جديد"}
      >
        <PatientForm onSubmit={handleSubmit} initialData={selectedPatient} />
      </Modal>

      {selectedPatient && (
        <>
          <PatientPreviewModal
            isOpen={isPreviewOpen}
            onClose={closePreviewModal}
            patient={selectedPatient}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteOpen}
            onClose={closeDeleteModal}
            onConfirm={confirmDelete}
            itemType="المريض"
            itemName={selectedPatient.name}
          />
        </>
      )}
    </div>
  );
}