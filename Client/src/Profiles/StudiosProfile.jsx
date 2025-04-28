import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  FormControl, 
  Select, 
  MenuItem, 
  TextField, 
  Grid, 
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
  useMediaQuery,
  useTheme,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker, TimePicker } from '@mui/x-date-pickers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { blue } from '@mui/material/colors';

// Update theme colors
const themeColors = {
  primary: '#2563eb', // Changed to blue accent
  secondary: '#3b82f6', // Lighter blue for gradients
  background: '#000000',
  cardBackground: '#0a0a0a',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  accent: '#2563eb', // Blue accent
  error: '#ef4444',
  success: '#10b981'
};

// Styled components with better mobile responsiveness
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(5),
  backgroundColor: themeColors.background,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: themeColors.cardBackground,
  padding: theme.spacing(3),
  borderRadius: '0', // Flat design
  border: '1px solid rgba(255,255,255,0.05)',
  marginBottom: theme.spacing(5),
  width: '100%',
  maxWidth: '1200px', // Increased max width
  margin: '0 auto', // Center the form
  boxShadow: 'none', // Removed shadow for flat design
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: themeColors.primary,
  fontSize: 'clamp(1.5rem, 5vw, 2rem)',
  fontWeight: '700',
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  borderBottom: `2px solid ${themeColors.primary}40`,
  width: '100%',
  background: `linear-gradient(45deg, ${themeColors.primary}, ${themeColors.accent})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 10px rgba(99, 102, 241, 0.3)',
}));

const FormSubtitle = styled(Typography)(({ theme }) => ({
  color: themeColors.text,
  fontSize: '1rem',
  fontWeight: '500',
  margin: theme.spacing(2, 0),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: themeColors.text,
  borderRadius: '0',
  height: '40px',
  '& .MuiSelect-icon': {
    color: themeColors.primary,
  },
  '&.MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.1)',
      borderRadius: '0',
    },
    '&:hover fieldset': {
      borderColor: `${themeColors.primary}80`,
    },
    '&.Mui-focused fieldset': {
      borderColor: themeColors.primary,
    },
  },
}));

const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: themeColors.primary,
  color: 'white',
  padding: theme.spacing(1, 3),
  borderRadius: '0',
  fontWeight: '600',
  textTransform: 'none',
  float: 'right',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: themeColors.secondary,
  },
  '&:disabled': {
    background: themeColors.textSecondary,
    color: themeColors.cardBackground,
  },
}));

const GalleryImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '280px',
  objectFit: 'cover',
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: `0 10px 25px -5px ${themeColors.primary}30`,
  },
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '0',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.1)',
    },
    '&:hover fieldset': {
      borderColor: `${themeColors.primary}80`,
    },
    '&.Mui-focused fieldset': {
      borderColor: themeColors.accent,
    },
  },
  '& .MuiInputLabel-root': {
    color: themeColors.textSecondary,
    '&.Mui-focused': {
      color: themeColors.accent,
    },
  },
  '& .MuiOutlinedInput-input': {
    color: themeColors.text,
    '&::placeholder': {
      color: `${themeColors.textSecondary}80`,
      opacity: 1,
    },
  },
}));

const SuccessMessage = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  background: `linear-gradient(145deg, ${themeColors.cardBackground}, ${themeColors.background})`,
  borderRadius: '12px',
  border: `1px solid ${themeColors.primary}20`,
  boxShadow: `0 4px 30px ${themeColors.primary}10`,
  maxWidth: '600px',
  margin: '0 auto',
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 3,
  backgroundColor: 'rgba(255,255,255,0.1)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: themeColors.primary,
    backgroundImage: `linear-gradient(45deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
  },
  marginBottom: theme.spacing(4),
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  color: themeColors.textSecondary,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& span:last-child': {
    color: themeColors.primary,
    fontWeight: 500,
  }
}));

const StudioProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Studio Service',
    service: '',
    engineer: 'I have an engineer',
    name: '',
    email: '',
    phone: '',
    notes: '',
    duration: '2',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });
  
  // Studio gallery images
  const studioImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { id: 2, url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { id: 3, url: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1413&q=80' },
    { id: 4, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { id: 5, url: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { id: 6, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }
  ];
  
  const steps = [
    { number: 1, label: 'Service' },
    { number: 2, label: 'Time' },
    { number: 3, label: 'Details' },
    { number: 4, label: 'Terms' },
    { number: 5, label: 'Done' }
  ];

  const handleNext = () => {
    // Validate form before proceeding
    if (activeStep === 2) {
      const errors = {
        name: !formData.name.trim(),
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
        phone: !formData.phone.trim(),
      };
      
      setFormErrors(errors);
      
      if (Object.values(errors).some(error => error)) {
        return;
      }
    }
    
    if (activeStep === 0 && !formData.service) {
      return;
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };

  const handleDateChange = (newDate) => {
    // Prevent selecting past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (newDate >= today) {
      setSelectedDate(newDate);
    }
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <FormSubtitle>
              Please select service:
            </FormSubtitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography sx={{ color: themeColors.textSecondary, mb: 1, fontSize: '0.875rem' }}>Category</Typography>
                <FormControl fullWidth variant="outlined">
                  <StyledSelect
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <MenuItem value="Studio Service">Studio Service</MenuItem>
                    <MenuItem value="Mixing">Mixing</MenuItem>
                    <MenuItem value="Mastering">Mastering</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography sx={{ color: themeColors.textSecondary, mb: 1, fontSize: '0.875rem' }}>Service</Typography>
                <FormControl fullWidth variant="outlined">
                  <StyledSelect
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Select service</MenuItem>
                    <MenuItem value="Recording Session">Recording Session</MenuItem>
                    <MenuItem value="Rehearsal">Rehearsal</MenuItem>
                    <MenuItem value="Production">Production</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography sx={{ color: themeColors.textSecondary, mb: 1, fontSize: '0.875rem' }}>Recording Engineer</Typography>
                <FormControl fullWidth variant="outlined">
                  <StyledSelect
                    name="engineer"
                    value={formData.engineer}
                    onChange={handleFormChange}
                  >
                    <MenuItem value="I have an engineer">I have an engineer</MenuItem>
                    <MenuItem value="I need an engineer">I need an engineer</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <FormSubtitle>
              Select date and time
            </FormSubtitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={new Date()}
                    sx={{
                      '& .MuiPickersDay-root': {
                        color: themeColors.text,
                        '&.Mui-selected': {
                          background: themeColors.primary,
                          color: 'white',
                        },
                        '&:hover': {
                          backgroundColor: `${themeColors.primary}20`,
                        },
                        '&.Mui-disabled': {
                          color: `${themeColors.textSecondary}60`,
                        },
                      },
                      '& .MuiPickersCalendarHeader-label': {
                        color: themeColors.text,
                      },
                      '& .MuiTypography-root': {
                        color: themeColors.textSecondary,
                        '&.MuiPickersDay-dayOfWeek': {
                          color: themeColors.textSecondary,
                        },
                      },
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderRadius: '0',
                      border: '1px solid rgba(255,255,255,0.1)',
                      overflow: 'hidden',
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: themeColors.textSecondary, mb: 1, fontSize: '0.875rem' }}>
                  Select Time
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={selectedTime}
                    onChange={(newTime) => setSelectedTime(newTime)}
                    renderInput={(params) => (
                      <StyledTextField 
                        {...params} 
                        fullWidth 
                        sx={{ 
                          input: { color: themeColors.text },
                          svg: { color: themeColors.primary }
                        }} 
                      />
                    )}
                  />
                </LocalizationProvider>
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ color: themeColors.textSecondary, mb: 1, fontSize: '0.875rem' }}>
                    Duration (Minimum 2 hours)
                  </Typography>
                  <FormControl fullWidth variant="outlined">
                    <StyledSelect
                      name="duration"
                      value={formData.duration}
                      onChange={handleFormChange}
                    >
                      <MenuItem value="2">2 hours</MenuItem>
                      <MenuItem value="3">3 hours</MenuItem>
                      <MenuItem value="4">4 hours</MenuItem>
                      <MenuItem value="full">Full day (8 hours)</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <FormSubtitle>
              Your details
            </FormSubtitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  variant="outlined"
                  error={formErrors.name}
                  helperText={formErrors.name ? "Please enter your name" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  variant="outlined"
                  error={formErrors.email}
                  helperText={formErrors.email ? "Please enter a valid email" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  variant="outlined"
                  error={formErrors.phone}
                  helperText={formErrors.phone ? "Please enter your phone number" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Additional Notes (Optional)"
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Any special requests or information about your session..."
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box>
            <FormSubtitle>
              Terms and Conditions
            </FormSubtitle>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(255,255,255,0.1)', 
              borderRadius: '0', 
              mb: 2, 
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Typography sx={{ color: themeColors.accent, fontWeight: 'bold', mb: 1 }}>
                Payment Policy
              </Typography>
              <Typography sx={{ color: themeColors.textSecondary, mb: 2, fontSize: '0.875rem' }}>
                Payment is to be made after the completion of your recording session. The exact duration may vary from the booked time, and the final fee will be calculated based on actual studio usage.
              </Typography>
              
              <Typography sx={{ color: themeColors.accent, fontWeight: 'bold', mb: 1 }}>
                Cancellation Policy
              </Typography>
              <Typography sx={{ color: themeColors.textSecondary, mb: 2, fontSize: '0.875rem' }}>
                Cancellations must be made at least 24 hours in advance. Late cancellations or no-shows may result in a fee of 50% of the estimated booking cost.
              </Typography>
              
              <Typography sx={{ color: themeColors.accent, fontWeight: 'bold', mb: 1 }}>
                Studio Rules
              </Typography>
              <Box component="ul" sx={{ color: themeColors.textSecondary, pl: 2, fontSize: '0.875rem' }}>
                <li>No food or drinks in the recording area</li>
                <li>No smoking anywhere in the studio</li>
                <li>Equipment must be handled with care</li>
                <li>Any damage to equipment will be charged</li>
                <li>Please arrive 15 minutes before your booking time</li>
              </Box>
            </Box>
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  sx={{
                    color: themeColors.primary,
                    '&.Mui-checked': {
                      color: themeColors.accent,
                    },
                  }}
                />
              }
              label="I have read and agree to the terms and conditions"
              sx={{ color: themeColors.text, fontSize: '0.875rem' }}
            />
            
            <Box sx={{ 
              background: 'rgba(255,255,255,0.1)', 
              p: 2, 
              borderRadius: '0', 
              mt: 3,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Typography sx={{ color: themeColors.text, fontWeight: 'bold', mb: 2, fontSize: '0.875rem' }}>
                Booking Summary:
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography sx={{ color: themeColors.textSecondary, fontSize: '0.875rem' }}>
                    Service:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: themeColors.text, fontSize: '0.875rem' }}>
                    {formData.service}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: themeColors.textSecondary, fontSize: '0.875rem' }}>
                    Date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: themeColors.text, fontSize: '0.875rem' }}>
                    {formatDate(selectedDate)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: themeColors.textSecondary, fontSize: '0.875rem' }}>
                    Time:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: themeColors.text, fontSize: '0.875rem' }}>
                    {formatTime(selectedTime)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: themeColors.textSecondary, fontSize: '0.875rem' }}>
                    Duration:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: themeColors.text, fontSize: '0.875rem' }}>
                    {formData.duration === 'full' ? 'Full day (8 hours)' : `${formData.duration} hours`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      case 4:
        return (
          <SuccessMessage>
            <Box sx={{ 
              width: '80px', 
              height: '80px', 
              background: `linear-gradient(135deg, ${themeColors.success}20, ${themeColors.success}40)`, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 20px',
              border: `2px solid ${themeColors.success}`
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke={themeColors.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            <Typography variant="h5" sx={{ 
              color: themeColors.text,
              fontWeight: 'bold',
              mb: 2,
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)'
            }}>
              Booking Request Confirmed!
            </Typography>
            <Typography sx={{ color: themeColors.textSecondary, mb: 3, fontSize: '0.875rem' }}>
              Your booking request has been successfully sent to the studio. You'll receive a confirmation email shortly.
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(255,255,255,0.1)', 
              color:'white',
              borderRadius: '0', 
              mb: 3, 
              textAlign: 'left',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Typography sx={{ color: themeColors.text, mb: 2, fontWeight: '600', fontSize: '0.875rem' }}>
                Booking Details:
              </Typography>
              <Box component="ul" sx={{ 
                color: themeColors.text,
                pl: 2,
                fontSize: '0.875rem',
                '& li': {
                  mb: 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                  '&:before': {
                    content: '""',
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: themeColors.textSecondary,
                    marginRight: '8px',
                    marginTop: '8px',
                  }
                }
              }}>
                <li>
                  <span>
                    <strong>Service:</strong> {formData.service}
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Date:</strong> {formatDate(selectedDate)}
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Time:</strong> {formatTime(selectedTime)}
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Duration:</strong> {formData.duration === 'full' ? 'Full day (8 hours)' : `${formData.duration} hours`}
                  </span>
                </li>
              </Box>
            </Box>
            <Button 
              variant="outlined" 
              onClick={() => {
                setActiveStep(0);
                setTermsAccepted(false);
                setFormData({
                  category: 'Studio Service',
                  service: '',
                  engineer: 'I have an engineer',
                  name: '',
                  email: '',
                  phone: '',
                  notes: '',
                  duration: '2',
                });
              }}
              sx={{ 
                borderColor: 'rgba(34, 112, 230, 0.62)',
                color: 'white',
                borderRadius: '10',
                padding: '8px 25px',
                textTransform: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: themeColors.accent,
                  color: 'white',
                  backgroundColor: 'rgba(34, 112, 230, 0.62)',
                }
              }}
            >
              Make Another Booking
            </Button>
          </SuccessMessage>
        );
      default:
        return null;
    }
  };

  const progress = (activeStep / (steps.length - 1)) * 100;

  return (
    <Box sx={{ backgroundColor: themeColors.background, minHeight: '100vh' }}>
      <Navbar />
      <StyledContainer maxWidth="lg">
        {/* Studio Booking Form */}
        <StyledPaper elevation={0}>
          <SectionTitle>
            Studio Booking
          </SectionTitle>
          
          {/* Modern Progress Bar */}
          <Box sx={{ mb: 4 }}>
            <ProgressText>
              <span>Step {activeStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </ProgressText>
            <ProgressBar variant="determinate" value={progress} />
          </Box>

          {/* Form Content */}
          <Box sx={{ mb: 4 }}>
            {renderStepContent(activeStep)}
          </Box>
          
          {/* Navigation Buttons */}
          {activeStep < 4 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  sx={{ 
                    mr: 2,
                    color: themeColors.textSecondary,
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0',
                    padding: '8px 20px',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: themeColors.primary,
                      backgroundColor: 'rgba(230, 126, 34, 0.05)',
                    }
                  }}
                  variant="outlined"
                >
                  Back
                </Button>
              )}
              <NextButton
                onClick={handleNext}
                disabled={(activeStep === 0 && !formData.service) || (activeStep === 3 && !termsAccepted)}
                endIcon={<ArrowForwardIcon />}
              >
                {activeStep === 3 ? 'Submit Booking' : 'Next'}
              </NextButton>
            </Box>
          )}
        </StyledPaper>
        
        {/* Studio Gallery Section */}
        {activeStep !== 4 && (
          <Box sx={{ marginTop: '40px' }}>
            <SectionTitle>
              Studio Gallery
            </SectionTitle>
            
            <Grid container spacing={3}>
              {studioImages.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <GalleryImage 
                    src={image.url} 
                    alt={`Studio ${image.id}`} 
                    loading="lazy"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </StyledContainer>
      <Footer />
    </Box>
  );
};

export default StudioProfile;