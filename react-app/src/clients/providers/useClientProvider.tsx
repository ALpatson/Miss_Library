
import { useEffect, useState, useCallback } from 'react';
import api from '../../api';
import type { Client } from '../ClientModel';
import { message } from 'antd';

export function useClientProvider() {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<Client[]>('/clients');
      setClients(res.data);
    } catch (err) {
      console.error(err);
      message.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const createClient = async (payload: Partial<Client>): Promise<Client | void> => {
    try {
      const res = await api.post<Client>('/clients', payload);
      setClients((prev) => (prev ? [res.data, ...prev] : [res.data]));
      message.success('Client created successfully');
      return res.data;
    } catch (err) {
      console.error(err);
      message.error('Failed to create client');
      throw err;
    }
  };

  const updateClient = async (id: number, payload: Partial<Client>): Promise<Client | void> => {
    try {
      const res = await api.put<Client>(`/clients/${id}`, payload);
      setClients((prev) => prev?.map((c) => (c.id === id ? res.data : c)) ?? null);
      message.success('Client updated successfully');
      return res.data;
    } catch (err) {
      console.error(err);
      message.error('Failed to update client');
      throw err;
    }
  };

  const deleteClient = async (id: number): Promise<void> => {
    try {
      await api.delete(`/clients/${id}`);
      setClients((prev) => prev?.filter((c) => c.id !== id) ?? null);
      message.success('Client deleted successfully');
    } catch (err) {
      console.error(err);
      message.error('Failed to delete client');
      throw err;
    }
  };

  return {
    clients,
    loading,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
}