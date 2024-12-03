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

interface ReportOptions {
  title: string;
  language: 'ar' | 'en';
  period: string;
  startDate: Date;
  endDate: Date;
  data: any[];
  type: 'medical' | 'safety' | 'pharmacy' | 'emergency';
  patientId?: string;
  patientName?: string;
}

export function generateDetailedReport(options: ReportOptions): void {
  const { title, language, period, startDate, endDate, data, type, patientName } = options;
  
  // Create PDF document with RTL support for Arabic
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    hotfixes: ['px_scaling']
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
  addMetadataSection(doc, {
    language,
    period,
    startDate,
    endDate,
    patientName
  });

  // Add summary section with enhanced styling
  const summaryData = getSummaryData(data, type, language);
  addSummarySection(doc, summaryData, language);

  // Add main data table with professional styling
  addMainDataTable(doc, {
    data: Array.isArray(data) ? data : [],
    type,
    language
  });

  // Add footer with styling
  addFooter(doc, language);

  // Save the PDF with formatted filename
  const timestamp = format(new Date(), 'yyyy-MM-dd-HHmm');
  doc.save(`${type}-report-${timestamp}.pdf`);
}

// Rest of the utility functions remain the same...