import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Patient } from '../types/patient';
import type { MedicalRecord } from '../types/medical-record';

export function generatePatientReport(patient: Patient): void {
  // Create PDF document with English settings
  const doc = new jsPDF();
  
  // Add header with company logo
  doc.setFontSize(24);
  doc.text('Patient Medical Card', doc.internal.pageSize.width / 2, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('Shibh Al Jazira Contracting Company', doc.internal.pageSize.width / 2, 30, { align: 'center' });

  // Add patient photo if available
  if (patient.photo) {
    try {
      doc.addImage(patient.photo, 'JPEG', 20, 40, 40, 40);
    } catch (error) {
      console.warn('Could not add patient photo to PDF');
    }
  }

  // Add QR code
  const qrCodeData = JSON.stringify({
    id: patient.id,
    employeeId: patient.employeeId,
    name: patient.name
  });
  
  try {
    const qrCanvas = document.createElement('canvas');
    const QRCode = require('qrcode');
    QRCode.toCanvas(qrCanvas, qrCodeData, { width: 100 });
    doc.addImage(qrCanvas.toDataURL(), 'PNG', 150, 40, 40, 40);
  } catch (error) {
    console.warn('Could not add QR code to PDF');
  }

  // Add patient information table
  autoTable(doc, {
    startY: 90,
    head: [['Patient Information']],
    body: [
      ['Name', patient.name],
      ['Employee ID', patient.employeeId],
      ['Department', patient.department],
      ['Position', patient.position],
      ['Location', patient.location]
    ],
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 12
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 14
    }
  });

  // Add medical access QR code information
  doc.setFontSize(10);
  doc.text(
    'Scan QR code for medical record access',
    doc.internal.pageSize.width - 60,
    85,
    { align: 'center' }
  );

  // Add footer
  doc.setFontSize(10);
  doc.text(
    `Generated on: ${format(new Date(), 'PPP', { locale: enUS })}`,
    doc.internal.pageSize.width / 2,
    doc.internal.pageSize.height - 20,
    { align: 'center' }
  );

  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Save the PDF with formatted filename
  const timestamp = format(new Date(), 'yyyy-MM-dd-HHmm');
  doc.save(`patient-${patient.employeeId}-${timestamp}.pdf`);
}

export function generatePrintableRecord(record: MedicalRecord): void {
  // Create PDF document
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(24);
  doc.text('Medical Record', doc.internal.pageSize.width / 2, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('Shibh Al Jazira Contracting Company', doc.internal.pageSize.width / 2, 30, { align: 'center' });

  // Add record information
  autoTable(doc, {
    startY: 40,
    head: [['Record Information']],
    body: [
      ['Record Type', record.recordType],
      ['Date', format(new Date(record.date), 'PPP', { locale: enUS })],
      ['Created By', record.createdBy],
      ['Last Updated', format(new Date(record.updatedAt), 'PPP', { locale: enUS })]
    ],
    theme: 'grid',
    styles: {
      fontSize: 12
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255
    }
  });

  // Add mental health section
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Mental Health Assessment']],
    body: [
      ['Status', record.mentalHealth.status],
      ['Assessment', record.mentalHealth.assessment],
      ['Recommendations', record.mentalHealth.recommendations]
    ],
    theme: 'grid'
  });

  // Add physical fitness section
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Physical Fitness Evaluation']],
    body: [
      ['Status', record.physicalFitness.status],
      ['Limitations', record.physicalFitness.limitations.join(', ')],
      ['Recommendations', record.physicalFitness.recommendations]
    ],
    theme: 'grid'
  });

  // Add footer
  doc.setFontSize(10);
  doc.text(
    `Generated on: ${format(new Date(), 'PPP', { locale: enUS })}`,
    doc.internal.pageSize.width / 2,
    doc.internal.pageSize.height - 10,
    { align: 'center' }
  );

  // Save the PDF
  const timestamp = format(new Date(), 'yyyy-MM-dd-HHmm');
  doc.save(`medical-record-${record.id}-${timestamp}.pdf`);
}