import AssessmentIcon from '@mui/icons-material/Assessment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

const menuItems = [
  { text: 'แดชบอร์ด', icon: <DashboardIcon />, path: '/' },
  { text: 'Analytics', icon: <AssessmentIcon />, path: '/analytics' },
  { text: 'รายการสิ่งที่ต้องทำ', icon: <ChecklistIcon />, path: '/todos' },
  { text: 'ผู้ใช้งาน', icon: <PeopleIcon />, path: '/users' },
];

const settingsItems = [
  { text: 'ตั้งค่า', icon: <SettingsIcon />, path: '/settings' },
];

export function Sidebar({ open, onClose, drawerWidth }: SidebarProps) {
  const theme = useTheme();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 0,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: theme.palette.background.paper,
          borderRight: `1px solid ${alpha('#FF8C42', 0.15)}`,
          backgroundImage: `linear-gradient(180deg, ${alpha('#FF8C42', 0.03)} 0%, transparent 100%)`,
        },
      }}
    >
      {/* Header */}
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="black">
              RS
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              React Supabase
            </Typography>
            <Typography variant="caption" color="text.secondary">
              v1.0.0
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      {/* Main Menu */}
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <List sx={{ px: 1, py: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                  },
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2 }} />

        {/* Settings */}
        <List sx={{ px: 1, py: 2 }}>
          {settingsItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha('#FFFFFF', 0.08)}`,
          bgcolor: alpha(theme.palette.background.default, 0.5),
        }}
      >
        <Typography variant="caption" color="text.secondary" display="block">
          © 2024 React + Supabase
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Made with 💜 by Wisit
        </Typography>
      </Box>
    </Drawer>
  );
}

