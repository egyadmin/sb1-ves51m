```typescript
import { useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export function useToast() {
  const show = useCallback((message: string, type: ToastType = 'info') => {
    // In a real application, you would integrate with a toast library
    // For now, we'll use alert as a placeholder
    alert(`${type.toUpperCase()}: ${message}`);
  }, []);

  return { show };
}
```