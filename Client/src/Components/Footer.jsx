import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PublicIcon from '@mui/icons-material/Public';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <Box  sx={{ bgcolor: 'black', color: 'white', py: 6, borderTop: '1px solid white' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ flexWrap: 'nowrap' }}>
          
          {/* Logo Section */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="HarmoniX Logo" style={{ width: '300px', height: 'auto', marginTop:'-120px', marginLeft:'-50px', marginRight:'50px' }} />
          </Grid>

          {/* Learn More Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Learn More</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">About HarmoniX</Link>
              <Link href="#" color="inherit" underline="hover">Jobs</Link>
              <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
              <Link href="#" color="inherit" underline="hover">Contact Us</Link>
            </Box>
          </Grid>

          {/* Features Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Features</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">Music Producer</Link>
              <Link href="#" color="inherit" underline="hover">Mixing Engineer</Link>
              <Link href="#" color="inherit" underline="hover">Mastering Engineer</Link>
              <Link href="#" color="inherit" underline="hover">Recording Engineer</Link>
            </Box>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Contact Us</Typography>
            <Typography variant="body2">HarmoniX PVT LTD :</Typography>
            <Typography variant="body2">011-2651255</Typography>
          </Grid>

          {/* Social Section */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:'-100px' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Social</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'nowrap' }}>
              <IconButton
                aria-label="facebook"
                color="inherit"
                sx={{
                  '&:hover': { 
                    color: '#3b5998', 
                    transform: 'scale(1.2)',  // Add scaling effect
                    boxShadow: '0 0 10px 0 #3b5998',  // Add glowing effect
                    transition: 'all 0.3s ease',  // Smooth transition
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="instagram"
                color="inherit"
                sx={{
                  '&:hover': { 
                    color: '#E4405F',
                    transform: 'scale(1.2)',
                    boxShadow: '0 0 10px 0 #E4405F',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="twitter"
                color="inherit"
                sx={{
                  '&:hover': { 
                    color: '#1DA1F2',
                    transform: 'scale(1.2)',
                    boxShadow: '0 0 10px 0 #1DA1F2',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="youtube"
                color="inherit"
                sx={{
                  '&:hover': { 
                    color: '#FF0000',
                    transform: 'scale(1.2)',
                    boxShadow: '0 0 10px 0 #FF0000',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                aria-label="website"
                color="inherit"
                sx={{
                  '&:hover': { 
                    color: '#00B4A1',
                    transform: 'scale(1.2)',
                    boxShadow: '0 0 10px 0 #00B4A1',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <PublicIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider Line */}
        <Divider sx={{ bgcolor: 'gray', my: 6, width: '100%' }} />

        {/* Copyright Section */}
        <Box sx={{ textAlign: 'center', marginBottom: '-20px' }}>
          <Typography variant="body2" color="gray">
            © 2025 HarmoniX | All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
