import React, { useMemo, useEffect } from 'react';
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

  // Add intersection observer for smooth animations
  useEffect(() => {
    // Create intersection observer with optimized options
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Add animation class when element becomes visible
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px' // Reduced margin for earlier triggering
    });

    // Observe all service cards with improved initial styling
    document.querySelectorAll('.service-card').forEach((card, index) => {
      // Set initial styles directly instead of using CSS animations
      card.style.opacity = '0';
      card.style.transform = 'translateY(15px)';
      card.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
      card.style.transitionDelay = `${index * 70}ms`; // Slightly longer delay between cards
      card.style.willChange = 'opacity, transform'; // Hint to browser for optimization
      
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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

  const firstSectionContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Memoized service rendering to prevent unnecessary re-renders
  const renderServiceCards = (serviceList, isAdditional = false) => (
    <Grid 
      container 
      spacing={isAdditional ? 4 : -5}
      rowSpacing={isAdditional ? 5 : 3}
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
          {isAdditional ? (
            // Optimized additional service cards with proper hover effect
            <div 
              className="service-card"
              style={{ 
                width: '100%', 
                maxWidth: '380px',
              }}
            >
              <Card 
                sx={{
                  position: 'relative',
                  height: '100%',
                  maxHeight: '400px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: 3,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  transform: 'translateZ(100)', // Force GPU acceleration
                }}
                onClick={() => navigate(service.link)}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={service.image}
                  alt={service.title}
                  loading="lazy" 
                  sx={{ 
                    objectFit: 'cover',
                    transform: 'translateZ(0)', // Force GPU acceleration
                    transition: 'filter 0.3s ease',
                    '&:hover': {
                      filter: 'brightness(0.8)'
                    }
                  }}
                />
                {/* Always visible title (but will hide on hover) */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '12px 16px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)',
                    transform: 'translateZ(0)', // Force GPU acceleration
                    transition: 'opacity 0.3s ease', // Add transition for smooth fade
                    opacity: 1, // Visible by default
                    '.MuiCard-root:hover &': {
                      opacity: 0, // Hide on hover
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'white',
                      fontSize: '1.1rem',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {service.title}
                  </Typography>
                </Box>
                
                {/* Description overlay that appears on hover */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '-100%', // Start below the card
                    left: 0,
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(0,0,0,0.8)',
                    transition: 'bottom 0.3s ease',
                    '.MuiCard-root:hover &': {
                      bottom: 0, // Slide up on hover
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'white',
                      mb: 1,
                      fontSize: '1.1rem'
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Card>
            </div>
          ) : (
            // Keep original animation for first section
            <motion.div 
              variants={cardVariants} 
              style={{ 
                width: '100%', 
                maxWidth: '380px',
              }}
              key={service.id}
            >
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
                        backgroundColor: 'rgba(255, 255, 255, 0.34)'
                      }
                    }}
                  >
                    About {service.title.split(' ')[1]} <ArrowForwardIcon sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </Card>
            </motion.div>
          )}
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
          maxWidth: '1440px',
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
          variants={firstSectionContainerVariants}
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
          id="additionalServicesSection"
        >
          Explore More Services ...
        </Typography>
        
        {/* For additional services, we use Intersection Observer for better performance */}
        <Box>
          {renderServiceCards(additionalServices, true)}
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(MusicServices);