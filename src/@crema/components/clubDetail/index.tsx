import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Tab, 
  Tabs, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  IconButton, 
  styled, 
  Dialog, 
  DialogContent, 
  useMediaQuery, 
  useTheme,
  Button
} from '@mui/material';
import { 
  Email, 
  Phone, 
  Facebook, 
  Instagram, 
  Flag, 
  Lightbulb, 
  Groups, 
  Close as CloseIcon,
  ArrowBack as BackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { fetchClubById } from '@crema/services/club';
import { Club } from '@crema/types/models/guest';

// Styled Components
const ClubLogo = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  border: `4px solid ${theme.palette.common.white}`,
  marginRight: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
}));

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.2s ease-in-out',
  padding: '20px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  color: theme.palette.common.white,
  position: 'relative',
  zIndex: 1,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
  >
    {value === index && children}
  </Box>
);

interface ClubDetailsPageProps {
  clubId: number | string;
}

const ClubDetails: React.FC<ClubDetailsPageProps> = ({ clubId }) => {
  const [value, setValue] = useState(0);
  const [clubData, setClubData] = useState<Club | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    const loadClubData = async () => {
      try {
        const data = await fetchClubById(clubId);
        
        // Only allow public clubs for guests
        if (!data.isPublic) {
          navigate('/clubs');
          return;
        }
        
        setClubData(data);
      } catch (error) {
        console.error('Error fetching club details:', error);
        navigate('/clubs');
      }
    };
    loadClubData();
  }, [clubId, navigate]);

  if (!clubData) return null;

  const Banner = styled(Box)(({ theme }) => ({
    height: '300px',
    position: 'relative',
    backgroundImage: clubData?.imageUrl ? `url(${clubData.imageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'flex-end',
    padding: theme.spacing(3),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
    }
  }));

  return (
    <Box sx={{
      mt: 0,
      pt: 0,
      px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
    }}>
      {/* Back Button */}
      <IconButton 
        onClick={() => navigate('/clubs')}
        sx={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          zIndex: 10,
          background: 'rgba(255,255,255,0.2)',
          '&:hover': { background: 'rgba(255,255,255,0.3)' }
        }}
      >
        <BackIcon sx={{ color: 'white' }} />
      </IconButton>

      <Banner>
        <Box display="flex" alignItems="flex-end" sx={{ 
          paddingLeft: '32px !important',
          width: '100%'
        }}>
          <ClubLogo src={clubData.logo} alt={clubData.name} />
          <Box>
            <Typography
              variant="h4"
              color="white"
              sx={{
                position: 'relative',
                zIndex: 1,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              }}
            >
              {clubData.name}
            </Typography>

            <StatsBox>
              <Typography>{clubData.members} members</Typography>
              <Typography>{clubData.posts?.length || 0} posts</Typography>
            </StatsBox>
          </Box>
        </Box>
      </Banner>

      <Container maxWidth="lg" 
        sx={{ 
          mt: 0,
          pt: 0, 
          paddingLeft: '0px !important',
          paddingRight: '0px !important',
        }}
      >
        <Tabs 
          value={value} 
          onChange={(_, newValue) => setValue(newValue)}
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '5px',
          }}
        >
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Contact" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Box sx={{ mt: 3 }}>
            <Grid 
              container 
              spacing={3} 
              justifyContent="center"
              columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
            >
              {clubData.posts?.map((post) => (
                <Grid 
                  item 
                  xs={4} 
                  sm={4} 
                  md={isLargeScreen ? 4 : 6} 
                  key={post.id}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 2, 
                      boxShadow: 3, 
                      transition: "0.3s", 
                      "&:hover": { boxShadow: 6 } 
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Post Header */}
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar 
                          src={post.author.avatar} 
                          sx={{ mr: 2, width: 40, height: 40 }} 
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {post.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(post.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Post Content */}
                      <Typography 
                        variant="body2" 
                        color="text.primary" 
                        sx={{ 
                          mb: 2, 
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {post.content}
                      </Typography>

                      {/* Post Image */}
                      {post.image && (
                        <Box
                          component="img"
                          src={post.image}
                          alt="Post"
                          onClick={() => setSelectedImage(post.image ?? null)}
                          sx={{
                            width: "100%",
                            height: 180,
                            objectFit: "cover",
                            borderRadius: 2,
                            cursor: "pointer",
                            "&:hover": { opacity: 0.8 }
                          }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Image Full-Screen Modal */}
            <Dialog 
              open={!!selectedImage} 
              onClose={() => setSelectedImage(null)} 
              maxWidth="lg"
            >
              <DialogContent 
                sx={{ 
                  position: "relative", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  p: 2 
                }}
              >
                <IconButton
                  onClick={() => setSelectedImage(null)}
                  sx={{ 
                    position: "absolute", 
                    top: 10, 
                    right: 10, 
                    background: "rgba(0,0,0,0.5)", 
                    color: "#fff" 
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Box
                  component="img"
                  src={selectedImage || ''}
                  alt="Full-size preview"
                  sx={{ 
                    maxWidth: "90vw", 
                    maxHeight: "90vh", 
                    borderRadius: 2 
                  }}
                />
              </DialogContent>
            </Dialog>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <IconWrapper>
                      <Lightbulb fontSize="large" />
                    </IconWrapper>
                    <Typography variant="h6">VISION</Typography>
                  </Box>
                  <Typography>{clubData.vision}</Typography>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <IconWrapper>
                      <Flag fontSize="large" />
                    </IconWrapper>
                    <Typography variant="h6">MISSION</Typography>
                  </Box>
                  <Typography>{clubData.mission}</Typography>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <IconWrapper>
                      <Groups fontSize="large" />
                    </IconWrapper>
                    <Typography variant="h6">GOAL</Typography>
                  </Box>
                  <Typography>{clubData.goal}</Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Gallery</Typography>
            <Grid container spacing={2}>
              {clubData.gallery?.map((image, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    component="img"
                    src={image}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>Email</Typography>
                  <Box display="flex" alignItems="center">
                    <Email sx={{ mr: 1 }} />
                    <Typography>{clubData.contactInfo?.email}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>Phone</Typography>
                  <Box display="flex" alignItems="center">
                    <Phone sx={{ mr: 1 }} />
                    <Typography>{clubData.contactInfo?.phone}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>Social Media</Typography>
                  <Box display="flex" gap={1} justifyContent="center">
                    <IconButton 
                      color="primary" 
                      href={clubData.contactInfo?.social.facebook || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      href={clubData.contactInfo?.social.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
};

export default ClubDetails;