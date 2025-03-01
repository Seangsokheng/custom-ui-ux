import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Hero () {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 1200,
        pt: { xs: 4, md: 8 },
        pb: { xs: 3, md: 0 },
        px: { xs: 4, md: 6 }, 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ 
          flex: 1, 
          maxWidth: { xs: '100%', md: '40%' },
          textAlign: { xs: 'center', md: 'left' }
        }}>
          <Typography 
            variant="h1" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontWeight: 700
            }}
          >
            Discover Your Passion
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              color: 'primary.main',
              fontWeight: 500,
              mb: 4,
              lineHeight: 1.2
            }}
          >
            Join a Club Today!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/signup')}
            sx={{
              height: { xs: 40, md: 45 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            Join Now
          </Button>
        </Box>
        <Box
          sx={{
          flex: 1,
          width: '100%',
          height: { xs: 300, md: 400 }, // Set fixed height to prevent cropping
          maxHeight: { xs: 300, md: 400 }, 
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
        >
          <img
            src="/assets/images/guest/header.jpg"
            alt="Happy students with sports equipment"
            style={{
              width: '100%',
              height: 'auto', // Fix stretched height issue
              maxHeight: '100%', // Ensures it doesn't overflow the Box
              objectFit: 'cover',
            }}
          />
        </Box>

      </Box>
    </Container>
  );
};