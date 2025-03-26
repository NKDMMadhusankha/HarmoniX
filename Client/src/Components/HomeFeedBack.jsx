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
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import pro1 from '../assets/pro1.jpg';
import pro2 from '../assets/pro2.jpg';
import pro3 from '../assets/pro3.jpg';
import pro4 from '../assets/pro4.jpg';
import pro5 from '../assets/pro4.jpg';
import pro6 from '../assets/pro4.jpg';

const testimonials = [
  { name: 'MICHAEL TURNER', position: 'Product Manager at CloudDyne', quote: "Partnering with organization was one of the best decisions we've made for our success.", image: pro1 },
  { name: 'EMILY ROGERS', position: 'Owner of StyleBoutique', quote: "Our online store's sales have skyrocketed after working with them.", image: pro2 },
  { name: 'SARAH JOHNSON', position: 'Marketing Director', quote: "An incredible platform that transformed our business approach.", image: pro3 },
  { name: 'DAVID LEE', position: 'Startup Founder', quote: "Their innovative solution has been a game-changer for our team.", image: pro4 },
  { name: 'ALEX WONG', position: 'Tech Innovator', quote: "Seamless integration and outstanding user experience.", image: pro5 },
  { name: 'JESSICA MILLER', position: 'Creative Director', quote: "Exceeded all our expectations with their cutting-edge design.", image: pro6 }
];

const CompactTestimonialCard = ({ testimonial }) => (
  <Card sx={{ height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: 2, borderRadius: 2 }}>
    <Avatar alt={testimonial.name} src={testimonial.image} sx={{ width: 80, height: 80, mt: 2, border: '3px solid #007bff' }} />
    <CardContent sx={{ p: 2, textAlign: 'center' }}>
      <FormatQuoteIcon sx={{ color: '#007bff', fontSize: 24, mb: 1, opacity: 0.5 }} />
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
        {testimonial.quote}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{testimonial.name}</Typography>
      <Typography variant="caption" color="text.secondary">{testimonial.position}</Typography>
    </CardContent>
  </Card>
);

const ClientTestimonials = () => {
  return (
    <Box sx={{ backgroundColor: '#F2F5FE', py: 6, textAlign: 'center', position: 'relative' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, fontFamily: 'initial' }}>What Our Client Say !</Typography>
        
        <Box sx={{ position: 'relative', pb: 6 }}>
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{ nextEl: '.custom-swiper-next', prevEl: '.custom-swiper-prev' }}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
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
          
          {/* Navigation Buttons */}
          <Box className="custom-swiper-prev" sx={{ position: 'absolute', left: '-50px', top: '40%', transform: 'translateY(-50%)', zIndex: 10, cursor: 'pointer' }}>
            <ArrowBackIosIcon sx={{ fontSize: 40, color: '#007bff' }} />
          </Box>
          <Box className="custom-swiper-next" sx={{ position: 'absolute', right: '-50px', top: '40%', transform: 'translateY(-50%)', zIndex: 10, cursor: 'pointer' }}>
            <ArrowForwardIosIcon sx={{ fontSize: 40, color: '#007bff' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ClientTestimonials;