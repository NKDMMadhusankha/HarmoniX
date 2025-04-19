import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
  ThemeProvider,
  createTheme,
  IconButton,
  Chip,
  Link,
  alpha,
  InputAdornment
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Check as CheckIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled components for background
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #000000, #0F1824)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
}));

const BackgroundEffect = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '300px',
  height: '300px',
  [theme.breakpoints.up('md')]: {
    width: '500px',
    height: '500px',
  },
  background: 'radial-gradient(circle, rgba(15, 55, 84, 0.6), rgba(0, 0, 0, 0))',
  borderRadius: '50%',
  filter: 'blur(80px)',
  opacity: 0.4,
  animation: 'float 12s infinite ease-in-out',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) scale(1)',
    },
    '50%': {
      transform: 'translateY(-50px) scale(1.1)',
    },
  },
}));

// Create a custom dark theme with darker form elements
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0B62F8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: 'rgba(5, 10, 15, 0.95)', // Much darker paper background
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(10, 15, 20, 0.95)', // Darker paper
          borderRadius: 12,
          border: '1px solid rgba(30, 30, 30, 0.8)', // Darker border
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 15px rgba(11, 98, 248, 0.5)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(20, 25, 30, 0.8)', // Darker input background
            '& fieldset': {
              borderColor: 'rgba(60, 60, 60, 0.8)', // Darker border
            },
            '&:hover fieldset': {
              borderColor: 'rgba(90, 90, 90, 0.8)', // Darker hover border
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0B62F8',
              boxShadow: '0 0 0 2px rgba(11, 98, 248, 0.2)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: 'rgba(20, 25, 30, 0.8)', // Darker select background
          '&:focus': {
            backgroundColor: 'rgba(20, 25, 30, 0.8)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#aaaaaa', // Lighter label color for better contrast
          '&.Mui-focused': {
            color: '#0B62F8',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.5)',
          '&.Mui-checked': {
            color: '#0B62F8',
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            color: '#0B62F8',
          },
          '&.Mui-active': {
            color: '#0B62F8',
          },
        },
      },
    },
  },
});

// Data constants
const genres = [
  'Pop', 'Rock', 'Jazz', 'EDM', 'Classical', 'R&B', 'Hip-Hop', 'Metal',
  'Country', 'Blues', 'Folk', 'Reggae', 'Soul', 'Funk', 'Disco',
  'Techno', 'House', 'Trap', 'Ambient', 'Indie'
];

const roles = [
  'Music Producer', 'Mixing Engineer', 'Mastering Engineer', 'Lyricist'
];

const experienceLevels = ['1-2 years', '3-5 years', '6+ years'];

const countries = [
  { name: 'Sri Lanka', code: '+94', flag: 'lk' },
  { name: 'United States', code: '+1', flag: 'us' },
  { name: 'United Kingdom', code: '+44', flag: 'gb' },
  { name: 'Canada', code: '+1', flag: 'ca' },
  { name: 'Australia', code: '+61', flag: 'au' },
  { name: 'France', code: '+33', flag: 'fr' },
  { name: 'Germany', code: '+49', flag: 'de' },
  { name: 'Japan', code: '+81', flag: 'jp' },
  { name: 'Brazil', code: '+55', flag: 'br' },
  { name: 'India', code: '+91', flag: 'in' },
  { name: 'Nigeria', code: '+234', flag: 'ng' }
];

const MusicianRegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    role: '',
    genres: [],
    portfolioLinks: {
      spotify: '',
      soundcloud: '',
      youtube: '',
      appleMusic: ''
    },
    experience: '',
    socialMedia: {
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    termsAgreed: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleGenreChange = (event) => {
    setFormData({
      ...formData,
      genres: event.target.value
    });
  };

  const handleChange = (field, subfield = null) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    
    if (subfield) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subfield]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    setFormData({
      ...formData,
      country: countryName
    });
    
    if (errors.country) {
      setErrors({
        ...errors,
        country: ''
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    } else if (activeStep === 1) {
      if (!formData.role) newErrors.role = 'Role is required';
      if (formData.role === 'Music Producer' && formData.genres.length < 2) {
        newErrors.genres = 'Please select at least 2 genres';
      }
      if (!formData.experience) newErrors.experience = 'Experience level is required';
    } else if (activeStep === 2) {
      if (!formData.termsAgreed) newErrors.termsAgreed = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === 2) {
        handleSubmit();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting form data:', formData); // Log formData for debugging

      const response = await fetch('http://localhost:5000/api/musician/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Registration successful:', data);
        
        // Redirect based on role
        switch(formData.role) {
          case 'Music Producer':
            window.location.href = '/musicpro/dashboard';
            break;
          case 'Mixing Engineer':
            window.location.href = '/mixing/dashboard';
            break;
          case 'Mastering Engineer':
            window.location.href = '/mastering/dashboard';
            break;
          case 'Lyricist':
            window.location.href = '/lyricist/dashboard';
            break;
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const navigateBack = () => {
    window.history.back();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
              Your Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.country}>
                  <InputLabel>Select Country</InputLabel>
                  <Select
                    value={formData.country}
                    onChange={handleCountryChange}
                    label="Select Country"
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.name} value={country.name}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img 
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${country.flag}.png`}
                            alt={`Flag of ${country.name}`}
                            style={{ marginRight: 8 }}
                          />
                          {country.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  InputProps={{
                    startAdornment: formData.country && (
                      <InputAdornment position="start">
                        {countries.find(c => c.name === formData.country)?.code}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
              Select Your Role
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Your Role</InputLabel>
                  <Select
                    value={formData.role}
                    onChange={handleChange('role')}
                    label="Your Role"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                  </Select>
                  {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
              </Grid>
              
              {formData.role === 'Music Producer' && (
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.genres}>
                    <InputLabel>Select Genres (Minimum 2)</InputLabel>
                    <Select
                      multiple
                      value={formData.genres}
                      onChange={handleGenreChange}
                      label="Select Genres (Minimum 2)"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {genres.map((genre) => (
                        <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                      ))}
                    </Select>
                    {errors.genres && <FormHelperText>{errors.genres}</FormHelperText>}
                  </FormControl>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.experience}>
                  <InputLabel>Years of Experience</InputLabel>
                  <Select
                    value={formData.experience}
                    onChange={handleChange('experience')}
                    label="Years of Experience"
                  >
                    {experienceLevels.map((level) => (
                      <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                  </Select>
                  {errors.experience && <FormHelperText>{errors.experience}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2, color: 'secondary.main' }}>
                  Social Media (Optional)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleChange('socialMedia', 'instagram')}
                      InputProps={{ startAdornment: <InstagramIcon color="primary" sx={{ mr: 1 }} /> }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleChange('socialMedia', 'twitter')}
                      InputProps={{ startAdornment: <TwitterIcon color="primary" sx={{ mr: 1 }} /> }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="LinkedIn"
                      value={formData.socialMedia.linkedin}
                      onChange={handleChange('socialMedia', 'linkedin')}
                      InputProps={{ startAdornment: <LinkedInIcon color="primary" sx={{ mr: 1 }} /> }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
              Portfolio Links
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                  Portfolio Links (Optional)
                </Typography>
                <Grid container spacing={2}>
                  {['spotify', 'soundcloud', 'youtube', 'appleMusic'].map((service) => (
                    <Grid item xs={12} sm={6} key={service}>
                      <TextField
                        fullWidth
                        label={`${service.charAt(0).toUpperCase() + service.slice(1)} Profile`}
                        placeholder={`https://${service}.com/...`}
                        value={formData.portfolioLinks[service]}
                        onChange={handleChange('portfolioLinks', service)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <FormControl error={!!errors.termsAgreed}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.termsAgreed}
                        onChange={handleChange('termsAgreed')}
                        color="primary"
                      />
                    }
                    label="I agree to the Terms of Service and Privacy Policy"
                  />
                  {errors.termsAgreed && <FormHelperText>{errors.termsAgreed}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  const steps = ['Personal Information', 'Your Role', 'Portfolio'];

  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        {/* Background Effects */}
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <BackgroundEffect sx={{ top: -50, right: -50, opacity: animate ? 0.7 : 0 }} />
          <BackgroundEffect sx={{ bottom: -75, left: -75, opacity: animate ? 0.7 : 0 }} />
        </Box>

        {/* Back Button at Top */}
        <Box sx={{ width: '100%', p: 2, zIndex: 1 }}>
          <Button
            onClick={navigateBack}
            startIcon={<ArrowBackIcon />}
            sx={{ 
              color: '#737373',
              textTransform: 'uppercase',
              '&:hover': {
                color: '#0B62F8',
                background: 'transparent',
              }
            }}
          >
            Back
          </Button>
        </Box>
      
        <Container component="main" maxWidth="md" sx={{ mb: 6, zIndex: 1 }}>
          <Paper elevation={6} sx={{ p: 4, mt: 2 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Musician Registration
              </Typography>
              <Typography align="center" color="text.secondary">
                Fill out the form to create your professional musician profile
              </Typography>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={activeStep === steps.length - 1 ? <CheckIcon /> : <ArrowForwardIcon />}
                disabled={activeStep === steps.length - 1 && !formData.termsAgreed}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Paper>
          
          <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account ? <Link href="/login">Sign in</Link>
            </Typography>
          </Box>
        </Container>
      </GradientBackground>
    </ThemeProvider>
  );
};

export default MusicianRegistrationForm;