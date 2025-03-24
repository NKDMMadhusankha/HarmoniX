import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ArrowDownwardOutlined } from '@mui/icons-material';
import '@fontsource/saira';

const HomeBanner = () => {
  const [currentRole, setCurrentRole] = useState('MASTERING ENGINEER !');
  const roles = ['MASTERING ENGINEER !', 'MUSIC PRODUCER !', 'MIXING ENGINEER !', 'RECORDING ENGINEER !'];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const bannerRef = useRef(null);
  const videoRef = useRef(null);

  // Text animation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % roles.length;
      setCurrentIndex(nextIndex);
      setCurrentRole(roles[nextIndex]);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex, roles]);

  return (
    <Box
      ref={bannerRef}
      sx={{
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: 8,
        cursor: 'default',
      }}
    >
      {/* Video Background */}
      <Box
        component="video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          filter: 'brightness(0.4)',
          objectFit: 'cover',
        }}
      >
        <source 
          src="https://videos.pexels.com/video-files/5657834/5657834-uhd_2732_1440_25fps.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </Box>

      {/* Overlay to darken video background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1,
        }}
      />

      {/* Main animated content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          textAlign: 'center', 
          zIndex: 2, 
          position: 'relative',
          color: '#FFFFFF',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem' },
            fontWeight: 700,
            mb: 2,
            color: '#FFFFFF',
          }}
        >
          YOU CAN MEET YOUR{' '}
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              position: 'relative',
              color: '#E0E0E0',
              animation: 'moveText 3s ease-in-out infinite',
              '@keyframes moveText': {
                '0%': {
                  transform: 'translateY(50%)',
                  opacity: 0,
                },
                '50%': {
                  transform: 'translateY(0)',
                  opacity: 1,
                },
                '100%': {
                  transform: 'translateY(-20%)',
                  opacity: 0,
                },
              },
            }}
          >
            {currentRole}
          </Box>
        </Typography>
        
        <Box sx={{ maxWidth: '3000px', mx: 'auto', mt: 20, mb: 10, fontFamily: '"Saira", sans-serif' }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
              opacity: 0.8, 
              lineHeight: 1.8,
              color: '#CCCCCC',
            }}
          >
            Revolutionizing how artists and professionals connect to create music, our website provides a fresh approach to collaboration.
            Easily connect with top producers, skilled engineers, talented vocalists, and a variety of other music professionals.
            With multiple facilities available, you can bring your sound to life and produce high-quality tracks that resonate with your audience.
          </Typography>
        </Box>
        
        <Button
          variant="outlined"
          size="large"
          endIcon={<ArrowDownwardOutlined />}
          sx={{
            borderRadius: '50px',
            px: 4,
            py: 1.5,
            borderColor: '#FFFFFF',
            color: '#FFFFFF',
            '&:hover': {
              borderColor: '#CCCCCC',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Our Services
        </Button>
      </Container>

      {/* Custom Styles */}
      <style>{`
        @keyframes moveText {
          0% {
            transform: translateY(50%);
            opacity: 0;
          }
          50% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-20%);
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
};

export default HomeBanner;