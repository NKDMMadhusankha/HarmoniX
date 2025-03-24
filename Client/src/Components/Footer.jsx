import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PublicIcon from '@mui/icons-material/Public';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo/Brand Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
              HarmoniX
            </Typography>
          </Grid>

          {/* Learn More Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Learn More
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">About Lift</Link>
              <Link href="#" color="inherit" underline="hover">Press Releases</Link>
              <Link href="#" color="inherit" underline="hover">Environment</Link>
              <Link href="#" color="inherit" underline="hover">Jobs</Link>
              <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
              <Link href="#" color="inherit" underline="hover">Contact Us</Link>
            </Box>
          </Grid>

          {/* Tickets & Booking Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Tickets & Booking
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">Lift Tickets</Link>
              <Link href="#" color="inherit" underline="hover">Season Passes</Link>
              <Link href="#" color="inherit" underline="hover">Vacation Packages</Link>
            </Box>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box>
                <Typography variant="body2" component="div">
                  Hotel Reservations:
                </Typography>
                <Typography variant="body2" component="div">
                  123-456-7890
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" component="div">
                  Ticket Office:
                </Typography>
                <Typography variant="body2" component="div">
                  123-456-7890
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Social Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Social
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton aria-label="facebook" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="youtube" color="inherit">
                <YouTubeIcon />
              </IconButton>
              <IconButton aria-label="website" color="inherit">
                <PublicIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 HarmoniX | All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;