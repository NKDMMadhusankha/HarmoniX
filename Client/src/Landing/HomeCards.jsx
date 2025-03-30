import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Container, 
  Grid,
  CardMedia,
  CssBaseline
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Import images
import VocalRecordingImg from '../assets/card1.jpg';
import StudioBookingImg from '../assets/card2.jpg';
import MusicVideoImg from '../assets/card3.jpg';
import PerformanceCoachingImg from '../assets/card4.jpg';
import MusicDistributionImg from '../assets/card5.jpg';
import ArtistBrandingImg from '../assets/card6.jpg';

const MusicServices = () => {
  const navigate = useNavigate();

  const services = useMemo(() => [
    {
      id: 1,
      title: 'Music Producing',
      description: 'Collaborate with top music producers to bring your unique sound to life. Our platform connects you with professionals who understand your vision and can craft the perfect track.',
      link: '/about-producing'
    },
    {
      id: 2,
      title: 'Audio Mixing',
      description: 'Elevate your music with expert mixing services that enhance clarity and balance. Our skilled engineers ensure your tracks sound their best on any platform.',
      link: '/about-mixing'
    },
    {
      id: 3,
      title: 'Audio Mastering',
      description: 'Achieve a polished final product with our professional mastering services tailored to your specific needs. Ensure your music is ready for release.',
      link: '/about-mastering'
    }
  ], []);

  const additionalServices = useMemo(() => [
    {
      id: 1,
      title: 'Music Producers',
      description: 'Hire and work with top producers ready to turn your song or idea into a hit track.',
      image: VocalRecordingImg,
      link: '/vocal-recording'
    },
    {
      id: 2,
      title: 'Mixing Engineers',
      description: 'Hire hit-making mixing engineers that will transform your recorded tracks into release-ready songs',
      image: StudioBookingImg,
      link: '/studio-booking'
    },
    {
      id: 3,
      title: 'Mastering Engineers',
      description: 'Award-winning mastering engineers in every price and genre for hire',
      image: MusicVideoImg,
      link: '/music-video'
    },
    {
      id: 4,
      title: 'Singers & Vocalists',
      description: 'Discover hundreds of the industry\'s top singers and vocalists for hire in every genre',
      image: PerformanceCoachingImg,
      link: '/performance-coaching'
    },
    {
      id: 5,
      title: 'Recording Studios',
      description: 'Find professional studios with the equipment and environment to capture your sound, ensuring high-quality recordings that meet your creative needs.',
      image: MusicDistributionImg,
      link: '/music-distribution'
    },
    {
      id: 6,
      title: 'Lyricists',
      description: 'Hire professionals who specialize in writing lyrics across various genres, ensuring your song tells a compelling story.',
      image: ArtistBrandingImg,
      link: '/artist-branding'
    }
  ], []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Memoized service rendering to prevent unnecessary re-renders
  const renderServiceCards = (serviceList, isAdditional = false) => (
    <Grid 
      container 
      spacing={-5}
      rowSpacing={isAdditional ? 5 : 3} // Add row spacing specifically for additional services
      justifyContent="center" 
      alignItems="stretch"
      sx={{ mb: isAdditional ? 0 : 10 }}
    >
      {serviceList.map((service, index) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={isAdditional ? 4 : 4} 
          key={service.id} 
          sx={{ 
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <motion.div 
            variants={cardVariants} 
            style={{ 
              width: '100%', 
              maxWidth: '380px' // Limit max width of cards
            }}
            key={service.id}
          >
            {isAdditional ? (
              <Card 
                sx={{
                  position: 'relative',
                  height: '100%',
                  maxHeight: '400px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: 3,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    '& .overlay': {
                      opacity: 1,
                    },
                    '& .card-image': {
                      transform: 'scale(1.1)',
                      filter: 'brightness(0.5)',
                    }
                  }
                }}
                onClick={() => navigate(service.link)}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={service.image}
                  alt={service.title}
                  className="card-image"
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 2,
                    color: 'white',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 1 
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.8)',
                      mb: 2 
                    }}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Card>
            ) : (
              <Card 
                sx={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  transition: '0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 12px 20px rgba(255,255,255,0.1)'
                  }
                }}
              >
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 3
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="div" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 'bold', 
                      textAlign: 'center',
                      color: 'white'
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      flexGrow: 1,
                      textAlign: 'center'
                    }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
                <Box sx={{ 
                  p: 2, 
                  borderTop: '1px solid rgba(255,255,255,0.1)', 
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Button 
                    component={Link} 
                    to={service.link} 
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      border: '1px solid rgba(255,255,255,0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    About {service.title.split(' ')[1]} <ArrowForwardIcon sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </Card>
            )}
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box 
      sx={{ 
        backgroundColor: 'black',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <CssBaseline />
      <Container 
        maxWidth={false}
        sx={{ 
          maxWidth: '1440px', // Reduced max width
          px: { xs: 2, sm: 3, md: 4 }, 
          py: 10,
          margin: '0 auto' 
        }}
      >
        {/* First Services Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {renderServiceCards(services)}
        </motion.div>

        {/* Additional Services Section */}
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            color: 'white', 
            mb: 6, 
            fontWeight: 'bold',
            fontFamily: '"Saira", sans-serif',
            textAlign: 'center'
          }}
        >
          Explore More Services ...
        </Typography>
        <motion.div
         initial='hidden'
         whileInView="visible"
         viewport={{ once: true, amount: 0.1 }}
         variants={containerVariants}
       >
          {renderServiceCards(additionalServices, true)}
        </motion.div>
      </Container>
    </Box>
  );
};

export default React.memo(MusicServices);