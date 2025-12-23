import { useEffect, useState } from 'react';

import { supabase } from '../lib/supabase';

interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  moderators: number;
  regularUsers: number;
  recentUsers: number;
}

interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  recentTodos: number;
}

interface AnalyticsData {
  userStats: UserStats;
  todoStats: TodoStats;
  loading: boolean;
  error: string | null;
}

export function useAnalytics(): AnalyticsData {
  const [userStats, setUserStats] = useState<UserStats>({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
    moderators: 0,
    regularUsers: 0,
    recentUsers: 0,
  });

  const [todoStats, setTodoStats] = useState<TodoStats>({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
    recentTodos: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch User Statistics using Supabase aggregation
        const [
          totalUsersResult,
          activeUsersResult,
          inactiveUsersResult,
          adminsResult,
          moderatorsResult,
          regularUsersResult,
          recentUsersResult,
        ] = await Promise.all([
          // Total users
          supabase.from('users').select('*', { count: 'exact', head: true }),
          
          // Active users
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'active'),
          
          // Inactive users
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'inactive'),
          
          // Admins
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'admin'),
          
          // Moderators
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'moderator'),
          
          // Regular users
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'user'),
          
          // Recent users (last 7 days)
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        ]);

        setUserStats({
          total: totalUsersResult.count || 0,
          active: activeUsersResult.count || 0,
          inactive: inactiveUsersResult.count || 0,
          admins: adminsResult.count || 0,
          moderators: moderatorsResult.count || 0,
          regularUsers: regularUsersResult.count || 0,
          recentUsers: recentUsersResult.count || 0,
        });

        // Fetch Todo Statistics using Supabase aggregation
        const [
          totalTodosResult,
          completedTodosResult,
          pendingTodosResult,
          recentTodosResult,
        ] = await Promise.all([
          // Total todos
          supabase.from('todos').select('*', { count: 'exact', head: true }),
          
          // Completed todos
          supabase
            .from('todos')
            .select('*', { count: 'exact', head: true })
            .eq('is_completed', true),
          
          // Pending todos
          supabase
            .from('todos')
            .select('*', { count: 'exact', head: true })
            .eq('is_completed', false),
          
          // Recent todos (last 7 days)
          supabase
            .from('todos')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        ]);

        const total = totalTodosResult.count || 0;
        const completed = completedTodosResult.count || 0;
        const pending = pendingTodosResult.count || 0;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        setTodoStats({
          total,
          completed,
          pending,
          completionRate,
          recentTodos: recentTodosResult.count || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

    // Subscribe to realtime changes to refresh analytics
    const usersChannel = supabase
      .channel('analytics-users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
        fetchAnalytics();
      })
      .subscribe();

    const todosChannel = supabase
      .channel('analytics-todos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, () => {
        fetchAnalytics();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(usersChannel);
      supabase.removeChannel(todosChannel);
    };
  }, []);

  return {
    userStats,
    todoStats,
    loading,
    error,
  };
}

