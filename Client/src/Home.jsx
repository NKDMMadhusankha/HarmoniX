import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Components/Navbar';
import HomeBanner from './Landing/HomeBanner';
import Footer from './Components/Footer';
import LogoScrollBar from './Components/LogoBar';
import { Home } from '@mui/icons-material';
import HomeCards from './Landing/HomeCards';
import HomeStep from './Landing/HomeStep';
import HomeFAQ from './Landing/HomeFAQ';
import HomeFeedBack from './Landing/HomeFeedBack'; 



const HomePage = () => {
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
    </Box>
  );
};

export default HomePage;