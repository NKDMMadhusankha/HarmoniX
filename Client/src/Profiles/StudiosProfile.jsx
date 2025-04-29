import React, { useState } from 'react';
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

// Updated studio images for gallery with online images
const studioImages = [
  'https://img.freepik.com/free-photo/music-composer-showing-thumbs-up_107420-96142.jpg?t=st=1745860885~exp=1745864485~hmac=e3e336bf3ea449ed2226f7541c1af4bcff9d2683fa93404a9bb2882e6f4fc520&w=996',
  'https://img.freepik.com/free-photo/male-audio-engineer-using-sound-mixer_107420-96112.jpg?t=st=1745860587~exp=1745864187~hmac=2bdd10df13166d72178711fd770d15390075182a96fe6a326ddf8e31ce0e4f08&w=996',
  'https://img.freepik.com/free-photo/young-asian-duet-singers-with-microphone-recording-song-record-music-studio_627829-3771.jpg?t=st=1745861201~exp=1745864801~hmac=b42097dfa43f6a76109f7f60e98c163d9de20b3cddefc16db635d7af8db526a9&w=996',
  'https://img.freepik.com/free-photo/male-audio-engineer-using-sound-mixer_107420-96112.jpg?t=st=1745860587~exp=1745864187~hmac=2bdd10df13166d72178711fd770d15390075182a96fe6a326ddf8e31ce0e4f08&w=996',
  'https://img.freepik.com/free-photo/male-audio-engineer-using-sound-mixer_107420-96112.jpg?t=st=1745860587~exp=1745864187~hmac=2bdd10df13166d72178711fd770d15390075182a96fe6a326ddf8e31ce0e4f08&w=996',
  'https://img.freepik.com/free-photo/male-audio-engineer-using-sound-mixer_107420-96112.jpg?t=st=1745860587~exp=1745864187~hmac=2bdd10df13166d72178711fd770d15390075182a96fe6a326ddf8e31ce0e4f08&w=996',
  'https://img.freepik.com/free-photo/male-audio-engineer-using-sound-mixer_107420-96112.jpg?t=st=1745860587~exp=1745864187~hmac=2bdd10df13166d72178711fd770d15390075182a96fe6a326ddf8e31ce0e4f08&w=996'
];

// Available time slots
const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '20:00', label: '8:00 PM' },
  { value: '21:00', label: '9:00 PM' },
  { value: '22:00', label: '10:00 PM' },
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

const StudioProfile = () => {
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
      prevIndex === studioImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevImage = () => {
    setGalleryImageIndex((prevIndex) => 
      prevIndex === 0 ? studioImages.length - 1 : prevIndex - 1
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
  
  // Function to open Google Maps with the address
  const openInGoogleMaps = () => {
    const address = "149 Mill Road, Katubedda, Moratuwa";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Container maxWidth="lg">
          {/* Studio Title & Actions */}
          <Box sx={{ pt: 4, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
              MERASIC Recording Studio
            </Typography>
            <Box>
              {/* <IconButton aria-label="share" sx={{ color: 'text.secondary' }}>
                <Share />
              </IconButton>
              <IconButton aria-label="save" sx={{ color: 'text.secondary' }}>
                <Bookmark />
              </IconButton> */}
            </Box>
          </Box>

          {/* Location - Updated to be clickable */}
          <Box sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
            <LocationOn sx={{ color: 'error.main', mr: 1, mt: 0.5 }} />
            <Box>
              <Link 
                component="button"
                variant="subtitle1" 
                onClick={openInGoogleMaps}
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'left',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.light'
                  }
                }}
              >
                149 Mill Road, Katubedda, Moratuwa
              </Link>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Sri Lanka
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
                  src={studioImages[0]} // Use actual image
                  alt="Studio Main"
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
                        src={studioImages[index]} // Use actual image
                        alt={`Studio Image ${index}`}
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
                  <Grid item xs={6} md={4} key={index}>
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
                        src={studioImages[index]} // Use actual image
                        alt={`Studio Image ${index}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
                
                {/* View all button with image background - with darker overlay */}
                <Grid item xs={6} md={4}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 180,
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundImage: `url(${studioImages[5]})`, // Use actual image
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay
                      }
                    }}
                    onClick={() => openGallery(0)}
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
                        zIndex: 1
                      }}
                    >
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.5 }}>
                        <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: 0.5 }} />
                        <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: 0.5 }} />
                        <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: 0.5 }} />
                        <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: 0.5 }} />
                      </Box>
                    </Box>
                    <Typography variant="button" sx={{ color: 'white', zIndex: 1, fontWeight: 'medium' }}>
                      View all
                    </Typography>
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
                <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'text.primary' }}>
                  About the Studio
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                  Welcome to AudioHaus, our modern recording studio located in the heart of Moratuwa. 
                  We've designed this space specifically for artists, musicians and producers looking to create 
                  high-quality projects. Our studio combines cutting-edge technology and analog equipment to provide an 
                  exceptional recording experience with a unique aesthetic.
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.primary' }}>
                  Services
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                  <strong>Recording:</strong> Our studio is perfectly equipped for vocal recording and composition.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                  <strong>Mixing:</strong> Use our facilities to mix your tracks with professional quality, 
                  with the help of our experienced sound engineers.
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  <strong>Mastering:</strong> Final polish for your tracks using our high-end equipment.
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'text.primary' }}>
                  Studio Equipment
                </Typography>
                
                {studioGear.map((category, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {category.category}:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {category.items.join(' • ')}
                    </Typography>
                  </Box>
                ))}
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.primary' }}>
                  Recording Booths
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  Soundproofed and acoustically treated booths available for capturing vocals with exceptional precision. 
                  Our isolation booth features acoustic treatment for clean recordings.
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.primary' }}>
                  Lounge Area
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  A relaxation lounge with ambient lighting available for breaks between recording sessions, 
                  equipped with coffee machine, keyboard setup, comfortable seating, and amenities to keep you comfortable 
                  during long sessions.
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.primary' }}>
                  Studio Features
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  • Professional acoustic treatment
                  • LED mood lighting throughout the space
                  • Climate controlled environment
                  • High-speed internet
                  • Instrument collection including guitars
                  • Producer workstation with industry-standard software
                </Typography>
                
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
                src={studioImages[galleryImageIndex]} // Use actual image
                alt={`Studio Image ${galleryImageIndex + 1}`}
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
                {galleryImageIndex + 1} / {studioImages.length}
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