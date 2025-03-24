import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ArrowDownwardOutlined } from '@mui/icons-material';
import '@fontsource/saira'; // Defaults to 400 weight

const HomeBanner = () => {
  // State for changing text animation
  const [currentRole, setCurrentRole] = useState('MASTERING ENGINEER !');
  const roles = ['MASTERING ENGINEER !', 'MUSIC PRODUCER !', 'MIXING ENGINEER !', 'RECORDING ENGINEER !'];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Text animation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % roles.length;
      setCurrentIndex(nextIndex);
      setCurrentRole(roles[nextIndex]);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <>
      {/* Main Banner Section */}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#0D0D0D',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          pt: 8, // Add padding to account for navbar
        }}
      >
        {/* Main animated content */}
        <Container maxWidth="lg" sx={{ textAlign: 'center', zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem' },
              fontWeight: 700,
              mb: 2,
            //   whiteSpace: 'nowrap',
            }}
          >
            YOU CAN MEET YOUR{' '}
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                position: 'relative',
                opacity: 1,
                animation: 'moveText 3s ease-in-out infinite',
                '@keyframes moveText': {
                  '0%': {
                    transform: 'translateY(50%)',  // Start the new text below
                    opacity: 0,
                  },
                  '50%': {
                    transform: 'translateY(0)', // Move the new text to the center
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'translateY(-20%)', // Move the old text out of view (up)
                    opacity: 0,
                  },
                },
              }}
            >
              {currentRole}
            </Box>
          </Typography>

          <Box sx={{ maxWidth: '3000px', mx: 'auto', mt: 20, mb: 10, fontFamily: '"Saira", sans-serif' }}>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, opacity: 0.8, lineHeight: 1.8 }}>
              revolutionizing how artists and professionals connect to create music, our website provides a fresh approach to collaboration.
              easily connect with top producers, skilled engineers, talented vocalists, and a variety of other music professionals.
              with multiple facilities available, you can bring your sound to life and produce high-quality tracks that resonate with your audience.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="inherit"
            size="large"
            endIcon={<ArrowDownwardOutlined />}
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              borderColor: 'white',
              '&:hover': {
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
            }}
          >
            Our Services
          </Button>
        </Container>
      </Box>

      {/* Logos Section */}
    </>
  );
};

export default HomeBanner;
