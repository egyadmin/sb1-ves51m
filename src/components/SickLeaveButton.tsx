import React from 'react';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ActionButton from './ActionButton';

interface SickLeaveButtonProps {
  onClick: () => void;
}

export default function SickLeaveButton({ onClick }: SickLeaveButtonProps) {
  const { t } = useTranslation();

  return (
    <ActionButton
      icon={FileText}
      label="إجازة مرضية"
      onClick={onClick}
      variant="secondary"
    />
  );
}