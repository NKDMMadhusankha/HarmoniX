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
  LinearProgress,
  alpha,
  InputAdornment,
  Avatar
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

// Create a custom dark theme with black and dark blue colors
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0B62F8', // Bright blue
    },
    secondary: {
      main: '#90caf9', // Lighter blue for secondary elements
    },
    background: {
      default: '#121212', // Dark background
      paper: 'rgba(18, 30, 43, 0.8)', // Match the background
    },
    text: {
      primary: '#ffffff',
      secondary: '#888888',
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
          borderRadius: 12,
          border: '1px solid rgba(40, 40, 40, 0.8)',
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
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backdropFilter: 'blur(10px)', // More blur when dropdown is open
        },
      },
    },
  },
});

// List of genres
const genres = [
  'Pop', 'Rock', 'Jazz', 'EDM', 'Classical', 'R&B', 'Hip-Hop', 'Metal', 
  'Country', 'Blues', 'Folk', 'Reggae', 'Soul', 'Funk', 'Disco', 
  'Techno', 'House', 'Trap', 'Ambient', 'Indie'
];

// List of roles
const roles = [
  'Music Producer', 'Mixing Engineer', 'Mastering Engineer', 'Lyricist'
];

// List of experience levels
const experienceLevels = [
  '1-2 years', '3-5 years', '6+ years'
];

// List of countries with their dial codes and flag codes
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
  const [stepsCompleted, setStepsCompleted] = useState([false, false, false]);
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    role: '',
    genres: [],
    audioSamples: [],
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
    // Trigger animations when component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Update progress bar when steps are completed
  useEffect(() => {
    const newStepsCompleted = [...stepsCompleted];
    
    if (activeStep === 0) {
      if (
        formData.fullName && 
        formData.email && 
        formData.country && 
        formData.phoneNumber && 
        formData.password && 
        formData.confirmPassword &&
        formData.password === formData.confirmPassword
      ) {
        newStepsCompleted[0] = true;
      } else {
        newStepsCompleted[0] = false;
      }
    }
    
    if (activeStep === 1) {
      if (
        formData.role && 
        formData.experience && 
        (formData.role !== 'Music Producer' || formData.genres.length >= 2)
      ) {
        newStepsCompleted[1] = true;
      } else {
        newStepsCompleted[1] = false;
      }
    }
    
    if (activeStep === 2) {
      if (formData.audioSamples.length > 0) {
        newStepsCompleted[2] = true;
      } else {
        newStepsCompleted[2] = false;
      }
    }
    
    setStepsCompleted(newStepsCompleted);
  }, [formData, activeStep]);

  // Calculate progress percentage for the progress bar
  const steps = ['Personal Information', 'Your Role', 'Portfolio'];
  const progressPercentage = (stepsCompleted.filter(Boolean).length / steps.length) * 100;

  // Handle file uploads for audio samples
  const handleAudioUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({
      ...formData,
      audioSamples: [...formData.audioSamples, ...files]
    });
  };

  // Handle genre selection
  const handleGenreChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      genres: value
    });
  };

  // Handle form field changes
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

    // Clear error for the field when it's changed
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  // Handle country selection and update country code
  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    const selectedCountry = countries.find(country => country.name === countryName);
    
    setFormData({
      ...formData,
      country: countryName,
      countryCode: selectedCountry ? selectedCountry.code : '',
    });
    
    if (errors.country) {
      setErrors({
        ...errors,
        country: ''
      });
    }
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
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
      if (formData.audioSamples.length === 0) {
        newErrors.audioSamples = 'Please upload at least one audio sample';
      }
      if (!formData.termsAgreed) {
        newErrors.termsAgreed = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next button click
  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === 2) {
        // Submit form if on last step
        handleSubmit();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  // Handle back button click
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData);
    alert('Registration successful!');
    // Reset form or redirect
  };

  // Go back to registration category
  const navigateBack = () => {
    window.history.back();
  };

  // Render the steps content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                color: 'primary.main',
                fontWeight: 'bold',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  background: 'rgb(11, 98, 248)',
                  borderRadius: 4,
                }
              }}
            >
              Your Personal Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Enter your personal information to get closer to companies.
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
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.country} variant="outlined">
                  <InputLabel>Select Country</InputLabel>
                  <Select
                    value={formData.country}
                    onChange={handleCountryChange}
                    label="Select Country"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backdropFilter: 'blur(15px) !important',
                          backgroundColor: 'rgba(18, 30, 43, 0.95) !important',
                        }
                      }
                    }}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.name} value={country.name}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box component="span" sx={{ mr: 1, display: 'inline-flex' }}>
                            <img 
                              loading="lazy"
                              width="20"
                              height="14"
                              src={`https://flagcdn.com/w20/${country.flag}.png`}
                              srcSet={`https://flagcdn.com/w40/${country.flag}.png 2x`}
                              alt={`Flag of ${country.name}`}
                            />
                          </Box>
                          <Box component="span" sx={{ mr: 1 }}>
                            {country.code}
                          </Box>
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
                  variant="outlined"
                  InputProps={{
                    startAdornment: formData.country ? (
                      <InputAdornment position="start">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {formData.country && (
                            <Box component="span" sx={{ mr: 1, display: 'inline-flex' }}>
                              <img 
                                loading="lazy"
                                width="20"
                                height="14"
                                src={`https://flagcdn.com/w20/${countries.find(c => c.name === formData.country)?.flag}.png`}
                                srcSet={`https://flagcdn.com/w40/${countries.find(c => c.name === formData.country)?.flag}.png 2x`}
                                alt={`Flag of ${formData.country}`}
                              />
                            </Box>
                          )}
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {formData.countryCode}
                          </Typography>
                        </Box>
                      </InputAdornment>
                    ) : null
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
                  variant="outlined"
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
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
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
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
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
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                color: 'primary.main',
                fontWeight: 'bold',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  background: 'rgb(11, 98, 248)',
                  borderRadius: 4,
                }
              }}
            >
              Select Your Role
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.role} variant="outlined">
                  <InputLabel>Your Role</InputLabel>
                  <Select
                    value={formData.role}
                    onChange={handleChange('role')}
                    label="Your Role"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backdropFilter: 'blur(15px) !important',
                          backgroundColor: 'rgba(18, 30, 43, 0.95) !important',
                        }
                      }
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
              </Grid>
              
              {formData.role === 'Music Producer' && (
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.genres} variant="outlined">
                    <InputLabel>Select Genres (Minimum 2)</InputLabel>
                    <Select
                      multiple
                      value={formData.genres}
                      onChange={handleGenreChange}
                      label="Select Genres (Minimum 2)"
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backdropFilter: 'blur(15px) !important',
                            backgroundColor: 'rgba(18, 30, 43, 0.95) !important',
                          }
                        }
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip 
                              key={value} 
                              label={value} 
                              sx={{ 
                                backgroundColor: 'primary.dark',
                                '& .MuiChip-deleteIcon': {
                                  color: 'white',
                                  '&:hover': { color: 'rgba(255, 255, 255, 0.7)' }
                                }
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {genres.map((genre) => (
                        <MenuItem key={genre} value={genre}>
                          {genre}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.genres && <FormHelperText>{errors.genres}</FormHelperText>}
                  </FormControl>
                  {formData.genres.length >= 2 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckIcon />}
                      >
                        Done
                      </Button>
                    </Box>
                  )}
                </Grid>
              )}
              
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.experience} variant="outlined">
                  <InputLabel>Years of Experience</InputLabel>
                  <Select
                    value={formData.experience}
                    onChange={handleChange('experience')}
                    label="Years of Experience"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backdropFilter: 'blur(15px) !important',
                          backgroundColor: 'rgba(18, 30, 43, 0.95) !important',
                        }
                      }
                    }}
                  >
                    {experienceLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.experience && <FormHelperText>{errors.experience}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    mt: 2, 
                    color: 'secondary.main',
                    fontWeight: 'bold'
                  }}
                >
                  Social Media (Optional)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleChange('socialMedia', 'instagram')}
                      InputProps={{
                        startAdornment: <InstagramIcon color="primary" sx={{ mr: 1 }} />
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleChange('socialMedia', 'twitter')}
                      InputProps={{
                        startAdornment: <TwitterIcon color="primary" sx={{ mr: 1 }} />
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="LinkedIn"
                      value={formData.socialMedia.linkedin}
                      onChange={handleChange('socialMedia', 'linkedin')}
                      InputProps={{
                        startAdornment: <LinkedInIcon color="primary" sx={{ mr: 1 }} />
                      }}
                      variant="outlined"
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
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                color: 'primary.main',
                fontWeight: 'bold',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  background: 'rgb(11, 98, 248)',
                  borderRadius: 4,
                }
              }}
            >
              Upload Audio Samples & Portfolio Links
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    borderStyle: 'dashed',
                    borderColor: errors.audioSamples ? 'error.main' : alpha(theme.palette.primary.main, 0.5),
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    transition: 'all 0.3s ease'
                  }}
                >
                  <input
                    accept="audio/mp3,audio/wav"
                    id="audio-upload"
                    type="file"
                    multiple
                    onChange={handleAudioUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="audio-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      sx={{ 
                        mb: 2,
                        background: 'linear-gradient(45deg, #0B62F8 30%, #21CBF3 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #0B52D8 30%, #0BA3D1 90%)',
                        }
                      }}
                    >
                      Upload Audio (MP3, WAV)
                    </Button>
                  </label>
                  <Typography variant="body2" color="textSecondary">
                    Drag and drop files here or click to browse
                  </Typography>
                  {errors.audioSamples && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {errors.audioSamples}
                    </Typography>
                  )}
                </Paper>
              </Grid>
              
              {formData.audioSamples.length > 0 && (
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: 'secondary.main',
                      fontWeight: 'bold'
                    }}
                  >
                    Uploaded Samples ({formData.audioSamples.length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.audioSamples.map((file, index) => (
                      <Chip
                        key={index}
                        label={file.name}
                        onDelete={() => {
                          const newSamples = [...formData.audioSamples];
                          newSamples.splice(index, 1);
                          setFormData({
                            ...formData,
                            audioSamples: newSamples
                          });
                        }}
                        sx={{ 
                          backgroundColor: 'background.paper',
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.primary.main,
                            '&:hover': { color: theme.palette.primary.light }
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    mt: 2, 
                    color: 'secondary.main',
                    fontWeight: 'bold'
                  }}
                >
                  Portfolio Links (Optional)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Spotify Profile"
                      placeholder="https://open.spotify.com/artist/..."
                      value={formData.portfolioLinks.spotify}
                      onChange={handleChange('portfolioLinks', 'spotify')}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="SoundCloud Profile"
                      placeholder="https://soundcloud.com/..."
                      value={formData.portfolioLinks.soundcloud}
                      onChange={handleChange('portfolioLinks', 'soundcloud')}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="YouTube Channel"
                      placeholder="https://youtube.com/..."
                      value={formData.portfolioLinks.youtube}
                      onChange={handleChange('portfolioLinks', 'youtube')}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Apple Music Profile"
                      placeholder="https://music.apple.com/..."
                      value={formData.portfolioLinks.appleMusic}
                      onChange={handleChange('portfolioLinks', 'appleMusic')}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
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
                        sx={{ 
                          '&.Mui-checked': { 
                            color: theme.palette.primary.main 
                          } 
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the Terms of Service and Privacy Policy
                      </Typography>
                    }
                  />
                  {errors.termsAgreed && (
                    <FormHelperText>{errors.termsAgreed}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        {/* Background Effects */}
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <BackgroundEffect 
            sx={{ 
              top: { xs: -50, md: -100 }, 
              right: { xs: -50, md: -100 }, 
              opacity: animate ? 0.7 : 0, 
              transition: 'opacity 1.2s' 
            }} 
          />
          <BackgroundEffect 
            sx={{ 
              bottom: { xs: -75, md: -150 }, 
              left: { xs: -75, md: -150 }, 
              animationDelay: '2s', 
              opacity: animate ? 0.7 : 0, 
              transition: 'opacity 1.2s', 
              transitionDelay: '0.3s' 
            }} 
          />
        </Box>

        {/* Modern Progress Bar */}
        <Box sx={{ 
          width: '100%', 
          position: 'static', 
          top: 0, 
          zIndex: 9999,
          backgroundColor: 'rgba(18, 30, 43, 0.95)',
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          backdropFilter: 'blur(10px)',
          mb: 2
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 2
          }}>
            <Button
              onClick={navigateBack}
              startIcon={<ArrowBackIcon sx={{ fontSize: 20 }} />}
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
            
            <Box sx={{ 
              flex: 1, 
              mx: 2,
              position: 'relative',
              height: 8,
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.primary.main, 0.15)
            }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${progressPercentage}%`,
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  transition: 'width 0.5s ease',
                  boxShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.5)}`
                }}
              >
                <Box sx={{
                  position: 'absolute',
                  right: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.8)}`
                }} />
              </Box>
            </Box>
            
            <Typography variant="caption" sx={{ 
              color: 'text.secondary',
              minWidth: 80,
              textAlign: 'right'
            }}>
              {Math.round(progressPercentage)}% Complete
            </Typography>
          </Box>
        </Box>
      
        <Container component="main" maxWidth="md" sx={{ mb: 6, pt: 4, zIndex: 1, position: 'relative' }}>
          <Paper 
            elevation={6} 
            sx={{ 
              p: 4, 
              mt: 4, 
              background: `linear-gradient(to bottom, ${alpha('#121e2b', 0.9)}, ${alpha('#16213e', 0.9)})`,
              boxShadow: `0 8px 32px 0 ${alpha('#000', 0.37)}`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              backdropFilter: 'blur(4px)',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s, transform 0.8s',
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                align="center" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }} 
                gutterBottom
              >
                Musician Registration
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary">
                Fill out the form to create your professional musician profile
              </Typography>
            </Box>

            <Stepper 
              activeStep={activeStep} 
              alternativeLabel 
              sx={{ 
                mb: 5,
                '& .MuiStepIcon-root': {
                  color: alpha(theme.palette.primary.main, 0.3),
                  '&.Mui-active': {
                    color: theme.palette.primary.main,
                  },
                  '&.Mui-completed': {
                    color: theme.palette.success.main,
                  },
                },
                '& .MuiStepConnector-line': {
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
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
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.text.primary,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                endIcon={activeStep === steps.length - 1 ? <CheckIcon /> : <ArrowForwardIcon />}
                sx={{ 
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${alpha(theme.palette.primary.light, 0.9)} 90%)`,
                  boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.5)}`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                  }
                }}
                // Disable submit button on last step if terms not agreed
                disabled={activeStep === steps.length - 1 && !formData.termsAgreed}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Paper>
          
          {/* Already have an account? */}
          <Box sx={{ 
            mt: 5,
            textAlign: 'center', 
            opacity: animate ? 1 : 0, 
            transform: animate ? 'translateY(0)' : 'translateY(20px)', 
            transition: 'opacity 0.8s, transform 0.8s', 
            transitionDelay: '0.3s',
            zIndex: 10,
            position: 'relative'
          }}>
            <Typography variant="body2" color="#737373">
              Already have an account? <Link href="/login" sx={{ color: '#4A89DC', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sign in</Link>
            </Typography>
          </Box>
        </Container>
      </GradientBackground>
    </ThemeProvider>
  );
};

export default MusicianRegistrationForm;