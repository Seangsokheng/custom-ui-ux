import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import Header from '@crema/components/guest/header';
import ClubsDisplay from '@crema/components/explore';
import { fetchAllClubs } from '@crema/services/club';

export default function Home() {
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
      <ClubsDisplay fetchFunction={fetchAllClubs} />
      </main>
    </ThemeProvider>
  );
}