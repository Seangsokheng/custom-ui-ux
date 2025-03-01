import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import MyClub from '@crema/components/student/myClub';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyClub />
    </ThemeProvider>
  );
}