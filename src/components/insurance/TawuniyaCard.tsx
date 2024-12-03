import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Calendar, CreditCard } from 'lucide-react';
import type { TawuniyaPolicy } from '../../types/tawuniya';

interface TawuniyaCardProps {
  policy: TawuniyaPolicy;
}

export default function TawuniyaCard({ policy }: TawuniyaCardProps) {
  const { t } = useTranslation();

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'A':
        return 'bg-purple-100 text-purple-800';
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-blue-600 ml-2" />
          <h3 className="text-lg font-medium text-gray-900">
            بطاقة التأمين - التعاونية
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getNetworkColor(policy.tawuniyaNetwork)}`}>
          شبكة {policy.tawuniyaNetwork}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-500">رقم البوليصة</p>
          <p className="font-medium">{policy.tawuniyaPolicyNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">رقم البطاقة</p>
          <p className="font-medium">{policy.tawuniyaCardNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">الرقم الوظيفي</p>
          <p className="font-medium">{policy.employeeNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">الشركة</p>
          <p className="font-medium">{policy.companyName}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">التغطية والحدود</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">الحد السنوي</p>
            <p className="font-medium">{policy.benefitLimits.annualLimit} ريال</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تحمل العيادات</p>
            <p className="font-medium">{policy.benefitLimits.outpatientDeductible} ريال</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تحمل الأدوية</p>
            <p className="font-medium">{policy.benefitLimits.pharmacyDeductible} ريال</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تحمل التنويم</p>
            <p className="font-medium">{policy.benefitLimits.inpatientDeductible} ريال</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">موافقة وزارة الصحة</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">رقم الموافقة</p>
            <p className="font-medium">{policy.mohApprovalDetails.approvalNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تاريخ الانتهاء</p>
            <p className="font-medium">{policy.mohApprovalDetails.expiryDate}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 ml-1" />
          صالحة حتى: {policy.endDate}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <CreditCard className="h-4 w-4 ml-1" />
          تم الإصدار: {policy.startDate}
        </div>
      </div>
    </div>
  );
}