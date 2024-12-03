import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemType: string;
  itemName?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemType,
  itemName,
}: DeleteConfirmationModalProps) {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تأكيد الحذف"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-yellow-600">
          <AlertTriangle className="h-6 w-6" />
          <p className="text-lg font-medium">
            تحذير: لا يمكن التراجع عن هذا الإجراء
          </p>
        </div>

        <p className="text-gray-600">
          هل أنت متأكد من حذف {itemType}
          {itemName && <span className="font-medium"> {itemName}</span>}؟
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            تأكيد الحذف
          </button>
        </div>
      </div>
    </Modal>
  );
}