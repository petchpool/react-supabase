import { CssBaseline, GlobalStyles, ThemeProvider, alpha, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { Dashboard } from './components/dashboard';
import { MainLayout } from './components/layout/main-layout';

// Dark Orange/Gold Theme inspired by Shlumzi
const darkOrangeTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF8C42', // Vibrant Orange
      light: '#FFB366',
      dark: '#E67A2E',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FFD700', // Gold
      light: '#FFE44D',
      dark: '#E6C200',
      contrastText: '#000000',
    },
    background: {
      default: '#0A0A0A', // Very dark
      paper: '#1A1A1A',
    },
    error: {
      main: '#FF5252',
      light: '#FF8A80',
      dark: '#C62828',
    },
    warning: {
      main: '#FFA726',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#42A5F5',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    success: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#388E3C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#666666',
    },
    divider: alpha('#FFFFFF', 0.08),
  },
  typography: {
    fontFamily: '"Prompt", "Sarabun", "Inter", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '0',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '0',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0',
    },
    button: {
      fontFamily: '"Prompt", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(0,0,0,0.5)',
    '0px 4px 12px rgba(0,0,0,0.5)',
    '0px 6px 16px rgba(0,0,0,0.6)',
    '0px 8px 20px rgba(0,0,0,0.6)',
    '0px 10px 24px rgba(255,140,66,0.2)',
    '0px 12px 28px rgba(255,140,66,0.25)',
    '0px 14px 32px rgba(255,140,66,0.3)',
    '0px 16px 36px rgba(255,140,66,0.3)',
    '0px 18px 40px rgba(255,140,66,0.35)',
    '0px 20px 44px rgba(255,140,66,0.35)',
    '0px 22px 48px rgba(255,140,66,0.4)',
    '0px 24px 52px rgba(255,140,66,0.4)',
    '0px 26px 56px rgba(255,140,66,0.45)',
    '0px 28px 60px rgba(255,140,66,0.45)',
    '0px 30px 64px rgba(255,140,66,0.5)',
    '0px 32px 68px rgba(255,140,66,0.5)',
    '0px 34px 72px rgba(255,140,66,0.55)',
    '0px 36px 76px rgba(255,140,66,0.55)',
    '0px 38px 80px rgba(255,140,66,0.6)',
    '0px 40px 84px rgba(255,140,66,0.6)',
    '0px 42px 88px rgba(255,140,66,0.65)',
    '0px 44px 92px rgba(255,140,66,0.65)',
    '0px 46px 96px rgba(255,140,66,0.7)',
    '0px 48px 100px rgba(255,140,66,0.7)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#FF8C42 #1A1A1A',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 12,
            height: 12,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            background: 'linear-gradient(135deg, #FF8C42 0%, #FFD700 100%)',
            minHeight: 24,
            border: '3px solid #1A1A1A',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            background: 'linear-gradient(135deg, #FFB366 0%, #FFE44D 100%)',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: '#1A1A1A',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 28px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(255, 140, 66, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF8C42 0%, #FFD700 100%)',
          color: '#000000',
          fontWeight: 700,
          '&:hover': {
            background: 'linear-gradient(135deg, #FFB366 0%, #FFE44D 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: '#FF8C42',
          color: '#FF8C42',
          '&:hover': {
            borderWidth: 2,
            borderColor: '#FFB366',
            backgroundColor: alpha('#FF8C42', 0.1),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1A1A1A',
          borderRadius: 16,
          border: `1px solid ${alpha('#FF8C42', 0.15)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: alpha('#FF8C42', 0.4),
            boxShadow: '0px 12px 32px rgba(255, 140, 66, 0.2)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1A1A1A',
        },
        elevation1: {
          boxShadow: '0px 4px 12px rgba(0,0,0,0.5)',
        },
        elevation2: {
          boxShadow: '0px 6px 16px rgba(0,0,0,0.5)',
        },
        elevation3: {
          boxShadow: '0px 8px 20px rgba(0,0,0,0.6)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha('#FF8C42', 0.1)}`,
          padding: '16px',
        },
        head: {
          fontWeight: 700,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#FFD700',
          backgroundColor: alpha('#000000', 0.3),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.8125rem',
        },
        outlined: {
          borderWidth: 2,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          backgroundColor: '#1A1A1A',
          backgroundImage: 'none',
          border: `1px solid ${alpha('#FF8C42', 0.2)}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: alpha('#000000', 0.3),
            transition: 'all 0.2s',
            '& fieldset': {
              borderColor: alpha('#FF8C42', 0.2),
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: alpha('#FF8C42', 0.4),
            },
            '&.Mui-focused': {
              backgroundColor: alpha('#000000', 0.4),
              '& fieldset': {
                borderColor: '#FF8C42',
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: alpha('#FF8C42', 0.15),
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: alpha('#FFFFFF', 0.08),
        },
        bar: {
          borderRadius: 8,
          background: 'linear-gradient(90deg, #FF8C42 0%, #FFD700 100%)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkOrangeTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            boxSizing: 'border-box',
          },
          body: {
            background: `
              radial-gradient(circle at 10% 20%, ${alpha('#FF8C42', 0.15)} 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, ${alpha('#FFD700', 0.1)} 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, ${alpha('#FF8C42', 0.05)} 0%, transparent 70%),
              linear-gradient(180deg, #000000 0%, #0A0A0A 50%, #000000 100%)
            `,
            backgroundAttachment: 'fixed',
          },
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-20px)',
            },
          },
          '@keyframes glow': {
            '0%, 100%': {
              boxShadow: '0 0 20px rgba(255, 140, 66, 0.3)',
            },
            '50%': {
              boxShadow: '0 0 40px rgba(255, 140, 66, 0.6)',
            },
          },
        }}
      />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
