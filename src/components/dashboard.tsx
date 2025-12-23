import { Box } from '@mui/material';

import { useTodos } from '../hooks/use-todos';
import { useUsers } from '../hooks/use-users';
import { AnalyticsDashboard } from './analytics-dashboard';
import { TodoListView } from './todo-list-view';
import { UserTableView } from './user-table-view';

export function Dashboard() {
  const {
    users,
    loading: usersLoading,
    error: usersError,
    addUser,
    updateUser,
    deleteUser,
    refetch: refetchUsers,
  } = useUsers();

  const {
    todos,
    loading: todosLoading,
    error: todosError,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch: refetchTodos,
  } = useTodos();

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      {/* Analytics Dashboard */}
      <Box mb={3}>
        <AnalyticsDashboard />
      </Box>

      {/* Content Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '400px 1fr' },
          gap: 3,
          width: '100%',
        }}
      >
        <TodoListView
          todos={todos}
          loading={todosLoading}
          error={todosError}
          onAdd={addTodo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onRefresh={refetchTodos}
        />
        <UserTableView
          users={users}
          loading={usersLoading}
          error={usersError}
          onAdd={addUser}
          onUpdate={updateUser}
          onDelete={deleteUser}
          onRefresh={refetchUsers}
        />
      </Box>
    </Box>
  );
}

