import { useState, useEffect } from 'react';
import { fetchUsers } from '../api';
import { formatUserResults } from '../utils/format';

export const useUserSearch = (query: string) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    fetchUsers(query).then(data => {
      const formattedData = formatUserResults(data);
      setUsers(formattedData);
    });
  }, [query]);

  return { users };
};