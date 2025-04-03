import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Container, 
  Grid,
  Paper,
  styled
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://img.freepik.com/free-photo/music-producer-work_23-2151953448.jpg?t=st=1743411502~exp=1743415102~hmac=fa26b1767c2f9a367b86004260ca1b6bf86e1c3ed381c56c552cf2beed7c8f6d&w=900)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(8, 2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '30vh', // Set to 70% of the viewport height
  minHeight: '300px', // Minimum height for small screens
}));

const SignUpButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  borderRadius: '20px',
  padding: theme.spacing(0.5, 2),
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  marginTop: theme.spacing(2),
  textTransform: 'none',
}));

const GetStartedButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '20px',
  padding: theme.spacing(1, 3),
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  textTransform: 'none',
  boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)',
}));

// Enhanced recommendation paper with more highlight
const RecommendationPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  margin: theme.spacing(5, 0),
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(25, 118, 210, 0.4))',
  color: 'white',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  zIndex: 1,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.7)',
  },
}));

const ProducerCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  overflow: 'hidden',
}));

const SeeMoreButton = styled(Button)(({ theme }) => ({
  color: '#1976d2',
  textTransform: 'none',
}));

function App() {
  // Producer data with real images
  const producers = [
    {
      id: 1,
      name: 'Adam Theis',
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1593697972672-b50bb291103f?q=80&w=300&auto=format&fit=crop',
      description: 'A versatile music producer with expertise across multiple genres, including top country music hits. With over 15 years of experience and 30+ recorded hits, he has worked with various artists to craft high-quality productions that stand out in the industry. Available now for studio collaborations.'
    },
    {
      id: 2,
      name: 'Adam Theis',
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1619379179326-c50921dbd933?q=80&w=300&auto=format&fit=crop',
      description: 'A versatile music producer with expertise across multiple genres, including top country music hits. With over 15 years of experience and 30+ recorded hits, he has worked with various artists to craft high-quality productions that stand out in the industry. Available now for studio collaborations.'
    },
    {
      id: 3,
      name: 'Adam Theis',
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=300&auto=format&fit=crop',
      description: 'A versatile music producer with expertise across multiple genres, including top country music hits. With over 15 years of experience and 30+ recorded hits, he has worked with various artists to craft high-quality productions that stand out in the industry. Available now for studio collaborations.'
    },
    {
      id: 4,
      name: 'Adam Theis',
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1588479839125-3689bbbb317d?q=80&w=300&auto=format&fit=crop',
      description: 'A versatile music producer with expertise across multiple genres, including top country music hits. With over 15 years of experience and 30+ recorded hits, he has worked with various artists to craft high-quality productions that stand out in the industry. Available now for studio collaborations.'
    },
    {
      id: 5,
      name: 'Adam Theis',
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1596735502239-5aeaa237e4e9?q=80&w=300&auto=format&fit=crop',
      description: 'A versatile music producer with expertise across multiple genres, including top country music hits. With over 15 years of experience and 30+ recorded hits, he has worked with various artists to craft high-quality productions that stand out in the industry. Available now for studio collaborations.'
    },
    {
      id: 6,
      name: 'Adam Theis',
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1606313564200-e75f1d2c47e7?q=80&w=300&auto=format&fit=crop',
      description: 'A versatile music producer with expertise across multiple genres, including top country music hits. With over 15 years of experience and 30+ recorded hits, he has worked with various artists to craft high-quality productions that stand out in the industry. Available now for studio collaborations.'
    }
  ];

  return (
    <Box sx={{ backgroundColor: 'black', color: 'white' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Top Music Producers
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            For Your Next HIT ...
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '500px', mt: 2 }}>
            Sign up free to browse our artist network & connect!
          </Typography>
          <SignUpButton variant="contained" size="small">
            Sign Up Free
          </SignUpButton>
        </Container>
      </HeroSection>

      {/* Recommendation Section - Even More Compact */}
      <Container maxWidth="lg" sx={{ py: 4 }}> {/* Reduced padding from py: 6 to py: 4 */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px', // Slightly reduced from 24px
            background: 'linear-gradient(135deg, rgba(25,118,210,0.8) 0%, rgba(81,45,168,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.25)', // Reduced shadow
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 2,  // Further reduced from 3
            p: { xs: 2.5, md: 3 },  // Further reduced padding
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)', // Reduced animation
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }
          }}
        >
          {/* Decorative element - smaller size */}
          <Box
            sx={{
              position: 'absolute',
              width: '250px', // Reduced from 300px
              height: '250px', // Reduced from 300px
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
              top: '-80px', // Moved closer (was -100px)
              right: '-80px', // Moved closer (was -100px)
              zIndex: 0
            }}
          />
          
          {/* Content - even more compact */}
          <Box sx={{ zIndex: 1, flex: 1 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: 1.5, // Reduced from 2
                mb: 0.3, // Further decreased from 0.5
                display: 'block',
                fontSize: '0.7rem' // Smaller font size
              }}
            >
              ELEVATE YOUR SOUND
            </Typography>
            <Typography 
              variant="h4" 
              component="h3" 
              fontWeight="bold"
              sx={{ 
                mb: 0.7, // Further decreased from 1
                background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }, // Further reduced font sizes
                lineHeight: 1.2 // Add tighter line height
              }}
            >
              Get Personalized Music Professional Recommendations
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '600px',
                mb: 1, // Further decreased from 2
                lineHeight: 1.3, // Further decreased from 1.4
                fontSize: '0.85rem' // Further reduced from 0.9rem
              }}
            >
              Our AI-powered system matches you with the perfect producer for your unique sound.
            </Typography>
          </Box>
          
          {/* Visual element - even smaller size */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              position: 'relative',
              minWidth: '120px', // Further decreased from 150px
              height: '120px', // Further decreased from 150px
              zIndex: 1
            }}
          >
            <Box
              sx={{
                width: '120px', // Further decreased from 150px
                height: '120px', // Further decreased from 150px
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)', // Reduced shadow
                animation: 'pulse 3s infinite'
              }}
            >
              <Box
                sx={{
                  width: '80px', // Further decreased from 100px
                  height: '80px', // Further decreased from 100px
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #1976d2, #512da8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography 
                  variant="body1" // Changed from h6 to body1
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '0.9rem' // Specified smaller font size
                  }}
                >
                  START
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Producer Cards */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {producers.map((producer) => (
            <Grid item xs={12} sm={6} md={4} key={producer.id}>
              <ProducerCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={producer.image}
                  alt={producer.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {producer.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {producer.location}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {producer.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <SeeMoreButton size="small">SEE MORE</SeeMoreButton>
                </CardActions>
              </ProducerCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;