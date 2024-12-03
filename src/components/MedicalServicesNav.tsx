import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Stethoscope,
  Microscope,
  Pill,
  Ambulance,
  ClipboardList
} from 'lucide-react';

export default function MedicalServicesNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      icon: Heart,
      name: t('services.firstAid'),
      path: '/first-aid',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      icon: Stethoscope,
      name: t('services.medicalCare'),
      path: '/medical-care',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      icon: Microscope,
      name: t('services.laboratory'),
      path: '/laboratory',
      color: 'text-purple-600',
      bgColor: 'hover:bg-purple-50'
    },
    {
      icon: Pill,
      name: t('services.pharmacy'),
      path: '/pharmacy',
      color: 'text-green-600',
      bgColor: 'hover:bg-green-50'
    },
    {
      icon: Ambulance,
      name: t('services.emergency'),
      path: '/emergency',
      color: 'text-yellow-600',
      bgColor: 'hover:bg-yellow-50'
    },
    {
      icon: ClipboardList,
      name: t('services.records'),
      path: '/records',
      color: 'text-indigo-600',
      bgColor: 'hover:bg-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <button
            key={service.path}
            onClick={() => navigate(service.path)}
            className={`flex flex-col items-center p-4 bg-white rounded-lg shadow transition-colors ${service.bgColor}`}
          >
            <Icon className={`h-8 w-8 ${service.color} mb-2`} />
            <span className="text-sm text-gray-600 text-center">{service.name}</span>
          </button>
        );
      })}
    </div>
  );
}