import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Container, 
  Grid 
} from '@mui/material';
import { Twitter, LinkedIn, Instagram, YouTube } from '@mui/icons-material';
import Navbar from './Navbar';  // Import the Navbar component
import Footer from './Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    agreeTopolicies: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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

  return (
    <Box 
      sx={{ 
        backgroundColor: 'black', 
        color: 'white', 
        minHeight: '100vh' 
      }}
    >
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 20 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom sx={{ fontFamily: 'inter', fontWeight: 500 }}>
              Get In Touch
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontFamily: 'Roboto Mono, monospace', color: 'white', fontWeight: 'bold' }}>
              Have Any Questions, Concerns, Or Need Assistance? Feel Free To Reach Out To Us!
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontFamily: 'Roboto Mono, monospace', color: 'rgba(255,255,255,0.7)' }}>
            We're here to help and ensure your experience on our platform is smooth and successful. Your feedback is important to us, and we're always ready to assist with anything you need. Whether you have questions, need support, or want to share your thoughts, we're just a message away. Our team is dedicated to providing prompt and effective assistance to enhance your experience.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              {socialIcons.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        backgroundColor: social.hoverBg,
                        transform: 'scale(1.2) rotate(360deg)',
                        boxShadow: `0 0 15px ${social.shadowColor}`,
                      }
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
                  </Box>
                );
              })}
            </Box>
          </Grid>

          {/* Rest of the code remains the same */}
          <Grid item xs={12} md={6}>
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 
              }}
            >
              {/* Form fields remain unchanged */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={formData.firstName}
                    onChange={handleChange}
                    InputProps={{
                      sx: { 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'white',
                        }
                      }
                    }}
                    InputLabelProps={{
                      sx: { 
                        color: 'rgba(255,255,255,0.7)',
                        '&.Mui-focused': { color: 'white' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={handleChange}
                    InputProps={{
                      sx: { 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'white',
                        }
                      }
                    }}
                    InputLabelProps={{
                      sx: { 
                        color: 'rgba(255,255,255,0.7)',
                        '&.Mui-focused': { color: 'white' }
                      }
                    }}
                  />
                </Grid>
              </Grid>
              {/* Rest of the form remains the same */}
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  sx: { 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { 
                    color: 'rgba(255,255,255,0.7)',
                    '&.Mui-focused': { color: 'white' }
                  }
                }}
              />
              <TextField
                fullWidth
                name="message"
                label="Write Your Message"
                variant="outlined"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                InputProps={{
                  sx: { 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { 
                    color: 'rgba(255,255,255,0.7)',
                    '&.Mui-focused': { color: 'white' }
                  }
                }}
              />
              <FormControlLabel
                control={<Checkbox name="agreeTopolicies" checked={formData.agreeTopolicies} onChange={handleChange} sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />}
                label="I agree with HarmoniX policies"
                sx={{ color: 'white' }}
              />
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}>Send Message</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ContactPage;