// ClubDetailsPage.tsx
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
  Paper,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import { Email, Phone, Facebook, Instagram, Search, Groups, Flag, Lightbulb } from '@mui/icons-material';
import { Club } from '@crema/types/models/guest';
import { fetchClubDetails } from '@crema/mockapi/apis/clubDetail';
import CloseIcon from "@mui/icons-material/Close";



const ClubLogo = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  border: `4px solid ${theme.palette.common.white}`,
  position: 'relative',
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
  height: '100%', // Ensures all cards have equal height
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

const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '10px',
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
  [key: string]: any;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    {...other}
  >
    {value === index && children}
  </Box>
);

const ClubDetailsPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [clubData, setClubData] = useState<Club | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadClubData = async () => {
      const data = await fetchClubDetails(1);
      setClubData(data);
    };
    loadClubData();
  }, []);
 console.log(clubData);

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

  if (!clubData) return null;

  return (
    <Box sx={{
      mt: 0,
      pt: 0,
      px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }, // Responsive padding
    }}>
      <Banner>
        <Box display="flex" alignItems="flex-end" sx={{  
        paddingLeft: '32px !important',
        }}>
          <ClubLogo src={clubData.logo} alt={clubData.name} />
          <Box>
              <Typography
                variant="h4"
                color="white"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, // Responsive font size
                }}
              >
                {clubData.name}
              </Typography>

            <StatsBox>
              <Typography>{clubData.members} members</Typography>
              <Typography>{clubData.posts?.length} posts</Typography>
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
        }}>
        <Tabs value={value} 
        onChange={(_, newValue) => setValue(newValue)}
        sx={{
          backgroundColor: 'white', // Set the background to white
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow
          padding: '5px', // Adds slight padding for a better look
        }}>
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Contact" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              {/* <Paper
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 400,
                }}
              >
                <Search sx={{ mx: 1 }} />
                <input
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: '8px',
                  }}
                  placeholder="Search posts..."
                />
              </Paper> */}
            </Box>
            <Grid container spacing={3} justifyContent="center">
        {clubData.posts?.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ maxWidth: 380, mx: "auto", borderRadius: 2, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
              <CardContent>
                {/* Post Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar src={post.author.avatar} sx={{ mr: 2, width: 40, height: 40 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{post.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Post Content */}
                <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>

                {/* Clickable Image */}
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
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="lg">
        <DialogContent sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
          <IconButton
            onClick={() => setSelectedImage(null)}
            sx={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.5)", color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={selectedImage || ''}
            alt="Full-size preview"
            sx={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 2 }}
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
          <TitleBox>
            <IconWrapper>
              <Lightbulb fontSize="large" />
            </IconWrapper>
            <Typography variant="h6">VISION</Typography>
          </TitleBox>
          <Typography>{clubData.vision}</Typography>
        </CardContent>
      </StyledCard>
    </Grid>

    <Grid item xs={12} md={4}>
      <StyledCard>
        <CardContent>
          <TitleBox>
            <IconWrapper>
              <Flag fontSize="large" />
            </IconWrapper>
            <Typography variant="h6">MISSION</Typography>
          </TitleBox>
          <Typography>{clubData.mission}</Typography>
        </CardContent>
      </StyledCard>
    </Grid>

    <Grid item xs={12} md={4}>
      <StyledCard>
        <CardContent>
          <TitleBox>
            <IconWrapper>
              <Groups fontSize="large" />
            </IconWrapper>
            <Typography variant="h6">GOAL</Typography>
          </TitleBox>
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
                      <Typography variant="h6" gutterBottom>Email Us</Typography>
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
                      <Typography variant="h6" gutterBottom>Call Us</Typography>
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
                      <Typography variant="h6" gutterBottom>Follow Us</Typography>
                      <Box display="flex" gap={1}>
                        <IconButton color="primary" href={clubData.contactInfo?.social.facebook || '#'}>
                          <Facebook />
                        </IconButton>
                        <IconButton color="primary" href={clubData.contactInfo?.social.instagram || '#'}>
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

export default ClubDetailsPage;