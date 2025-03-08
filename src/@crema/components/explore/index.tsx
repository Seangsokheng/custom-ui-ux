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
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Club } from '@crema/types/models/guest';
import * as clubsApi from '@crema/services/club';

// Define props interface to make component reusable
interface ClubsDisplayProps {
  // Basic props
  title?: string;
  subTitle?: string;
  // Layout props
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  gridLayout?: { xs: number; sm: number; md: number };
  spacing?: number;
  // Data fetching props
  fetchFunction?: () => Promise<Club[]>;
  initialFilters?: {
    searchTerm?: string;
    category?: string;
  };
  // Category options
  categoryOptions?: string[];
  // User role related props
  userRole?: 'guest' | 'member' | 'admin';
  // Actions
  onViewDetails?: (clubId: number) => void;
  customActions?: (club: Club) => React.ReactNode;
  // Styling
  containerPadding?: string;
  maxCardHeight?: number;
}

const ClubsDisplay: React.FC<ClubsDisplayProps> = ({
  // Default values for props
  title = "Clubs",
  subTitle,
  maxWidth = "lg",
  gridLayout = { xs: 12, sm: 6, md: 4 },
  spacing = 3,
  fetchFunction = clubsApi.fetchFeaturedClubs,
  initialFilters = { searchTerm: '', category: 'All Categories' },
  categoryOptions = ['Sports', 'Academic', 'Arts', 'Social'],
  userRole = 'guest',
  onViewDetails,
  customActions,
  containerPadding = '48px',
  maxCardHeight = 400,
}) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [category, setCategory] = useState(initialFilters.category || 'All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const loadClubs = async () => {
      try {
        setLoading(true);
        const clubsData = await fetchFunction();
        setClubs(clubsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Failed to load clubs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, [fetchFunction]);
  console.log(clubs);

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

  const handleViewDetailsClick = (clubId: number) => {
    if (onViewDetails) {
      onViewDetails(clubId);
    } else {
      navigate(`/club/${clubId}`);
    }
  };
  const handleCardClick = (club: Club) => {
    // Navigate to club details page
    navigate(`/club/${club.id}`);
  };

  // Render different actions based on user role
  const renderActions = (club: Club) => {
    if (customActions) {
      return customActions(club);
    }

    switch (userRole) {
      case 'admin':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={() => handleViewDetailsClick(club.id)}>
              Edit
            </Button>
            <Button variant="text" size="small" onClick={() => handleViewDetailsClick(club.id)}>
              View
            </Button>
          </Box>
        );
      case 'member':
        return (
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            onClick={() => handleViewDetailsClick(club.id)}
          >
            Club Portal
          </Button>
        );
      case 'guest':
      default:
        return (
          <Button 
            variant="text" 
            color="primary"
            onClick={() => handleViewDetailsClick(club.id)}
          >
            View Details
          </Button>
        );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        paddingTop: 3,
        paddingBottom: 8,
      }}
    >
      <Container 
        maxWidth={maxWidth}
        sx={{ 
          paddingLeft: `${containerPadding} !important`, 
          paddingRight: `${containerPadding} !important`,
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
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="error">{error}</Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              onClick={() => fetchFunction().then(setClubs).catch(() => {})}
            >
              Try Again
            </Button>
          </Box>
        )}

        {/* Clubs Grid */}
        {!loading && !error && (
          <Grid container spacing={spacing}>
            {filteredClubs.map((club) => (
               <Grid item {...gridLayout} key={club.id}>
               <Paper
                 elevation={2}
                 sx={{
                   borderRadius: 2,
                   overflow: 'hidden',
                   display: 'flex',
                   flexDirection: 'column',
                   height: '100%',
                   maxHeight: maxCardHeight,
                   cursor: 'pointer', // Add pointer cursor to indicate clickability
                   transition: 'box-shadow 0.3s ease',
                   '&:hover': {
                     boxShadow: 3, // Slightly elevated shadow on hover
                   }
                 }}
                 onClick={() => handleCardClick(club)}
               >
                 <CardMedia
                   component="img"
                   image={club.logo || club.imageUrl}
                   alt={club.name}
                   sx={{
                     height: { xs: 140, md: 180 },
                     objectFit: 'contain',
                     padding: 1,
                   }}
                 />
                 <CardContent sx={{ flexGrow: 1, padding: '12px' }}>
                   <Typography
                     variant="h6"
                     component="h3"
                     sx={{
                       fontSize: { xs: '1rem', md: '1.2rem' },
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
                       WebkitLineClamp: 2,
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
                     {renderActions(club)}
                   </Box>
                 </CardContent>
               </Paper>
             </Grid>
            ))}
          </Grid>
        )}

        {/* No results message */}
        {!loading && !error && filteredClubs.length === 0 && (
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

export default ClubsDisplay;