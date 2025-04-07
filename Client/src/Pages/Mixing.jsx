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
        borderRadius: { xs: 1.5, sm: 2 },
        overflow: 'hidden',
        boxShadow: 'none',
        backgroundColor: '#FFFFFF',
        // border: '1px solid white',
        boxShadow: '0px 10px 30px rgba(0, 102, 255, 0.31)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 4px 20px rgba(0, 120, 255, 0.5)',
          transform: 'translateY(-8px)',
        }
      }}>
        <CardMedia
          component="img"
          height={{ xs: 180, sm: 200, md: 240 }}
          image={image}
          alt={producerInfo.name}
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ 
          flexGrow: 1, 
          p: { xs: 1.5, sm: 2, md: 3 },
          pb: { xs: 0.5, sm: 1 },
        }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div" 
            color="#0078FF" 
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              mb: { xs: 0.25, sm: 0.5 },
              lineHeight: 1.2
            }}
          >
            {producerInfo.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="#999" 
            mb={{ xs: 1, sm: 1.5, md: 2 }}
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              fontWeight: 500
            }}
          >
            {producerInfo.location}
          </Typography>
          <Typography 
            variant="body2" 
            color="black"
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: { xs: 4, sm: 5, md: 6 },
              textOverflow: 'ellipsis'
            }}
          >
            {producerInfo.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ 
          justifyContent: 'flex-start', 
          px: { xs: 1.5, sm: 2, md: 3 },
          pb: { xs: 1.5, sm: 2 }, 
          pt: { xs: 0.5, sm: 0.75 }
        }}>
          <Button 
            size="small" 
            sx={{ 
              color: '#0078FF',
              fontWeight: 'bold',
              p: 0,
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
                color: '#0056b3',
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
      
      {/* Banner Section with Video Background */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '300px', sm: '400px', md: '550px', lg: '720px' },
          display: 'flex',
          alignItems: 'center',
          mb: { xs: 2, sm: 3, md: 4, lg: 6 },
          overflow: 'hidden'
        }}
      >
        {/* Video Background */}
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }}
        >
          <source src="https://videos.pexels.com/video-files/4985377/4985377-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </Box>
        
        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1
          }}
        />
        
        <Container
          maxWidth={false}
          sx={{
            position: 'relative',
            zIndex: 2,
            pl: { xs: 2, sm: 3, md: 5, lg: '8%', xl: '12%' },
            pr: { xs: 2, sm: 3, md: 5 },
            maxWidth: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box 
            sx={{ 
              textAlign: { xs: 'center', sm: 'left' },
              maxWidth: { xs: '100%', sm: '85%', md: '75%', lg: '65%' }
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: theme.palette.common.white,
                fontWeight: 'bold',
                mb: { xs: 0.5, sm: 1 },
                fontSize: { xs: '2rem', sm: '2.9rem', md: '3.5rem', lg: '4.5rem', xl: '6.1rem' },
                lineHeight: { xs: 1.1, sm: 1.1, md: 1.2 },
                textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
                whiteSpace: 'nowrap',
              }}
            >
              Top Mixing Engineers
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                color: theme.palette.common.white,
                mb: { xs: 1, sm: 1.5, md: 2 },
                fontStyle: 'italic',
                fontWeight: '700',
                fontSize: { xs: '1.2rem', sm: '2rem', md: '2rem', lg: '3.5rem' },
                textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              For Your Next HIT ...
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: { xs: 2, sm: 2.5, md: 3 },
                fontSize: { xs: '0.8rem', sm: '1rem', md: '1.3rem' },
                maxWidth: { xs: '100%', md: '80%', lg: '70%', xl: '70%' },
                mx: { xs: 'auto', sm: 0 }
              }}
            >
              Sign up free to browse our artist network & connect
            </Typography>
            <Button
              variant="contained"
              sx={{
                px: { xs: 2, sm: 2.5, md: 3 },
                py: { xs: 1, sm: 1.2, md: 1.5 },
                borderRadius: { xs: 1, sm: 1.5, md: 2 },
                fontWeight: 'bold',
                backgroundColor: '#0078FF',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
                '&:hover': {
                  backgroundColor: '#0056b3',
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
            >
              SIGN UP FREE
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Recommendation Section */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          px: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 3, sm: 4, md: 5, lg: 6 },
            borderRadius: { xs: 2, sm: 3, md: 4 },
            overflow: 'hidden',
            border: '3px solid #136AA8',
            width: '100%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}
        >
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'medium',
              color: 'white',
              pl: { xs: 2, sm: 3, md: 4 },
              pr: { xs: 2, sm: 2, md: 0 },
              py: { xs: 1.5, sm: 2 },
              textAlign: { xs: 'center', sm: 'left' },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem', lg: '1.5rem' },
              width: { xs: '100%', sm: 'auto' },
              whiteSpace: { sm: 'nowrap' },
              lineHeight: 1.3
            }}
          >
            Get Personalized Music Professional Recommendations
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              height: { xs: 'auto', sm: '100%' },
              borderRadius: { xs: '0', sm: '0px 10px 10px 40px' },
              px: { xs: 2, sm: 3, md: 4, lg: 8 },
              py: { xs: 1.5, sm: 2, md: 2.5 },
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem', lg: '1.1rem' },
              fontWeight: 'bold',
              backgroundColor: 'white',
              color: 'black',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              letterSpacing: { xs: 0.5, md: 1 },
              '&:hover': {
                backgroundColor: '#136AA8',
                color: 'white',
                transform: 'translateX(20px)'
              }
            }}
          >
            GET STARTED
          </Button>
        </Box>

        {/* Producer Cards */}
        <Grid 
          container 
          spacing={{ xs: 1.5, sm: 2, md: 3, lg: 4 }} 
          sx={{ 
            mb: { xs: 4, sm: 5, md: 6, lg: 10 },
            mx: { xs: -1, sm: -1.5, md: -2 },
            width: { xs: 'calc(100% + 16px)', sm: 'calc(100% + 24px)', md: 'calc(100% + 32px)' }
          }}
        >
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