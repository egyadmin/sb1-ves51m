import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import MedicalRecords from './pages/MedicalRecords';
import FirstAid from './pages/FirstAid';
import MedicalCare from './pages/MedicalCare';
import Locations from './pages/Locations';
import Safety from './pages/Safety';
import EmergencyResponse from './pages/EmergencyResponse';
import Pharmacy from './pages/Pharmacy';
import Laboratory from './pages/Laboratory';
import Radiology from './pages/Radiology';
import Insurance from './pages/Insurance';
import ClinicCompliance from './pages/ClinicCompliance';
import ClinicRequests from './pages/ClinicRequests';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="records" element={<MedicalRecords />} />
            <Route path="first-aid" element={<FirstAid />} />
            <Route path="medical-care" element={<MedicalCare />} />
            <Route path="locations" element={<Locations />} />
            <Route path="safety" element={<Safety />} />
            <Route path="emergency" element={<EmergencyResponse />} />
            <Route path="pharmacy" element={<Pharmacy />} />
            <Route path="laboratory" element={<Laboratory />} />
            <Route path="radiology" element={<Radiology />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="compliance" element={<ClinicCompliance />} />
            <Route path="requests" element={<ClinicRequests />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;