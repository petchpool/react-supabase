export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive';
  created_at: string;
}

export type UserInsert = Omit<User, 'id' | 'created_at'>;

