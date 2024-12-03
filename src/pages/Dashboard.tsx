import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Activity,
  FileText,
  AlertTriangle,
  Building2,
  FileBarChart
} from 'lucide-react';
import MedicalServicesNav from '../components/MedicalServicesNav';
import StatsCard from '../components/dashboard/StatsCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import DistributionChart from '../components/dashboard/DistributionChart';
import RecentActivitiesTable from '../components/dashboard/RecentActivitiesTable';
import NotificationsPanel from '../components/dashboard/NotificationsPanel';
import ReportPreviewModal from '../components/ReportPreviewModal';

export default function Dashboard() {
  const { t } = useTranslation();
  const [showReport, setShowReport] = useState(false);

  const stats = [
    {
      title: t('dashboard.stats.totalExams'),
      value: '1,234',
      trend: { value: '+12.5%', isPositive: true },
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('dashboard.stats.activePatients'),
      value: '856',
      trend: { value: '+5.2%', isPositive: true },
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: t('dashboard.stats.emergencyCases'),
      value: '23',
      trend: { value: '-3.1%', isPositive: false },
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: t('dashboard.stats.activeLocations'),
      value: '15',
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const performanceData = [
    { name: t('months.january'), examinations: 400, incidents: 24 },
    { name: t('months.february'), examinations: 300, incidents: 13 },
    { name: t('months.march'), examinations: 520, incidents: 18 },
    { name: t('months.april'), examinations: 450, incidents: 21 },
    { name: t('months.may'), examinations: 380, incidents: 15 },
    { name: t('months.june'), examinations: 430, incidents: 19 }
  ];

  const distributionData = [
    { name: t('examTypes.periodic'), value: 45, color: '#4F46E5' },
    { name: t('examTypes.followUp'), value: 25, color: '#10B981' },
    { name: t('examTypes.emergency'), value: 15, color: '#EF4444' },
    { name: t('examTypes.consultation'), value: 15, color: '#F59E0B' }
  ];

  const recentActivities = [
    {
      id: '1',
      type: t('examTypes.periodic'),
      patient: 'أحمد محمد',
      location: t('locations.riyadhProject'),
      date: '2024-03-20',
      status: t('status.completed')
    },
    {
      id: '2',
      type: t('examTypes.emergency'),
      patient: 'محمد علي',
      location: t('locations.jeddahProject'),
      date: '2024-03-20',
      status: t('status.inProgress')
    }
  ];

  const notifications = [
    {
      id: '1',
      type: 'warning',
      message: t('dashboard.notifications.lowInventory'),
      time: t('timeAgo.minutes', { count: 5 })
    },
    {
      id: '2',
      type: 'success',
      message: t('dashboard.notifications.completedExams'),
      time: t('timeAgo.hours', { count: 1 })
    },
    {
      id: '3',
      type: 'info',
      message: t('dashboard.notifications.upcomingInspection'),
      time: t('timeAgo.hours', { count: 3 })
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {t('dashboard.title')}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <button
          onClick={() => setShowReport(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <FileBarChart className="h-5 w-5 ml-2" />
          معاينة التقرير
        </button>
      </div>

      {/* Company Logo */}
      <div className="flex flex-col items-center justify-center mb-8 bg-white p-8 rounded-lg shadow-sm">
        <img
          src="https://aviinfotech.net/images/about2.jpg"
          alt={t('company')}
          className="h-32 object-contain bg-white rounded-lg"
        />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {t('company')}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Medical Services Navigation */}
      <MedicalServicesNav />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          data={performanceData}
          title={t('dashboard.charts.clinicPerformance')}
        />
        <DistributionChart
          data={distributionData}
          title={t('dashboard.charts.examDistribution')}
        />
      </div>

      {/* Recent Activities and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivitiesTable
            data={recentActivities}
            title={t('dashboard.activities.title')}
            columns={[
              { key: 'type', header: t('activities.type') },
              { key: 'patient', header: t('activities.patient') },
              { key: 'location', header: t('activities.location') },
              { key: 'date', header: t('activities.date') },
              {
                key: 'status',
                header: t('activities.status'),
                render: (value: string) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === t('status.completed')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {value}
                  </span>
                )
              }
            ]}
          />
        </div>
        <div>
          <NotificationsPanel notifications={notifications} />
        </div>
      </div>

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        data={recentActivities}
        type="medical"
        title="تقرير النشاطات الطبية"
      />
    </div>
  );
}