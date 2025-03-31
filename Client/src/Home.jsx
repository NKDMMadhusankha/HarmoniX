import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from './Components/Navbar';
import HomeBanner from './Landing/HomeBanner';
import Footer from './Components/Footer';
import LogoScrollBar from './Components/LogoBar';
import HomeCards from './Landing/HomeCards';
import HomeStep from './Landing/HomeStep';
import HomeFAQ from './Landing/HomeFAQ';
import HomeFeedBack from './Landing/HomeFeedBack'; 
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const HomePage = () => {
  // State to control button visibility
  const [visible, setVisible] = useState(false);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        overflowY: 'auto',
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: '#0D0D0D'
      }}
    >
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%' 
        }}
      >
        <HomeBanner />
        <LogoScrollBar />
        <HomeCards />
        <HomeStep />
        <HomeFAQ />
        <HomeFeedBack />
      </Box>
      <Footer />

      {/* Scroll to top button - placed outside other containers for reliable positioning */}
      {visible && (
        <Box
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#333',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 9999,
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#555',
              transform: 'translateY(-3px)'
            }
          }}
        >
          <ArrowUpwardIcon />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;