import { useCallback, useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { supabase } from '../lib/supabase';
import type { Todo, TodoInsert } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new todo
  const addTodo = async (todo: TodoInsert) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([todo])
        .select()
        .single();

      if (error) throw error;
      // Realtime will handle state update
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add todo';
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
      throw err;
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: number, isCompleted: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ is_completed: isCompleted })
        .eq('id', id);

      if (error) throw error;
      // Realtime will handle state update
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update todo';
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
      throw err;
    }
  };

  // Delete a todo
  const deleteTodo = async (id: number) => {
    try {
      const { error } = await supabase.from('todos').delete().eq('id', id);

      if (error) throw error;
      // Realtime will handle state update
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
      throw err;
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTodos();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('todos-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'todos',
        },
        (payload) => {
          const newTodo = payload.new as Todo;
          console.log('🟢 Todo INSERT:', newTodo);
          setTodos((prev) => [newTodo, ...prev]);
          enqueueSnackbar(`✨ New todo: ${newTodo.title}`, {
            variant: 'success',
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'todos',
        },
        (payload) => {
          const updatedTodo = payload.new as Todo;
          console.log('🟡 Todo UPDATE:', updatedTodo);
          setTodos((prev) =>
            prev.map((todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            )
          );
          const status = updatedTodo.is_completed ? '✅ Completed' : '🔄 Updated';
          enqueueSnackbar(`${status}: ${updatedTodo.title}`, {
            variant: 'info',
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'todos',
        },
        (payload) => {
          const deletedTodo = payload.old as Todo;
          console.log('🔴 Todo DELETE:', deletedTodo);
          setTodos((prev) =>
            prev.filter((todo) => todo.id !== deletedTodo.id)
          );
          enqueueSnackbar(`🗑️ Todo deleted: ${deletedTodo.title}`, {
            variant: 'warning',
          });
        }
      )
      .subscribe((status) => {
        console.log('📡 Todos realtime status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('🔌 Unsubscribing from todos realtime...');
      supabase.removeChannel(channel);
    };
  }, [fetchTodos, enqueueSnackbar]);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
}
