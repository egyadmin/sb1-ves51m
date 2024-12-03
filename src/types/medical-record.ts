export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  recordType: 'REGULAR' | 'EMERGENCY' | 'FOLLOW_UP' | 'PERIODIC';
  
  // Mental Health
  mentalHealth: {
    status: 'STABLE' | 'NEEDS_SUPPORT' | 'UNDER_TREATMENT';
    assessment: string;
    recommendations: string;
    followUpDate?: string;
  };

  // Medical History
  medicalHistory: {
    chronicDiseases: string[];
    allergies: string[];
    previousSurgeries: string[];
    familyHistory: string;
  };

  // Periodic Checkup
  periodicCheckup: {
    lastCheckupDate: string;
    nextCheckupDate: string;
    vitals: {
      bloodPressure: string;
      heartRate: number;
      temperature: number;
      respiratoryRate: number;
      oxygenSaturation: number;
    };
    findings: string;
  };

  // Physical Fitness
  physicalFitness: {
    status: 'FIT' | 'FIT_WITH_LIMITATIONS' | 'TEMPORARILY_UNFIT' | 'UNFIT';
    limitations: string[];
    recommendations: string;
    reassessmentDate?: string;
  };

  // Physical Strain Assessment
  physicalStrain: {
    level: 'LOW' | 'MEDIUM' | 'HIGH';
    factors: string[];
    recommendations: string;
  };

  // Treatment & Medications
  treatment: {
    diagnosis: string;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
    procedures: string[];
    notes: string;
  };

  // Sick Leave
  sickLeave?: {
    startDate: string;
    endDate: string;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  };

  // Additional Information
  attachments: Array<{
    id: string;
    type: 'LAB_RESULT' | 'X_RAY' | 'PRESCRIPTION' | 'OTHER';
    name: string;
    url: string;
  }>;
  
  notes: string;
  createdBy: string;
  updatedAt: string;
}