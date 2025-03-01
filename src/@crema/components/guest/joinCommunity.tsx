import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function JoinCommunity ()  {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      py: { xs: 6, md: 8 }, 
      backgroundColor: 'primary.light' 
    }}>
      <Container maxWidth={false} sx={{ maxWidth: 1200 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              color: 'black',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2rem' },
              fontWeight: 700
            }}
          >
            Ready to Join the Community?
          </Typography>
          <Typography
            sx={{
              color: 'black',
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6
            }}
          >
            Join our vibrant community of students and discover new opportunities.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/signup')}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              fontSize: { xs: '0.9rem', md: '1rem' },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Become a Student
          </Button>
        </Box>
      </Container>
    </Box>
  );
};