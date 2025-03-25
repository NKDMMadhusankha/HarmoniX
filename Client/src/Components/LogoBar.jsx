import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import logos
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo7.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';
import logo5 from '../assets/logo7.png';
import logo6 from '../assets/logo6.png';
import logo7 from '../assets/logo7.png';

const LogoScrollContainer = styled(Box)({
  width: '100%',
  overflow: 'hidden',
  background: 'black',
  padding: '4px 0',
  position: 'relative',
});

const LogoTrack = styled(Box)({
  display: 'inline-flex',
  animation: 'scrollLoop 15s linear infinite',
  width: 'max-content',
  '@keyframes scrollLoop': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-10%)' },
  },
});

const LogoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 40px',
  opacity: 0.4,
  transition: 'opacity 0.6s ease',
  '&:hover': {
    opacity: 1,
  },
});

const LogoImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'isLogo7'
})(({ isLogo7, theme }) => ({
  maxHeight: isLogo7 ? '100px' : '60px', // Increase height for logo7
  maxWidth: isLogo7 ? '250px' : '200px', // Increase width for logo7
  objectFit: 'contain',
}));

const FadeOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(to right, 
    rgb(0, 0, 0) 0%, 
    rgba(10,10,10,0) 30%, 
    rgba(10,10,10,0) 80%, 
    rgb(0, 0, 0) 100%)`,
  pointerEvents: 'none',
  zIndex: 1,
});

const LogoScrollBar = () => {
  const logos = [
    logo1, logo2, logo3, logo4, logo5, logo6, logo7,
    logo1, logo2, logo3, logo4, logo5, logo6, logo7, 
    logo1, logo2, logo3, logo4, logo5, logo6, logo7,
    logo1, logo2, logo3, logo4, logo5, logo6, logo7,
    logo1, logo2, logo3, logo4, logo5, logo6, logo7,
    logo1, logo2, logo3, logo4, logo5, logo6, logo7,
    logo1, logo2, logo3, logo4, logo5, logo6, logo7,
    logo1, logo2, logo3, logo4, logo5, logo6, logo7,
    logo1, logo2, logo3, logo4, logo5, logo6, logo7,// Duplicate for seamless scrolling
  ];

  return (
    <LogoScrollContainer>
      <LogoTrack>
        {logos.map((logo, index) => (
          <LogoWrapper key={index}>
            <LogoImage 
              src={logo} 
              alt={`Partner Logo ${index + 1}`} 
              isLogo7={logo === logo7} 
            />
          </LogoWrapper>
        ))}
      </LogoTrack>
      <FadeOverlay />
    </LogoScrollContainer>
  );
};

export default LogoScrollBar;