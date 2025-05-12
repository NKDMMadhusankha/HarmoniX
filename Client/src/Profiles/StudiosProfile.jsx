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
                  <Typography variant="h6" sx={{ color: 'text.primary', mb:'10px' }}>Studio Equipment</Typography>
                  {gear.length > 0 ? (
                    gear.map((g, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{g.category}:</Box> {g.items.join(' • ')}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      No studio equipment available.
                    </Typography>
                  )}
                </Box>

                {/* Studio Features Section - Colorful Grid Design (No Icons) */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Studio Features</Typography>
                  {features.length > 0 ? (
                    <Grid container spacing={1.5}>
                      {features.map((feature, index) => {
                        // Create an array of vibrant colors for the left accents
                        const colors = [
                          '#FF5252', // Red
                          '#7C4DFF', // Deep Purple
                          '#00BFA5', // Teal
                          '#FFAB40', // Orange
                          '#448AFF', // Blue
                          '#69F0AE', // Green
                          '#FF4081', // Pink
                          '#FFD740', // Amber
                        ];
                        
                        // Select color based on index
                        const accentColor = colors[index % colors.length];
                        
                        return (
                          <Grid item xs={12} sm={6} key={index}>
                            <Box
                              sx={{
                                p: 1.5,
                                borderRadius: 1.5,
                                bgcolor: 'rgba(18, 18, 18, 0.8)',
                                borderLeft: `4px solid ${accentColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                '&:hover': {
                                  transform: 'translateY(-3px)',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                  borderLeft: `4px solid ${accentColor}`,
                                  bgcolor: 'rgba(25, 25, 25, 0.9)'
                                }
                              }}
                            >
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'white',
                                  fontWeight: 'medium',
                                  ml: 1
                                }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      No features available.
                    </Typography>
                  )}
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
        
        {/* Full Screen Gallery Modal - Enhanced Design with Improvements */}
        <Dialog
          open={galleryOpen}
          onClose={closeGallery}
          maxWidth="xl"
          fullWidth
          TransitionProps={{
            timeout: 700,
          }}
          BackdropProps={{
            sx: { 
              backgroundColor: 'rgba(0, 0, 0, 0.97)',
              animation: 'backdropReveal 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
              '@keyframes backdropReveal': {
                '0%': {
                  opacity: 0,
                },
                '100%': {
                  opacity: 1,
                }
              }
            }
          }}
          PaperProps={{
            sx: { 
              bgcolor: 'transparent',
              boxShadow: 'none',
              overflow: 'hidden',
              maxHeight: '98vh',
              height: 'auto',
              m: 0,
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 2,
              animation: 'galleryEntranceDramatic 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
              '@keyframes galleryEntranceDramatic': {
                '0%': {
                  opacity: 0,
                  transform: 'scale(0.85) translateY(40px) perspective(1000px) rotateX(5deg)',
                  filter: 'blur(10px)'
                },
                '40%': {
                  opacity: 0.8,
                  filter: 'blur(5px)'
                },
                '70%': {
                  filter: 'blur(0px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'scale(1) translateY(0) perspective(1000px) rotateX(0deg)',
                  filter: 'blur(0px)'
                }
              }
            }
          }}
        >
          <DialogContent 
            sx={{ 
              p: 0, 
              position: 'relative', 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              '& > *': {
                animation: 'contentFadeIn 0.8s ease-out forwards',
              },
              '@keyframes contentFadeIn': {
                '0%': { opacity: 0 },
                '30%': { opacity: 0 },
                '100%': { opacity: 1 }
              }
            }}
          >
            {/* Header with controls */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              p: 2, 
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ 
                  color: 'white', 
                  fontWeight: 'medium',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                  {studio?.studioName || 'Studio Gallery'}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    bgcolor: 'rgba(0,0,0,0.4)', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    {galleryImageIndex + 1} / {displayImages.length}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  onClick={closeGallery}
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>
            
            {/* Main content area with two sections */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              height: 'calc(98vh - 64px)' 
            }}>
              {/* Left side - Featured Image */}
              <Box sx={{ 
                flex: 3, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative',
                overflow: 'hidden', 
                background: 'radial-gradient(circle, rgba(20,20,20,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                p: 2
              }}>
                <Box sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Previous image navigation button - Smaller size */}
                  <IconButton 
                    onClick={handlePrevImage}
                    sx={{ 
                      position: 'absolute', 
                      left: 16, 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      transform: 'scale(1)',
                      width: 40,
                      height: 40,
                      '&:hover': { 
                        bgcolor: 'rgba(0,0,0,0.8)',
                        transform: 'scale(1.1)',
                        boxShadow: '0 0 15px rgba(0, 188, 212, 0.4)'
                      },
                      transition: 'all 0.2s ease',
                      zIndex: 2
                    }}
                  >
                    <ArrowBackIos sx={{ fontSize: 18, ml: 1 }} />
                  </IconButton>
                  
                  {/* Main image with animation effect */}
                  <Box
                    key={galleryImageIndex} // This forces React to recreate the element when the image changes
                    component="img"
                    src={getImageUrl(displayImages[galleryImageIndex])}
                    alt={`Studio Image ${galleryImageIndex + 1}`}
                    onError={handleImageError}
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: 2,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                      animation: 'fadeInImage 0.4s ease-in-out',
                      '@keyframes fadeInImage': {
                        '0%': {
                          opacity: 0,
                          transform: 'scale(0.96)'
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'scale(1)'
                        }
                      }
                    }}
                  />
                  
                  {/* Next image navigation button - Smaller size */}
                  <IconButton 
                    onClick={handleNextImage}
                    sx={{ 
                      position: 'absolute', 
                      right: 16,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center', 
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      transform: 'scale(1)',
                      width: 40,
                      height: 40,
                      '&:hover': { 
                        bgcolor: 'rgba(0,0,0,0.8)',
                        transform: 'scale(1.1)',
                        boxShadow: '0 0 15px rgba(0, 188, 212, 0.4)'
                      },
                      transition: 'all 0.2s ease',
                      zIndex: 2
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>

                {/* Image navigation buttons at bottom for mobile - Also smaller */}
                <Box sx={{
                  display: { xs: 'flex', md: 'none' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 6,
                  mt: 2,
                  width: '100%'
                }}>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      '&:hover': {
                        bgcolor: 'rgba(0, 188, 212, 0.3)',
                        boxShadow: '0 0 10px rgba(0, 188, 212, 0.3)'
                      }
                    }}
                  >
                    <ArrowBackIos sx={{ fontSize: 16, ml: 0.8 }} />
                  </IconButton>
                  
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {galleryImageIndex + 1} / {displayImages.length}
                  </Typography>
                  
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      '&:hover': {
                        bgcolor: 'rgba(0, 188, 212, 0.3)',
                        boxShadow: '0 0 10px rgba(0, 188, 212, 0.3)'
                      }
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
                
                {/* Image caption area */}
                <Box sx={{
                  mt: 2,
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  backdropFilter: 'blur(10px)',
                  bgcolor: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  maxWidth: '80%',
                  alignSelf: 'center',
                  display: { xs: 'none', sm: 'block' }
                }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                    {studio?.studioName} - Image {galleryImageIndex + 1}
                  </Typography>
                </Box>
              </Box>
              
              {/* Right side - Thumbnails */}
              <Box sx={{ 
                flex: 1, 
                background: 'linear-gradient(to right, rgba(18,18,18,0.8), rgba(0,0,0,0.95))',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
                overflowY: 'auto',
                display: { xs: 'none', md: 'block' }, // Hide on mobile
                p: 1.5,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  bgcolor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                }
              }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    mb: 1.5, 
                    pl: 1,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    pb: 0.5
                  }}
                >
                  All Images ({displayImages.length})
                </Typography>
                <Grid container spacing={1.5}>
                  {displayImages.map((img, index) => (
                    <Grid item xs={6} key={index}>
                      <Box
                        onClick={() => setGalleryImageIndex(index)}
                        sx={{
                          width: '100%',
                          height: 120,
                          borderRadius: 1.5,
                          overflow: 'hidden',
                          border: galleryImageIndex === index ? '2px solid #00BCD4' : '2px solid transparent',
                          opacity: galleryImageIndex === index ? 1 : 0.7,
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 1,
                            transform: galleryImageIndex === index ? 'scale(1)' : 'scale(1.03)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
                          },
                          position: 'relative',
                          boxShadow: galleryImageIndex === index ? 
                            '0 0 0 2px rgba(0, 188, 212, 0.5), 0 4px 12px rgba(0,0,0,0.5)' : 
                            '0 2px 8px rgba(0,0,0,0.5)'
                        }}
                      >
                        <Box
                          component="img"
                          src={getImageUrl(img)}
                          alt={`Thumbnail ${index + 1}`}
                          onError={handleImageError}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        {galleryImageIndex === index && (
                          <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            bgcolor: '#00BCD4',
                            boxShadow: '0 0 8px rgba(0, 188, 212, 0.8)'
                          }}/>
                        )}
                        <Box sx={{
                          position: 'absolute',
                          bottom: 4,
                          right: 4,
                          bgcolor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                          {index + 1}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              {/* Mobile thumbnails (horizontal scroll) */}
              <Box 
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  overflowX: 'auto',
                  gap: 1.5,
                  p: 2,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(18,18,18,0.8))',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  '&::-webkit-scrollbar': {
                    height: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    bgcolor: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    borderRadius: '3px',
                  }
                }}
              >
                {displayImages.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setGalleryImageIndex(index)}
                    sx={{
                      minWidth: 90,
                      height: 70,
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      border: galleryImageIndex === index ? '2px solid #00BCD4' : '2px solid transparent',
                      opacity: galleryImageIndex === index ? 1 : 0.7,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        opacity: 1,
                        transform: 'scale(1.05)',
                      },
                      boxShadow: galleryImageIndex === index ? 
                        '0 0 0 2px rgba(0, 188, 212, 0.5), 0 4px 12px rgba(0,0,0,0.5)' : 
                        '0 2px 8px rgba(0,0,0,0.5)'
                    }}
                  >
                    <Box
                      component="img"
                      src={getImageUrl(img)}
                      alt={`Thumbnail ${index + 1}`}
                      onError={handleImageError}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 4,
                      right: 4,
                      bgcolor: galleryImageIndex === index ? 'rgba(0, 188, 212, 0.9)' : 'rgba(0,0,0,0.6)',
                      color: 'white',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      fontWeight: 'bold',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      {index + 1}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default StudioProfile;