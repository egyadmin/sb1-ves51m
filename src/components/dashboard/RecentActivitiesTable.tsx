import React from 'react';
import { useTranslation } from 'react-i18next';

interface RecentActivitiesTableProps {
  data: any[];
  title: string;
  columns: {
    key: string;
    header: string;
    render?: (value: any, item?: any) => React.ReactNode;
  }[];
}

export default function RecentActivitiesTable({ data, title, columns }: RecentActivitiesTableProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{t(title)}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t(column.header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render ? column.render(item[column.key], item) : t(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}