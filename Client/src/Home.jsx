import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Components/Navbar';
import HomeBanner from './Components/HomeBanner';
import Footer from './Components/Footer';

const HomePage = () => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        overflowY: 'auto', // Ensure vertical scrolling
        display: 'flex', 
        flexDirection: 'column' 
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
        {/* Add any other page content here */}
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;