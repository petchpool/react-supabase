import { useState } from 'react';

import { Box, Toolbar } from '@mui/material';

import { Header } from './header';
import { Sidebar } from './sidebar';

const DRAWER_WIDTH = 240;

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        drawerWidth={DRAWER_WIDTH}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar />
        <Box
          sx={{
            py: 3,
            px: 3,
            maxWidth: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

