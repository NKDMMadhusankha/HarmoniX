import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Button, 
  Grid 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const MusicCollaborationFAQs = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      question: "How does HarmoniX help me find the right music professionals for my project ?",
      answer: "HarmoniX uses an AI-powered recommendation engine that matches your project needs with suitable music producers, engineers, and artists based on genre, mood, and style."
    },
    {
      question: "Can I upload a project brief in natural language to get recommendations ?",
      answer: "Yes, you can describe your project using prompts (e.g., “I want a chill lo-fi beat for a late-night vibe”), and our NLP engine will interpret it to suggest relevant professionals."
    },
    {
      question: "How does the AI recommendation system work on HarmoniX ?",
      answer: "It analyzes your input (such as music type, mood, and references) and compares it with the profiles and past work of musicians to suggest the best matches."
    },
    {
      question: "Are all bookings instantly confirmed on HarmoniX ?",
      answer: "No. Once a booking request is submitted, the studio owner or admin will review the availability and approve the booking if the slot is free."
    }
  ];

  return (
    <Box sx={{ width: '100%', backgroundColor: '#0D0D0D', py: 15,clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)', }}>
      <Container maxWidth="lg">
        <Grid container spacing={9}>
          {/* Right Side - FAQ Header and Buttons */}
          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                color: 'white',
                padding: 3,
                borderRadius: 2,
                textAlign: 'left'
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Music Collaboration FAQs
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 5, fontFamily:'inherit' }}>
                As a leading music collaboration platform, we are committed to connecting artists and clients by providing smart solutions and answering frequently asked questions to support our users.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ borderRadius: 20 , padding: '10px 20px' }}
                >
                  More Questions
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => window.location.href = '/contact'}
                  sx={{ borderRadius: 20 , padding: '10px 20px' }}    
                >
                  Contact Us
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Left Side - FAQ Accordions */}
          <Grid item xs={12} md={7}>
            {faqData.map((faq, index) => (
              <Accordion 
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  marginBottom: 4,
                  backgroundColor: 'transparent',
                  color: 'white',
                  boxShadow: 'none',
                  border: '3px solid rgba(56, 56, 57, 0.33)',
                  borderLeft: expanded === `panel${index}` ? '4px solid #1976d2' : '3px solid rgba(56, 56, 57, 0.33)',
                  borderRadius: 3,
                  transition: 'border-left 0.3s ease-in-out',
                  '&:hover': expanded === `panel${index}` ? { borderLeft: '4px solid #1976d2' } : {}, // Apply hover effect only when expanded
                  '&:before': {
                    display: 'none',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={expanded === `panel${index}` ? <RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
                  aria-controls={`panel${index}d-content`}
                  id={`panel${index}d-header`}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    }
                  }}
                >
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MusicCollaborationFAQs;
