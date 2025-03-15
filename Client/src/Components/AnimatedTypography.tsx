import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Typewriter } from 'react-simple-typewriter';

export const AnimatedTypography = () => {
  return (
    <Typography
      variant="h2"
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      sx={{ mb: 24, fontWeight: 300, }}
      
    >
      <Typewriter
        words={['Join now and start\nyour music journey\nwith us!']}
        loop={1}
        cursor
        cursorStyle="_"
        typeSpeed={50}
        deleteSpeed={50}
        delaySpeed={3000}
      />
    </Typography>
  );
};
