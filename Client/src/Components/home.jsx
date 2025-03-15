import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Link,
  IconButton
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const LandingPage = () => {
  return (
    <Box sx={{ 
      bgcolor: 'black', 
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with copyright */}
      <Box sx={{ 
        bgcolor: '#f2f2f2', 
        color: '#333',
        py: 0.5,
        px: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem'
      }}>
        <Typography variant="caption">
          2024. MERAKIC Entertainment Pvt. Ltd. All Rights Reserved.
        </Typography>
        
        <Box>
          <IconButton size="small" color="inherit" aria-label="facebook">
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit" aria-label="linkedin">
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit" aria-label="instagram">
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit" aria-label="email">
            <EmailIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      {/* Navigation bar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        px: 4,
        py: 2
      }}>
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ letterSpacing: 1 }}>
          HarmoniX
        </Typography>
        
        <Box>
          <Button color="inherit" sx={{ mr: 1, textTransform: 'none' }}>
            Login
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#0288d1',
              '&:hover': {
                bgcolor: '#01579b'
              },
              borderRadius: 5,
              textTransform: 'none'
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      
      {/* Main content */}
      <Box sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
        position: 'relative'
      }}>
        {/* Background blur text elements */}
        <Typography 
          variant="h1" 
          sx={{ 
            position: 'absolute',
            color: 'rgba(255,255,255,0.1)',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            fontWeight: 'bold',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%'
          }}
        >
          MUSIC PRODUCER
        </Typography>
        
        {/* Main heading */}
        <Typography 
          variant="h2" 
          component="h2"
          sx={{ 
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' },
            fontWeight: 'bold',
            mb: 2,
            position: 'relative',
            zIndex: 2
          }}
        >
          MEET YOUR MASTERING ENGINEER !
        </Typography>
        
        {/* Background blur text elements */}
        <Typography 
          variant="h1" 
          sx={{ 
            position: 'absolute',
            color: 'rgba(255,255,255,0.1)',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            fontWeight: 'bold',
            bottom: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%'
          }}
        >
          MIXING ENGINEER
        </Typography>
        
        {/* Description paragraph */}
        <Container maxWidth="md" sx={{ mt: 15 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.8)',
              mb: 5
            }}
          >
            revolutionizing how artists and professionals connect to create music. our website provides a fresh approach to collaboration.
            easily connect with top producers, skilled engineers, talented vocalists, and a variety of other music professionals.
            with multiple facilities available, you can bring your sound to life and produce high-quality tracks that resonate with your audience.
          </Typography>
        </Container>
        
        {/* Services button */}
        <Button 
          variant="outlined" 
          endIcon={<ArrowCircleRightIcon />}
          sx={{ 
            borderColor: 'rgba(255,255,255,0.5)',
            color: 'white',
            borderRadius: 4,
            px: 3,
            py: 1,
            textTransform: 'none',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.05)'
            }
          }}
        >
          Our Services
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;