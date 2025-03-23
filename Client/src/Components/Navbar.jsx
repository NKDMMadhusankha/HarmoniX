import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const HarmoniXNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navItems = ['Features', 'Resources', 'Support', 'About Us', 'Contact'];

  return (
    <>
      {/* Copyright bar with light gray background */}
      <Box sx={{ bgcolor: '#DFDFDF', py: 0, px: 2, display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="caption" color="text.primary" sx={{ mt: 1 }}>
          2024 MERASIC Entertainment Pvt. Ltd. All Rights Reserved.
        </Typography>
        <Box>
          <IconButton size="small" color="inherit" aria-label="facebook">
            <FacebookIcon fontSize="small" sx={{ color: 'text.primary' }} />
          </IconButton>
          <IconButton size="small" color="inherit" aria-label="linkedin">
            <LinkedInIcon fontSize="small" sx={{ color: 'text.primary' }} />
          </IconButton>
          <IconButton size="small" color="inherit" aria-label="instagram">
            <InstagramIcon fontSize="small" sx={{ color: 'text.primary' }} />
          </IconButton>
          <IconButton size="small" color="inherit" aria-label="email">
            <EmailIcon fontSize="small" sx={{ color: 'text.primary' }} />
          </IconButton>
        </Box>
      </Box>
      
      {/* Fullscreen Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <Fade in={mobileMenuOpen}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
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
              {navItems.map((item) => (
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
      <AppBar position="static" sx={{ bgcolor: 'black', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
                  {navItems.map((item) => (
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

                {/* Login/Signup buttons */}
                <Box sx={{ flexGrow: 0 }}>
                  <Button color="inherit" sx={{ mr: 1 }}>Login</Button>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                      borderRadius: 1
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default HarmoniXNavbar;