import React, { useState } from 'react';
import { 
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  height: 'auto',
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: theme.spacing(1),
}));

const StudentDashboard = () => {
  const overviewData = {
    joinedClubs: 5,
    pendingClubs: 5,
    newSuggestions: 5
  };

  const posts = [
    {
      id: 1,
      clubName: "Master Football Club",
      title: "Weekend Tournament Registration Open",
      content: "This competition is free entrance. For those who are interested, register to secure your seat now! This competition is free entrance. For those who are interested, register to secure your seat now!",
      image: "/assets/images/clubDetail/2.jpg",
      date: "Feb 24, 2025",
      author: {
        avatar: "/assets/images/clubDetail/4.jpg"
      }
    },
    {
      id: 2,
      clubName: "Master Football Club",
      title: "Training Session Schedule Update",
      content: "The training schedule has been updated. Please check the club page for details.",
      image: "/assets/images/clubDetail/2.jpg",
      date: "Feb 23, 2025",
      author: {
        avatar: "/assets/images/clubDetail/4.jpg"
      }
    }
  ];

  return (
    <Container>
      {/* Welcome Section */}
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 700, mb: 1 }}>
          Welcome back, Sokheng!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening in your clubs today
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <StatsCard sx={{ backgroundColor: "#D3E0FF" }}>
            <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 500 }}>
              {overviewData.joinedClubs}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Joined Clubs
            </Typography>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard sx={{ backgroundColor: "#FFF3E0" }}>
            <Typography variant="h4" sx={{ color: "orange", fontWeight: 500 }}>
              {overviewData.pendingClubs}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Pending Clubs
            </Typography>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard sx={{ backgroundColor: "#E8F5E9" }}>
            <Typography variant="h4" sx={{ color: "green", fontWeight: 500 }}>
              {overviewData.newSuggestions}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              New Suggestions
            </Typography>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Posts Feed */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 2, fontSize: '1.5rem' }}>
          Recently Posts
        </Typography>
        <Grid container spacing={2}>
          {posts.map((post) => {
            const [expanded, setExpanded] = useState(false);
            return (
              <Grid item xs={12} md={6} key={post.id}>
                <StyledCard sx={{ p: 1 }}>
                  <CardContent sx={{ p: 1, pb: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar
                        src={post.author.avatar}
                        sx={{ width: 30, height: 30, mr: 1 }}
                      />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {post.clubName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {post.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontSize: '1rem', mb: 0.5 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {expanded ? post.content : `${post.content.substring(0, 110)}...`}
                    </Typography>
                    <Button size="small" onClick={() => setExpanded(!expanded)}>
                      {expanded ? 'Show Less' : 'Read More'}
                    </Button>
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="120"
                    image={post.image}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />
                </StyledCard>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentDashboard;
