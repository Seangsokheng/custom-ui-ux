import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@crema/components/guest/theme';
import ClubDetail from '@crema/components/clubDetail';
import { useParams } from 'react-router-dom';
import AppLoader from '@crema/components/AppLoader';
export default function Home() {
  const { id } = useParams(); // Get the clubId from the URL
  console.log('Club ID:', id);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <main>
        {id ? <ClubDetail clubId={id} /> : <AppLoader/>}
      </main>
    </ThemeProvider>
  );
}
