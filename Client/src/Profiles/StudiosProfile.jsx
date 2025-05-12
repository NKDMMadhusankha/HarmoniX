import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Divider, 
  Card, 
  CardMedia, 
  CardContent,
  Container,
  TextField,
  IconButton,
  MenuItem,
  InputAdornment,
  useTheme,
  createTheme,
  ThemeProvider,
  Modal,
  Dialog,
  DialogContent,
  Backdrop,
  Link
} from '@mui/material';
import { 
  ArrowBackIos, 
  ArrowForwardIos, 
  Share, 
  Bookmark, 
  EventAvailable, 
  AccessTime, 
  Info,
  KeyboardArrowDown,
  Close,
  LocationOn
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader'; // Import the Loader component

// Create a dark theme with teal accents
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00BCD4', // Brighter cyan for better visibility on dark
    },
    secondary: {
      main: '#4DD0E1', // Lighter cyan for accents
    },
    background: {
      default: '#000000', // Black background as requested
      paper: '#121212', // Dark paper background
    },
    text: {
      primary: '#ffffff', // White text as requested
      secondary: '#cccccc', // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
      color: '#ffffff', // Ensuring headers are white
    },
    h5: {
      fontWeight: 500,
      color: '#ffffff', // Ensuring headers are white
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #009688 30%, #00BCD4 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00796b 30%, #0097A7 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          backgroundColor: '#121212', // Dark card background
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#121212', // Dark paper background
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.23)', // Lighter border for inputs
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)', // Lighter border on hover
          },
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.12)', // Lighter divider
        }
      }
    }
  }
});

// Available time slots
const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM'},
  { value: '11:00', label: '11:00 AM'},
  { value: '12:00', label: '12:00 PM'},
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '20:00', label: '8:00 PM' },
  { value: '21:00', label: '9:00 PM' },
  { value: '22:00', label: '10:00 PM'},
];

// Studio gear list
const studioGear = [
  { category: 'Interface', items: ['UAD Apollo Twin X', 'SSL 2+'] },
  { category: 'Microphones', items: ['Neumann TLM 103', 'Shure SM7B', 'AKG C414'] },
  { category: 'Monitors', items: ['Yamaha HS8', 'Avantone Mixcubes'] },
  { category: 'Preamps', items: ['Neve 1073 SPX', 'Warm Audio WA8000'] },
  { category: 'Compressors', items: ['Tube-Tech CL1B', 'Wesaudio Dione', 'Neve 33609'] },
  { category: 'EQ', items: ['Wesaudio Prometheus', 'Pultec EQP-1A'] },
  { category: 'Reverb', items: ['Lexicon PCM96', 'Bricasti M7'] },
  { category: 'Monitoring', items: ['Dangerous Music Monitor ST', 'Barefoot Footprint 01'] },
];

const getImageUrl = (key) => {
  if (!key) return '/assets/default-placeholder.png';
  
  // If it's already a full URL, use it directly
  if (key.startsWith('http')) return key;
  
  // Otherwise construct the S3 URL (or use your signed URL logic)
  return `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${key}`;
};

const StudioProfile = () => {
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studioImages, setStudioImages] = useState([]);
  const [error, setError] = useState(null);
  const [about, setAbout] = useState(null); // Add state for 'about'
  const [studioDescription, setStudioDescription] = useState('');
  const [services, setServices] = useState([]);
  const [features, setFeatures] = useState([]);
  const [gear, setGear] = useState([]);
  const [country, setCountry] = useState(''); // Add state for 'country'
  const [recordingBooths, setRecordingBooths] = useState('');
  const [loungeArea, setLoungeArea] = useState('');
  const [studioFeatures, setStudioFeatures] = useState([]);
  const { id } = useParams();

  // Add an onError handler to replace broken images with a default placeholder
  const handleImageError = (event) => {
    event.target.src = '/assets/default-placeholder.png';
    event.target.style.objectFit = 'contain'; // Change to contain for placeholder
    event.target.onerror = null; // Prevent infinite loop if placeholder fails
  };

  useEffect(() => {
    const fetchStudioData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/studio/${id}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
        });

        if (response.data.success) {
          const studioData = response.data.studio;
          setStudio(studioData);
          setStudioImages(studioData.studioImages || []);
          setAbout(studioData.about || '');
          setStudioDescription(studioData.studioDescription || '');
          setServices(studioData.services || []);
          setFeatures(studioData.features || []);
          setGear(studioData.studioGear || []);
          setCountry(studioData.country || '');
          setRecordingBooths(studioData.recordingBooths || 'No details available.');
          setLoungeArea(studioData.loungeArea || 'No details available.');
          setStudioFeatures(studioData.studioFeatures || []);
        } else {
          setError('Failed to fetch studio data.');
        }
      } catch (err) {
        console.error('Error fetching studio data:', err);
        setError('An error occurred while fetching studio data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudioData();
  }, [id]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  
  // Hourly rate in LKR
  const hourlyRate = 5000;

  // Handle image navigation
  const handleNextImage = () => {
    setGalleryImageIndex((prevIndex) => 
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevImage = () => {
    setGalleryImageIndex((prevIndex) => 
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };

  // Open gallery modal with specific image
  const openGallery = (index) => {
    setGalleryImageIndex(index);
    setGalleryOpen(true);
  };

  // Close gallery modal
  const closeGallery = () => {
    setGalleryOpen(false);
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Function to open Google Maps with the fetched address
  const openInGoogleMaps = () => {
    if (studio?.address) {
      const encodedAddress = encodeURIComponent(studio.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    } else {
      console.error('Address not available');
    }
  };

  // If no images are available, show a placeholder
  const displayImages = studioImages; // Use only fetched images

  if (loading) {
    return <Loader />; // Use the Loader component
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (displayImages.length === 0) {
    return <div>No images available for this studio.</div>; // Handle case where no images are fetched
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Container maxWidth="lg">
          {/* Studio Title & Actions */}
          <Box sx={{ pt: 4, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ color: 'text.primary', cursor: 'pointer' }}>
              {studio?.studioName || 'Studio Name Not Available'}
            </Typography>
          </Box>

          {/* Location - Updated to be clickable */}
          <Box sx={{ display: 'flex', alignItems: 'start', mb: 3, cursor: 'pointer' }} onClick={openInGoogleMaps}>
            <LocationOn sx={{ color: 'error.main', mr: 1, mt: 0.5 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                {studio?.address || 'Address Not Available'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {country || 'Country Not Available'}
              </Typography>
            </Box>
          </Box>
          
          {/* Main Image Gallery - Photo Collage */}
          <Grid container spacing={1} sx={{ mb: 4 }}>
            {/* Main large image */}
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 400 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => openGallery(0)}
              >
                <Box
                  component="img"
                  src={getImageUrl(displayImages[0])}
                  alt="Studio Main"
                  onError={handleImageError}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Grid>
            
            {/* Right column of smaller images */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={1}>
                {[1, 2].map((index) => (
                  <Grid item xs={6} md={12} key={index}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: { xs: 145, md: 197 },
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={() => openGallery(index)}
                    >
                      <Box
                        component="img"
                        src={getImageUrl(displayImages[index])}
                        alt={`Studio Image ${index}`}
                        onError={handleImageError}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            
            {/* Bottom row of smaller images */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {[3, 4].map((index) => (
                  <Grid item xs={4} md={4} key={index}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: 180,
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={() => openGallery(index)}
                    >
                      <Box
                        component="img"
                        src={getImageUrl(displayImages[index])}
                        alt={`Studio Image ${index}`}
                        onError={handleImageError}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
                
                {/* Show the 6th image (index 5) */}
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 180,
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    onClick={() => openGallery(5)}
                  >
                    <Box
                      component="img"
                      src={getImageUrl(displayImages[5])}
                      alt="Studio Image 6"
                      onError={handleImageError}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    
                    {/* View all overlay on the 6th image */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
                        transition: 'background-color 0.3s',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.7)',
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openGallery(0);
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          borderRadius: 1,
                          mb: 1,
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: 0.5 }} />
                          <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: 0.5 }} />
                          <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: 0.5 }} />
                          <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: 0.5 }} />
                        </Box>
                      </Box>
                      <Typography variant="button" sx={{ color: 'white', fontWeight: 'medium' }}>
                        View all
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Main Content Area */}
          <Grid container spacing={4}>
            {/* Left Column - Studio Info */}
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
                {/* About the Studio Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" sx={{ color: 'text.primary', mb: '10px' }}>About the Studio</Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary', 
                      wordWrap: 'break-word', // Ensure text wraps properly
                      whiteSpace: 'pre-wrap' // Preserve line breaks if any
                    }}
                  >
                    {studioDescription || 'No description available.'}
                  </Typography>
                </Box>
                
                {/* Services Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Services</Typography>
                  {services.length > 0 ? (
                    <Grid container spacing={2}>
                      {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Paper 
                            elevation={2} 
                            sx={{ 
                              p: 1, // Further reduced padding to lower height
                              bgcolor: 'background.paper',
                              borderRadius: 2,
                              textAlign: 'center',
                              borderLeft: '4px solid #2196F3', // Changed to blue color
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
                              }
                            }}
                          >
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: 'text.primary', 
                                fontWeight: 'bold'
                              }}
                            >
                              {service}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      No services available.
                    </Typography>
                  )}
                </Box>

                {/* Studio Equipment Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>Studio Equipment</Typography>
                  {gear.length > 0 ? (
                    gear.map((g, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          {g.category}:
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {g.items.join(' • ')}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      No studio equipment available.
                    </Typography>
                  )}
                </Box>

                {/* Studio Features Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>Studio Features</Typography>
                  {features.length > 0 ? (
                    <ul>
                      {features.map((feature, index) => (
                        <li key={index} style={{ color: 'text.secondary' }}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      No features available.
                    </Typography>
                  )}
                </Box>

                {/* Recording Booths Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>Recording Booths</Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary', 
                      wordWrap: 'break-word', 
                      whiteSpace: 'pre-wrap' 
                    }}
                  >
                    {recordingBooths}
                  </Typography>
                </Box>

                {/* Lounge Area Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>Lounge Area</Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary', 
                      wordWrap: 'break-word', 
                      whiteSpace: 'pre-wrap' 
                    }}
                  >
                    {loungeArea}
                  </Typography>
                </Box>

                {/* Studio Features Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>Studio Features</Typography>
                  {studioFeatures.length > 0 ? (
                    <ul>
                      {studioFeatures.map((feature, index) => (
                        <li key={index} style={{ color: 'text.secondary' }}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      No features available.
                    </Typography>
                  )}
                </Box>

                <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', color: 'text.primary', fontWeight: 'medium' }}>
                  We look forward to welcoming you to AudioHaus and helping you realize your musical projects in a professional and inspiring environment.
                </Typography>
              </Paper>
            </Grid>
            
            {/* Right Column - Booking Widget */}
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, position: 'sticky', top: 20, bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', mb: 4 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'text.primary' }}>
                  For Booking
                </Typography>
                
                {/* Date Selection */}
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.primary' }}>
                  Date and time
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    value={formatDate(selectedDate)}
                    onClick={() => setShowCalendar(!showCalendar)}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <KeyboardArrowDown />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      }
                    }}
                  />
                  
                  {showCalendar && (
                    <Paper elevation={3} sx={{ mt: 1, p: 1, width: '100%' }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateCalendar
                          value={selectedDate}
                          onChange={(newDate) => {
                            setSelectedDate(newDate);
                            setShowCalendar(false);
                          }}
                          disablePast
                          sx={{
                            color: 'text.primary',
                            '& .MuiPickersDay-root': {
                              color: 'text.primary',
                            },
                            '& .MuiPickersDay-today': {
                              borderColor: 'primary.main',
                            },
                            '& .Mui-selected': {
                              backgroundColor: 'primary.main',
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </Paper>
                  )}
                </Box>
                
                {/* Time Selection */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Start Time"
                      fullWidth
                      value={selectedStartTime}
                      onChange={(e) => setSelectedStartTime(e.target.value)}
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: 'text.secondary',
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                        }
                      }}
                    >
                      {timeSlots.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="End Time"
                      fullWidth
                      value={selectedEndTime}
                      onChange={(e) => setSelectedEndTime(e.target.value)}
                      disabled={!selectedStartTime}
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: 'text.secondary',
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                        }
                      }}
                    >
                      {timeSlots
                        .filter((slot) => {
                          if (!selectedStartTime) return false;
                          const startHour = parseInt(selectedStartTime.split(':')[0]);
                          const slotHour = parseInt(slot.value.split(':')[0]);
                          return slotHour > startHour;
                        })
                        .map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                </Grid>
                
                {/* Minimum Duration Info */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    p: 1,
                    bgcolor: 'rgba(255, 193, 7, 0.15)', // Darker yellow background for dark mode
                    borderRadius: 1
                  }}
                >
                  <Info sx={{ mr: 1, color: 'warning.light' }} /> {/* Lighter warning color for dark mode */}
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    2 hr minimum
                    <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                      The host is more likely to accept if your request meets their minimum duration.
                    </Typography>
                  </Typography>
                </Box>
                
                {/* Price Information */}
                <Divider sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    Rate
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                    LKR {hourlyRate.toLocaleString()} / hour
                  </Typography>
                </Box>
                
                {/* Booking Button */}
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  size="large"
                  disabled={!selectedDate || !selectedStartTime || !selectedEndTime}
                  sx={{ mb: 2 }}
                >
                  Request to Book
                </Button>
                
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'text.secondary' }}>
                  You won't be charged yet.
                </Typography>
                
                {/* Host Response Time */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                  <EventAvailable sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Host typically responds within 2 hrs
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        
        {/* Full Screen Gallery Modal - Already has dark theme */}
        <Dialog
          open={galleryOpen}
          onClose={closeGallery}
          maxWidth="lg"
          fullWidth
          BackdropProps={{
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.95)' } // Already dark
          }}
          PaperProps={{
            sx: { 
              bgcolor: 'transparent',
              boxShadow: 'none',
              overflow: 'hidden',
              maxHeight: '90vh',
              height: 'auto',
              m: 2
            }
          }}
        >
          <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
            <IconButton 
              onClick={closeGallery}
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                zIndex: 10
              }}
            >
              <Close />
            </IconButton>
            
            <Box sx={{ position: 'relative', width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box
                component="img"
                src={getImageUrl(displayImages[galleryImageIndex])}
                alt={`Studio Image ${galleryImageIndex + 1}`}
                onError={handleImageError}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain'
                }}
              />
              
              <IconButton 
                onClick={handlePrevImage}
                sx={{ 
                  position: 'absolute', 
                  left: 16, 
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                }}
              >
                <ArrowBackIos />
              </IconButton>
              
              <IconButton 
                onClick={handleNextImage}
                sx={{ 
                  position: 'absolute', 
                  right: 16, 
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                }}
              >
                <ArrowForwardIos />
              </IconButton>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  position: 'absolute', 
                  bottom: 16, 
                  left: '50%', 
                  transform: 'translateX(-50%)', 
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                {galleryImageIndex + 1} / {displayImages.length}
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default StudioProfile;