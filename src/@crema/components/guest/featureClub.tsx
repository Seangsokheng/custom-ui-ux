import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Box, CardMedia } from '@mui/material';
import { Club } from '@crema/types/models/guest';
import AppGridContainer from "@crema/components/AppGridContainer";
import AppAnimate from "@crema/components/AppAnimate";
import { useEffect, useState } from 'react';
import { fetchFeaturedClubs } from '@crema/services/club';

export default function FeatureClubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getClubs = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedClubs();
        setClubs(data);
      } catch (error) {
        console.error('Failed to fetch clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    getClubs();
  }, []);

  // Rest of your component remains the same
  // ...


  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box sx={{ 
        py: { xs: 4, md: 8 }, 
        px: { xs: 4, md: 6 },
        //backgroundColor: 'background.' 
      }}>
        <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 0, md: 0 }, 
          py: {xs: 0 , md: 0},
        }}
        >
          <Typography 
            variant="h2" 
            textAlign="center" 
            sx={{ 
              mb: { xs: 4, md: 6 },
              
              fontSize: { xs: '1.75rem', md: '2rem' },
              fontWeight: 700
            }}
          >
            Featured Clubs
          </Typography>
          <AppGridContainer>
            {(clubs ?? []).slice(0, 3).map((club) => (
              <Grid item xs={12} md={4} key={club.id}>
                <Card
                  elevation={0}
                  onClick={() => navigate(`/club/${club.id}`)}
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      transform: 'translateY(-4px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                    <CardMedia
                      component="img"
                      sx={{ 
                        width: '100%', 
                        height: 200, 
                        objectFit: 'cover',
                        objectPosition: 'top' // Ensures the top part of the image is visible
                      }}
                      image={club.imageUrl}
                      alt={club.name}
                    />
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h5" 
                      gutterBottom
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.4rem' },
                        fontWeight: 600
                      }}
                    >
                      {club.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        lineHeight: 1.6
                      }}
                    >
                      {club.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </AppGridContainer>
        </Container>
      </Box>
    </AppAnimate>
  );
};

