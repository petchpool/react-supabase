import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import type { Todo, TodoInsert } from '../types/todo';

interface TodoListViewProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onAdd: (todo: TodoInsert) => Promise<Todo>;
  onToggle: (id: number, isCompleted: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export function TodoListView({
  todos,
  loading,
  error,
  onAdd,
  onToggle,
  onDelete,
}: TodoListViewProps) {
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    setIsAdding(true);
    try {
      await onAdd({ title: newTodo.trim(), is_completed: false });
      setNewTodo('');
    } finally {
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
        📝 Todo List
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box display="flex" gap={1} mb={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAdding}
        />
        <IconButton
          color="primary"
          onClick={handleAddTodo}
          disabled={isAdding || !newTodo.trim()}
        >
          {isAdding ? <CircularProgress size={24} /> : <AddIcon />}
        </IconButton>
      </Box>

      {todos.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={4}>
          No todos yet. Add one above!
        </Typography>
      ) : (
        <List sx={{ bgcolor: 'background.paper', maxHeight: 400, overflow: 'auto' }}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(todo.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => onToggle(todo.id, !todo.is_completed)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.is_completed}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={todo.title}
                  sx={{
                    textDecoration: todo.is_completed ? 'line-through' : 'none',
                    color: todo.is_completed ? 'text.disabled' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Typography variant="caption" color="text.secondary" display="block" mt={2}>
        {todos.filter((t) => t.is_completed).length} of {todos.length} completed
      </Typography>
    </Paper>
  );
}

