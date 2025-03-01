import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0091FF', // Bright blue from original design
      light: '#D3E0FF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      color: '#000000',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#000000',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     containedPrimary: {
    //       backgroundColor: '#0091FF',
    //       textTransform: 'uppercase',
    //       fontWeight: 600,
    //       fontSize: '0.875rem',
    //       padding: '8px 24px',
    //       '&:hover': {
    //         backgroundColor: '#007DE6',
    //       },
    //     },
    //   },
    // },
    // MuiAppBar: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: '#FFFFFF',
    //       boxShadow: 'none',
    //       borderBottom: '1px solid #EAEAEA',
    //     },
    //   },
    // },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          margin: 0,
          padding: 0,
          height: '100%',
          width: '100%',
          overflowX: 'hidden', // Prevents horizontal scrolling
        },
        '.app-content': {
          padding: '0 !important', // Forces no padding
          margin: 0,
          width: '100%',
        },
      },
      
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 50, // Removes default MUI padding
          margin: 0,
          maxWidth: '100% !important', // Ensures full width
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#0091FF',
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '8px 54px',
          '&:hover': {
            backgroundColor: '#007DE6',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: 'none',
          borderBottom: '1px solid #EAEAEA',
        },
      },
    },
  },
});
