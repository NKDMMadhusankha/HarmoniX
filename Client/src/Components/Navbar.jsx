import React, { useState, useRef } from 'react';
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
  Collapse,
  ListItemIcon
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TuneIcon from '@mui/icons-material/Tune';
import LyricsIcon from '@mui/icons-material/Lyrics';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

// Import React Router components
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresAnchorEl, setFeaturesAnchorEl] = useState(null);
  const [mobileFeatureOpen, setMobileFeatureOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  
  // Ref for the features menu container
  const featuresMenuRef = useRef(null);
  const featuresButtonRef = useRef(null);
  const menuTimeoutRef = useRef(null);
  
  const featureOptions = ['Mixing Engineer', 'Mastering Engineer', 'Music Producer', 'Recording Studios','lyricist',]; //'Singers & Vocalists'
  const featureIcons = [<TuneIcon />, <GraphicEqIcon />, <QueueMusicIcon />, <HomeWorkIcon />, <LyricsIcon />, <PersonIcon />];
  
  const navItemsWithoutFeatures = ['Resources', 'Support', 'About Us', 'Contact'];
  const navItemIcons = [<MenuBookIcon />, <SupportAgentIcon />, <InfoIcon />, <ContactMailIcon />];
  
  const toggleMobileMenu = () => {
    console.log('Toggle Mobile Menu', !mobileMenuOpen);
    setMobileMenuOpen(prevState => !prevState);
  };
  
  // Improved hover handling for Features dropdown
  const handleFeaturesMouseEnter = (event) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setFeaturesAnchorEl(event.currentTarget);
  };
  
  const handleFeaturesMouseLeave = () => {
    // Use a ref for timeout to be able to clear it
    menuTimeoutRef.current = setTimeout(() => {
      setFeaturesAnchorEl(null);
    }, 300); // Increased delay for better UX
  };
  
  // Handler for when mouse enters the menu itself
  const handleMenuMouseEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
  };
  
  // Handler for when mouse leaves the menu
  const handleMenuMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setFeaturesAnchorEl(null);
    }, 300);
  };
  
  const toggleMobileFeatures = () => {
    setMobileFeatureOpen(prev => !prev);
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
    navigate('/catogary');
    handleProfileMenuClose();
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleMobileNavigation = (path) => {
    navigate(path);
    toggleMobileMenu();
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
        {/* Fullscreen Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <Fade in={mobileMenuOpen}>
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                bgcolor: 'black',
                zIndex: 1300,
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                overflowY: 'auto'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  HarmoniX
                </Typography>
                <IconButton 
                  onClick={toggleMobileMenu} 
                  sx={{ color: 'white' }}
                  aria-label="close menu"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <List sx={{ flexGrow: 1}}>
                {/* Features item with dropdown */}
                <ListItem 
                  button 
                  onClick={toggleMobileFeatures}
                  sx={{ 
                    py: 2,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <ListItemText 
                    primary="Features" 
                    primaryTypographyProps={{ 
                      variant: 'h6', 
                      sx: { color: 'white' } 
                    }} 
                  />
                  {mobileFeatureOpen ? 
                    <KeyboardArrowUpIcon sx={{ color: 'white' }} /> : 
                    <KeyboardArrowDownIcon sx={{ color: 'white' }} />
                  }
                </ListItem>
                
                {/* Features submenu */}
                <Collapse in={mobileFeatureOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {featureOptions.map((option, index) => (
                      <ListItem 
                        button 
                        key={option}
                        onClick={() => {
                          if (option === 'Music Producer') {
                            navigate('/music/producer'); // Navigate to your MusicProducer page
                            setMobileMenuOpen(false);
                          } else if (option === 'Mastering Engineer') {
                            navigate('/music/mastering');  // Navigate to your mastering page
                            setMobileMenuOpen(false);
                          } else if (option === 'Mixing Engineer') {
                            navigate('/music/mixing');  // Navigate to your mising page
                            setMobileMenuOpen(false);
                          } else if (option === 'lyricist') {
                            navigate('/music/lyricists');  // Navigate to your lyricist page
                            setMobileMenuOpen(false);
                          }
                        }}
                        sx={{ 
                          py: 1.5, 
                          pl: 4,
                          borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}
                      >
                        <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                          {featureIcons[index]}
                        </ListItemIcon>
                        <ListItemText 
                          primary={option} 
                          primaryTypographyProps={{ 
                            sx: { color: 'white', fontSize: '1rem' } 
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                
                {/* Other navigation items */}
                {navItemsWithoutFeatures.map((item, index) => (
                  <ListItem 
                    button 
                    key={item} 
                    onClick={() => handleMobileNavigation(
                      item === 'About Us' ? '/about' : 
                      item === 'Contact' ? '/contact' :
                      item.toLowerCase().replace(' ', '-')
                    )}
                    sx={{ 
                      py: 2,
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                      {navItemIcons[index]}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ 
                        variant: 'h6', 
                        sx: { color: 'white' } 
                      }} 
                    />
                  </ListItem>
                ))}

                {/* Mobile Profile Menu Items */}
                <ListItem 
                  button 
                  onClick={handleLoginClick}
                  sx={{ 
                    py: 2,
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Login" 
                    primaryTypographyProps={{ 
                      variant: 'h6', 
                      sx: { color: 'white' } 
                    }} 
                  />
                </ListItem>
                <ListItem 
                  button 
                  onClick={handleSignUpClick}
                  sx={{ 
                    py: 2,
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Sign Up" 
                    primaryTypographyProps={{ 
                      variant: 'h6', 
                      sx: { color: 'white' } 
                    }} 
                  />
                </ListItem>
                <ListItem 
                  button 
                  onClick={handleProfileClick}
                  sx={{ 
                    py: 2,
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Profile" 
                    primaryTypographyProps={{ 
                      variant: 'h6', 
                      sx: { color: 'white' } 
                    }} 
                  />
                </ListItem>
              </List>
            </Box>
          </Fade>
        )}
        
        {/* Main navbar */}
        <AppBar 
          position="static" // Changed from 'static' to 'fixed'
          sx={{ 
            bgcolor: '#000000', 
            boxShadow: 'none', 
            border: 'none',
            width: '100vw',
            margin: 0,
            padding: 0,
            borderRadius: 0,
            zIndex: theme.zIndex.drawer + 1 // Ensure it's above other content
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
                cursor: 'pointer'
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
              // Desktop navigation
              <>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  {/* Features dropdown with improved hover */}
                  <Box 
                    ref={featuresMenuRef}
                    sx={{ display: 'inline-flex', position: 'relative' }}
                  >
                    <Button
                      ref={featuresButtonRef}
                      aria-controls="features-menu"
                      aria-haspopup="true"
                      endIcon={<KeyboardArrowDownIcon />}
                      onMouseEnter={handleFeaturesMouseEnter}
                      onMouseLeave={handleFeaturesMouseLeave}
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
                      onClose={() => setFeaturesAnchorEl(null)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      MenuListProps={{ 
                        onMouseEnter: handleMenuMouseEnter,
                        onMouseLeave: handleMenuMouseLeave,
                        style: { pointerEvents: 'auto' }
                      }}
                      disableRestoreFocus
                      sx={{
                        '& .MuiPaper-root': {
                          backgroundColor: 'black',
                          borderRadius: 1,
                          minWidth: '200px',
                          mt: 0.5
                        },
                        pointerEvents: 'none'
                      }}
                    >
                      {featureOptions.map((option, index) => (
                        <MenuItem 
                          key={option} 
                          onClick={() => {
                            if (option === 'Music Producer') {
                              navigate('/music/producer');
                              setFeaturesAnchorEl(null);
                            } else if (option === 'Mastering Engineer') {
                              navigate('/music/mastering');  // Navigate to your mastering page
                              setFeaturesAnchorEl(null);
                            } else if (option === 'Mixing Engineer') {
                              navigate('/music/mixing');  // Navigate to your mixing page
                              setFeaturesAnchorEl(null);
                            } else if (option === 'lyricist') {
                              navigate('/music/lyricists');  // Navigate to your lyricist page
                              setMobileMenuOpen(false);
                            }
                          }}
                          sx={{
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                          }}
                        >
                          <ListItemIcon sx={{ color: 'white', minWidth: '36px' }}>
                            {featureIcons[index]}
                          </ListItemIcon>
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                  
                  {/* Other navigation items */}
                  {navItemsWithoutFeatures.map((item) => (
                    item === 'Contact' ? (
                      <Link to="/contact" style={{ textDecoration: 'none' }} key={item}>
                        <Button sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}>
                          {item}
                        </Button>
                      </Link>
                    ) : item === 'About Us' ? (
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
                    <MenuItem onClick={handleLoginClick} sx={{ color: 'white' }}>
                      <ListItemIcon sx={{ color: 'white' }}>
                        <LoginIcon />
                      </ListItemIcon>
                      Login
                    </MenuItem>
                    <MenuItem onClick={handleSignUpClick} sx={{ color: 'white' }}>
                      <ListItemIcon sx={{ color: 'white' }}>
                        <PersonAddIcon />
                      </ListItemIcon>
                      Sign Up
                    </MenuItem>
                    <MenuItem onClick={handleProfileClick} sx={{ color: 'white' }}>
                      <ListItemIcon sx={{ color: 'white' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
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