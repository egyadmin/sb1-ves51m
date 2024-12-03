import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

// Professional color palette
const colors = {
  primary: [41, 128, 185],    // Blue
  secondary: [46, 204, 113],  // Green
  accent: [155, 89, 182],     // Purple
  warning: [243, 156, 18],    // Orange
  danger: [231, 76, 60],      // Red
  text: [52, 73, 94],         // Dark Gray
  background: [236, 240, 241] // Light Gray
};

interface PDFOptions {
  title: string;
  language: 'ar' | 'en';
  data: any[];
  type: string;
  startDate?: Date;
  endDate?: Date;
  patientName?: string;
}

export function generatePDF(options: PDFOptions): void {
  const { title, language, data, type, startDate, endDate, patientName } = options;
  
  // Create PDF document with RTL support for Arabic
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true
  });

  // Set RTL mode for Arabic
  if (language === 'ar') {
    doc.setR2L(true);
  }

  // Add decorative header
  addHeader(doc, language);

  // Add title with styling
  doc.setFontSize(24);
  doc.setTextColor(...colors.primary);
  doc.text(title, doc.internal.pageSize.width / 2, 40, { align: 'center' });

  // Add metadata section
  if (startDate && endDate) {
    addDateRange(doc, startDate, endDate, language);
  }

  if (patientName) {
    addPatientInfo(doc, patientName, language);
  }

  // Add summary section
  const summaryData = getSummaryData(data, type, language);
  addSummarySection(doc, summaryData, language);

  // Add main data table
  addDataTable(doc, data, type, language);

  // Add footer
  addFooter(doc, language);

  // Save the PDF
  const timestamp = format(new Date(), 'yyyy-MM-dd-HHmm');
  doc.save(`${type}-report-${timestamp}.pdf`);
}

function addHeader(doc: jsPDF, language: string): void {
  // Add decorative header bar
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, doc.internal.pageSize.width, 15, 'F');

  // Add company name
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  const companyName = language === 'ar' ? 'شركة شبه الجزيرة للمقاولات' : 'Shibh Al Jazira Contracting Company';
  doc.text(companyName, doc.internal.pageSize.width / 2, 10, { align: 'center' });
}

function addDateRange(doc: jsPDF, startDate: Date, endDate: Date, language: string): void {
  const dateLocale = language === 'ar' ? ar : undefined;
  
  doc.setFontSize(12);
  doc.setTextColor(...colors.text);
  
  const dateText = language === 'ar'
    ? `الفترة: ${format(startDate, 'PPP', { locale: dateLocale })} - ${format(endDate, 'PPP', { locale: dateLocale })}`
    : `Period: ${format(startDate, 'PPP', { locale: dateLocale })} - ${format(endDate, 'PPP', { locale: dateLocale })}`;
  
  doc.text(dateText, doc.internal.pageSize.width / 2, 50, { align: 'center' });
}

function addPatientInfo(doc: jsPDF, patientName: string, language: string): void {
  doc.setFontSize(12);
  doc.setTextColor(...colors.text);
  
  const patientText = language === 'ar'
    ? `المريض: ${patientName}`
    : `Patient: ${patientName}`;
  
  doc.text(patientText, doc.internal.pageSize.width / 2, 60, { align: 'center' });
}

function addSummarySection(doc: jsPDF, summaryData: Record<string, any>, language: string): void {
  const startY = 70;

  autoTable(doc, {
    startY,
    head: [[language === 'ar' ? 'ملخص التقرير' : 'Report Summary']],
    body: Object.entries(summaryData).map(([key, value]) => [key, value]),
    theme: 'grid',
    styles: {
      fontSize: 10,
      textColor: colors.text,
      direction: language === 'ar' ? 'rtl' : 'ltr'
    },
    headStyles: {
      fillColor: colors.primary,
      textColor: 255,
      fontSize: 12,
      halign: language === 'ar' ? 'right' : 'left'
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto', halign: 'center' }
    },
    alternateRowStyles: {
      fillColor: colors.background
    }
  });
}

function addDataTable(doc: jsPDF, data: any[], type: string, language: string): void {
  const startY = doc.lastAutoTable?.finalY + 10 || 120;

  autoTable(doc, {
    startY,
    head: [getTableHeaders(type, language)],
    body: formatTableData(data, type, language),
    theme: 'grid',
    styles: {
      fontSize: 9,
      textColor: colors.text,
      direction: language === 'ar' ? 'rtl' : 'ltr'
    },
    headStyles: {
      fillColor: colors.primary,
      textColor: 255,
      fontSize: 11,
      halign: language === 'ar' ? 'right' : 'left'
    },
    alternateRowStyles: {
      fillColor: colors.background
    }
  });
}

function addFooter(doc: jsPDF, language: string): void {
  const pageCount = doc.internal.getNumberOfPages();
  const dateLocale = language === 'ar' ? ar : undefined;

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Add page numbers
    doc.setFontSize(10);
    doc.setTextColor(...colors.text);
    const pageText = language === 'ar'
      ? `صفحة ${i} من ${pageCount}`
      : `Page ${i} of ${pageCount}`;
    doc.text(pageText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 20, { align: 'center' });

    // Add generation date
    const dateText = language === 'ar'
      ? `تم إنشاء التقرير في: ${format(new Date(), 'PPP', { locale: dateLocale })}`
      : `Generated on: ${format(new Date(), 'PPP', { locale: dateLocale })}`;
    doc.text(dateText, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: 'right' });

    // Add decorative footer bar
    doc.setFillColor(...colors.primary);
    doc.rect(0, doc.internal.pageSize.height - 5, doc.internal.pageSize.width, 5, 'F');
  }
}

function getSummaryData(data: any[], type: string, language: string): Record<string, any> {
  const translations = {
    ar: {
      totalExams: 'إجمالي الفحوصات',
      periodicExams: 'الفحوصات الدورية',
      emergencyCases: 'حالات الطوارئ',
      followUps: 'المتابعات',
      totalIncidents: 'إجمالي الحوادث',
      seriousIncidents: 'حوادث خطيرة',
      moderateIncidents: 'حوادث متوسطة',
      minorIncidents: 'حوادث بسيطة'
    },
    en: {
      totalExams: 'Total Examinations',
      periodicExams: 'Periodic Exams',
      emergencyCases: 'Emergency Cases',
      followUps: 'Follow-ups',
      totalIncidents: 'Total Incidents',
      seriousIncidents: 'Serious Incidents',
      moderateIncidents: 'Moderate Incidents',
      minorIncidents: 'Minor Incidents'
    }
  };

  const t = translations[language];

  switch (type) {
    case 'medical':
      return {
        [t.totalExams]: data.length,
        [t.periodicExams]: data.filter(item => item.type === 'PERIODIC').length,
        [t.emergencyCases]: data.filter(item => item.type === 'EMERGENCY').length,
        [t.followUps]: data.filter(item => item.type === 'FOLLOW_UP').length
      };
    case 'safety':
      return {
        [t.totalIncidents]: data.length,
        [t.seriousIncidents]: data.filter(item => item.severity === 'HIGH').length,
        [t.moderateIncidents]: data.filter(item => item.severity === 'MEDIUM').length,
        [t.minorIncidents]: data.filter(item => item.severity === 'LOW').length
      };
    default:
      return { [t.totalExams]: data.length };
  }
}

function getTableHeaders(type: string, language: string): string[] {
  const headers = {
    medical: {
      ar: ['رقم المريض', 'التاريخ', 'نوع السجل', 'التشخيص', 'الحالة'],
      en: ['Patient ID', 'Date', 'Record Type', 'Diagnosis', 'Status']
    },
    safety: {
      ar: ['التاريخ', 'الموقع', 'النوع', 'الخطورة', 'الحالة'],
      en: ['Date', 'Location', 'Type', 'Severity', 'Status']
    }
  };

  return headers[type]?.[language] || headers[type].en;
}

function formatTableData(data: any[], type: string, language: string): any[][] {
  const dateLocale = language === 'ar' ? ar : undefined;

  return data.map(item => {
    switch (type) {
      case 'medical':
        return [
          item.patientId,
          format(new Date(item.date), 'PPP', { locale: dateLocale }),
          translateRecordType(item.recordType, language),
          item.diagnosis,
          translateStatus(item.status, language)
        ];
      case 'safety':
        return [
          format(new Date(item.date), 'PPP', { locale: dateLocale }),
          item.location,
          translateIncidentType(item.type, language),
          translateSeverity(item.severity, language),
          translateStatus(item.status, language)
        ];
      default:
        return Object.values(item);
    }
  });
}

function translateRecordType(type: string, language: string): string {
  const types = {
    ar: {
      PERIODIC: 'فحص دوري',
      EMERGENCY: 'حالة طارئة',
      FOLLOW_UP: 'متابعة'
    },
    en: {
      PERIODIC: 'Periodic',
      EMERGENCY: 'Emergency',
      FOLLOW_UP: 'Follow-up'
    }
  };

  return types[language]?.[type] || type;
}

function translateIncidentType(type: string, language: string): string {
  const types = {
    ar: {
      INJURY: 'إصابة',
      NEAR_MISS: 'حادث وشيك',
      HAZARD: 'خطر محتمل'
    },
    en: {
      INJURY: 'Injury',
      NEAR_MISS: 'Near Miss',
      HAZARD: 'Hazard'
    }
  };

  return types[language]?.[type] || type;
}

function translateSeverity(severity: string, language: string): string {
  const severities = {
    ar: {
      HIGH: 'خطير',
      MEDIUM: 'متوسط',
      LOW: 'بسيط'
    },
    en: {
      HIGH: 'High',
      MEDIUM: 'Medium',
      LOW: 'Low'
    }
  };

  return severities[language]?.[severity] || severity;
}

function translateStatus(status: string, language: string): string {
  const statuses = {
    ar: {
      ACTIVE: 'نشط',
      COMPLETED: 'مكتمل',
      PENDING: 'قيد الانتظار',
      CLOSED: 'مغلق'
    },
    en: {
      ACTIVE: 'Active',
      COMPLETED: 'Completed',
      PENDING: 'Pending',
      CLOSED: 'Closed'
    }
  };

  return statuses[language]?.[status] || status;
}