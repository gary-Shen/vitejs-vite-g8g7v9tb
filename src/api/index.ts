import { User } from '../types';

const mockUsers: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

export const fetchUsers = (query: string): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockUsers.filter(u =>
        u.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};