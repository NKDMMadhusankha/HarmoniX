import React, { useState, useRef, useEffect } from 'react';
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
import LogoutIcon from '@mui/icons-material/Logout';

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
  const [profileImage, setProfileImage] = useState(null);
  
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

  const handleLogout = () => {
    // Clear user authentication data (e.g., token) from localStorage
    localStorage.removeItem('authToken');
    // Redirect to the home page or login page
    navigate('/login');
  };

  // Add scrollbar width calculation
  useEffect(() => {
    // Calculate scrollbar width and set as CSS variable
    const calculateScrollbarWidth = () => {
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll'; // Correct property assignment
      outer.style.msOverflowStyle = 'scrollbar'; // Correct property assignment
      document.body.appendChild(outer);
      
      const inner = document.createElement('div');
      outer.appendChild(inner);
      
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      
      document.body.removeChild(outer);
    };
    
    calculateScrollbarWidth();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateScrollbarWidth);
    return () => window.removeEventListener('resize', calculateScrollbarWidth);
  }, []);

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
                          } else if (option === 'Recording Studios') {
                            navigate('/music/studios');  // Navigate to your Studio page
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
          position="fixed"
          sx={{ 
            bgcolor: '#000000', 
            boxShadow: 'none', 
            border: 'none',
            borderRadius: 0,
            zIndex: theme.zIndex.drawer + 1
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
                {/* Empty box to push content to center */}
                <Box sx={{ flex: 1 }} />
                
                {/* Centered navigation items */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}>
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
                            } else if (option === 'Recording Studios') {
                              navigate('/music/studios');  // Navigate to your lyricist page
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
                      <a 
                        key={item} 
                        href="/contact" 
                        style={{ textDecoration: 'none' }}
                      >
                        <Button sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}>
                          {item}
                        </Button>
                      </a>
                    ) : item === 'About Us' ? (
                      <a 
                        key={item} 
                        href="/about" 
                        style={{ textDecoration: 'none' }}
                      >
                        <Button sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}>
                          {item}
                        </Button>
                      </a>
                    ) : (
                      <Button key={item} sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}>
                        {item}
                      </Button>
                    ) 
                  ))}
                </Box>

                {/* Profile dropdown - right aligned */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={handleProfileMenuOpen} sx={{ color: 'white' }}>
                    {profileImage ? (
                      <Box
                        component="img"
                        src={profileImage}
                        alt="Profile"
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <AccountCircleIcon sx={{ fontSize: '2.3rem', color: 'white' }} />
                    )}
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
                    <MenuItem 
                      onClick={handleProfileClick} 
                      sx={{ color: 'white' }}
                    >
                      <ListItemIcon sx={{ color: 'white' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem 
                      onClick={handleLogout} 
                      sx={{ 
                        color: 'white', 
                        backgroundColor: '#f44336', // Red background color
                        '&:hover': {
                          backgroundColor: '#d32f2f' // Darker red on hover
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: 'white' }}>
                        <LogoutIcon />
                      </ListItemIcon>
                      Log Out
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
        
        {/* Add a placeholder to prevent content from jumping under the fixed navbar */}
        <Box sx={{ 
          height: { xs: '56px', sm: '64px' },  // Match AppBar height
          width: '100%'
        }} />
        
        {/* Add this to fix the scrollbar issue */}
        <style>{`
          body {
            overflow-x: hidden !important;
          }
        `}</style>
      </Box>
    </ThemeProvider>
  );
};

export default HarmoniXNavbar;