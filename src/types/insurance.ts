import { Patient } from './patient';

export type InsuranceClass = 'C' | 'B' | 'B+' | 'VIP';

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  insuranceClass: InsuranceClass;
  startDate: string;
  endDate: string;
  provider: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
  mohApprovalNumber?: string;
  coverageDetails: {
    outpatientCoverage: number;
    inpatientCoverage: number;
    medicationCoverage: number;
    dentalCoverage: number;
    opticalCoverage: number;
  };
  patient: Patient;
}

export interface InsuranceApproval {
  id: string;
  policyId: string;
  serviceType: string;
  approvalNumber: string;
  approvalDate: string;
  expiryDate: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  notes?: string;
}