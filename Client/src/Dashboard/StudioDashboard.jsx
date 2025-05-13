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
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Drawer
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
  Delete,
  Photo,
  Description,
  Settings,
  Home,
  SettingsApplications,
  MusicNote,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Logout,
  Language,
  Instagram,
  Facebook,
  Twitter
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
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
  const [drawerOpen, setDrawerOpen] = useState(false); // For mobile drawer
  const [activeSection, setActiveSection] = useState('overview'); // Default section
  
  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
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
    minimumDuration: 1,
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: '',
      website: '',
      linkedin: '',
      youtube: ''
    }
  });
  const [studioImages, setStudioImages] = useState([]);
  const [studioGear, setStudioGear] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newGearCategory, setNewGearCategory] = useState('');
  const [newGearItem, setNewGearItem] = useState({}); // was: useState('')
  const [newService, setNewService] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [category, setCategory] = useState('');
  const [items, setItems] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Availability state for admin
  const [availability, setAvailability] = useState([]); // [{date: '2024-06-10', slots: ['09:00', ...], unavailable: ['13:00', ...]}]
  const [selectedAvailDate, setSelectedAvailDate] = useState(new Date());
  const [selectedUnavailableSlots, setSelectedUnavailableSlots] = useState([]);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);

  // Fetch availability from backend (implement API as needed)
  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:5000/api/studio/availability', {
        headers: { 'x-auth-token': token }
      });
      if (res.ok) {
        const data = await res.json();
        setAvailability(data.availability || []);
      }
    } catch (e) {
      // handle error
    }
  };

  // Save availability to backend (implement API as needed)
  const saveAvailability = async () => {
    setIsSavingAvailability(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/studio/availability', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ availability })
      });

      if (response.ok) {
        setSnackbarMessage('Availability updated successfully!');
        setSnackbarSeverity('success');
      } else {
        const errorData = await response.json();
        setSnackbarMessage(errorData.message || 'Failed to update availability');
        setSnackbarSeverity('error');
      }
    } catch (e) {
      setSnackbarMessage('An error occurred while updating availability');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setIsSavingAvailability(false);
    }
  };

  // Toggle slot for unavailable
  const handleAvailSlotToggle = (slot) => {
    setSelectedUnavailableSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  // When date changes, load slots for that date
  useEffect(() => {
    const dateStr = selectedAvailDate.toISOString().split('T')[0];
    const found = availability.find((a) => a.date === dateStr);
    setSelectedUnavailableSlots(found ? (found.unavailable || []) : []);
  }, [selectedAvailDate, availability]);

  // Save slots for the selected date
  const handleSaveSlotsForDate = () => {
    const dateStr = selectedAvailDate.toISOString().split('T')[0];
    const availableSlots = timeSlots
      .map((slot) => slot.value)
      .filter((slot) => !selectedUnavailableSlots.includes(slot));

    setAvailability((prev) => {
      const others = prev.filter((a) => a.date !== dateStr);
      return [
        ...others,
        { date: dateStr, slots: availableSlots, unavailable: selectedUnavailableSlots }
      ];
    });
    setSnackbarMessage('Slots updated for selected date');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  // Toggle drawer for mobile view
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
    
    // If we're switching to an edit section, automatically enable edit mode
    if (section !== 'overview') {
      setEditMode(true);
    } else {
      // If switching back to overview, disable edit mode
      setEditMode(false);
    }
    
    // Close drawer on mobile after selection
    if (window.innerWidth < 960) {
      setDrawerOpen(false);
    }
  };

  const handleAddGear = async () => {
    try {
      setIsSubmitting(true);
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
        // Refresh the gear list
        fetchStudioData();
      } else {
        setErrorMessage(response.data.message || 'Failed to add studio gear.');
      }
    } catch (error) {
      console.error('Error adding studio gear:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.message || 'An error occurred while adding studio gear.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        socialMedia: data.socialMedia || {
          instagram: '',
          facebook: '',
          twitter: '',
          website: '',
          linkedin: '',
          youtube: ''
        }
      });
      setStudioImages(validImages);
      setStudioGear(data.studioGear || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setErrorMessage('Failed to load studio data');
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
        socialMedia: {
          instagram: '',
          facebook: '',
          twitter: '',
          website: '',
          linkedin: '',
          youtube: ''
        }
      });
      setStudioImages([]);
    }
  };

  useEffect(() => {
    fetchStudioData();
    fetchAvailability();
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
  
  // Toggle edit mode
  const toggleEditMode = () => {
    if (editMode) {
      setEditMode(false);
      setActiveSection('overview');
    } else {
      setEditMode(true);
      setActiveSection('profile');
    }
  };
  
  // Handle field changes
  const handleFieldChange = (field, value) => {
    setStudioData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle social media changes
  const handleSocialMediaChange = (platform, value) => {
    setStudioData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
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
  const addService = async () => {
    if (newService.trim()) {
      const updatedServices = [...studioData.services, newService.trim()];
      setStudioData(prev => ({
        ...prev,
        services: updatedServices
      }));
      setNewService('');

      // Immediately persist to backend
      try {
        setIsSubmitting(true);
        const token = localStorage.getItem('authToken');
        await fetch('http://localhost:5000/api/studio/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          },
          body: JSON.stringify({
            studioName: studioData.name,
            address: studioData.address,
            country: studioData.country,
            studioDescription: studioData.description,
            services: updatedServices,
            features: studioData.features,
            recordingBooths: studioData.recordingBooths,
            loungeArea: studioData.loungeArea,
            socialMedia: studioData.socialMedia,
            hourlyRate: studioData.hourlyRate,
            minimumDuration: studioData.minimumDuration
          })
        });
        setSnackbarMessage('Service added and saved!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to save service');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsSubmitting(false);
      }
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

    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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

      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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
  
  // Add gear item
  const addGearItem = (categoryIndex) => {
    const item = newGearItem[categoryIndex] || '';
    if (item.trim()) {
      const newGear = [...studioGear];
      newGear[categoryIndex].items.push(item);
      setStudioGear(newGear);
      setNewGearItem(prev => ({ ...prev, [categoryIndex]: '' }));
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
      setIsSubmitting(true);
      const token = localStorage.getItem('authToken');
      
      // Ensure services is always an array of non-empty strings
      const cleanedServices = (studioData.services || []).map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean);

      // Send ALL editable fields to backend
      await fetch('http://localhost:5000/api/studio/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          studioName: studioData.name,
          address: studioData.address,
          country: studioData.country,
          studioDescription: studioData.description,
          services: cleanedServices,
          features: studioData.features,
          recordingBooths: studioData.recordingBooths,
          loungeArea: studioData.loungeArea,
          socialMedia: studioData.socialMedia,
          hourlyRate: studioData.hourlyRate,
          minimumDuration: studioData.minimumDuration
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
      setActiveSection('overview');
      setSnackbarMessage('All changes saved successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error saving changes');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Define sidebar navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home /> },
    { id: 'profile', label: 'Basic Info', icon: <Description /> },
    { id: 'images', label: 'Images Gallery', icon: <Photo /> },
    { id: 'services', label: 'Services & Features', icon: <Settings /> },
    { id: 'gear', label: 'Studio Equipment', icon: <MusicNote /> },
    { id: 'booking', label: 'Booking Settings', icon: <SettingsApplications /> },
    { id: 'availability', label: 'Availability', icon: <AccessTime /> }
  ];

  // Log out handler
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Drawer content for both permanent and temporary drawer
  const drawerContent = (
    <Box sx={{ width: 240, mt: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <List>
        <ListItem sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ 
            color: 'text.primary', 
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Studio Dashboard
          </Typography>
        </ListItem>
        <Divider sx={{ mb: 2 }} />

        {navItems.map(item => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={activeSection === item.id}
              onClick={() => handleSectionChange(item.id)}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                color: activeSection === item.id ? 'primary.main' : 'text.secondary',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 188, 212, 0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 188, 212, 0.05)',
                }
              }}
            >
              <ListItemIcon sx={{ color: activeSection === item.id ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  sx: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      {/* Red divider line before Log Out button */}
      <Divider sx={{ 
        backgroundColor: 'error.main', 
        opacity: 0.7, 
        height: '2px', 
        mb: 2 
      }} />
      {/* Centered Log Out button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <List sx={{ width: '100%' }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: '8px',
                color: 'error.main', // Changed from white to error color for the text
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                height: '48px', // Fixed height
                px: 2, // Add horizontal padding // Light error border
                '&:hover': {
                  bgcolor: 'rgba(255, 70, 70, 0.04)', // Very subtle red highlight on hover
                  borderColor: 'error.main'
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%' 
              }}>
                <Logout sx={{ mr: 1, color: 'error.main' }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: 'error.main',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Log Out
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Main content with sidebar */}
        <Box sx={{ display: 'flex', flexGrow: 1, pt: 3 }}>
          {/* Mobile menu button */}
          <Box 
            sx={{ 
              position: 'fixed', 
              left: 16, 
              top: 16, // Changed from 72 to 16 since we removed navbar
              zIndex: 99, 
              display: { xs: 'block', md: 'none' } 
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 3,
                '&:hover': {
                  bgcolor: 'background.paper',
                  opacity: 0.9
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          
          {/* Permanent sidebar for desktop */}
          <Box
            component="nav"
            sx={{ width: { md: 240 }, flexShrink: 0, display: { xs: 'none', md: 'block' } }}
          >
            <Drawer
              variant="permanent"
              open
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: 240,
                  overflowX: 'hidden', // Prevent horizontal scrolling
                  borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                  bgcolor: 'background.paper',
                  mt: 0 // Removed space for navbar (was 8)
                },
              }}
            >
              {drawerContent}
            </Drawer>
          </Box>
          
          {/* Temporary drawer for mobile */}
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240,
                overflowX: 'hidden', // Prevent horizontal scrolling
                bgcolor: 'background.paper',
                mt: 0 // Removed space for navbar (was 8)
              },
            }}
          >
            {drawerContent}
          </Drawer>
          
          {/* Main content container */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 3,
              pl: { md: 15 }, // Added small left padding instead of 0
              pr: { md: 5 }, // Keep right padding
              width: { md: `calc(100% - 420px)` }, // Slightly wider than previous 200px
              ml: { xs: 0, md: '260px' }, // Slightly smaller left margin to move content right
              maxWidth: { lg: '1400px' },
              mx: { xs: 'auto', md: '0' }, // Only auto margin on mobile
              position: 'relative',
            }}
          >
            {/* Page header with section title and actions */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                {navItems.find(item => item.id === activeSection)?.label || 'Studio Dashboard'}
              </Typography>
              
              {activeSection !== 'overview' && (
                <Box>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => {
                      setEditMode(false);
                      setActiveSection('overview');
                      fetchStudioData(); // Refresh original data
                    }}
                    sx={{ mr: 2 }}
                    startIcon={<Cancel />}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={saveChanges}
                    startIcon={<Save />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )}
            </Box>
            
            {/* Content based on active section */}
            {activeSection === 'overview' && (
              <Box>
                {/* Studio profile overview */}
                <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
                  {/* Studio Title & Basic Info */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h5" component="h1" sx={{ color: 'text.primary', mb: 1 }}>
                        {studioData.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn sx={{ color: 'error.main', mr: 1, fontSize: 20 }} />
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          {studioData.address}, {studioData.country}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button 
                      variant="outlined" 
                      color="primary"
                      startIcon={<Edit />}
                      onClick={toggleEditMode}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                  
                  {/* Image gallery preview */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Images</Typography>
                    <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                      {studioImages.slice(0, 6).map((url, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={url}
                          alt={`Studio image ${index + 1}`}
                          sx={{
                            height: 100,
                            width: 150,
                            objectFit: 'cover',
                            borderRadius: 1,
                            cursor: 'pointer'
                          }}
                          onClick={() => openGallery(index)}
                        />
                      ))}
                      {studioImages.length === 0 && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          No images uploaded yet
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  
                  {/* Description preview */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                      About
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      {studioData.description.length > 200 
                        ? `${studioData.description.substring(0, 200)}...` 
                        : studioData.description}
                      {studioData.description === '' && 'No description available'}
                    </Typography>
                  </Box>
                  
                  {/* Services preview */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                      Services
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {studioData.services.slice(0, 5).map((service, index) => (
                        <Chip 
                          key={index} 
                          label={service} 
                          sx={{ bgcolor: 'rgba(0, 188, 212, 0.1)' }} 
                        />
                      ))}
                      {studioData.services.length > 5 && (
                        <Chip 
                          label={`+${studioData.services.length - 5} more`} 
                          sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
                        />
                      )}
                      {studioData.services.length === 0 && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          No services added yet
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  
                  {/* Gear preview */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                      Studio Equipment
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {studioGear.slice(0, 3).map((gear, index) => (
                        <Chip 
                          key={index} 
                          label={gear.category} 
                          sx={{ bgcolor: 'rgba(0, 188, 212, 0.1)' }} 
                        />
                      ))}
                      {studioGear.length > 3 && (
                        <Chip 
                          label={`+${studioGear.length - 3} more categories`} 
                          sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
                        />
                      )}
                      {studioGear.length === 0 && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          No equipment added yet
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  
                  {/* Booking rates preview */}
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                      Booking Information
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Hourly Rate
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                          LKR {studioData.hourlyRate.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Minimum Duration
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                          {studioData.minimumDuration} {studioData.minimumDuration === 1 ? 'hour' : 'hours'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>

                {/* Quick Actions */}
                <Paper sx={{ p: 3, bgcolor: 'background.paper', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    {navItems.slice(1).map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Button
                          variant="outlined"
                          startIcon={item.icon}
                          fullWidth
                          sx={{
                            justifyContent: 'flex-start',
                            p: 2,
                            textTransform: 'none',
                            borderColor: 'rgba(255, 255, 255, 0.12)',
                            '&:hover': {
                              borderColor: 'primary.main',
                              bgcolor: 'rgba(0, 188, 212, 0.05)'
                            }
                          }}
                          onClick={() => handleSectionChange(item.id)}
                        >
                          {item.label}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Box>
            )}
            
            {/* Basic Profile Info Section */}
            {activeSection === 'profile' && (
              <Box>
                <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                    Basic Information
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Studio Name"
                        fullWidth
                        value={studioData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        disabled={!editMode}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Address"
                        fullWidth
                        value={studioData.address}
                        onChange={(e) => handleFieldChange('address', e.target.value)}
                        disabled={!editMode}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Country"
                        fullWidth
                        value={studioData.country}
                        onChange={(e) => handleFieldChange('country', e.target.value)}
                        disabled={!editMode}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Studio Description"
                        fullWidth
                        multiline
                        rows={5}
                        value={studioData.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                        disabled={!editMode}
                        placeholder="Provide a detailed description of your studio..."
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Recording Booths"
                        fullWidth
                        multiline
                        rows={3}
                        value={studioData.recordingBooths}
                        onChange={(e) => handleFieldChange('recordingBooths', e.target.value)}
                        disabled={!editMode}
                        placeholder="Describe your recording booths..."
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Lounge Area"
                        fullWidth
                        multiline
                        rows={3}
                        value={studioData.loungeArea}
                        onChange={(e) => handleFieldChange('loungeArea', e.target.value)}
                        disabled={!editMode}
                        placeholder="Describe your lounge area..."
                      />
                    </Grid>
                  </Grid>
                </Paper>
                
                {/* Social Media Links */}
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                    Social Media Links
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Instagram URL"
                        fullWidth
                        value={studioData.socialMedia?.instagram || ''}
                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                        disabled={!editMode}
                        placeholder="https://instagram.com/yourstudio"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ color: '#E1306C' }}>
                              <Instagram />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Facebook URL"
                        fullWidth
                        value={studioData.socialMedia?.facebook || ''}
                        onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                        disabled={!editMode}
                        placeholder="https://facebook.com/yourstudio"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ color: '#4267B2' }}>
                              <Facebook />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Twitter URL"
                        fullWidth
                        value={studioData.socialMedia?.twitter || ''}
                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                        disabled={!editMode}
                        placeholder="https://twitter.com/yourstudio"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ color: '#1DA1F2' }}>
                              <Twitter />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Website URL"
                        fullWidth
                        value={studioData.socialMedia?.website || ''}
                        onChange={(e) => handleSocialMediaChange('website', e.target.value)}
                        disabled={!editMode}
                        placeholder="https://yourstudio.com"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ color: '#00BCD4' }}>
                              <Language />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}
            
            {/* Images Gallery Section */}
            {activeSection === 'images' && (
              <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                  Gallery Images
                </Typography>
                
                {/* Upload new image */}
                <Box sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    color="info"
                    component="label"
                    startIcon={<Add />}
                    disabled={!editMode || isSubmitting}
                  >
                    {isSubmitting ? 'Uploading...' : 'Upload New Image'}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={addImage}
                      disabled={!editMode || isSubmitting}
                    />
                  </Button>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Supports: PNG, JPEG, JPG (Max size: 20MB)
                  </Typography>
                </Box>
                
                {/* Image gallery grid */}
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.primary' }}>
                  Current Images ({studioImages.length})
                </Typography>
                
                <Grid container spacing={2}>
                  {studioImages.map((url, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={url}
                          alt={`Studio image ${index + 1}`}
                          sx={{
                            width: '100%',
                            height: 180,
                            objectFit: 'cover',
                            borderRadius: 2,
                            cursor: 'pointer'
                          }}
                          onClick={() => openGallery(index)}
                        />
                        {editMode && (
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => removeImage(index)}
                            disabled={isSubmitting}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: 'rgba(0, 0, 0, 0.7)',
                              '&:hover': {
                                bgcolor: 'rgba(0, 0, 0, 0.9)',
                              }
                            }}
                          >
                            <Delete />
                          </IconButton>
                        )}
                        <Typography variant="caption" sx={{ 
                          position: 'absolute', 
                          bottom: 8, 
                          left: 8, 
                          bgcolor: 'rgba(0, 0, 0, 0.7)', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 1 
                        }}>
                          Image {index + 1}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                  
                  {studioImages.length === 0 && (
                    <Grid item xs={12}>
                      <Box 
                        sx={{ 
                          p: 3, 
                          border: '2px dashed rgba(255, 255, 255, 0.2)', 
                          borderRadius: 2, 
                          textAlign: 'center' 
                        }}
                      >
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          No images uploaded yet
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            )}
            
            {/* Services & Features Section */}
            {activeSection === 'services' && (
              <Box>
                {/* Services */}
                <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                    Services
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {studioData.services.map((service, index) => (
                      <Grid item xs={12} key={index}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <TextField
                            fullWidth
                            value={service}
                            onChange={(e) => handleServiceChange(index, e.target.value)}
                            disabled={!editMode}
                          />
                          {editMode && (
                            <IconButton color="error" onClick={() => removeService(index)}>
                              <Delete />
                            </IconButton>
                          )}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  
                  {editMode && (
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="New Service"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        placeholder="e.g., Music Production, Vocal Recording"
                      />
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={addService} 
                        startIcon={<Add />}
                        disabled={!newService.trim()}
                      >
                        Add
                      </Button>
                    </Box>
                  )}
                </Paper>
                
                {/* Features */}
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                    Studio Features
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {studioData.features.map((feature, index) => (
                      <Grid item xs={12} key={index}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <TextField
                            fullWidth
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            disabled={!editMode}
                          />
                          {editMode && (
                            <IconButton color="error" onClick={() => removeFeature(index)}>
                              <Delete />
                            </IconButton>
                          )}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  
                  {editMode && (
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="New Feature"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="e.g., 24/7 Access, Air Conditioning"
                      />
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={addFeature} 
                        startIcon={<Add />}
                        disabled={!newFeature.trim()}
                      >
                        Add
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Box>
            )}
            
            {/* Studio Equipment Section */}
            {activeSection === 'gear' && (
              <Box>
                <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                    Studio Equipment
                  </Typography>
                  
                  {studioGear.map((gear, categoryIndex) => (
                    <Box
                      key={categoryIndex}
                      sx={{
                        mb: 3,
                        p: 2,
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          {gear.category}
                        </Typography>
                        {editMode && (
                          <IconButton 
                            color="error" 
                            onClick={() => removeGearCategory(categoryIndex)}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {gear.items.map((item, itemIndex) => (
                          <Chip
                            key={itemIndex}
                            label={item}
                            onDelete={editMode ? () => removeGearItem(categoryIndex, itemIndex) : undefined}
                            sx={{ bgcolor: 'rgba(0, 188, 212, 0.1)' }}
                          />
                        ))}
                      </Box>
                      
                      {editMode && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Add new item to this category"
                            value={newGearItem[categoryIndex] || ''}
                            onChange={(e) => setNewGearItem(prev => ({ ...prev, [categoryIndex]: e.target.value }))}
                          />
                          <Button 
                            variant="outlined" 
                            onClick={() => addGearItem(categoryIndex)}
                            disabled={!(newGearItem[categoryIndex] || '').trim()}
                            startIcon={<Add />}
                          >
                            Add
                          </Button>
                        </Box>
                      )}
                    </Box>
                  ))}
                  
                  {editMode && (
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="New Equipment Category"
                        value={newGearCategory}
                        onChange={(e) => setNewGearCategory(e.target.value)}
                        placeholder="e.g., Microphones, Synthesizers"
                      />
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={addGearCategory} 
                        startIcon={<Add />}
                        disabled={!newGearCategory.trim()}
                      >
                        Add Category
                      </Button>
                    </Box>
                  )}
                </Paper>
                
                <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                    Quick Add Equipment
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Category"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={isSubmitting}
                        placeholder="e.g., Microphones, Instruments"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Items (comma-separated)"
                        fullWidth
                        value={items}
                        onChange={(e) => setItems(e.target.value)}
                        disabled={isSubmitting}
                        placeholder="e.g., Shure SM7B, AKG C414"
                      />
                    </Grid>
                  </Grid>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddGear} 
                    sx={{ mt: 2 }}
                    disabled={!category.trim() || !items.trim() || isSubmitting}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Equipment'}
                  </Button>
                  
                  {successMessage && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      {successMessage}
                    </Alert>
                  )}
                  
                  {errorMessage && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errorMessage}
                    </Alert>
                  )}
                </Paper>
              </Box>
            )}
            
            {/* Booking Settings Section */}
            {activeSection === 'booking' && (
              <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                  Booking Settings
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Hourly Rate (LKR)"
                      type="number"
                      fullWidth
                      value={studioData.hourlyRate}
                      onChange={(e) => handleFieldChange('hourlyRate', e.target.value)}
                      disabled={!editMode}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">LKR</InputAdornment>,
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      Set your studio's hourly rate for bookings
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Minimum Booking Duration (hours)"
                      type="number"
                      fullWidth
                      value={studioData.minimumDuration}
                      onChange={(e) => handleFieldChange('minimumDuration', e.target.value)}
                      disabled={!editMode}
                      inputProps={{ min: 1 }}
                    />
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      Minimum number of hours required for a booking
                    </Typography>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.primary' }}>
                  Booking Preview
                </Typography>
                
                <Box sx={{ 
                  p: 2, 
                  border: '1px solid rgba(255, 255, 255, 0.12)', 
                  borderRadius: 2 
                }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Hourly Rate:
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        LKR {studioData.hourlyRate.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Minimum Duration:
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        {studioData.minimumDuration} hour{studioData.minimumDuration > 1 ? 's' : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            )}

            {/* Availability Section */}
            {activeSection === 'availability' && (
              <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
                  Manage Availability
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateCalendar
                        value={selectedAvailDate}
                        onChange={setSelectedAvailDate}
                        disablePast
                        sx={{
                          color: 'text.primary',
                          '& .MuiPickersDay-root': { color: 'text.primary' },
                          '& .MuiPickersDay-today': { borderColor: 'primary.main' },
                          '& .Mui-selected': { backgroundColor: 'primary.main' }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.primary' }}>
                      Select Not Available Time Slots
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {timeSlots.map((slot) => {
                        const isUnavailable = selectedUnavailableSlots.includes(slot.value);
                        return (
                          <Button
                            key={slot.value}
                            variant={isUnavailable ? 'contained' : 'outlined'}
                            color={isUnavailable ? 'error' : 'inherit'}
                            size="small"
                            sx={{
                              minWidth: 80,
                              mb: 1,
                              opacity: isUnavailable ? 0.6 : 1,
                              textDecoration: isUnavailable ? 'line-through' : 'none'
                            }}
                            onClick={() => handleAvailSlotToggle(slot.value)}
                          >
                            {slot.label}
                          </Button>
                        );
                      })}
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Upcoming Availability
                </Typography>
                <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  {availability
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .slice(0, 10)
                    .map((a) => (
                      <Box key={a.date} sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                          {a.date}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Available: {a.slots.map((s) => timeSlots.find(t => t.value === s)?.label || s).join(', ') || 'None'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                          Not Available: {a.unavailable?.map((s) => timeSlots.find(t => t.value === s)?.label || s).join(', ') || 'None'}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
        
        {/* Full Screen Gallery Modal */}
        <Dialog
          open={galleryOpen}
          onClose={closeGallery}
          maxWidth="lg"
          fullWidth
          BackdropProps={{
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
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
                src={studioImages[galleryImageIndex] || ''} 
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
