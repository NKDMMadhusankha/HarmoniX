import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Container, 
  Grid,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { Twitter, LinkedIn, Instagram, YouTube } from '@mui/icons-material';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    agreeTopolicies: false
  });

  const [loaded, setLoaded] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if any field is empty or checkbox is not checked
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.message.trim() ||
      !formData.agreeTopolicies
    ) {
      setErrorMessage('Please fill in all fields and agree to the policies.');
      setShowError(true);
      setShowSuccess(false);
      // Hide error after 3 seconds
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Add submit animation
    const formElement = e.target;
    formElement.classList.add('form-submitted');

    try {
      // Replace with your backend call
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setShowError(false);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
        setShowError(true);
        setShowSuccess(false);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setShowError(true);
      setShowSuccess(false);
      setTimeout(() => setShowError(false), 3000);
    }

    setTimeout(() => {
      formElement.classList.remove('form-submitted');
    }, 500);
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const socialIcons = [
    { 
      icon: Twitter, 
      color: '#1DA1F2',
      hoverBg: 'rgba(29, 161, 242, 0.1)',
      shadowColor: 'rgba(29, 161, 242, 0.4)'
    }, 
    { 
      icon: LinkedIn, 
      color: '#0077B5',
      hoverBg: 'rgba(0, 119, 181, 0.1)',
      shadowColor: 'rgba(0, 119, 181, 0.4)'
    }, 
    { 
      icon: Instagram, 
      color: '#E1306C',
      hoverBg: 'rgba(225, 48, 108, 0.1)',
      shadowColor: 'rgba(225, 48, 108, 0.4)'
    }, 
    { 
      icon: YouTube, 
      color: '#FF0000',
      hoverBg: 'rgba(255, 0, 0, 0.1)',
      shadowColor: 'rgba(255, 0, 0, 0.4)'
    }
  ];

  // Page scroll animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Social icons staggered animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { scale: 0, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Field focus animation for ripple effect
  const [focusedField, setFocusedField] = useState(null);

  return (
    <Box 
      sx={{ 
        backgroundColor: 'black', 
        color: 'white', 
        minHeight: '100vh', 
        py: 0,
        overflow: 'hidden',
        position: 'relative',
        '@keyframes gradientBackground': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      }}
    >
      {/* Background subtle gradient animation */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: 'linear-gradient(45deg, #000000, #1a1a1a, #333333, #000000)',
          backgroundSize: '400% 400%',
          animation: 'gradientBackground 15s ease infinite',
          zIndex: 0
        }}
      />
      
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 25, position: 'relative', zIndex: 1 }}>
        <Fade in={loaded} timeout={1000}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Typography variant="h2" gutterBottom sx={{ fontFamily: 'inter', fontWeight: 500 }}>
                  Get In Touch
                </Typography>
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  ...fadeInUp,
                  transition: {
                    delay: 0.2,
                    duration: 0.6
                  }
                }}
              >
                <Typography variant="body1" sx={{ mb: 3, fontFamily: 'Roboto Mono, monospace', color: 'white', fontWeight: 'bold' }}>
                  Have Any Questions, Concerns, Or Need Assistance? Feel Free To Reach Out To Us!
                </Typography>
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  ...fadeInUp,
                  transition: {
                    delay: 0.4,
                    duration: 0.6
                  }
                }}
              >
                <Typography variant="body2" sx={{ mb: 2, fontFamily: 'Roboto Mono, monospace', color: 'rgba(255,255,255,0.7)' }}>
                  We're here to help and ensure your experience on our platform is smooth and successful. Your feedback is important to us, and we're always ready to assist with anything you need. Whether you have questions, need support, or want to share your thoughts, we're just a message away. Our team is dedicated to providing prompt and effective assistance to enhance your experience.
                </Typography>
              </motion.div>
              
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                style={{ display: 'flex', gap: '16px', marginTop: '24px' }}
              >
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={item}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        backgroundColor: social.hoverBg,
                        boxShadow: `0 0 15px ${social.shadowColor}`,
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <IconComponent 
                        sx={{ 
                          color: 'white', 
                          transition: 'color 0.3s ease-in-out',
                          '&:hover': {
                            color: social.color
                          }
                        }} 
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grow in={loaded} timeout={1000} style={{ transformOrigin: '0 0 0' }}>
                <Box 
                  component="form" 
                  onSubmit={handleSubmit}
                  className="contact-form"
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2,
                    position: 'relative',
                    '@keyframes formSubmitPulse': {
                      '0%': { transform: 'scale(1)', opacity: 1 },
                      '50%': { transform: 'scale(0.95)', opacity: 0.8 },
                      '100%': { transform: 'scale(1)', opacity: 1 },
                    },
                    '&.form-submitted': {
                      animation: 'formSubmitPulse 0.5s ease'
                    }
                  }}
                >
                  {/* Success Message */}
                  <Zoom in={showSuccess} timeout={500} style={{ position: 'absolute', zIndex: 10, top: -50, left: 0, right: 0 }}>
                    <Box sx={{
                      backgroundColor: 'rgba(46, 125, 50, 0.9)', // green
                      p: 1,
                      borderRadius: 1,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }}>
                      <Typography variant="body1" align="center">
                        Message sent successfully!
                      </Typography>
                    </Box>
                  </Zoom>

                  {/* Error Message */}
                  <Zoom in={showError} timeout={500} style={{ position: 'absolute', zIndex: 10, top: -50, left: 0, right: 0 }}>
                    <Box sx={{
                      backgroundColor: 'rgba(211, 47, 47, 0.9)', // red
                      p: 1,
                      borderRadius: 1,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }}>
                      <Typography variant="body1" align="center">
                        {errorMessage}
                      </Typography>
                    </Box>
                  </Zoom>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <TextField
                          fullWidth
                          name="firstName"
                          label="First Name"
                          variant="outlined"
                          value={formData.firstName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('firstName')}
                          onBlur={() => setFocusedField(null)}
                          InputProps={{
                            sx: { 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              color: 'white',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: focusedField === 'firstName' ? 'white' : 'rgba(255,255,255,0.3)',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                              },
                              ...(focusedField === 'firstName' && {
                                boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                              })
                            }
                          }}
                          InputLabelProps={{
                            sx: { 
                              color: 'rgba(255,255,255,0.7)',
                              '&.Mui-focused': { color: 'white' }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={6}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <TextField
                          fullWidth
                          name="lastName"
                          label="Last Name"
                          variant="outlined"
                          value={formData.lastName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('lastName')}
                          onBlur={() => setFocusedField(null)}
                          InputProps={{
                            sx: { 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              color: 'white',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: focusedField === 'lastName' ? 'white' : 'rgba(255,255,255,0.3)',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                              },
                              ...(focusedField === 'lastName' && {
                                boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                              })
                            }
                          }}
                          InputLabelProps={{
                            sx: { 
                              color: 'rgba(255,255,255,0.7)',
                              '&.Mui-focused': { color: 'white' }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>
                  </Grid>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      InputProps={{
                        sx: { 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: focusedField === 'email' ? 'white' : 'rgba(255,255,255,0.3)',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                          ...(focusedField === 'email' && {
                            boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                          })
                        }
                      }}
                      InputLabelProps={{
                        sx: { 
                          color: 'rgba(255,255,255,0.7)',
                          '&.Mui-focused': { color: 'white' }
                        }
                      }}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <TextField
                      fullWidth
                      name="message"
                      label="Write Your Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      InputProps={{
                        sx: { 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: focusedField === 'message' ? 'white' : 'rgba(255,255,255,0.3)',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                          ...(focusedField === 'message' && {
                            boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                          })
                        }
                      }}
                      InputLabelProps={{
                        sx: { 
                          color: 'rgba(255,255,255,0.7)',
                          '&.Mui-focused': { color: 'white' }
                        }
                      }}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox 
                          name="agreeTopolicies" 
                          checked={formData.agreeTopolicies} 
                          onChange={handleChange} 
                          sx={{ 
                            color: 'white', 
                            '&.Mui-checked': { color: 'white' },
                            '& .MuiSvgIcon-root': { 
                              transition: 'transform 0.3s ease',
                              '&:hover': { transform: 'scale(1.1)' } 
                            }
                          }} 
                        />
                      }
                      label="I agree with HarmoniX policies"
                      sx={{ color: 'white' }}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button 
                      type="submit" 
                      variant="contained" 
                      sx={{ 
                        backgroundColor: '#1976d2', 
                        color: 'white', 
                        '&:hover': { 
                          backgroundColor: '#1565c0',
                        },
                        position: 'relative',
                        overflow: 'hidden',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '100%',
                          width: '100%',
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.2)',
                          transition: 'transform 0.3s ease-out',
                        },
                        '&:hover::after': {
                          transform: 'translateX(-100%)',
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Fade>
      </Container>
      <Footer />
    </Box>
  );
};

export default ContactPage;