import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import StudentDashboard from '@crema/components/student/home';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StudentDashboard />
    </ThemeProvider>
  );
}