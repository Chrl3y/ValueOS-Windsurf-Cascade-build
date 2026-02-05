import { useState, useEffect } from 'react';
import { localStore } from '../services/localDb/indexedDb';
import type { BaseEntity } from '../types';

export function useLocalStore<T extends BaseEntity>(
  table: string,
  initialData?: T[]
) {
  const [data, setData] = useState<T[]>(initialData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await localStore.list<T>(table);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<T, keyof BaseEntity>) => {
    try {
      const newItem: T = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as T;
      
      await localStore.upsert(table, newItem);
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
      throw err;
    }
  };

  const updateItem = async (id: string, updates: Partial<T>) => {
    try {
      const existingItem = data.find(item => item.id === id);
      if (!existingItem) {
        throw new Error('Item not found');
      }

      const updatedItem: T = {
        ...existingItem,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await localStore.upsert(table, updatedItem);
      setData(prev => prev.map(item => item.id === id ? updatedItem : item));
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await localStore.remove(table, id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      throw err;
    }
  };

  const getItem = async (id: string): Promise<T | null> => {
    try {
      return await localStore.get<T>(table, id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get item');
      return null;
    }
  };

  useEffect(() => {
    loadData();
  }, [table]);

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    refresh: loadData,
  };
}
