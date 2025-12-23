export interface Todo {
  id: number;
  title: string;
  is_completed: boolean;
  created_at: string;
}

export type TodoInsert = Omit<Todo, 'id' | 'created_at'>;

