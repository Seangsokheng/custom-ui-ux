import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import Header from '@crema/components/guest/header';
import Hero from '@crema/components/guest/hero';
import FeatureClubs from '@crema/components/guest/featureClub';
import JoinCommunity from '@crema/components/guest/joinCommunity';

export default function Home() {
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Hero />
        <FeatureClubs />
        <JoinCommunity />
      </main>
    </ThemeProvider>
  );
}