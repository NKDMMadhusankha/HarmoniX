import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  People,
  MusicNote,
  CheckCircle,
  GraphicEq,
  Equalizer,
  Mic,
  Edit
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Link,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #000000, black)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  overflowX: 'hidden',
}));

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(8),
  left: theme.spacing(8),
  color: '#737373',
  '&:hover': {
    color: '#EA540C',
    background: 'transparent',
  },
  transition: 'color 0.3s',
}));

const CategoryCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(40, 40, 40, 0.6)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(60, 60, 60, 0.8)',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, border-color 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(234, 84, 12, 0.6)',
    '& .icon-circle': {
      transform: 'scale(1.1)',
      backgroundColor: 'rgba(234, 84, 12, 0.3)',
    },
    '& .icon-circle-glow': {
      opacity: 0.8,
    },
    '& .register-button': {
      backgroundColor: '#EA540C',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(234, 84, 12, 0.4)',
    }
  },
}));

const IconCircle = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(234, 84, 12, 0.2)',
  marginBottom: theme.spacing(2),
  position: 'relative',
  transition: 'all 0.3s ease',
}));

const IconCircleGlow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: '#EA540C',
  filter: 'blur(15px)',
  opacity: 0.3,
  transition: 'opacity 0.3s ease',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
}));

const FeatureList = styled(List)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  flexGrow: 1,
  padding: 0,
}));

const FeatureItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  background: 'rgba(234, 84, 12, 0.9)',
  color: 'white',
  padding: '12px 32px',
  borderRadius: '9999px',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  width: '100%',
  boxShadow: '0 4px 15px rgba(234, 84, 12, 0.3)',
  '&:hover': {
    background: '#EA540C',
    boxShadow: '0 6px 20px rgba(234, 84, 12, 0.5)',
  },
}));

const DecorativeBackground = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom right, rgba(40, 40, 40, 0.6), rgba(20, 20, 20, 0.8))',
  zIndex: 0,
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, rgba(234, 84, 12, 0.1), rgba(0, 0, 0, 0))',
    borderRadius: '0 0 16px 16px',
  }
});

const BackgroundEffect = styled(Box)({
  position: 'absolute',
  width: '500px',
  height: '500px',
  background: 'radial-gradient(circle, rgba(234, 84, 12, 0.15), rgba(0, 0, 0, 0))',
  borderRadius: '50%',
  filter: 'blur(40px)',
  opacity: 0.7,
  animation: 'float 8s infinite ease-in-out',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) scale(1)',
    },
    '50%': {
      transform: 'translateY(-30px) scale(1.1)',
    },
  },
});

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: theme.spacing(1.5),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    background: '#EA540C',
    borderRadius: 4,
  }
}));

const RegistrationCategory = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate('/');
  };

  // Card data for all 6 cards
  const cardData = [
    {
      id: 'stakeholder',
      path: '/client-registration',
      icon: <People sx={{ fontSize: 36, color: '#EA540C' }} />,
      title: 'Stakeholder',
      description: 'Perfect for artists, labels, and clients looking to find reliable music professionals and manage recording projects.',
      features: [
        "Connect with verified music professionals",
        "Manage multiple recording projects",
        "Track project progress in real-time"
      ],
      buttonText: 'REGISTER AS STAKEHOLDER'
    },
    {
      id: 'music-producer',
      path: '/music-producer-registration',
      icon: <MusicNote sx={{ fontSize: 36, color: '#EA540C' }} />,
      title: 'Music Producer',
      description: 'Ideal for producers looking to showcase their creativity, connect with artists, and manage production projects effectively.',
      features: [
        "Showcase your portfolio and production style",
        "Receive production opportunities",
        "Streamline your project workflow"
      ],
      buttonText: 'REGISTER AS MUSIC PRODUCER'
    },
    {
      id: 'mixing-engineer',
      path: '/mixing-engineer-registration',
      icon: <Equalizer sx={{ fontSize: 36, color: '#EA540C' }} />,
      title: 'Mixing Engineer',
      description: 'For mixing engineers looking to work with artists and producers to create balanced, polished mixes that stand out.',
      features: [
        "Share your mixing portfolio",
        "Collaborate with artists and producers",
        "Access specialized mixing tools"
      ],
      buttonText: 'REGISTER AS MIXING ENGINEER'
    },
    {
      id: 'mastering-engineer',
      path: '/mastering-engineer-registration',
      icon: <GraphicEq sx={{ fontSize: 36, color: '#EA540C' }} />,
      title: 'Mastering Engineer',
      description: 'For mastering professionals looking to apply their finishing touch to tracks and prepare them for commercial release.',
      features: [
        "Offer professional mastering services",
        "Manage your mastering schedule",
        "Build a verified reputation"
      ],
      buttonText: 'REGISTER AS MASTERING ENGINEER'
    },
    {
      id: 'recording-engineer',
      path: '/recording-engineer-registration',
      icon: <Mic sx={{ fontSize: 36, color: '#EA540C' }} />,
      title: 'Recording Engineer',
      description: 'For studio engineers who specialize in capturing high-quality audio recordings for music productions.',
      features: [
        "Promote your recording services",
        "Connect with artists and producers",
        "Showcase your studio capabilities"
      ],
      buttonText: 'REGISTER AS RECORDING ENGINEER'
    },
    {
      id: 'lyricist',
      path: '/lyricist-registration',
      icon: <Edit sx={{ fontSize: 36, color: '#EA540C' }} />,
      title: 'Lyricist',
      description: 'For songwriters and lyricists who craft compelling words and stories for music across all genres.',
      features: [
        "Share your writing portfolio",
        "Collaborate on songwriting projects",
        "Connect with artists and composers"
      ],
      buttonText: 'REGISTER AS LYRICIST'
    }
  ];

  return (
    <GradientBackground>
      {/* Back Button */}
      <BackButton
        onClick={handleBack}
        startIcon={<ArrowBack sx={{ fontSize: 24 }} />}
      >
        <Typography variant="body1" fontWeight="medium">
          Back
        </Typography>
      </BackButton>

      {/* Header */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 10 }}>
        <Typography 
          variant="h3" 
          fontWeight="bold" 
          color="#FFFFFF" 
          mb={4} 
          sx={{ 
            fontSize: { xs: '2.25rem', md: '3rem' },
            textShadow: '0 4px 12px rgba(0,0,0,0.4)'
          }}
        >
          Join MusicSync Platform
        </Typography>
        <Typography 
          variant="h6" 
          color="#737373" 
          sx={{ 
            maxWidth: '42rem', 
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Connect with verified music professionals and streamline your music production
          with our AI-powered platform. Choose how you want to get started.
        </Typography>
      </Container>

      {/* Registration Options */}
      <Container maxWidth="xl" sx={{ mb: 6 }}>
        <Grid container spacing={4} sx={{ mb: 15 }}>
          {/* First row - 3 cards */}
          {cardData.slice(0, 3).map((card) => (
            <Grid item xs={12} md={4} key={card.id}>
              <CategoryCard>
                <DecorativeBackground />
                
                <Box sx={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Icon */}
                  <IconCircle className="icon-circle">
                    <IconCircleGlow className="icon-circle-glow" />
                    <IconWrapper>
                      {card.icon}
                    </IconWrapper>
                  </IconCircle>

                  {/* Title */}
                  <CardTitle variant="h5">
                    {card.title}
                  </CardTitle>
                  
                  {/* Description */}
                  <Typography variant="body2" color="#A0A0A0" mb={3} sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {card.description}
                  </Typography>

                  {/* Features */}
                  <FeatureList>
                    {card.features.map((feature, index) => (
                      <FeatureItem key={index} disableGutters>
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                          <CheckCircle sx={{ fontSize: 20, color: '#EA540C' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ 
                            color: '#FFFFFF', 
                            variant: 'body2',
                            fontSize: '0.9rem'
                          }}
                        />
                      </FeatureItem>
                    ))}
                  </FeatureList>

                  {/* Registration Button */}
                  <RegisterButton
                    onClick={() => handleNavigation(card.path)}
                    variant="contained"
                    disableElevation
                    className="register-button"
                  >
                    {card.buttonText}
                  </RegisterButton>
                </Box>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Second row - 3 cards */}
          {cardData.slice(3, 6).map((card) => (
            <Grid item xs={12} md={4} key={card.id}>
              <CategoryCard>
                <DecorativeBackground />
                
                <Box sx={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%'}}>
                  {/* Icon */}
                  <IconCircle className="icon-circle">
                    <IconCircleGlow className="icon-circle-glow" />
                    <IconWrapper>
                      {card.icon}
                    </IconWrapper>
                  </IconCircle>

                  {/* Title */}
                  <CardTitle variant="h5">
                    {card.title}
                  </CardTitle>
                  
                  {/* Description */}
                  <Typography variant="body2" color="#A0A0A0" mb={3} sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {card.description}
                  </Typography>

                  {/* Features */}
                  <FeatureList>
                    {card.features.map((feature, index) => (
                      <FeatureItem key={index} disableGutters>
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                          <CheckCircle sx={{ fontSize: 20, color: '#EA540C' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ 
                            color: '#FFFFFF', 
                            variant: 'body2',
                            fontSize: '0.9rem'
                          }}
                        />
                      </FeatureItem>
                    ))}
                  </FeatureList>

                  {/* Registration Button */}
                  <RegisterButton
                    onClick={() => handleNavigation(card.path)}
                    variant="contained"
                    disableElevation
                    className="register-button"
                  >
                    {card.buttonText}
                  </RegisterButton>
                </Box>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Already have an account? */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="body1" color="#737373">
          Already have an account?{" "}
          <Link 
            href="/login" 
            sx={{ 
              color: '#EA540C', 
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' } 
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>

      {/* Background Effects */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <BackgroundEffect sx={{ top: -100, right: -100 }} />
        <BackgroundEffect sx={{ bottom: -150, left: -150, animationDelay: '2s' }} />
        <BackgroundEffect sx={{ top: '50%', left: '50%', marginLeft: -250, marginTop: -250, animationDelay: '4s' }} />
      </Box>
    </GradientBackground>
  );
};

export default RegistrationCategory;