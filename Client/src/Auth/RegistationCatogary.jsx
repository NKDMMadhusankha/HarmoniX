import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  People,
  MusicNote,
  CheckCircle
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
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #000000, #0F1824)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
}));

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  left: theme.spacing(4),
  color: '#737373',
  '&:hover': {
    color: '#0B62F8',
    background: 'transparent',
  },
  transition: 'color 0.3s',
  zIndex: 20,
}));

const CategoryCard = styled(Paper)(({ theme, animate }) => ({
  background: 'rgba(18, 30, 43, 0.8)',
  padding: theme.spacing(3, 3, 4, 3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  borderRadius: theme.spacing(1.5),
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(40, 40, 40, 0.8)',
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
      transform: 'scale(1.05)',
      backgroundColor: 'rgb(11, 98, 248)',
    },
    '& .icon-circle-glow': {
      opacity: 0.8,
    },
  },
}));

const IconCircle = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  [theme.breakpoints.up('sm')]: {
    width: 70,
    height: 70,
  },
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
  marginBottom: theme.spacing(3),
  flexGrow: 1,
  padding: 0,
  overflow: 'visible',
}));

const FeatureItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  background: 'black',
  color: 'white',
  padding: '12px 24px',
  [theme.breakpoints.up('sm')]: {
    padding: '14px 32px',
  },
  borderRadius: '9999px',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  width: '100%',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: '#0B62F8',
    boxShadow: '0 6px 20px rgba(11, 98, 248, 0.5)',
  },
  textTransform: 'uppercase',
  fontSize: '0.875rem',
  letterSpacing: '0.5px',
}));

const BackgroundEffect = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '300px',
  height: '300px',
  [theme.breakpoints.up('md')]: {
    width: '500px',
    height: '500px',
  },
  background: 'radial-gradient(circle, rgba(15, 55, 84, 0.6), rgba(0, 0, 0, 0))',
  borderRadius: '50%',
  filter: 'blur(80px)',
  opacity: 0.4,
  animation: 'float 12s infinite ease-in-out',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) scale(1)',
    },
    '50%': {
      transform: 'translateY(-50px) scale(1.1)',
    },
  },
}));

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
  padding: theme.spacing(3, 0, 2, 0), // Reduced padding here
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 0), // Reduced padding for larger screens
  },
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
  padding: theme.spacing(0, 2),
}));

const SignInLink = styled(Link)(({ theme }) => ({
  color: '#4A89DC',
  fontWeight: 600,
  textDecoration: 'none',
  '&:hover': { 
    textDecoration: 'underline',
  },
}));

const RegistrationCategory = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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

  // Card data
  const cardData = [
    {
      id: 'client',
      path: '/register',
      icon: <People sx={{ fontSize: 28, color: 'white' }} />,
      title: 'Client',
      description: 'Perfect for artists, labels, and clients looking to find reliable music professionals and manage recording projects.',
      features: [
        "Connect with verified music professionals",
        "Manage multiple recording projects",
        "Track project progress in real-time",
        "Access top talent across all music roles",
        "Streamline your music production workflow"
      ],
      buttonText: 'Register as Client'
    },
    {
      id: 'musician',
      path: '/musician/register',
      icon: <MusicNote sx={{ fontSize: 28, color: 'white' }} />,
      title: 'Musician',
      description: 'Sign up as a producer, engineer, or session musician and start connecting with clients today.',
      features: [
        "Create a professional profile to showcase your skills",
        "Receive custom project offers based on your expertise",
        "Build your reputation with verified reviews and ratings",
        "Collaborate with artists and industry professionals",
        "Access specialized tools and opportunities for growth"
      ],
      buttonText: 'Register as Musician'
    }
  ];

  return (
    <GradientBackground>
      {/* Back Button */}
      <Box sx={{ width: '100%', pt: 2, pl: 2 }}>
        <Button
          onClick={handleBack}
          startIcon={<ArrowBack sx={{ fontSize: 20 }} />}
          sx={{ 
            color: '#737373',
            textTransform: 'uppercase',
            position: 'static',
            justifyContent: 'flex-start',
            pl: 1
          }}
        >
          Back
        </Button>
      </Box>

      {/* Header - MOVED HIGHER */}
      <Container maxWidth="md" sx={{ 
        textAlign: 'center', 
        mb: { xs: 3, sm: 4, md: 4 }, // Reduced bottom margin
        mt: { xs: 0, sm: 0, md: 0 }, // Reduced top margin to move header up
        overflow: 'visible' 
      }}>
        <HeaderText 
          variant={isMobile ? "h4" : "h3"} 
          animate={animate}
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
            mb: 1
          }}
        >
          Join HarmoniX – Connect & Create
        </HeaderText>
        <SubHeaderText 
          variant="body1" 
          animate={animate}
          sx={{ 
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mb: 1, // Reduced margin
            color: '#888888'
          }}
        >
          Find verified music professionals and streamline your production with HarmoniX. Let AI match you with the right talent. Get started now.
        </SubHeaderText>
      </Container>

      {/* Registration Options */}
      <Container maxWidth="lg" sx={{ mb: { xs: 2, md: 3 }, overflow: 'visible', px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 10, sm: 10, md: 6 }} sx={{ overflow: 'visible' }}>
          {cardData.map((card, index) => (
            <Grid item xs={12} md={6} key={card.id} sx={{ overflow: 'visible' }}>
              <CategoryCard animate={animate} style={{ transitionDelay: `${0.1 + index * 0.1}s` }}>
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
                  <Typography 
                    variant="body2" 
                    color="#A0A0A0" 
                    mb={2} 
                    sx={{ 
                      fontSize: '0.85rem', 
                      lineHeight: 1.6 
                    }}
                  >
                    {card.description}
                  </Typography>

                  {/* Features */}
                  <FeatureList>
                    {card.features.map((feature, index) => (
                      <FeatureItem key={index} disableGutters>
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                          <CheckCircle sx={{ fontSize: 18, color: '#0B62F8' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ 
                            color: '#FFFFFF', 
                            variant: 'body2',
                            fontSize: '0.85rem'
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
                    sx={{ mt: 'auto' }}
                  >
                    {card.buttonText}
                  </RegisterButton>
                </Box>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Already have an account? - MOVED FURTHER DOWN */}
      <Box sx={{ 
        mt: { xs: 10, sm: 10, md: 10 }, // Increased top margin to move it down further from cards
        mb: { xs: 6, sm: 8, md: 10 }, // Increased bottom margin for additional space at the bottom
        textAlign: 'center', 
        opacity: animate ? 1 : 0, 
        transform: animate ? 'translateY(0)' : 'translateY(20px)', 
        transition: 'opacity 0.8s, transform 0.8s', 
        transitionDelay: '0.7s',
        zIndex: 10,
        position: 'relative'
      }}>
        <Typography variant="body2" color="#737373">
          Already have an account ? <SignInLink href="/login">Sign in</SignInLink>
        </Typography>
      </Box>

      {/* Background Effects */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <BackgroundEffect 
          sx={{ 
            top: { xs: -50, md: -100 }, 
            right: { xs: -50, md: -100 }, 
            opacity: animate ? 0.7 : 0, 
            transition: 'opacity 1.2s' 
          }} 
        />
        <BackgroundEffect 
          sx={{ 
            bottom: { xs: -75, md: -150 }, 
            left: { xs: -75, md: -150 }, 
            animationDelay: '2s', 
            opacity: animate ? 0.7 : 0, 
            transition: 'opacity 1.2s', 
            transitionDelay: '0.3s' 
          }} 
        />
      </Box>
    </GradientBackground>
  );
};

export default RegistrationCategory;