import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';
import type { InsurancePolicy } from '../../types/insurance';

interface InsuranceCardProps {
  insurance: InsurancePolicy;
}

export default function InsuranceCard({ insurance }: InsuranceCardProps) {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800';
      case 'SUSPENDED':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getClassColor = (insuranceClass: string) => {
    switch (insuranceClass) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'B+':
        return 'bg-blue-100 text-blue-800';
      case 'B':
        return 'bg-green-100 text-green-800';
      case 'C':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-blue-600 ml-2" />
          <h3 className="text-lg font-medium text-gray-900">
            بيانات التأمين الطبي
          </h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(insurance.status)}`}>
          {insurance.status === 'ACTIVE' ? 'نشط' : 
           insurance.status === 'EXPIRED' ? 'منتهي' : 'معلق'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">رقم البوليصة</p>
          <p className="font-medium">{insurance.policyNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">الفئة</p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassColor(insurance.insuranceClass)}`}>
            {insurance.insuranceClass}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">تاريخ البداية</p>
          <p className="font-medium">{insurance.startDate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">تاريخ الانتهاء</p>
          <p className="font-medium">{insurance.endDate}</p>
        </div>

        <div className="col-span-2">
          <p className="text-sm text-gray-500">رقم موافقة وزارة الصحة</p>
          <p className="font-medium">{insurance.mohApprovalNumber}</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">نسب التغطية</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">العيادات الخارجية</p>
            <p className="font-medium">{insurance.coverageDetails.outpatientCoverage}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">التنويم</p>
            <p className="font-medium">{insurance.coverageDetails.inpatientCoverage}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">الأدوية</p>
            <p className="font-medium">{insurance.coverageDetails.medicationCoverage}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">الأسنان</p>
            <p className="font-medium">{insurance.coverageDetails.dentalCoverage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}