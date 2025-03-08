import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  CardMedia,
  Button,
  InputAdornment,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getClubs } from '@crema/mockapi/apis/guest/explore';
import { fetchAllClubs } from '@crema/services/club';
import { Club } from '@crema/types/models/guest';

const ClubsPage = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Categories');
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const loadClubs = async () => {
        try {
          setLoading(true);
          const clubsData = await fetchAllClubs();
          setClubs(clubsData);
          
        } catch (err) {
          console.error('Error fetching clubs:', err);
        } finally {
          setLoading(false);
        }
      };
  
      loadClubs();
    }, [fetchAllClubs]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string);
  };

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All Categories' || club.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (clubId: number) => {
    navigate(`/student/club/${clubId}`);
  };

  return (
    <Box
      sx={{
       // background: theme.palette.background.paper,
        minHeight: '100vh',
        paddingTop: 3,
        paddingBottom: 8,
      }}
    >
      <Container maxWidth="lg"
        sx={{ 
          paddingLeft: '48px !important', 
          paddingRight: '48px !important',
          paddingTop: '0px !important', 
        }}
      >
        {/* Search and Filter Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 6,
            mt: 2,
          }}
        >
          <TextField
            placeholder="Search clubs..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                background: '#FFFFFF',
                borderRadius: '4px',
                height: '48px',
              },
            }}
            sx={{ flexGrow: 1 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                background: '#FFFFFF',
                '& .MuiSelect-select': {
                  paddingY: 1.5,
                },
              }}
            >
              <MenuItem value="All Categories">All Categories</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Academic">Academic</MenuItem>
              <MenuItem value="Arts">Arts</MenuItem>
              <MenuItem value="Social">Social</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Clubs Grid */}
        <Grid container spacing={3}>
              {filteredClubs.map((club) => (
                <Grid item xs={12} sm={6} md={4} key={club.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%', // Ensures cards scale correctly
                      maxHeight: 400, // 🔥 This limits card height
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={club.logo || club.imageUrl}
                      alt={club.name}
                      sx={{
                        height: { xs: 140, md: 180 }, // 🔥 Smaller image on small screens
                        objectFit: 'contain',
                        padding: 1,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, padding: '12px' }}> {/* 🔥 Reduced padding */}
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontSize: { xs: '1rem', md: '1.2rem' }, // 🔥 Responsive text size
                          fontWeight: 600,
                        }}
                      >
                        {club.name}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: '0.85rem', md: '1rem' },
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2, // 🔥 Truncate long text
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {club.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PeopleIcon sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography sx={{ fontSize: '0.9rem' }}>{club.members || 0} members</Typography>
                        </Box>
                        <Button variant="text" color="primary" onClick={() => handleViewDetails(club.id)}>
                          View
                        </Button>
                      </Box>
                    </CardContent>
                  </Paper>
                </Grid>
              ))}
            </Grid>


        {/* No results message */}
        {filteredClubs.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}
          >
            <Typography variant="h5" color="text.secondary">
              No clubs found matching your search criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ClubsPage;