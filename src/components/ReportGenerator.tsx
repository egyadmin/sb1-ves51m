import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, Calendar, Filter, User } from 'lucide-react';
import { generateDetailedReport } from '../utils/reportGenerator';
import { useLanguage } from '../contexts/LanguageContext';
import { useDataStore } from '../hooks/useDataStore';
import type { Patient } from '../types/patient';

interface ReportGeneratorProps {
  data: any[];
  type: 'medical' | 'safety' | 'pharmacy' | 'emergency';
  onClose?: () => void;
}

export default function ReportGenerator({ data, type, onClose }: ReportGeneratorProps) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [period, setPeriod] = useState('daily');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportLanguage, setReportLanguage] = useState<'ar' | 'en'>('ar');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');

  const { data: patients } = useDataStore<Patient[]>('PATIENTS', []);

  const handleGenerateReport = () => {
    try {
      const filteredData = selectedPatientId 
        ? data.filter(item => item.patientId === selectedPatientId)
        : data;

      generateDetailedReport({
        title: t(`reports.types.${type}`),
        language: reportLanguage,
        period,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        data: filteredData,
        type,
        patientId: selectedPatientId,
        patientName: patients.find(p => p.id === selectedPatientId)?.name
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      {/* Rest of the component remains the same... */}
    </div>
  );
}