import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function ActionButton({ icon: Icon, label, onClick, variant = 'primary' }: ActionButtonProps) {
  const baseClasses = "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      <Icon className="h-5 w-5 ml-2" />
      <span>{label}</span>
    </button>
  );
}