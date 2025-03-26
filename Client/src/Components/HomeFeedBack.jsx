import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Avatar,
  Grid
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import local images
import pro1 from '../assets/pro1.jpg';
import pro2 from '../assets/pro2.jpg';
import pro3 from '../assets/pro3.jpg';
import pro4 from '../assets/pro4.jpg';
import pro5 from '../assets/pro4.jpg';
import pro6 from '../assets/pro4.jpg';

const testimonials = [
  {
    name: 'MICHAEL TURNER',
    position: 'Product Manager at CloudDyne',
    quote: "Partnering with organization was one of the best decisions we've made for our success.",
    image: pro1
  },
  {
    name: 'EMILY ROGERS',
    position: 'Owner of StyleBoutique',
    quote: "Our online store's sales have skyrocketed after working with them.",
    image: pro2
  },
  {
    name: 'SARAH JOHNSON',
    position: 'Marketing Director',
    quote: "An incredible platform that transformed our business approach.",
    image: pro3
  },
  {
    name: 'DAVID LEE',
    position: 'Startup Founder',
    quote: "Their innovative solution has been a game-changer for our team.",
    image: pro4
  },
  {
    name: 'ALEX WONG',
    position: 'Tech Innovator',
    quote: "Seamless integration and outstanding user experience.",
    image: pro5
  },
  {
    name: 'JESSICA MILLER',
    position: 'Creative Director',
    quote: "Exceeded all our expectations with their cutting-edge design.",
    image: pro6
  }
];

const CompactTestimonialCard = ({ testimonial }) => (
  <Card 
    sx={{ 
      height: '100%',
      backgroundColor: 'white',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      boxShadow: 2,
      borderRadius: 2,
      transition: 'transform 0.3s ease',
    }}
  >
    <Avatar
      alt={testimonial.name}
      src={testimonial.image}
      sx={{ 
        width: 80, 
        height: 80, 
        mt: 2,
        border: '3px solid #007bff' 
      }}
    />

    <CardContent sx={{ 
      p: 1.5, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      flexGrow: 1,
      width: '100%'
    }}>
      <FormatQuoteIcon 
        sx={{ 
          color: '#007bff', 
          fontSize: 24,
          mb: 1,
          opacity: 0.5
        }} 
      />
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          fontStyle: 'italic', 
          mb: 1,
          textAlign: 'center',
          height: 60,
          overflow: 'hidden'
        }}
      >
        {testimonial.quote}
      </Typography>
      <Box>
        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>
          {testimonial.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {testimonial.position}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const ClientTestimonials = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#F2F5FE', 
        py: 6,
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          sx={{ mb: 4 , fontWeight: 700, fontFamily: 'initial' }}
        >
          What Our Client Say !
        </Typography>

        <Box 
          sx={{ 
            position: 'relative',
            pb: 6,
            '& .swiper-pagination': {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '& .swiper-pagination-bullet': {
                backgroundColor: '#007bff',
                opacity: 0.5,
                margin: '0 5px',
                '&-active': {
                  opacity: 1,
                  width: '20px',
                  borderRadius: '10px'
                }
              }
            },
            '& .swiper-button-prev, & .swiper-button-next': {
              color: '#007bff !important',
              backgroundColor: 'rgba(0,123,255,0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              '&.swiper-button-prev': {
                left: '-50px'
              },
              '&.swiper-button-next': {
                right: '-50px'
              },
              '&:after': {
                fontSize: '20px',
                fontWeight: 'bold'
              }
            }
          }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true, type: 'bullets' }}
            style={{ paddingBottom: '50px' }}
          >
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
              <SwiperSlide key={index}>
                <Grid container spacing={5} justifyContent="center">
                  {testimonials.slice(index * 2, index * 2 + 2).map((testimonial, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <CompactTestimonialCard testimonial={testimonial} />
                    </Grid>
                  ))}
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default ClientTestimonials;
