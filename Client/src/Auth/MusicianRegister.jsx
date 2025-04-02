import React, { useState } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardMedia,
  Link
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Preview as PreviewIcon,
  Check as CheckIcon
} from '@mui/icons-material';

// Create a custom theme with black and blue colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#212121', // Black
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
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

// List of countries (simplified for example)
const countries = ['Sri Lanka','United States', 'United Kingdom', 'Canada', 'Australia', 'France', 'Germany', 'Japan', 'Brazil', 'India', 'Nigeria'];

// Cities based on country (simplified for example)
const citiesByCountry = {
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Nashville'],
  'United Kingdom': ['London', 'Manchester', 'Liverpool', 'Glasgow', 'Birmingham'],
  'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
  'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
  'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Sapporo'],
  'Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
  'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt']
};

const MusicianRegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    country: '',
    city: '',
    role: '',
    genres: [],
    audioSamples: [],
    portfolioLinks: {
      spotify: '',
      soundcloud: '',
      youtube: '',
      appleMusic: ''
    },
    profileImage: null,
    coverImage: null,
    experience: '',
    socialMedia: {
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    termsAgreed: false
  });
  const [errors, setErrors] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);

  // Handle city options based on selected country
  const cityOptions = formData.country ? citiesByCountry[formData.country] || [] : [];

  // Handle file uploads for audio samples
  const handleAudioUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({
      ...formData,
      audioSamples: [...formData.audioSamples, ...files]
    });
  };

  // Handle image uploads
  const handleImageUpload = (type) => (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFormData({
        ...formData,
        [type]: file
      });
    }
  };

  // Handle genre selection
  const handleGenreChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      genres: value.slice(0, 2) // Max 2 genres
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

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.city) newErrors.city = 'City is required';
    } else if (activeStep === 1) {
      if (!formData.role) newErrors.role = 'Role is required';
      if (formData.role === 'Music Producer' && formData.genres.length === 0) {
        newErrors.genres = 'Please select at least one genre';
      }
      if (!formData.experience) newErrors.experience = 'Experience level is required';
    } else if (activeStep === 2) {
      if (formData.audioSamples.length === 0) {
        newErrors.audioSamples = 'Please upload at least one audio sample';
      }
    } else if (activeStep === 3) {
      if (!formData.profileImage) {
        newErrors.profileImage = 'Profile image is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next button click
  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === 3) {
        // Show preview before final submission
        setPreviewOpen(true);
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
    // Close the preview and reset form or redirect
    setPreviewOpen(false);
    alert('Registration successful!');
    // Reset form or redirect
  };

  // Render the steps content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Your Personal Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Enter your personal information to get closer to companies.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                <FormControl fullWidth error={!!errors.country}>
                  <InputLabel>Select Country</InputLabel>
                  <Select
                    value={formData.country}
                    onChange={handleChange('country')}
                    label="Select Country"
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={!formData.country} error={!!errors.city}>
                  <InputLabel>Select City</InputLabel>
                  <Select
                    value={formData.city}
                    onChange={handleChange('city')}
                    label="Select City"
                  >
                    {cityOptions.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
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
                  <FormControl fullWidth error={!!errors.genres}>
                    <InputLabel>Select Genres (Max 2)</InputLabel>
                    <Select
                      multiple
                      value={formData.genres}
                      onChange={handleGenreChange}
                      label="Select Genres (Max 2)"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {genres.map((genre) => (
                        <MenuItem
                          key={genre}
                          value={genre}
                          disabled={formData.genres.length >= 2 && !formData.genres.includes(genre)}
                        >
                          {genre}
                        </MenuItem>
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
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.experience && <FormHelperText>{errors.experience}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
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
            <Typography variant="h5" sx={{ mb: 3 }}>
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
                    borderColor: errors.audioSamples ? 'error.main' : 'divider',
                    backgroundColor: 'background.paper'
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
                      sx={{ mb: 2 }}
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
                  <Typography variant="h6" sx={{ mb: 2 }}>
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
                      />
                    ))}
                  </Box>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="SoundCloud Profile"
                      placeholder="https://soundcloud.com/..."
                      value={formData.portfolioLinks.soundcloud}
                      onChange={handleChange('portfolioLinks', 'soundcloud')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="YouTube Channel"
                      placeholder="https://youtube.com/..."
                      value={formData.portfolioLinks.youtube}
                      onChange={handleChange('portfolioLinks', 'youtube')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Apple Music Profile"
                      placeholder="https://music.apple.com/..."
                      value={formData.portfolioLinks.appleMusic}
                      onChange={handleChange('portfolioLinks', 'appleMusic')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Profile & Cover Images
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Profile Image (Required)
                </Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    height: 240,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: formData.profileImage ? 'solid' : 'dashed',
                    borderColor: errors.profileImage ? 'error.main' : 'divider',
                    backgroundColor: 'background.paper',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    ...(formData.profileImage && {
                      backgroundImage: `url(${URL.createObjectURL(formData.profileImage)})`
                    })
                  }}
                >
                  {!formData.profileImage && (
                    <>
                      <input
                        accept="image/*"
                        id="profile-image-upload"
                        type="file"
                        onChange={handleImageUpload('profileImage')}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="profile-image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                          sx={{ mb: 2 }}
                        >
                          Upload Profile Image
                        </Button>
                      </label>
                      <Typography variant="body2" color="textSecondary">
                        Square format recommended
                      </Typography>
                    </>
                  )}
                  
                  {formData.profileImage && (
                    <Box sx={{ position: 'absolute', right: 16, bottom: 16 }}>
                      <input
                        accept="image/*"
                        id="profile-image-change"
                        type="file"
                        onChange={handleImageUpload('profileImage')}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="profile-image-change">
                        <Button
                          variant="contained"
                          component="span"
                          size="small"
                        >
                          Change
                        </Button>
                      </label>
                    </Box>
                  )}
                </Paper>
                {errors.profileImage && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.profileImage}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Cover Image (Optional)
                </Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    height: 240,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: formData.coverImage ? 'solid' : 'dashed',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    ...(formData.coverImage && {
                      backgroundImage: `url(${URL.createObjectURL(formData.coverImage)})`
                    })
                  }}
                >
                  {!formData.coverImage && (
                    <>
                      <input
                        accept="image/*"
                        id="cover-image-upload"
                        type="file"
                        onChange={handleImageUpload('coverImage')}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="cover-image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                          sx={{ mb: 2 }}
                        >
                          Upload Cover Image
                        </Button>
                      </label>
                      <Typography variant="body2" color="textSecondary">
                        Banner format (1200x300) recommended
                      </Typography>
                    </>
                  )}
                  
                  {formData.coverImage && (
                    <Box sx={{ position: 'absolute', right: 16, bottom: 16 }}>
                      <input
                        accept="image/*"
                        id="cover-image-change"
                        type="file"
                        onChange={handleImageUpload('coverImage')}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="cover-image-change">
                        <Button
                          variant="contained"
                          component="span"
                          size="small"
                        >
                          Change
                        </Button>
                      </label>
                    </Box>
                  )}
                </Paper>
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.termsAgreed}
                      onChange={handleChange('termsAgreed')}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the Terms of Service and Privacy Policy
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  // Render profile preview dialog
  const renderProfilePreview = () => (
    <Dialog
      open={previewOpen}
      onClose={() => setPreviewOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5">
          Preview Your Profile
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ position: 'relative', mb: 4, height: 200, backgroundColor: '#f0f0f0' }}>
          {formData.coverImage && (
            <Box
              component="img"
              src={URL.createObjectURL(formData.coverImage)}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover'
              }}
              alt="Cover"
            />
          )}
          
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: 32,
              width: 100,
              height: 100,
              borderRadius: '50%',
              border: '4px solid white',
              overflow: 'hidden',
              backgroundColor: '#ccc'
            }}
          >
            {formData.profileImage && (
              <Box
                component="img"
                src={URL.createObjectURL(formData.profileImage)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                alt="Profile"
              />
            )}
          </Box>
        </Box>
        
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {formData.firstName} {formData.lastName}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
            {formData.role}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Typography variant="body1">
                    <strong>Location:</strong> {formData.city}, {formData.country}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {formData.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phone:</strong> {formData.phoneNumber}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Experience:</strong> {formData.experience}
                  </Typography>
                  
                  {formData.role === 'Music Producer' && formData.genres.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Genres:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {formData.genres.map((genre) => (
                          <Chip key={genre} label={genre} color="primary" size="small" />
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
              
              {Object.values(formData.socialMedia).some(val => val) && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Social Media
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {formData.socialMedia.instagram && (
                        <IconButton color="primary">
                          <InstagramIcon />
                        </IconButton>
                      )}
                      {formData.socialMedia.twitter && (
                        <IconButton color="primary">
                          <TwitterIcon />
                        </IconButton>
                      )}
                      {formData.socialMedia.linkedin && (
                        <IconButton color="primary">
                          <LinkedInIcon />
                        </IconButton>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Audio Samples
                  </Typography>
                  {formData.audioSamples.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {formData.audioSamples.map((file, index) => (
                        <Typography key={index} variant="body1">
                          {file.name}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No audio samples uploaded
                    </Typography>
                  )}
                </CardContent>
              </Card>
              
              {Object.values(formData.portfolioLinks).some(val => val) && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Portfolio Links
                    </Typography>
                    <Box sx={{ display: 'flex',
                    // Continue the Portfolio Links card in the preview dialog
                    flexDirection: 'column', gap: 1 }}>
                    {formData.portfolioLinks.spotify && (
                    <Link href={formData.portfolioLinks.spotify} target="_blank" rel="noopener noreferrer">
                        Spotify
                    </Link>
                    )}
                    {formData.portfolioLinks.soundcloud && (
                    <Link href={formData.portfolioLinks.soundcloud} target="_blank" rel="noopener noreferrer">
                        SoundCloud
                    </Link>
                    )}
                    {formData.portfolioLinks.youtube && (
                    <Link href={formData.portfolioLinks.youtube} target="_blank" rel="noopener noreferrer">
                        YouTube
                    </Link>
                    )}
                    {formData.portfolioLinks.appleMusic && (
                    <Link href={formData.portfolioLinks.appleMusic} target="_blank" rel="noopener noreferrer">
                        Apple Music
                    </Link>
                    )}
                    </Box>
                    </CardContent>
                    </Card>
                    )}
                    </Grid>
                    </Grid>
                    </Box>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setPreviewOpen(false)}>Edit Profile</Button>
                    <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    disabled={!formData.termsAgreed}
                    startIcon={<CheckIcon />}
                    >
                    Complete Registration
                    </Button>
                    </DialogActions>
                    </Dialog>
                    );

                    // Steps titles for the stepper
                    const steps = ['Personal Information', 'Your Role', 'Portfolio', 'Profile Images'];

                    return (
                    <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="md" sx={{ mb: 6 }}>
                    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" align="center" color="secondary" gutterBottom>
                    Musician Registration
                    </Typography>
                    <Typography variant="body1" align="center" color="textSecondary">
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

                    <Box>
                    {activeStep === steps.length - 1 ? (
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    endIcon={<PreviewIcon />}
                    disabled={!formData.termsAgreed}
                    >
                    Preview Profile
                    </Button>
                    ) : (
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    endIcon={<ArrowForwardIcon />}
                    >
                    Next
                    </Button>
                    )}
                    </Box>
                    </Box>
                    </Paper>

                    {renderProfilePreview()}
                    </Container>
                    </ThemeProvider>
                    );
                    };

export default MusicianRegistrationForm;