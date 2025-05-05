import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Add axios for API requests
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
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'; // Add useNavigate and useLocation

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const ProducerCard = ({ image, producerInfo, onSeeMore }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCardClick = () => {
    onSeeMore(producerInfo);
  };

  // Use the first image from studioImages or a placeholder
  const cardImage = producerInfo.studioImages?.[0] || 'https://via.placeholder.com/400x250?text=No+Image';

  // Truncate studioDescription to 150 characters
  const truncatedDescription = producerInfo.studioDescription?.length > 150
    ? producerInfo.studioDescription.slice(0, 150) + '...'
    : producerInfo.studioDescription || 'No description available.';

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleCardClick();
        }}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: { xs: 1.5, sm: 2 },
          overflow: 'hidden',
          boxShadow: 'none',
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          boxShadow: '0px 10px 30px rgba(0, 102, 255, 0.31)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 20px rgba(0, 120, 255, 0.5)',
            transform: 'translateY(-8px)',
          },
        }}
      >
        <CardMedia
          component="img"
          height={{ xs: 180, sm: 200, md: 240 }}
          image={cardImage}
          alt={producerInfo.studioName}
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            p: { xs: 1.5, sm: 2, md: 3 },
            pb: { xs: 0.5, sm: 1 },
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="#0078FF"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              mb: { xs: 0.25, sm: 0.5 },
              lineHeight: 1.2,
            }}
          >
            {producerInfo.studioName}
          </Typography>
          <Typography
            variant="body2"
            color="#999"
            mb={{ xs: 1, sm: 1.5, md: 2 }}
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
              fontWeight: 500,
            }}
          >
            {producerInfo.city}, {producerInfo.country}
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
              textOverflow: 'ellipsis',
            }}
          >
            {truncatedDescription}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-start',
            px: { xs: 1.5, sm: 2, md: 3 },
            pb: { xs: 1.5, sm: 2 },
            pt: { xs: 0.5, sm: 0.75 },
          }}
        >
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onSeeMore(producerInfo);
            }}
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
              },
            }}
          >
            SEE MORE
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const StudiosPage = () => {
  const theme = useTheme();
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get('http://localhost:5000/api/studio/all')
      .then((res) => {
        if (res.data.success) {
          setStudios(res.data.studios);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching studios:', err);
        setLoading(false);
      });
  }, []);

  const handleSeeMore = (studio) => {
    navigate(`/studio/${studio._id}`);
    window.location.reload();
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0D0D0D' }}>
        <Navbar />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loader />
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0D0D0D' }}>
      <ScrollToTop />
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
          <source src="https://videos.pexels.com/video-files/7086759/7086759-uhd_2732_1440_25fps.mp4" type="video/mp4" />
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
              Top Recording Studios
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
              Capture your sound perfectly ...
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
              component={RouterLink}
              to="/catogary"
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

        {/* Studio Cards */}
        <Grid 
          container 
          spacing={{ xs: 1.5, sm: 2, md: 3, lg: 4 }} 
          sx={{ 
            mb: { xs: 4, sm: 5, md: 6, lg: 10 },
            mx: { xs: -1, sm: -1.5, md: -2 },
            width: { xs: 'calc(100% + 16px)', sm: 'calc(100% + 24px)', md: 'calc(100% + 32px)' }
          }}
        >
          {studios.map((studio) => (
            <ProducerCard 
              key={studio._id} // Use studio._id for a unique key
              image={studio.profileImage} 
              producerInfo={studio}
              onSeeMore={handleSeeMore}
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

export default StudiosPage;