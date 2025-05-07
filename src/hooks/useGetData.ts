import { useState } from 'react';
import storage from '../utils/storage';

const useGetData = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getData = async (url: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const token = storage.getToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getData, loading, error };
};

export default useGetData;
