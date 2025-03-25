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

const FullWidthBox = ({ children, ...props }) => (
  <Box 
    sx={{ 
      width: '100vw', 
      maxWidth: '100vw', 
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      boxSizing: 'border-box',
      ...props.sx 
    }}
    {...props}
  >
    {children}
  </Box>
);

const HarmoniXNavbar = () => {
  const theme = useTheme();
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
                p: 2
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
                <IconButton onClick={toggleMobileMenu} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <List sx={{ flexGrow: 1 }}>
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
                    {featureOptions.map((option) => (
                      <ListItem 
                        button 
                        key={option}
                        sx={{ 
                          py: 1.5, 
                          pl: 4,
                          borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}
                      >
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
                {navItemsWithoutFeatures.map((item) => (
                  <ListItem 
                    button 
                    key={item} 
                    sx={{ 
                      py: 2,
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ 
                        variant: 'h6', 
                        sx: { color: 'white' } 
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    py: 1.5
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    py: 1.5
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
        
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
                    <Button
                      key={item}
                      sx={{ 
                        my: 2, 
                        color: 'white', 
                        display: 'block',
                        mx: 1
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>

                {/* Profile dropdown */}
                <Box sx={{ flexGrow: 0 }}>
                <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{ color: 'white' }} // No size change here, just for the IconButton container
                  >
                    <AccountCircleIcon sx={{ fontSize: '2.2rem', color: 'white' }} /> {/* Set the profile icon size */}
                    {/* <KeyboardArrowDownIcon sx={{ fontSize: '1rem', color: 'white' }} /> Keep the dropdown arrow smaller */}
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
                    <MenuItem onClick={handleProfileMenuClose} sx={{ color: 'white' }}>Login</MenuItem>
                    <MenuItem onClick={handleProfileMenuClose} sx={{ color: 'white' }}>Sign Up</MenuItem>
                    <MenuItem onClick={handleProfileMenuClose} sx={{ color: 'white' }}>Profile</MenuItem>
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
