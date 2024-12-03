import { useState, useCallback, useEffect } from 'react';
import { getStoredData, setStoredData } from '../utils/storage';

export function useDataStore<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(() => getStoredData(key, initialValue));

  useEffect(() => {
    setStoredData(key, data);
  }, [key, data]);

  const addItem = useCallback((newItem: any) => {
    setData((prevData: any) => {
      if (Array.isArray(prevData)) {
        return [...prevData, { ...newItem, id: crypto.randomUUID() }];
      }
      return { ...prevData, ...newItem };
    });
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<T>) => {
    setData((prevData: any) => {
      if (Array.isArray(prevData)) {
        return prevData.map(item => 
          item.id === id ? { ...item, ...updates } : item
        );
      }
      return { ...prevData, ...updates };
    });
  }, []);

  const deleteItem = useCallback((id: string) => {
    setData((prevData: any) => {
      if (Array.isArray(prevData)) {
        return prevData.filter(item => item.id !== id);
      }
      const newData = { ...prevData };
      delete newData[id];
      return newData;
    });
  }, []);

  return {
    data,
    setData,
    addItem,
    updateItem,
    deleteItem
  };
}