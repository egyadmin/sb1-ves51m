```tsx
import React from 'react';
import { FileEdit, Trash2, Download, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showDownload?: boolean;
}

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
  onDownload,
  showView = true,
  showEdit = true,
  showDelete = true,
  showDownload = false,
}: ActionButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      {showView && onView && (
        <button
          onClick={onView}
          className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
          title={t('common.view')}
        >
          <Eye className="h-5 w-5" />
        </button>
      )}
      
      {showEdit && onEdit && (
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
          title={t('common.edit')}
        >
          <FileEdit className="h-5 w-5" />
        </button>
      )}
      
      {showDelete && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(t('common.confirmDelete'))) {
              onDelete();
            }
          }}
          className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-50"
          title={t('common.delete')}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}

      {showDownload && onDownload && (
        <button
          onClick={onDownload}
          className="text-green-600 hover:text-green-800 transition-colors p-1 rounded-full hover:bg-green-50"
          title={t('common.download')}
        >
          <Download className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
```