import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader';

// Banner image
import bannerImage from '../assets/MpBanner.png';

// Card images
import card7 from '../assets/card7.jpg';
import card8 from '../assets/card8.jpg';
import card9 from '../assets/card9.jpg';
import card10 from '../assets/card10.jpg';
import card11 from '../assets/card11.jpg';
import card12 from '../assets/card11.jpg';

// Producer data with unique details for each card
const producerData = [
  {
    name: "Adam Theis",
    location: "Oakland, CA",
    description: "A versatile music producer with expertise across multiple genres, specializing in country music. With a keen ear for authentic sound and rich instrumentation, he has worked with various artists to craft high-quality productions that bring songs to life. Whether it's a classic country ballad or a modern crossover hit, he delivers exceptional music that resonates."
  },
  {
    name: "Michael Rodriguez",
    location: "Nashville, TN",
    description: "An award-winning producer known for his innovative approach to contemporary music production. With over 15 years of experience working with both established and emerging artists, Michael brings a unique perspective to every project, balancing technical precision with creative vision."
  },
  {
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    description: "A boundary-pushing producer specializing in electronic and pop music. Her distinctive production style combines analog warmth with cutting-edge digital techniques. Artists seek her out for her ability to create immersive sonic landscapes that connect with audiences."
  },
  {
    name: "Daniel Kim",
    location: "Seattle, WA",
    description: "A multi-instrumentalist and producer with a background in classical composition. Daniel's productions are known for their intricate arrangements and emotional depth. His methodical approach ensures every element in the mix serves the song's core message."
  },
  {
    name: "Leila Martinez",
    location: "Miami, FL",
    description: "A dynamic producer with expertise in Latin, R&B, and hip-hop genres. Having worked with Grammy-winning artists, Leila brings both technical excellence and cultural authenticity to her productions. Her rhythmic sensibility sets her work apart."
  },
  {
    name: "James Wilson",
    location: "Austin, TX",
    description: "An experienced producer specializing in indie rock and alternative genres. With a focus on capturing authentic performances, James creates productions that maintain the energy and character of live music while achieving studio-quality sound. His collaborative approach puts artists at ease."
  }
];

const ProducerCard = ({ image, producerInfo, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 'none',
        backgroundColor: '#FFFFFF',
        '&:hover': {
          boxShadow: '0px 4px 20px rgba(0, 120, 255, 0.5)',
          transform: 'scale(1.02)',
          transition: 'transform 0.4s ease-in-out',
        }
      }}>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={producerInfo.name}
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          pb: 1,
        }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div" 
            color="#0078FF" 
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              mb: 0.5
            }}
          >
            {producerInfo.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="#999" 
            mb={2}
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            {producerInfo.location}
          </Typography>
          <Typography 
            variant="body2" 
            color="black"
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: 1.5
            }}
          >
            {producerInfo.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ 
          justifyContent: 'flex-start', 
          px: { xs: 2, sm: 3 },
          pb: 2, 
          pt: 0
        }}>
          <Button 
            size="small" 
            sx={{ 
              color: '#0078FF',
              fontWeight: 'bold',
              p: 0,
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              }
            }}
          >
            SEE MORE
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const MusicProducersPage = () => {
  const theme = useTheme();
  const cardImages = [card7, card8, card9, card10, card11, card12];
  const [loading, setLoading] = useState(true);
  
  // Media queries for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading time - replace with your actual data fetching if needed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Show loader for 1.5 seconds
    
    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  // Show loader while loading
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0D0D0D' }}>
        <Navbar />
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <Loader />
        </Box>
        <Footer />
      </Box>
    );
  }

  // Show actual content when loading is complete
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0D0D0D' }}>
      <Navbar />
      
      {/* Banner Section - Modified with brightness control and responsive adjustments */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '400px', sm: '550px', md: '720px' },
          display: 'flex',
          alignItems: 'center',
          mb: { xs: 3, sm: 4, md: 6 },
        }}
      >
        {/* Darkened background image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }
          }}
        />
        
        <Container
          maxWidth={false}
          sx={{
            position: 'relative',
            zIndex: 1,
            pl: { xs: 3, sm: 4, md: 6, lg: '8%', xl: '12%' }, // Adjusted left padding for all screen sizes
            pr: { xs: 3, sm: 4, md: 6 },
            maxWidth: '100%' // Full width container
          }}
        >
          <Box 
            sx={{ 
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: { xs: '100%', sm: '90%', md: '80%', lg: '70%' }
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: theme.palette.common.white,
                fontWeight: 'bold',
                mb: 1,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.1rem' },
              }}
            >
              Top Music Producers
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                color: theme.palette.common.white,
                mb: 2,
                fontStyle: 'italic',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              For Your Next HIT ...
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.common.white,
                mb: 3,
                fontStyle: 'Roboto Mono, monospace',
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              Sign up free to browse our artist network & connect
            </Typography>
            <Button
              variant="contained"
              sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.5 },
                borderRadius: 2,
                fontWeight: 'bold',
                backgroundColor: '#0078FF',
                color: 'white',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: '#0056b3',
                }
              }}
            >
              SIGN UP FREE
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Recommendation Section - Responsive adjustments */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 4, sm: 5, md: 6 },
            borderRadius: { xs: 3, md: 4 },
            overflow: 'hidden',
            backgroundColor: 'transparent',
            border: '1px solid #136AA8',
            width: '100%'
          }}
        >
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'medium',
              color: 'white',
              pl: { xs: 2, sm: 3, md: 4 },
              pr: { xs: 2, sm: 3, md: 0 },
              py: 2,
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
              width: { xs: '100%', md: 'auto' },
            }}
          >
            Get Personalized Music Professional Recommendations
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: { xs: '100%', md: 'auto' },
              height: { xs: 'auto', md: '100%' },
              borderRadius: { 
                xs: '0', 
                md: '0' 
              },
              px: { xs: 3, md: 8 },
              py: 2.5,
              borderRadius: '0px 10px 10px 40px',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 'bold',
              backgroundColor: 'white',
              color: 'black',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s, color 0.4s',
              '&:hover': {
                backgroundColor: '#136AA8',
                color: 'white',
              }
            }}
          >
            GET STARTED
          </Button>
        </Box>

        {/* Producer Cards - Both Rows in a single Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 5, md: 10 } }}>
          {cardImages.map((image, index) => (
            <ProducerCard 
              key={index} 
              image={image} 
              producerInfo={producerData[index]}
              index={index} 
            />
          ))}
        </Grid>
      </Container>

      <Box sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default MusicProducersPage;