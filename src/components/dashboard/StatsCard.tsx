import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function StatsCard({ title, value, trend, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`${bgColor} rounded-lg p-3`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="mr-5">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-center mt-1">
              <p className="text-xl font-semibold text-gray-900">{value}</p>
              {trend && (
                <span className={`mr-2 flex items-center text-sm ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.value}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}