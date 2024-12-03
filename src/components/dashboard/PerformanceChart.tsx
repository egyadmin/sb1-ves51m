import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PerformanceChartProps {
  data: any[];
  title: string;
}

export default function PerformanceChart({ data, title }: PerformanceChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-sm text-gray-500">
            <div className="h-3 w-3 bg-blue-600 rounded-full ml-2"></div>
            الفحوصات
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <div className="h-3 w-3 bg-red-600 rounded-full ml-2"></div>
            الحوادث
          </span>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="examGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="examinations"
              stroke="#4F46E5"
              fill="url(#examGradient)"
              strokeWidth={2}
              name="الفحوصات"
            />
            <Area
              type="monotone"
              dataKey="incidents"
              stroke="#EF4444"
              fill="url(#incidentGradient)"
              strokeWidth={2}
              name="الحوادث"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}