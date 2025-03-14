import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import Header from '@crema/components/guest/header';
import ClubDetail from '@crema/components/clubDetail';
import { useParams } from 'react-router-dom';

export default function Home() {
  const { id } = useParams(); // Get the clubId from the URL
  console.log('Club ID:', id);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        {id ? <ClubDetail clubId={id} /> : <p>No Club Selected</p>}
      </main>
    </ThemeProvider>
  );
}
