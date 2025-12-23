import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupIcon from '@mui/icons-material/Group';
import PendingIcon from '@mui/icons-material/Pending';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Skeleton,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { useAnalytics } from '../hooks/use-analytics';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(color, 0.15)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.3)}`,
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          textAlign: 'center',
          '&:last-child': { pb: 2 },
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: alpha(color, 0.15),
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ color }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export function AnalyticsDashboard() {
  const theme = useTheme();
  const { userStats, todoStats, loading, error } = useAnalytics();

  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Header Skeleton */}
        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <Skeleton variant="rounded" width={48} height={48} />
          <Skeleton variant="text" width={250} height={40} />
        </Box>

        {/* User Stats Skeleton */}
        <Skeleton variant="text" width={150} height={30} sx={{ mb: 2 }} />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[1, 2, 3, 4].map((i) => (
            <Grid key={i} size={{ xs: 6, sm: 3 }}>
              <Card sx={{ height: 140 }}>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={50} sx={{ my: 1 }} />
                  <Skeleton variant="text" width="50%" height={16} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Todo Stats Skeleton */}
        <Skeleton variant="text" width={150} height={30} sx={{ mb: 2 }} />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[1, 2, 3, 4].map((i) => (
            <Grid key={i} size={{ xs: 6, sm: 3 }}>
              <Card sx={{ height: 140 }}>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={50} sx={{ my: 1 }} />
                  <Skeleton variant="rectangular" width="100%" height={8} sx={{ borderRadius: 4 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity Skeleton */}
        <Card>
          <CardContent>
            <Skeleton variant="text" width={200} height={24} />
            <Box display="flex" gap={3} mt={2}>
              <Box>
                <Skeleton variant="text" width={60} height={40} />
                <Skeleton variant="text" width={80} height={16} />
              </Box>
              <Box>
                <Skeleton variant="text" width={60} height={40} />
                <Skeleton variant="text" width={80} height={16} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" gap={1.5} mb={3}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.15),
            color: 'primary.main',
            display: 'flex',
          }}
        >
          <TrendingUpIcon />
        </Box>
        <Typography variant="h5" fontWeight="bold">
          📊 Analytics Dashboard
        </Typography>
      </Box>

      {/* User Stats */}
      <Typography
        variant="subtitle2"
        color="text.secondary"
        mb={2}
        fontWeight={600}
        sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
      >
        👥 Users Overview
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Total Users"
            value={userStats.total}
            icon={<GroupIcon />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Active"
            value={userStats.active}
            icon={<CheckCircleIcon />}
            color={theme.palette.success.main}
            subtitle={`${userStats.total > 0 ? Math.round((userStats.active / userStats.total) * 100) : 0}% of total`}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Inactive"
            value={userStats.inactive}
            icon={<PersonOffIcon />}
            color={theme.palette.error.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                textAlign: 'center',
                '&:last-child': { pb: 2 },
              }}
            >
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                By Role
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={0.5} justifyContent="center">
                <Chip label={`Admin: ${userStats.admins}`} size="small" color="error" variant="outlined" />
                <Chip label={`Mod: ${userStats.moderators}`} size="small" color="warning" variant="outlined" />
                <Chip label={`User: ${userStats.regularUsers}`} size="small" color="primary" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Todo Stats */}
      <Typography
        variant="subtitle2"
        color="text.secondary"
        mb={2}
        fontWeight={600}
        sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
      >
        📝 Todos Overview
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Total Todos"
            value={todoStats.total}
            icon={<TaskAltIcon />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Completed"
            value={todoStats.completed}
            icon={<CheckCircleIcon />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Pending"
            value={todoStats.pending}
            icon={<PendingIcon />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                textAlign: 'center',
                '&:last-child': { pb: 2 },
              }}
            >
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Completion Rate
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {todoStats.completionRate}%
              </Typography>
              <Box sx={{ width: '100%', px: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={todoStats.completionRate}
                  sx={{ height: 8, borderRadius: 4 }}
                  color={
                    todoStats.completionRate >= 70
                      ? 'success'
                      : todoStats.completionRate >= 40
                        ? 'warning'
                        : 'error'
                  }
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Card sx={{ bgcolor: alpha(theme.palette.background.default, 0.5) }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={500}>
            📅 Recent Activity (Last 7 days)
          </Typography>
          <Box display="flex" gap={3} mt={1}>
            <Box>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {todoStats.recentTodos}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                New Todos
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bold" color="secondary">
                {userStats.recentUsers}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                New Users
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
}
