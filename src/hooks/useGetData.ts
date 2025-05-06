import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { api } from '../utils/api';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

export const useGetData = <T>(endpoint: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get<T>(endpoint);
      setData(response.data);
      setError(null);
      toast.success('Data fetched successfully!');
    } catch (err) {
      setError('Failed to fetch data');
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
