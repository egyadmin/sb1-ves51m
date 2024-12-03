import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Activity, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';

interface MedicalHistoryTimelineProps {
  patientId: string;
}

export default function MedicalHistoryTimeline({ patientId }: MedicalHistoryTimelineProps) {
  const { t } = useTranslation();

  // This would typically come from your data store
  const events = [
    {
      id: '1',
      type: 'CHECKUP',
      date: '2024-03-15',
      title: 'فحص دوري',
      description: 'فحص دوري روتيني - جميع المؤشرات طبيعية',
      status: 'COMPLETED'
    },
    {
      id: '2',
      type: 'EMERGENCY',
      date: '2024-02-28',
      title: 'حالة طارئة',
      description: 'إصابة طفيفة في موقع العمل',
      status: 'COMPLETED'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'CHECKUP':
        return <Activity className="h-6 w-6 text-blue-600" />;
      case 'EMERGENCY':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-white">
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.title}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      {event.description}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.date}>
                      {format(new Date(event.date), 'PPP', { locale: ar })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}