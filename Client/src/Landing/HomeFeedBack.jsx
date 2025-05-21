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

import pro1 from '../assets/boy1.jpg';
import pro2 from '../assets/boy2.jpg';
import pro3 from '../assets/girl1.jpeg';
import pro4 from '../assets/boy3.jpg';
import pro5 from '../assets/girl2.jpg';
import pro6 from '../assets/boy4.jpg';

const testimonials = [
  { name: 'Lahiru De Costa', position: 'Singer-Songwriter', quote: "Finding the right producer for my single was effortless thanks to this platform.", image: pro1 },
  { name: 'Billy Fernando', position: 'Founder of Island Vibes Studio', quote: "This platform streamlined the way we connect with clients and manage studio bookings.", image: pro2 },
  { name: 'Leen Muthukuda', position: 'Music Producer', quote: "The recommendation system helped me get noticed by artists I never imagined working with.", image: pro3 },
  { name: 'Charitha aththalage', position: 'Indie Artist', quote: "I discovered incredible collaborators who understood exactly what I needed musically.", image: pro4 },
  { name: 'yashodha Adikari', position: 'Vocal Coach & Engineer', quote: "Managing projects and sessions has never been this easy.", image: pro5 },
  { name: 'Pasan Liyanage', position: 'Beat Maker', quote: "From connecting with clients to showcasing my work—everything is smooth and professional.", image: pro6 }
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
    <Box sx={{ backgroundColor: '#F2F5FE', py: 6, textAlign: 'center', position: 'relative', clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0% 100%)' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, fontFamily: 'initial', mt: 10 }}>Hear from the Musicians !</Typography>
        
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
          <Box className="custom-swiper-prev" sx={{ position: 'absolute', left: '-50px', top: '38%', transform: 'translateY(-50%)', zIndex: 10, cursor: 'pointer' }}>
            <ArrowBackIosIcon sx={{ fontSize: 40, color: '#007bff' }} />
          </Box>
          <Box className="custom-swiper-next" sx={{ position: 'absolute', right: '-50px', top: '38%', transform: 'translateY(-50%)', zIndex: 10, cursor: 'pointer' }}>
            <ArrowForwardIosIcon sx={{ fontSize: 40, color: '#007bff' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ClientTestimonials;