import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type ConfirmAction = 'delete' | 'edit' | 'download';

export function useConfirmation() {
  const { t } = useTranslation();

  const confirm = useCallback((action: ConfirmAction, itemType?: string) => {
    const messages = {
      delete: `هل أنت متأكد من حذف ${itemType || 'هذا العنصر'}؟`,
      edit: `هل تريد حفظ التغييرات على ${itemType || 'هذا العنصر'}؟`,
      download: `هل تريد تحميل ${itemType || 'هذا الملف'}؟`
    };

    return window.confirm(messages[action]);
  }, []);

  const confirmDelete = useCallback((itemType?: string) => {
    return confirm('delete', itemType);
  }, [confirm]);

  const confirmEdit = useCallback((itemType?: string) => {
    return confirm('edit', itemType);
  }, [confirm]);

  const confirmDownload = useCallback((itemType?: string) => {
    return confirm('download', itemType);
  }, [confirm]);

  return {
    confirm,
    confirmDelete,
    confirmEdit,
    confirmDownload
  };
}