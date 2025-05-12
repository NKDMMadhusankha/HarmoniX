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
  Link,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  Chip
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
  Edit,
  Save,
  Cancel,
  Add,
  Delete
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const StudioProfileDashboard = () => {
  const navigate = useNavigate();

  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Editable fields state
  const [studioData, setStudioData] = useState({
    name: '',
    address: '',
    country: '',
    description: '',
    services: [],
    recordingBooths: '',
    loungeArea: '',
    features: [],
    hourlyRate: 0,
    minimumDuration: 1
  });
  const [studioImages, setStudioImages] = useState([]);
  const [studioGear, setStudioGear] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newGearCategory, setNewGearCategory] = useState('');
  const [newGearItem, setNewGearItem] = useState('');
  const [newService, setNewService] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const [category, setCategory] = useState('');
  const [items, setItems] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddGear = async () => {
    try {
      const token = localStorage.getItem('authToken'); 
      console.log('handleAddGear - Retrieved token:', token); 
      if (!token) {
        setErrorMessage('Authentication token not found. Please log in again.');
        console.error('handleAddGear - authToken not found in localStorage'); 
        return;
      }
      const response = await axios.post(
        'http://localhost:5000/api/studio/gear',
        { category, items: items.split(',').map(item => item.trim()) },
        { headers: { 'x-auth-token': token } } // Corrected header to x-auth-token
      );
      if (response.data.success) {
        setSuccessMessage('Studio gear added successfully!');
        setCategory('');
        setItems('');
        // Optionally, re-fetch studio data to show the new gear
        // fetchStudioData(); 
      } else {
        setErrorMessage(response.data.message || 'Failed to add studio gear.');
      }
    } catch (error) {
      console.error('Error adding studio gear:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.message || 'An error occurred while adding studio gear.');
    }
  };

  useEffect(() => {
    const fetchStudioData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userType = localStorage.getItem('userType');

        if (!token || userType !== 'studio') {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/studio/me', {
          headers: { 'x-auth-token': token },
        });

        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        // Check if images exist and are not empty strings
        const validImages = data.studioImages?.filter(url => url && url.trim() !== '') || [];
        console.log('Fetched studio images:', validImages);

        setStudioData({
          name: data.studioName,
          address: data.address,
          country: data.country,
          description: data.studioDescription,
          services: data.services || [],
          recordingBooths: data.recordingBooths || '',
          loungeArea: data.loungeArea || '',
          features: data.features || [],
          hourlyRate: data.hourlyRate,
          minimumDuration: data.minimumDuration,
        });
        setStudioImages(validImages);
        setStudioGear(data.studioGear || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load studio data');
        setStudioData({
          name: '',
          address: '',
          country: '',
          description: '',
          services: [],
          recordingBooths: '',
          loungeArea: '',
          features: [],
          hourlyRate: 0,
          minimumDuration: 1,
        });
        setStudioImages([]);
      }
    };

    fetchStudioData();
  }, [navigate]);

  if (!studioData) {
    return <div>Loading...</div>;
  }

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
    const address = studioData.address;
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  
  // Handle field changes
  const handleFieldChange = (field, value) => {
    setStudioData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle service changes
  const handleServiceChange = (index, value) => {
    const newServices = [...studioData.services];
    newServices[index] = value;
    setStudioData(prev => ({
      ...prev,
      services: newServices
    }));
  };
  
  // Handle feature changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...studioData.features];
    newFeatures[index] = value;
    setStudioData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };
  
  // Add new service
  const addService = () => {
    if (newService.trim()) {
      setStudioData(prev => ({
        ...prev,
        services: [...prev.services, newService]
      }));
      setNewService('');
    }
  };
  
  // Remove service
  const removeService = (index) => {
    const newServices = studioData.services.filter((_, i) => i !== index);
    setStudioData(prev => ({
      ...prev,
      services: newServices
    }));
  };
  
  // Add new feature
  const addFeature = () => {
    if (newFeature.trim()) {
      setStudioData(prev => ({
        ...prev,
        features: [...prev.features, newFeature]
      }));
      setNewFeature('');
    }
  };
  
  // Remove feature
  const removeFeature = (index) => {
    const newFeatures = studioData.features.filter((_, i) => i !== index);
    setStudioData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };
  
  // Add new image
  const addImage = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setSnackbarMessage('Please select a file to upload.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setSnackbarMessage('Please select a valid image file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Check file size (20MB limit)
    const maxSize = 20 * 1024 * 1024; // Updated to 20MB
    if (file.size > maxSize) {
      setSnackbarMessage('Image size should be less than 20MB'); // Updated message
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setSnackbarMessage('Authentication required');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      const response = await fetch('http://localhost:5000/api/studio/upload', {
        method: 'POST',
        headers: {
          'x-auth-token': token
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Check if image already exists to prevent duplicates
        if (!studioImages.includes(data.imageUrl)) {
          setStudioImages(prev => [...prev, data.imageUrl]);
          setSnackbarMessage('Image uploaded successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('This image has already been uploaded');
          setSnackbarSeverity('warning');
        }
      } else {
        setSnackbarMessage(`Upload failed: ${data.message}`);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setSnackbarMessage('An error occurred while uploading the image.');
      setSnackbarSeverity('error');
    }

    setSnackbarOpen(true);
    // Clear the file input
    event.target.value = '';
  };

  // Remove image
  const removeImage = async (index) => {
    try {
      const url = studioImages[index];
      if (!url) {
        setSnackbarMessage('Image not found.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      // Extract the S3 key by directly manipulating the string
      let key = url.substring(url.indexOf('studios/'));
      if (key.startsWith('studios/') === false) {
          console.error('Invalid URL format: Missing "studios/" prefix');
          setSnackbarMessage('Invalid URL format.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
          return;
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        setSnackbarMessage('Authentication required.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      const encodedKey = encodeURIComponent(key);
      const response = await fetch(`http://localhost:5000/api/studio/images/${encodedKey}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });

      if (response.ok) {
        setStudioImages((prevImages) => {
          const newImages = [...prevImages];
          newImages.splice(index, 1); // Remove the image at the specified index
          return newImages;
        });
        setSnackbarMessage('Image removed successfully!');
        setSnackbarSeverity('success');
      } else {
        const errorData = await response.json();
        setSnackbarMessage(errorData.message || 'Failed to remove image');
        setSnackbarSeverity('error');
      }
    } catch (err) {
      console.error('Error removing image:', err);
      setSnackbarMessage('Error removing image');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };
  
  // Add new gear category
  const addGearCategory = () => {
    if (newGearCategory.trim()) {
      setStudioGear([...studioGear, { category: newGearCategory, items: [] }]);
      setNewGearCategory('');
      setSnackbarMessage('Gear category added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };
  
  // Remove gear category
  const removeGearCategory = (index) => {
    const newGear = studioGear.filter((_, i) => i !== index);
    setStudioGear(newGear);
    setSnackbarMessage('Gear category removed successfully!');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };
  
  // Add new gear item
  const addGearItem = (categoryIndex) => {
    if (newGearItem.trim()) {
      const newGear = [...studioGear];
      newGear[categoryIndex].items.push(newGearItem);
      setStudioGear(newGear);
      setNewGearItem('');
      setSnackbarMessage('Gear item added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };
  
  // Remove gear item
  const removeGearItem = (categoryIndex, itemIndex) => {
    const newGear = [...studioGear];
    newGear[categoryIndex].items = newGear[categoryIndex].items.filter((_, i) => i !== itemIndex);
    setStudioGear(newGear);
    setSnackbarMessage('Gear item removed successfully!');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };
  
  // Save all changes
  const saveChanges = async () => {
    // Check for duplicate images before saving
    const uniqueImages = [...new Set(studioImages)];
    if (uniqueImages.length !== studioImages.length) {
      setSnackbarMessage('Duplicate images detected');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      // Basic info update
      await fetch('http://localhost:5000/api/studio/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          services: studioData.services,
          features: studioData.features,
          studioDescription: studioData.description,
          recordingBooths: studioData.recordingBooths,
          loungeArea: studioData.loungeArea,
          bookingSettings: {
            hourlyRate: studioData.hourlyRate,
            minimumDuration: studioData.minimumDuration
          }
        })
      });

      // Gear updates
      if (studioGear.length > 0) {
        await fetch('http://localhost:5000/api/studio/gear', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          },
          body: JSON.stringify({
            operation: 'bulkUpdate',
            payload: studioGear
          })
        });
      }

      // Image updates
      if (studioImages.length > 0) {
        await fetch('http://localhost:5000/api/studio/images', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          },
          body: JSON.stringify({ images: studioImages })
        });
      }

      setEditMode(false);
      setSnackbarMessage('All changes saved successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error saving changes');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Container maxWidth="lg">
          {/* Edit Mode Toggle */}
          <Box sx={{ pt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant={editMode ? "outlined" : "contained"} 
              color="info"
              startIcon={editMode ? <Cancel /> : <Edit />}
              onClick={toggleEditMode}
              sx={{ mb: 2 }}
            >
              {editMode ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </Box>
          
          {/* Studio Title & Actions */}
          <Box sx={{ pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editMode ? (
              <TextField
                fullWidth
                value={studioData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                  }
                }}
              />
            ) : (
              <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
                {studioData.name}
              </Typography>
            )}
            <Box>
              {/* <IconButton aria-label="share" sx={{ color: 'text.secondary' }}>
                <Share />
              </IconButton>
              <IconButton aria-label="save" sx={{ color: 'text.secondary' }}>
                <Bookmark />
              </IconButton> */}
            </Box>
          </Box>

          {/* Location - Updated to include country */}
          <Box sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
            <LocationOn sx={{ color: 'error.main', mr: 1, mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              {editMode ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TextField
                    fullWidth
                    value={studioData.address}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.light',
                        },
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    value={studioData.country}
                    onChange={(e) => handleFieldChange('country', e.target.value)}
                    variant="outlined"
                    placeholder="Country"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.light',
                        },
                      }
                    }}
                  />
                </Box>
              ) : (
                <>
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
                    {studioData.address}
                  </Link>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {studioData.country}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          
          {/* Edit Mode Tabs */}
          {editMode && (
            <Box sx={{ mb: 3 }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons="auto"
                aria-label="edit studio tabs"
              >
                <Tab label="Images" />
                <Tab label="Basic Info" />
                <Tab label="Gear List" />
                <Tab label="Booking Settings" />
              </Tabs>
            </Box>
          )}
          
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
                {editMode && activeTab === 0 && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(0);
                    }}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                )}
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
                      {editMode && activeTab === 0 && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
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
                      {editMode && activeTab === 0 && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
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
                      backgroundImage: studioImages.length > 5 ? `url(${studioImages[5]})` : 'none',
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
                    {editMode && activeTab === 0 && studioImages.length > 5 && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(5);
                        }}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Edit Images Section */}
          {editMode && activeTab === 0 && (
            <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                Add New Image
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                <Button
                  variant="contained"
                  color="info"
                  component="label"
                  startIcon={<Add />}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={addImage}
                  />
                </Button>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Supports: PNG, JPEG, JPG
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Current images: {studioImages.length} (Minimum 6 recommended)
              </Typography>
              <Box sx={{ mt: 2 }}>
                {studioImages.map((url, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'inline-block',
                      mr: 2,
                      mb: 2,
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid #222',
                      width: 100,
                      height: 100,
                      backgroundColor: '#222',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={url}
                      alt={`Studio Image ${index}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {editMode && (
                      <IconButton
                        onClick={() => removeImage(index)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          color: 'error.main',
                          padding: '4px',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          }
                        }}
                        size="small"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          )}
          
          {/* Main Content Area */}
          <Grid container spacing={4}>
            {/* Left Column - Studio Info */}
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'text.primary' }}>
                  About the Studio
                </Typography>
                
                {editMode && activeTab === 1 ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={studioData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                    {studioData.description}
                  </Typography>
                )}
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.primary' }}>
                  Services
                </Typography>
                
                {editMode && activeTab === 1 ? (
                  <Box sx={{ mb: 3 }}>
                    {studioData.services.map((service, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                          fullWidth
                          value={service}
                          onChange={(e) => handleServiceChange(index, e.target.value)}
                          variant="outlined"
                        />
                        <IconButton onClick={() => removeService(index)} color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <TextField
                        fullWidth
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        label="New Service"
                        variant="outlined"
                      />
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={addService}
                        startIcon={<Add />}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    {studioData.services && studioData.services.map((service, index) => (
                      <Typography key={index} variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                        {service}
                      </Typography>
                    ))}
                  </>
                )}
                
                {/* Edit Gear List Section */}
                {editMode && activeTab === 2 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'text.primary' }}>
                      Studio Equipment
                    </Typography>
                    
                    {studioGear?.map((category, categoryIndex) => (
                      <Box key={categoryIndex} sx={{ mb: 3, p: 2, border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {category.category}
                          </Typography>
                          <IconButton onClick={() => removeGearCategory(categoryIndex)} size="small" color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {category.items?.map((item, itemIndex) => (
                            <Chip
                              key={itemIndex}
                              label={item}
                              onDelete={() => removeGearItem(categoryIndex, itemIndex)}
                              sx={{ bgcolor: 'rgba(0, 188, 212, 0.1)' }}
                            />
                          ))}
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            fullWidth
                            size="small"
                            value={newGearItem}
                            onChange={(e) => setNewGearItem(e.target.value)}
                            label="New Item"
                            variant="outlined"
                          />
                          <Button 
                            variant="outlined" 
                            color="primary"
                            onClick={() => addGearItem(categoryIndex)}
                            startIcon={<Add />}
                            size="small"
                          >
                            Add Item
                          </Button>
                        </Box>
                      </Box>
                    ))}
                    
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        value={newGearCategory}
                        onChange={(e) => setNewGearCategory(e.target.value)}
                        label="New Category"
                        variant="outlined"
                      />
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={addGearCategory}
                        startIcon={<Add />}
                      >
                        Add Category
                      </Button>
                    </Box>
                  </Box>
                )}
                
                {!editMode || activeTab !== 2 ? (
                  <>
                    <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'text.primary' }}>
                      Studio Equipment
                    </Typography>
                    
                    {studioGear?.map((category, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          {category.category}:
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {category.items?.join(' • ')}
                        </Typography>
                      </Box>
                    ))}
                  </>
                ) : null}
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.primary' }}>
                  Recording Booths
                </Typography>
                
                {editMode && activeTab === 1 ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={studioData.recordingBooths}
                    onChange={(e) => handleFieldChange('recordingBooths', e.target.value)}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    {studioData.recordingBooths}
                  </Typography>
                )}
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.primary' }}>
                  Lounge Area
                </Typography>
                
                {editMode && activeTab === 1 ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={studioData.loungeArea}
                    onChange={(e) => handleFieldChange('loungeArea', e.target.value)}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    {studioData.loungeArea}
                  </Typography>
                )}
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.primary' }}>
                  Studio Features
                </Typography>
                
                {editMode && activeTab === 1 ? (
                  <Box sx={{ mb: 3 }}>
                    {studioData.features.map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                          fullWidth
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          variant="outlined"
                        />
                        <IconButton onClick={() => removeFeature(index)} color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <TextField
                        fullWidth
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        label="New Feature"
                        variant="outlined"
                      />
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={addFeature}
                        startIcon={<Add />}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    {studioData.features.map((feature, index) => (
                      <Box key={index} component="span">
                        • {feature}
                        {index < studioData.features.length - 1 && <br />}
                      </Box>
                    ))}
                  </Typography>
                )}
                
                {!editMode && (
                  <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', color: 'text.primary', fontWeight: 'medium' }}>
                    We look forward to welcoming you to AudioHaus and helping you realize your musical projects in a professional and inspiring environment.
                  </Typography>
                )}
              </Paper>
            </Grid>
            
            {/* Right Column - Booking Widget */}
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, position: 'sticky', top: 20, bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', mb: 4 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'text.primary' }}>
                  {editMode && activeTab === 3 ? 'Booking Settings' : 'For Booking'}
                </Typography>
                
                {editMode && activeTab === 3 ? (
                  <>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.primary' }}>
                      Hourly Rate (LKR)
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={studioData.hourlyRate}
                      onChange={(e) => handleFieldChange('hourlyRate', e.target.value)}
                      variant="outlined"
                      sx={{ mb: 3 }}
                    />
                    
                    <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.primary' }}>
                      Minimum Booking Duration (hours)
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={studioData.minimumDuration}
                      onChange={(e) => handleFieldChange('minimumDuration', e.target.value)}
                      variant="outlined"
                      sx={{ mb: 3 }}
                    />
                  </>
                ) : (
                  <>
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
                    <Grid container spacing={2} sx={{ mb: 8 }}>
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
                        {studioData.minimumDuration} hr minimum
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
                        LKR {studioData.hourlyRate.toLocaleString()} / hour
                      </Typography>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
          
          {/* Save Changes Button (visible only in edit mode) */}
          {editMode && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Button 
                variant="contained" 
                color="info" 
                size="large"
                onClick={saveChanges}
                startIcon={<Save />}
                sx={{ px: 6, py: 1.5 }}
              >
                Save All Changes
              </Button>
            </Box>
          )}

          {/* Add Studio Gear Form */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Add New Studio Gear</Typography>
            <TextField
              label="Category"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Items (comma-separated)"
              fullWidth
              value={items}
              onChange={(e) => setItems(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddGear}>Add Gear</Button>

            {successMessage && <Typography sx={{ color: 'green', mt: 2 }}>{successMessage}</Typography>}
            {errorMessage && <Typography sx={{ color: 'red', mt: 2 }}>{errorMessage}</Typography>}
          </Paper>
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
        
        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default StudioProfileDashboard;