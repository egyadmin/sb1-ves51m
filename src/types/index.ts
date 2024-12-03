import { Location } from './location';
import { MedicalRecord } from './medical-record';
import { Patient } from './patient';
import { EmergencyResponse } from './emergency';
import { Pharmacy } from './pharmacy';
import { ClinicCompliance } from './clinic-compliance';

export type { Location, MedicalRecord, Patient, EmergencyResponse, Pharmacy, ClinicCompliance };

export interface EmergencyResponse {
  id: string;
  locationId: string;
  responseTime: number; // in minutes
  type: 'ACCIDENT' | 'MEDICAL' | 'FIRE';
  status: 'IN_PROGRESS' | 'COMPLETED';
  ambulanceDispatch?: {
    dispatchTime: string;
    arrivalTime: string;
    team: string[];
  };
  outcome: string;
  notes?: string;
}

export interface Pharmacy {
  id: string;
  locationId: string;
  inventory: {
    medicine: string;
    quantity: number;
    expiryDate: string;
    minimumRequired: number;
  }[];
  supplies: {
    item: string;
    quantity: number;
    category: 'OXYGEN' | 'INJECTIONS' | 'SOLUTIONS' | 'CLEANING' | 'STERILIZATION' | 'NEBULIZER';
    minimumRequired: number;
  }[];
  orders: {
    id: string;
    date: string;
    items: { itemId: string; quantity: number }[];
    status: 'PENDING' | 'APPROVED' | 'DELIVERED';
  }[];
}

export interface ClinicCompliance {
  id: string;
  locationId: string;
  lastInspectionDate: string;
  nextInspectionDate: string;
  complianceStatus: 'COMPLIANT' | 'PARTIAL' | 'NON_COMPLIANT';
  authorities: ('MOH' | 'MOT' | 'MOMRA' | 'NEOM' | 'EMERGENCY')[];
  requirements: {
    category: string;
    items: {
      requirement: string;
      status: 'MET' | 'PARTIAL' | 'NOT_MET';
      notes?: string;
    }[];
  }[];
  periodicTests: {
    id: string;
    type: 'AMBULANCE' | 'EMERGENCY_RESPONSE' | 'EQUIPMENT';
    lastTestDate: string;
    nextTestDate: string;
    status: 'PASSED' | 'FAILED';
    notes?: string;
  }[];
}