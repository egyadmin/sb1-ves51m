import { InsurancePolicy } from './insurance';

export interface TawuniyaPolicy extends InsurancePolicy {
  tawuniyaPolicyNumber: string;
  tawuniyaCardNumber: string;
  tawuniyaNetwork: 'A' | 'B' | 'C';
  employeeNumber: string;
  companyName: string;
  companyId: string;
  mohApprovalDetails: {
    approvalNumber: string;
    issueDate: string;
    expiryDate: string;
    status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
  };
  benefitLimits: {
    annualLimit: number;
    outpatientDeductible: number;
    inpatientDeductible: number;
    pharmacyDeductible: number;
    dentalDeductible: number;
  };
}

export interface TawuniyaApproval {
  id: string;
  policyId: string;
  approvalNumber: string;
  serviceType: string;
  approvalDate: string;
  expiryDate: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  approvedAmount: number;
  deductibleAmount: number;
  patientShare: number;
  notes?: string;
}