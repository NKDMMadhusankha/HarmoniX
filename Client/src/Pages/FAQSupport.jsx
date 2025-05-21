import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Button,
  Divider,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Function to handle navigation with page refresh
  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Update FAQ categories to remove Technical Support
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'collaboration', name: 'Collaboration' },
    
    { id: 'payments', name: 'Navinna Madhusankha' },
    { id: 'payments', name: 'Agreements & Rights' },
    { id: 'platform', name: 'Platform Usage' }  // Replaced Technical Support with Platform Usage
  ];

  // Update FAQ data to change category from technical to platform
  const faqData = [
    {
      id: 'faq1',
      question: 'How do I create a musician profile on HarmoniX?',
      answer: 'To create a musician profile on HarmoniX, navigate to the "Sign Up" page, select "Join as Musician", and follow our simple registration process. You\'ll need to provide details about your musical style, instruments you play, experience level, and upload samples of your work. Once verified, you can enhance your profile with a portfolio, testimonials, and set your availability for collaboration.',
      category: 'account'
    },
    {
      id: 'faq2',
      question: 'How can I find compatible musicians for my project?',
      answer: 'HarmoniX offers a smart search system that helps you find the perfect musical match. You can filter musicians by genre, instruments, experience, location, and availability. Our AI matching system will also suggest musicians based on your project requirements and musical style. You can browse profiles, listen to demos, and check ratings before initiating contact.',
      category: 'collaboration'
    },
    {
      id: 'faq3',
      question: 'What collaboration tools does HarmoniX offer?',
      answer: 'HarmoniX provides a complete suite of collaboration tools including real-time messaging, audio/video conferencing, file sharing, and a collaborative workspace where you can share project timelines and milestones. Our platform also features an integrated audio player for quick feedback on works-in-progress and version control for your project files.',
      category: 'collaboration'
    },
    {
      id: 'faq4',
      question: 'How do musicians and clients manage compensation on HarmoniX?',
      answer: 'HarmoniX facilitates connections between musicians and clients, but payments are handled directly between parties. We recommend discussing compensation terms before starting a project and documenting agreements using our customizable contract templates. Musicians can showcase their rates on their profiles, and clients can specify their budget in project descriptions. Always keep records of all agreements made through our messaging system for reference.',
      category: 'payments'
    },
    {
      id: 'faq5',
      question: 'How does the HarmoniX reputation system work?',
      answer: 'After each collaboration, both parties can rate and review each other based on communication, quality, timeliness, and professionalism. These ratings build your HarmoniX reputation score, which enhances your visibility in search results. Musicians with consistently excellent ratings may receive "Featured Artist" status, increasing their profile visibility and opportunities.',
      category: 'collaboration'
    },
    {
      id: 'faq6',
      question: 'What happens if a collaboration doesn\'t work out?',
      answer: 'If you encounter issues during a collaboration, we recommend first discussing them directly with your partner. If that doesn\'t resolve the issue, you can use our mediation service through the "Request Assistance" feature. For serious concerns, our conflict resolution team will review the case and may apply our collaboration protection policies to ensure a fair outcome.',
      category: 'collaboration'
    },
    {
      id: 'faq7',
      question: 'How does the HarmoniX matching algorithm work?',
      answer: 'Our proprietary matching algorithm analyzes multiple factors including musical style compatibility, past collaboration success, project requirements, and individual skills. The AI learns from successful collaborations to continuously improve its recommendations. While we suggest matches based on compatibility metrics, you always maintain full control over who you choose to work with.',
      category: 'collaboration'
    },
    {
      id: 'faq8',
      question: 'Who owns the rights to music created through HarmoniX?',
      answer: 'Intellectual property rights for music created through HarmoniX collaborations are determined by the agreement between collaborators. We provide customizable contract templates that clearly outline ownership, usage rights, and attribution requirements. We strongly recommend discussing and documenting these arrangements before beginning any collaboration to avoid future disputes. HarmoniX does not claim any rights to the music created on our platform.',
      category: 'payments'
    },
    {
      id: 'faq9',
      question: 'How do I book a recording studio through HarmoniX?',
      answer: 'HarmoniX makes booking recording studios simple. Browse our curated list of professional studios filtered by location, equipment, pricing, and availability. Each studio listing includes photos, equipment details, and reviews from other musicians. Once you find a suitable studio, select your desired date and time slots, and submit a booking request. The studio owner will confirm your booking, and you\'ll receive all necessary details for your session. For specific requirements, you can message the studio directly through our platform.',
      category: 'platform'
    },
    {
      id: 'faq10',
      question: 'How do I navigate the HarmoniX platform?',
      answer: 'HarmoniX is designed to be intuitive and user-friendly. The main dashboard gives you access to all features including profile management, project creation, messaging, and collaboration tools. You can use the navigation menu to move between different sections of the platform. For new users, we recommend exploring each section to familiarize yourself with the available features.',
      category: 'platform'
    }
  ];

  // Filter FAQs based on selected category
  const filteredFaqs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(33, 150, 243, 0.7)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  useEffect(() => {
    // Reset expanded state when category changes
    setExpanded(false);
  }, [selectedCategory]);

  return (
    <>
      <Navbar />
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #000000 0%, #000000 100%)', // Changed to pure black background
          minHeight: '100vh',
          pt: { xs: 6, sm: 8 },
          pb: 10
        }}
      >
        <Container maxWidth="lg">
          <MotionBox 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            sx={{ textAlign: 'center', mb: 7 }}
          >
            <MotionTypography 
              variant="h2" 
              component="h1" 
              sx={{ 
                background: 'linear-gradient(to right, #2196f3, #00bcd4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Frequently Asked Questions
            </MotionTypography>
            
            <MotionTypography 
              variant="h6"
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                mb: 4,
                maxWidth: '700px',
                mx: 'auto'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Find answers to common questions about HarmoniX and how our platform connects musicians and creators worldwide
            </MotionTypography>
            
            <Divider 
              sx={{ 
                width: '120px', 
                mx: 'auto', 
                borderColor: '#2196f3',
                borderWidth: 3,
                borderRadius: 1,
                mb: 5
              }} 
            />
            
            {/* Category filter buttons */}
            <MotionBox
              component="nav"
              sx={{ 
                mb: 6, 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Added dark background to buttons container
                borderRadius: 4,
                py: 3,
                px: 2
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {categories.map((category) => (
                <MotionButton
                  key={category.id}
                  variant={selectedCategory === category.id ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setSelectedCategory(category.id)}
                  sx={{
                    borderRadius: 8,
                    px: 2.5,
                    py: 1,
                    borderWidth: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.95rem'
                  }}
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  {category.name}
                </MotionButton>
              ))}
            </MotionBox>
          </MotionBox>
          
          {/* Main FAQ section with grid layout */}
          <Grid container spacing={4}>
            {/* FAQ Illustration */}
            {!isMobile && (
              <Grid item xs={12} md={4}>
                <MotionBox
                  sx={{
                    position: 'sticky',
                    top: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    maxHeight: '500px'
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <QuestionAnswerIcon 
                    sx={{ 
                      fontSize: 120, 
                      color: '#2196f3',
                      mb: 3,
                      filter: 'drop-shadow(0px 0px 20px rgba(33, 150, 243, 0.4))'
                    }} 
                  />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#fff', 
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    Have More Questions?
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      mb: 4,
                      textAlign: 'center' 
                    }}
                  >
                    Our team is here to help you with any questions about using the HarmoniX platform.
                  </Typography>
                  <MotionButton 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    onClick={handleContactClick}
                    sx={{ 
                      borderRadius: 8,
                      px: 4,
                      py: 1.2,
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    Contact Support
                  </MotionButton>
                </MotionBox>
              </Grid>
            )}
            
            {/* FAQ Accordions */}
            <Grid item xs={12} md={8}>
              <MotionBox 
                sx={{ width: '100%' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={selectedCategory} // Re-render animation when category changes
              >
                {filteredFaqs.length === 0 ? (
                  <MotionBox
                    sx={{ 
                      textAlign: 'center', 
                      py: 10, 
                      color: 'rgba(255,255,255,0.7)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Typography variant="h6">
                      No FAQs found in this category
                    </Typography>
                  </MotionBox>
                ) : (
                  filteredFaqs.map((faq) => (
                    <MotionBox
                      key={faq.id}
                      variants={itemVariants}
                      sx={{ mb: 2 }}
                    >
                      <Accordion 
                        expanded={expanded === faq.id} 
                        onChange={handleChange(faq.id)}
                        sx={{ 
                          bgcolor: 'rgba(30, 30, 38, 0.6)',
                          backdropFilter: 'blur(10px)',
                          color: '#fff',
                          border: '1px solid',
                          borderColor: expanded === faq.id ? '#2196f3' : 'rgba(255,255,255,0.1)',
                          borderRadius: '16px !important',
                          '&:before': { display: 'none' },
                          boxShadow: expanded === faq.id ? '0 0 25px rgba(33, 150, 243, 0.25)' : 'none',
                          transition: 'all 0.4s ease',
                          overflow: 'hidden'
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <MotionBox
                              animate={{ rotate: expanded === faq.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ExpandMoreIcon sx={{ color: '#2196f3' }} />
                            </MotionBox>
                          }
                          aria-controls={`${faq.id}-content`}
                          id={`${faq.id}-header`}
                          sx={{ 
                            minHeight: 70,
                            bgcolor: expanded === faq.id ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                            borderBottom: expanded === faq.id ? '1px solid rgba(33, 150, 243, 0.2)' : 'none',
                            '&:hover': { 
                              bgcolor: 'rgba(33, 150, 243, 0.05)'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LiveHelpIcon sx={{ mr: 2, color: '#2196f3' }} />
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                              {faq.question}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails 
                          sx={{ 
                            px: 5, 
                            pb: 4, 
                            pt: 3, 
                            bgcolor: 'rgba(10,10,15,0.8)'
                          }}
                        >
                          <Typography 
                            variant="body1" 
                            component={motion.p}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            sx={{ 
                              color: 'rgba(255,255,255,0.8)',
                              lineHeight: 1.8
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </MotionBox>
                  ))
                )}
              </MotionBox>
            </Grid>
          </Grid>

          {/* Contact Support Section - Mobile only */}
          {isMobile && (
            <MotionBox 
              sx={{ 
                textAlign: 'center', 
                mt: 8,
                p: 4,
                border: '1px solid rgba(33, 150, 243, 0.3)',
                borderRadius: 4,
                bgcolor: 'rgba(33, 150, 243, 0.05)',
                maxWidth: 700,
                mx: 'auto'
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <SupportAgentIcon sx={{ 
                fontSize: 50, 
                color: '#2196f3',
                mb: 2 
              }} />
              <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                Need More Help?
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                Our team is ready to assist you with any questions about HarmoniX.
              </Typography>
              <MotionButton 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleContactClick}
                sx={{ 
                  borderRadius: 8,
                  px: 4,
                  py: 1.2,
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                Contact Support
              </MotionButton>
            </MotionBox>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default FAQ;