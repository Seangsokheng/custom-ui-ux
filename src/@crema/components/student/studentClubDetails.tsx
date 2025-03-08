import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Grid,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchClubById, joinClub } from '@crema/services/club';
import { Club } from '@crema/types/models/guest';

const StudentClubDetails: React.FC = () => {
  const [clubData, setClubData] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
    console.log(clubId);
  useEffect(() => {
    const loadClubDetails = async () => {
      try {
        if (!clubId) {
          navigate('/clubs');
          return;
        }

        const club = await fetchClubById(clubId);
        setClubData(club);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching club details:', error);
        navigate('/clubs');
      }
    };

    loadClubDetails();
  }, [clubId, navigate]);

  const handleJoinClub = async () => {
    if (!clubData) return;

    setJoining(true);
    try {
      await joinClub(Number(clubId));
      
      // Update local state to reflect membership
      setClubData(prev => prev ? {
        ...prev, 
        isMember: true,
        members: (prev.members || 0) + 1
      } : null);
    } catch (error) {
      console.error('Failed to join club:', error);
      // Optionally show error message to user
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!clubData) {
    return <Typography>Club not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          {clubData.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6">About the Club</Typography>
                <Typography paragraph>{clubData.vision}</Typography>
                
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Members: {clubData.members}
                </Typography>

                {!clubData.isMember && (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleJoinClub}
                    disabled={joining}
                    sx={{ mt: 2 }}
                  >
                    {joining ? 'Joining...' : 'Join Club'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Club Details</Typography>
                <Typography>Mission: {clubData.mission}</Typography>
                <Typography sx={{ mt: 1 }}>Goal: {clubData.goal}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentClubDetails;