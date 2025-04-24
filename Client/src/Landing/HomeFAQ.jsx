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
      question: "Why is Better collaboration important for my project?",
      answer: "Effective construction management ensures that projects are completed on time, within budget, and to the desired quality standards. It involves planning, coordinating, and supervising the construction process, which minimizes risks and improves efficiency."
    },
    {
      question: "How does your platform help improve my project's visibility?",
      answer: "Our platform provides real-time tracking, comprehensive reporting, and collaborative tools that enhance transparency and communication across all project stakeholders."
    },
    {
      question: "How long does it take to see results from using your platform?",
      answer: "Typically, users start seeing improvements in project management efficiency within the first few weeks of implementation, with full optimization realized within 2-3 months."
    },
    {
      question: "How do you measure the success of construction projects?",
      answer: "We measure project success through key performance indicators including timeline adherence, budget compliance, quality of work, safety records, and client satisfaction."
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
              <Typography variant="body1" paragraph sx={{ mb: 5 }}>
                As a leading construction management platform, we are dedicated to providing comprehensive solutions and answering frequently asked questions to help our users.
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
