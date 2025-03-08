import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@crema/components/guest/theme';
import UserManagement from '@crema/components/admin/userManagement';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserManagement />
    </ThemeProvider>
  );
}

export default App;