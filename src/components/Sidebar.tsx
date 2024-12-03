import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home,
  Users,
  ClipboardList,
  Building,
  HardHat,
  Settings as SettingsIcon,
  AlertTriangle,
  Package,
  Microscope,
  FileImage,
  Shield,
  CheckSquare,
  MessageSquare,
  FileBarChart
} from 'lucide-react';

export default function Sidebar() {
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.home'), to: '/', icon: Home, color: 'text-sky-500', bgColor: 'bg-sky-500/10', hoverBg: 'hover:bg-sky-500/20' },
    { name: t('nav.patients'), to: '/patients', icon: Users, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', hoverBg: 'hover:bg-emerald-500/20' },
    { name: t('nav.records'), to: '/records', icon: ClipboardList, color: 'text-violet-500', bgColor: 'bg-violet-500/10', hoverBg: 'hover:bg-violet-500/20' },
    { name: t('nav.locations'), to: '/locations', icon: Building, color: 'text-amber-500', bgColor: 'bg-amber-500/10', hoverBg: 'hover:bg-amber-500/20' },
    { name: t('nav.safety'), to: '/safety', icon: HardHat, color: 'text-red-500', bgColor: 'bg-red-500/10', hoverBg: 'hover:bg-red-500/20' },
    { name: t('nav.emergency'), to: '/emergency', icon: AlertTriangle, color: 'text-orange-500', bgColor: 'bg-orange-500/10', hoverBg: 'hover:bg-orange-500/20' },
    { name: t('nav.pharmacy'), to: '/pharmacy', icon: Package, color: 'text-teal-500', bgColor: 'bg-teal-500/10', hoverBg: 'hover:bg-teal-500/20' },
    { name: t('nav.laboratory'), to: '/laboratory', icon: Microscope, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10', hoverBg: 'hover:bg-indigo-500/20' },
    { name: t('nav.radiology'), to: '/radiology', icon: FileImage, color: 'text-pink-500', bgColor: 'bg-pink-500/10', hoverBg: 'hover:bg-pink-500/20' },
    { name: t('nav.insurance'), to: '/insurance', icon: Shield, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', hoverBg: 'hover:bg-cyan-500/20' },
    { name: t('nav.compliance'), to: '/compliance', icon: CheckSquare, color: 'text-lime-500', bgColor: 'bg-lime-500/10', hoverBg: 'hover:bg-lime-500/20' },
    { name: t('nav.requests'), to: '/requests', icon: MessageSquare, color: 'text-fuchsia-500', bgColor: 'bg-fuchsia-500/10', hoverBg: 'hover:bg-fuchsia-500/20' },
    { name: t('nav.reports'), to: '/reports', icon: FileBarChart, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', hoverBg: 'hover:bg-yellow-500/20' },
    { name: t('nav.settings'), to: '/settings', icon: SettingsIcon, color: 'text-gray-500', bgColor: 'bg-gray-500/10', hoverBg: 'hover:bg-gray-500/20' },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-xl">
      {/* Company Logo */}
      <div className="bg-white/10 backdrop-blur-sm p-4 flex flex-col items-center">
        <img
          src="https://www2.0zz0.com/2024/11/20/07/988856043.png"
          alt="Company Logo"
          className="h-20 w-auto mb-2 object-contain bg-white rounded-lg p-2"
        />
        <h1 className="text-white text-lg font-semibold text-center leading-tight">
          نظام ادارة عيادات
          <br />
          شركة شبة الجزيرة للمقاولات
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 px-3">
        <div className="space-y-1.5">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? `${item.bgColor} ${item.color} shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur-lg`
                    : `text-gray-300 ${item.hoverBg} hover:text-white`
                }`
              }
            >
              <item.icon className={`h-5 w-5 ml-3 transition-colors duration-200 ${
                item.color
              }`} />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}