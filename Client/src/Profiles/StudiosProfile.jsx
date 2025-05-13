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
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Language,
  LinkedIn
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
// const studioGear = [
//   { category: 'Interface', items: ['UAD Apollo Twin X', 'SSL 2+'] },
//   { category: 'Microphones', items: ['Neumann TLM 103', 'Shure SM7B', 'AKG C414'] },
//   { category: 'Monitors', items: ['Yamaha HS8', 'Avantone Mixcubes'] },
//   { category: 'Preamps', items: ['Neve 1073 SPX', 'Warm Audio WA8000'] },
//   { category: 'Compressors', items: ['Tube-Tech CL1B', 'Wesaudio Dione', 'Neve 33609'] },
//   { category: 'EQ', items: ['Wesaudio Prometheus', 'Pultec EQP-1A'] },
//   { category: 'Reverb', items: ['Lexicon PCM96', 'Bricasti M7'] },
//   { category: 'Monitoring', items: ['Dangerous Music Monitor ST', 'Barefoot Footprint 01'] },
// ];

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
  const [socialMedia, setSocialMedia] = useState({});
  const [bookingSettings, setBookingSettings] = useState({ hourlyRate: 5000, minimumDuration: 2 });
  const { id } = useParams();
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState(null); // Add state for time range selection
  const [availability, setAvailability] = useState([]);

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
          setSocialMedia(studioData.socialMedia || {});
          setBookingSettings({
            hourlyRate: studioData.bookingSettings?.hourlyRate ?? studioData.hourlyRate ?? 5000,
            minimumDuration: studioData.bookingSettings?.minimumDuration ?? studioData.minimumDuration ?? 2
          });
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

    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/studio/${id}/availability`);
        if (response.data.success) {
          console.log('Fetched availability data:', response.data.availability);
          setAvailability(response.data.availability || []);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchStudioData();
    fetchAvailability();
  }, [id]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  
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

  const handleDateChange = (newDate) => {
    const dateStr = newDate.toISOString().split('T')[0];
    console.log('Selected date:', dateStr);

    // Debug: Log the availability for the selected date
    const dayAvailability = availability.find(a => a.date === dateStr);
    console.log('Availability for selected date:', dayAvailability);

    setSelectedDate(newDate);
    setSelectedStartTime('');
    setSelectedEndTime('');
    setSelectedTimeRange(null);
    setAvailableTimeSlots(timeSlots);
  };

  // New function to handle time slot selection
  const handleTimeSlotSelect = (startSlot) => {
    const startTime = startSlot.value;
    setSelectedStartTime(startTime);
    
    // Reset end time when start time changes
    setSelectedEndTime('');
    setSelectedTimeRange(null);
  };

  // New function to handle time range selection
  const handleTimeRangeSelect = (startTime, endTime) => {
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    setSelectedTimeRange({ start: startTime, end: endTime });
  };

  // Function to check if a time slot is available (for visual indicators)
  const isTimeSlotAvailable = (slotValue) => {
    if (!availability || availability.length === 0) return true;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const dayAvailability = availability.find(a => a.date === dateStr);

    let unavailableArr = [];
    if (dayAvailability && Array.isArray(dayAvailability.unavailable)) {
      unavailableArr = dayAvailability.unavailable;
    } else if (dayAvailability && dayAvailability.unavailable && typeof dayAvailability.unavailable === 'object') {
      unavailableArr = Object.values(dayAvailability.unavailable);
    }

    // Always format slotValue to HH:MM for comparison
    let formattedSlot = slotValue;
    if (!slotValue.includes(':')) {
      // Handles both '0900' and '9:00' etc.
      if (slotValue.length === 4) {
        formattedSlot = `${slotValue.slice(0, 2)}:${slotValue.slice(2)}`;
      } else if (slotValue.length === 3) {
        formattedSlot = `0${slotValue[0]}:${slotValue.slice(1)}`;
      }
    }

    // Compare as string
    return !unavailableArr.some(unav => {
      // Defensive: allow unavailable to be '09:00', '9:00', '0900', etc.
      if (!unav) return false;
      if (unav === formattedSlot) return true;
      // Try to normalize both sides to HH:MM
      let normUnav = unav;
      if (!unav.includes(':')) {
        if (unav.length === 4) normUnav = `${unav.slice(0, 2)}:${unav.slice(2)}`;
        else if (unav.length === 3) normUnav = `0${unav[0]}:${unav.slice(1)}`;
      }
      return normUnav === formattedSlot;
    });
  };

  // Function to check if a time slot is the selected start time
  const isSelectedStart = (slotValue) => {
    return selectedStartTime === slotValue;
  };

  // Function to check if a time slot is part of the selected range
  const isInSelectedRange = (slotValue) => {
    if (!selectedStartTime || !selectedEndTime) return false;
    
    const slotHour = parseInt(slotValue.split(':')[0]);
    const startHour = parseInt(selectedStartTime.split(':')[0]);
    const endHour = parseInt(selectedEndTime.split(':')[0]);
    
    return slotHour > startHour && slotHour <= endHour;
  };

  if (loading) {
    return <Loader />; // Use the Loader component
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (displayImages.length === 0) {
    return <div>No images available for this studio.</div>; // Handle case where no images are fetched
  }

  // Social media brand colors
  const socialBrandColors = {
    Instagram: {
      gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      color: '#E1306C'
    },
    Twitter: {
      color: '#1DA1F2'
    },
    Facebook: {
      color: '#4267B2'
    },
    YouTube: {
      color: '#FF0000'
    },
    Website: {
      color: '#00BCD4' // Using the app's primary color for website
    }
  };

  // Social media links for the studio - Updated to use actual data from socialMedia state
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram sx={{ color: socialBrandColors['Instagram'].color }} />, url: socialMedia?.instagram || '#' },
    { name: 'Facebook', icon: <Facebook sx={{ color: socialBrandColors['Facebook'].color }} />, url: socialMedia?.facebook || '#' },
    { name: 'Twitter', icon: <Twitter sx={{ color: socialBrandColors['Twitter'].color }} />, url: socialMedia?.twitter || '#' },
    { name: 'Website', icon: <Language sx={{ color: socialBrandColors['Website'].color }} />, url: socialMedia?.website || '#' }
  ].filter(link => link.url && link.url !== '#'); // Only include links that have a URL

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

                {/* Social Media Links - Using Actual Data with Brand Colors */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Connect With Us</Typography>
                  
                  {socialLinks.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {socialLinks.map((link, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          startIcon={link.icon}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: 2,
                            borderColor: 'rgba(255, 255, 255, 0.12)',
                            color: 'text.secondary',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: socialBrandColors[link.name]?.color || 'primary.main',
                              color: socialBrandColors[link.name]?.color || 'primary.main',
                              transform: 'translateY(-3px)',
                              boxShadow: `0 4px 12px ${socialBrandColors[link.name]?.color}40 || rgba(0, 188, 212, 0.25)`,
                              ...(socialBrandColors[link.name]?.gradient && {
                                '&::before': {
                                  opacity: 0.15
                                }
                              })
                            },
                            ...(socialBrandColors[link.name]?.gradient && {
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: socialBrandColors[link.name].gradient,
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                zIndex: -1
                              }
                            })
                          }}
                        >
                          {link.name}
                        </Button>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      No social media links available.
                    </Typography>
                  )}
                  
                  {socialLinks.length > 0 && (
                    <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', fontStyle: 'italic' }}>
                      Follow us on social media to stay updated with our latest sessions and events.
                    </Typography>
                  )}
                </Box>

                <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', color: 'text.primary', fontWeight: 'medium' }}>
                  We look forward to welcoming you to <Box component="span" sx={{ fontWeight: 'bold' }}>{studio?.studioName || 'our studio'}</Box> and helping you realize your musical projects in a professional and inspiring environment.
                </Typography>
              </Paper>
            </Grid>
            
            {/* Right Column - Booking Widget */}
            <Grid item xs={12} md={5}>
              <Paper sx={{ 
                p: 3, 
                position: 'sticky', 
                top: 80, // Increased from 20 to leave space for navbar
                zIndex: 10, // Add z-index to ensure proper stacking
                bgcolor: 'background.paper', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', 
                mb: 4
              }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'text.primary' }}>
                  FOR BOOKING
                </Typography>
                
                {/* Date Selection - Always show calendar */}
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.primary' }}>
                  Date
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Paper elevation={3} sx={{ p: 1, width: '100%' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateCalendar
                        value={selectedDate}
                        onChange={handleDateChange}
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
                </Box>
                
                {/* Available Time Slots - Visual Time Selection */}
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.primary' }}>
                  Available Times for {formatDate(selectedDate)}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  {/* Time slots display */}
                  <Grid container spacing={1}>
                    {availableTimeSlots.map((slot) => {
                      const isAvailable = isTimeSlotAvailable(slot.value);
                      const isStart = isSelectedStart(slot.value);
                      const inRange = isInSelectedRange(slot.value);
                    
                      return (
                        <Grid item xs={4} sm={3} key={slot.value}>
                          <Button
                            variant={isStart ? "contained" : "outlined"}
                            fullWidth
                            disabled={!isAvailable}
                            onClick={() => isAvailable && handleTimeSlotSelect(slot)}
                            sx={{
                              height: '32px',
                              minHeight: 'unset',
                              py: 0,
                              px: 1,
                              fontSize: '0.75rem',
                              lineHeight: 1,
                              borderColor: isAvailable 
                                ? (isStart || inRange) ? '#00BCD4' : 'rgba(255, 255, 255, 0.23)'
                                : '#f44336',
                              backgroundColor: isStart 
                                ? '#00BCD4'
                                : inRange
                                  ? 'rgba(0, 188, 212, 0.15)'
                                  : 'transparent',
                              color: isAvailable
                                ? (isStart ? 'white' : (inRange ? '#00BCD4' : 'text.primary'))
                                : '#f44336',
                              textDecoration: !isAvailable ? 'line-through' : 'none',
                              position: 'relative',
                              overflow: 'hidden',
                              '&:hover': {
                                backgroundColor: isAvailable && !isStart 
                                  ? 'rgba(0, 188, 212, 0.08)'
                                  : undefined,
                              },
                            }}
                          >
                            {slot.label}
                            {!isAvailable && (
                              <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(244, 67, 54, 0.25)',
                                pointerEvents: 'none'
                              }}>
                                <Typography 
                                  variant="caption" 
                                  sx={{
                                    color: '#f44336',
                                    fontWeight: 'bold',
                                    fontSize: '0.7rem',
                                    textShadow: '0 0 2px rgba(0,0,0,0.7)'
                                  }}
                                >
                                  Booked
                                </Typography>
                              </Box>
                            )}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                  
                  {/* Time range selection section - also update the end time buttons */}
                  {selectedStartTime && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                        Select end time for your session:
                      </Typography>
                      <Grid container spacing={1}>
                        {timeSlots
                          .filter((slot) => {
                            if (!selectedStartTime) return false;
                            const startHour = parseInt(selectedStartTime.split(':')[0]);
                            const slotHour = parseInt(slot.value.split(':')[0]);
                            // Only show slots that are at least 2 hours after start (minimum booking duration)
                            return slotHour >= startHour + 2;
                          })
                          .map((slot) => (
                            <Grid item xs={4} sm={3} key={`end-${slot.value}`}>
                              <Button
                                variant={selectedEndTime === slot.value ? "contained" : "outlined"}
                                fullWidth
                                onClick={() => handleTimeRangeSelect(selectedStartTime, slot.value)}
                                sx={{
                                  height: '32px', // Fixed smaller height
                                  minHeight: 'unset', // Remove default min-height
                                  py: 0, // Remove vertical padding
                                  px: 1, // Keep some horizontal padding
                                  fontSize: '0.75rem', // Smaller font size
                                  lineHeight: 1, // Tighter line height
                                  borderColor: '#2196F3', // Blue border
                                  backgroundColor: selectedEndTime === slot.value ? '#2196F3' : 'transparent',
                                  color: selectedEndTime === slot.value ? 'white' : '#2196F3',
                                  '&:hover': {
                                    backgroundColor: selectedEndTime !== slot.value ? 'rgba(33, 150, 243, 0.08)' : undefined,
                                  }
                                }}
                              >
                                {slot.label}
                              </Button>
                            </Grid>
                          ))}
                      </Grid>
                    </Box>
                  )}
                  
                  {/* Selected time range display - updated to blue */}
                  {selectedStartTime && selectedEndTime && (
                    <Box sx={{ 
                      mt: 2,
                      p: 1.5,
                      bgcolor: 'rgba(33, 150, 243, 0.1)',
                      borderRadius: 1,
                      border: '1px solid rgba(33, 150, 243, 0.5)'
                    }}>
                      <Typography variant="body2" sx={{ color: 'text.primary', textAlign: 'center' }}>
                        Selected Time: {timeSlots.find(s => s.value === selectedStartTime)?.label} - {timeSlots.find(s => s.value === selectedEndTime)?.label}
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                {/* Minimum Duration Info */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    p: 1,
                    bgcolor: 'rgba(255, 193, 7, 0.15)',
                    borderRadius: 1
                  }}
                >
                  <Info sx={{ mr: 1, color: 'warning.light' }} />
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {bookingSettings.minimumDuration} hr minimum
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
                    LKR {bookingSettings.hourlyRate.toLocaleString()} / hour
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
        
        {/* Full Screen Gallery Modal - Updated with completely transparent styling */}
        <Dialog
          open={galleryOpen}
          onClose={closeGallery}
          maxWidth="xl"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: 'transparent',
              backgroundImage: 'none', // Remove gradient completely
              boxShadow: 'none',
              overflow: 'hidden',
              maxHeight: '98vh',
              height: 'auto',
              m: 0,
              borderRadius: 0,
            }
          }}
          BackdropProps={{
            sx: { 
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
            }
          }}
        >
          <DialogContent sx={{ p: 0, position: 'relative', background: 'transparent' }}>
            {/* Header with controls - Fully transparent */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderBottom: 'none', // Remove border
              bgcolor: 'transparent',
              backgroundImage: 'none', // Remove gradient
            }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'medium' }}>
                {studio?.studioName || 'Studio Gallery'}
              </Typography>
              
              <IconButton 
                onClick={closeGallery}
                sx={{ 
                  color: 'white',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <Close />
              </IconButton>
            </Box>
            
            {/* Main image content */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100% - 64px)', // Adjust for header height
              width: '100%',
              background: 'transparent'
            }}>
              {/* Main image with navigation - Smaller size */}
              <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                height: '70vh', // Reduced from 80vh
                maxHeight: '70vh', // Add maximum height constraint
              }}>
                {/* Previous image button */}
                <IconButton 
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    zIndex: 2
                  }}
                >
                  <ArrowBackIos />
                </IconButton>

                {/* Current image - With size constraints */}
                <Box
                  component="img"
                  src={getImageUrl(displayImages[galleryImageIndex])}
                  alt={`Studio image ${galleryImageIndex + 1}`}
                  onError={handleImageError}
                  sx={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                    width: 'auto', // Let width adjust automatically
                    height: 'auto', // Let height adjust automatically
                  }}
                />

                {/* Next image button */}
                <IconButton 
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    zIndex: 2
                  }}
                >
                  <ArrowForwardIos />
                </IconButton>

                {/* Image counter */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  zIndex: 2
                }}>
                  <Typography variant="body2">
                    {galleryImageIndex + 1} / {displayImages.length}
                  </Typography>
                </Box>
              </Box>

              {/* Thumbnail strip - Fully transparent background */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                p: 2,
                overflowX: 'auto',
                backgroundColor: 'transparent', // Changed from dark background to transparent
                '&::-webkit-scrollbar': {
                  height: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '3px'
                }
              }}>
                {displayImages.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setGalleryImageIndex(index)}
                    sx={{
                      width: 100,
                      height: 75,
                      flexShrink: 0,
                      cursor: 'pointer',
                      position: 'relative',
                      opacity: galleryImageIndex === index ? 1 : 0.7,
                      transition: 'opacity 0.2s',
                      '&:hover': {
                        opacity: 1
                      }
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
                        borderRadius: 1
                      }}
                    />
                    {galleryImageIndex === index && (
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 1
                      }} />
                    )}
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