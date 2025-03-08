import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import Explore from '@crema/components/student/explore';


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Explore  />
    </ThemeProvider>
  );
}