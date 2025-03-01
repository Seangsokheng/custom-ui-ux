import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { Users as People, Calendar as Event } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define TypeScript interfaces
interface Club {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  postCount: number;
  logoUrl: string;
  status: 'pending' | 'joined' | 'available';
}

// Fake data
const clubsData: Club[] = [
  {
    id: '1',
    name: 'Football Club',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    memberCount: 124,
    postCount: 24,
    logoUrl: '/path/to/logo1.png',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Football Club',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    memberCount: 124,
    postCount: 24,
    logoUrl: '/path/to/logo2.png',
    status: 'joined'
  },
  {
    id: '3',
    name: 'Football Club',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    memberCount: 124,
    postCount: 24,
    logoUrl: '/path/to/logo3.png',
    status: 'available'
  },
  {
    id: '4',
    name: 'Football Club',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    memberCount: 124,
    postCount: 24,
    logoUrl: '/path/to/logo4.png',
    status: 'available'
  },
  {
    id: '5',
    name: 'Football Club',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    memberCount: 124,
    postCount: 24,
    logoUrl: '/path/to/logo5.png',
    status: 'available'
  },
  {
    id: '6',
    name: 'Football Club',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    memberCount: 124,
    postCount: 24,
    logoUrl: '/path/to/logo6.png',
    status: 'available'
  }
];

const ClubListingPage = () => {
  const navigate = useNavigate();
  const getButtonConfig = (status: Club['status']) => {
    switch (status) {
      case 'pending':
        return {
          text: 'Cancel Request',
          color: 'error' as const,
          variant: 'text' as const
        };
      case 'joined':
        return {
          text: 'Enter Club',
          color: 'primary' as const,
          variant: 'contained' as const
        };
      default:
        return {
          text: 'Enter Club',
          color: 'primary' as const,
          variant: 'contained' as const
        };
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#F8F9FE', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {clubsData.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer', // Add cursor pointer to indicate it's clickable
              }}
              onClick={() => navigate(`/club/${club.id}`)} // Navigate to club details
            >
              <CardMedia
                component="img"
                height="160"
                image="/assets/images/guest/piubc.jpg"
                alt={club.name}
                sx={{ p: 2, objectFit: 'contain' }}
              />
              <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {club.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {club.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People size={16} />
                    <Typography variant="body2">{club.memberCount} members</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Event size={16} />
                    <Typography variant="body2">{club.postCount} posts</Typography>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  {...getButtonConfig(club.status)}
                  sx={{ mt: 'auto' }}
                >
                  {getButtonConfig(club.status).text}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClubListingPage;