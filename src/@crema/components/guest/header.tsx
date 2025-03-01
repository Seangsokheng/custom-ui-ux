import { AppBar, Toolbar, Button, Box, CardMedia } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <AppBar 
      position="static" 
      sx={{ 
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: 'white'
      }}
    >
      <Toolbar sx={{ 
        maxWidth: 1200, 
        width: '100%', 
        mx: 'auto', 
        px: { xs: 1, sm: 2, md: 3 }, // Less padding for mobile S
        minHeight: { xs: 56, sm: 64, md: 80 }, // Shorter height for mobile S
        justifyContent: 'space-between',
        display: 'flex',
        flexWrap: 'nowrap' // Prevents wrapping
      }}>
        
        {/* Logo Section */}
        <Box
          component="a"
          href="/"
          sx={{
            display: 'flex', 
            alignItems: 'center',
            flexShrink: 0, // Prevents shrinking
            gap: { xs: 0.5, sm: 1, md: 4 }, // Adjusted gap for small screens
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: 65, sm: 80, md: 110 }, // Shrink logo for mobile S
              height: { xs: 20, sm: 25, md: 35 },
              objectFit: "contain"
            }}
            image="/assets/images/guest/logo.png"
            alt="logo"
          />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 0.5, sm: 1, md: 3 }, // Reduce gap on small screens
          alignItems: 'center',
          flexWrap: 'nowrap' // Prevents wrapping
        }}>
          <Button
            onClick={() => navigate('/')}
            sx={{
              color: isHome ? 'primary.main' : 'text.primary',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: { xs: '10px', sm: '12px', md: '14px' }, // Even smaller for mobile S
              borderBottom: isHome ? '2px solid' : 'none', 
              borderColor: isHome ? 'primary.main' : 'transparent',
              borderRadius: 0,
              px: { xs: 0.8, sm: 1, md: 2 }
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate('/explore')}
            sx={{
              color: location.pathname === '/explore' ? 'primary.main' : 'text.primary',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: { xs: '10px', sm: '12px', md: '14px' }, // Smaller for mobile S
              borderBottom: location.pathname === '/explore' ? '2px solid' : 'none',
              borderColor: location.pathname === '/explore' ? 'primary.main' : 'transparent',
              borderRadius: 0,
              px: { xs: 0.8, sm: 1, md: 2 }
            }}
          >
            Explore
          </Button>
        </Box>

        {/* Login & Register Buttons */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 0.3, sm: 0.5, md: 2 }, // Even smaller gap for mobile S
          alignItems: 'center',
          flexWrap: 'nowrap' // Prevents wrapping
        }}>
          <Button
            onClick={() => navigate('/login')}
            sx={{
              color: 'text.primary',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: { xs: '10px', sm: '12px', md: '14px' }, // Tiny font for mobile S
              px: { xs: 0.8, sm: 1, md: 2 }
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/signup')}
            sx={{
              px: { xs: 1, sm: 1.5, md: 3 }, // Reduce padding even more
              py: { xs: 0.6, sm: 0.8, md: 1 }, // Adjust height for mobile S
              fontSize: { xs: '10px', sm: '12px', md: '14px' }, // Smaller font
              minWidth: { xs: 60, sm: 70, md: 100 }, // Even smaller width
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Register
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
