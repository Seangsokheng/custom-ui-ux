import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import Header from '@crema/components/guest/header';
import ClubsPage from '@crema/components/explore';

export default function Home() {
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <ClubsPage/>
      </main>
    </ThemeProvider>
  );
}