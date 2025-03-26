import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Menu,
  MenuItem,
  Collapse
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Import React Router components
import { Link, useNavigate } from 'react-router-dom';  // Added useNavigate

// Create a custom theme that removes all default margins and paddings
const fullWidthTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        },
        '#root': {
          width: '100vw',
          margin: 0,
          padding: 0
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: '100vw',
          left: 0,
          right: 0,
          borderRadius: 0,
          boxShadow: 'none'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          width: '100%',
          padding: '0 24px',
          '@media (max-width: 600px)': {
            padding: '0 16px',
          }
        }
      }
    }
  }
});

const HarmoniXNavbar = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Add navigation hook
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresAnchorEl, setFeaturesAnchorEl] = useState(null);
  const [mobileFeatureOpen, setMobileFeatureOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  
  const featureOptions = ['Mixing Engineer', 'Mastering Engineer', 'Music Producer', 'Recording Studio'];
  const navItemsWithoutFeatures = ['Resources', 'Support', 'About Us', 'Contact'];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleFeaturesClick = (event) => {
    setFeaturesAnchorEl(event.currentTarget);
  };
  
  const handleFeaturesClose = () => {
    setFeaturesAnchorEl(null);
  };
  
  const toggleMobileFeatures = () => {
    setMobileFeatureOpen(!mobileFeatureOpen);
  };
  
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  // Navigation handlers
  const handleLoginClick = () => {
    navigate('/login');
    handleProfileMenuClose();
  };

  const handleSignUpClick = () => {
    navigate('/register');
    handleProfileMenuClose();
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  return (
    <ThemeProvider theme={fullWidthTheme}>
      <CssBaseline />
      <Box sx={{ 
        width: '100%', 
        overflowX: 'hidden',
        margin: 0,
        padding: 0,
        position: 'static',
      }}>
        {/* Mobile Menu and Rest of the existing code remains the same */}
        
        {/* Main navbar */}
        <AppBar 
          position="static" 
          sx={{ 
            bgcolor: '#000000', 
            boxShadow: 'none', 
            border: 'none',
            width: '100vw',
            margin: 0,
            padding: 0,
            borderRadius: 0
          }}
        >
          <Toolbar disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
            {/* Logo */}
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: 'flex',
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
              }}
            >
              HarmoniX
            </Typography>

            {/* Mobile menu toggle */}
            {isMobile ? (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleMobileMenu}
                  sx={{ color: 'white' }}
                >
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <>
                {/* Desktop navigation */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  {/* Features dropdown */}
                  <Button
                    aria-controls="features-menu"
                    aria-haspopup="true"
                    onClick={handleFeaturesClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ 
                      my: 2, 
                      color: 'white', 
                      display: 'flex',
                      mx: 1,
                    }}
                  >
                    Features
                  </Button>
                  <Menu
                    id="features-menu"
                    anchorEl={featuresAnchorEl}
                    keepMounted
                    open={Boolean(featuresAnchorEl)}
                    onClose={handleFeaturesClose}
                    sx={{
                      '& .MuiPaper-root': {
                        backgroundColor: 'black',
                        borderRadius: 1,
                        minWidth: '200px'
                      }
                    }}
                  >
                    {featureOptions.map((option) => (
                      <MenuItem 
                        key={option} 
                        onClick={handleFeaturesClose}
                        sx={{
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                          }
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                  
                  {/* Other navigation items */}
                  {navItemsWithoutFeatures.map((item) => (
                    item === 'About Us' ? (
                      <Link to="/about" style={{ textDecoration: 'none' }} key={item}>
                        <Button sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}>
                          {item}
                        </Button>
                      </Link>
                    ) : (
                      <Button key={item} sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}>
                        {item}
                      </Button>
                    )
                  ))}
                </Box>

                {/* Profile dropdown */}
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{ color: 'white' }}
                  >
                    <AccountCircleIcon sx={{ fontSize: '2.3rem', color: 'white' }} />
                  </IconButton>
                  <Menu
                    anchorEl={profileMenuAnchorEl}
                    open={Boolean(profileMenuAnchorEl)}
                    onClose={handleProfileMenuClose}
                    sx={{
                      '& .MuiPaper-root': {
                        backgroundColor: 'black',
                        borderRadius: 1,
                        minWidth: '200px'
                      }
                    }}
                  >
                    <MenuItem onClick={handleLoginClick} sx={{ color: 'white' }}>Login</MenuItem>
                    <MenuItem onClick={handleSignUpClick} sx={{ color: 'white' }}>Sign Up</MenuItem>
                    <MenuItem onClick={handleProfileClick} sx={{ color: 'white' }}>Profile</MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default HarmoniXNavbar;