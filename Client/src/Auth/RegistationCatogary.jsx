import React, { useState, useEffect } from 'react';
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
    color: '#0B62F8',
    background: 'transparent',
  },
  transition: 'color 0.3s',
}));

const CategoryCard = styled(Paper)(({ theme, animate }) => ({
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
  transition: 'transform 0.3s, border-color 0.3s, opacity 0.8s, transform 0.8s',
  opacity: animate ? 1 : 0,
  transform: animate ? 'translateY(0)' : 'translateY(40px)',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: 'rgb(58, 58, 58)',
    '& .icon-circle': {
      transform: 'scale(1.0)',
      backgroundColor: 'rgb(11, 98, 248)',
    },
    '& .icon-circle-glow': {
      opacity: 0.8,
    },
    '& .register-button': {
      backgroundColor: 'black',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 20px rgb(0, 0, 0)',
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
  backgroundColor: 'rgb(11, 98, 248)',
  marginBottom: theme.spacing(2),
  position: 'relative',
  transition: 'all 0.3s ease',
}));

const IconCircleGlow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: 'rgb(11, 98, 248)',
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
  background: 'black',
  color: 'white',
  padding: '12px 32px',
  borderRadius: '9999px',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  width: '100%',
  boxShadow: '0 4px 15px rgba(11, 98, 248, 0.3)',
  '&:hover': {
    background: '#0B62F8',
    boxShadow: '0 6px 20px rgba(11, 98, 248, 0.5)',
  },
}));

const DecorativeBackground = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom right,rgba(15, 55, 84, 0.47), black)',
  zIndex: 0,
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, #0F3754, rgba(0, 0, 0, 0))',
    borderRadius: '0 0 16px 16px',
  }
});

const BackgroundEffect = styled(Box)({
  position: 'absolute',
  width: '500px',
  height: '500px',
  background: 'radial-gradient(circle,#0F3754, rgba(0, 0, 0, 0))',
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
    background: 'rgb(11, 98, 248)',
    borderRadius: 4,
  }
}));

const HeaderText = styled(Typography)(({ theme, animate }) => ({
  fontWeight: 'bold',
  color: '#FFFFFF',
  textShadow: '0 4px 12px rgba(0,0,0,0.4)',
  opacity: animate ? 1 : 0,
  transform: animate ? 'translateY(0)' : 'translateY(-30px)',
  transition: 'opacity 0.8s, transform 0.8s',
}));

const SubHeaderText = styled(Typography)(({ theme, animate }) => ({
  color: '#737373',
  maxWidth: '42rem',
  margin: '0 auto',
  lineHeight: 1.6,
  opacity: animate ? 1 : 0,
  transform: animate ? 'translateY(0)' : 'translateY(30px)',
  transition: 'opacity 0.8s, transform 0.8s',
  transitionDelay: '0.2s',
}));

const RegistrationCategory = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations when component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
      icon: <People sx={{ fontSize: 36, color: 'white' }} />,
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
      icon: <MusicNote sx={{ fontSize: 36, color: 'white' }} />,
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
      icon: <Equalizer sx={{ fontSize: 36, color: 'white' }} />,
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
      icon: <GraphicEq sx={{ fontSize: 36, color: 'white' }} />,
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
      icon: <Mic sx={{ fontSize: 36, color: 'white' }} />,
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
      icon: <Edit sx={{ fontSize: 36, color: 'white' }} />,
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
        <HeaderText 
          variant="h3" 
          animate={animate}
          mb={4} 
          sx={{
            py: 5, 
            fontSize: { xs: '2.25rem', md: '3rem' },
          }}
        >
          Join MusicSync Platform
        </HeaderText>
        <SubHeaderText 
          variant="h6" 
          animate={animate}
        >
          Connect with verified music professionals and streamline your music production
          with our AI-powered platform. Choose how you want to get started.
        </SubHeaderText>
      </Container>

      {/* Registration Options */}
      <Container maxWidth="xl" sx={{ mb: 6 }}>
        <Grid container spacing={4} sx={{ mb: 15 }}>
          {/* First row - 3 cards */}
          {cardData.slice(0, 3).map((card, index) => (
            <Grid item xs={12} md={4} key={card.id}>
              <CategoryCard animate={animate} style={{ transitionDelay: `${0.1 + index * 0.1}s` }}>
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
                          <CheckCircle sx={{ fontSize: 20, color: '#0B62F8' }} />
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
          {cardData.slice(3, 6).map((card, index) => (
            <Grid item xs={12} md={4} key={card.id}>
              <CategoryCard animate={animate} style={{ transitionDelay: `${0.4 + index * 0.1}s` }}>
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
                          <CheckCircle sx={{ fontSize: 20, color: '#0B62F8' }} />
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
      <Box sx={{ mt: 8, textAlign: 'center', opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s, transform 0.8s', transitionDelay: '0.7s' }}>
        <Typography variant="body1" color="#737373">
          Already have an account?{" "}
          <Link 
            href="/login" 
            sx={{ 
              color: '#1976d2', 
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
        <BackgroundEffect sx={{ top: -100, right: -100, opacity: animate ? 0.7 : 0, transition: 'opacity 1.2s' }} />
        <BackgroundEffect sx={{ bottom: -150, left: -150, animationDelay: '2s', opacity: animate ? 0.7 : 0, transition: 'opacity 1.2s', transitionDelay: '0.3s' }} />
        <BackgroundEffect sx={{ top: '50%', left: '50%', marginLeft: -250, marginTop: -250, animationDelay: '4s', opacity: animate ? 0.7 : 0, transition: 'opacity 1.2s', transitionDelay: '0.6s' }} />
      </Box>
    </GradientBackground>
  );
};

export default RegistrationCategory;