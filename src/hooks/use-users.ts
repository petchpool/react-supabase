import { useCallback, useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { supabase } from '../lib/supabase';
import type { User, UserInsert } from '../types/user';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new user
  const addUser = async (user: UserInsert) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([user])
        .select()
        .single();

      if (error) throw error;
      // Realtime will handle state update
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add user';
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
      throw err;
    }
  };

  // Update a user
  const updateUser = async (id: number, updates: Partial<UserInsert>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      // Realtime will handle state update
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
      throw err;
    }
  };

  // Delete a user
  const deleteUser = async (id: number) => {
    try {
      const { error } = await supabase.from('users').delete().eq('id', id);

      if (error) throw error;
      // Realtime will handle state update
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
      throw err;
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchUsers();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('users-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'users',
        },
        (payload) => {
          const newUser = payload.new as User;
          console.log('🟢 INSERT:', newUser);
          setUsers((prev) => [newUser, ...prev]);
          enqueueSnackbar(`✨ New user added: ${newUser.name}`, {
            variant: 'success',
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
        },
        (payload) => {
          const updatedUser = payload.new as User;
          console.log('🟡 UPDATE:', updatedUser);
          setUsers((prev) =>
            prev.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          enqueueSnackbar(`📝 User updated: ${updatedUser.name}`, {
            variant: 'info',
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'users',
        },
        (payload) => {
          const deletedUser = payload.old as User;
          console.log('🔴 DELETE:', deletedUser);
          setUsers((prev) =>
            prev.filter((user) => user.id !== deletedUser.id)
          );
          enqueueSnackbar(`🗑️ User deleted: ${deletedUser.name}`, {
            variant: 'warning',
          });
        }
      )
      .subscribe((status) => {
        console.log('📡 Realtime subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('🔌 Unsubscribing from realtime...');
      supabase.removeChannel(channel);
    };
  }, [fetchUsers, enqueueSnackbar]);

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
}
