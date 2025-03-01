import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import Header from '@crema/components/guest/header';
import ClubDetail from '@crema/components/clubDetail';

export default function Home() {
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <ClubDetail/>
      </main>
    </ThemeProvider>
  );
}