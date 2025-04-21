import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Chip,
  Button,
  Avatar,
  Container,
  TextField,
  Paper,
  Stack,
  Divider,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  FormHelperText,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Save,
  Edit,
  Close,
  AddCircleOutline,
  Delete,
  Person,
  Link as LinkIcon,
  AlbumOutlined,
  Image,
  Upload,
  MusicNote,
  Cancel,
  Instagram,
  YouTube,
  CloudUpload,
  Check,
  Clear
} from '@mui/icons-material';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProImg from '../assets/procover.jpg';
import { authFetch } from '../utils/authFetch';

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  background: '#000000',
  minHeight: '100vh',
  color: '#fff',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '450px',
  backgroundImage: 'linear-gradient(90deg, rgba(0,10,50,0.6) 0%, rgba(0,0,0,0.7) 100%)',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
  padding: theme.spacing(3),
}));

const ProfileOverlay = styled(Box)(({ theme, bgimage }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${bgimage || ProImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.7,
  mixBlendMode: 'normal',
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 220,
  height: 220,
  border: '4px solid #1976d2',
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: 160,
    height: 160,
  },
}));

const GradientCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(10, 25, 41, 0.7)',
  backdropFilter: 'blur(10px)',
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(25, 118, 210, 0.1)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  borderBottom: '1px solid rgba(25, 118, 210, 0.3)',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: 'rgba(25, 118, 210, 0.2)',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const GradientDivider = styled(Box)(({ theme }) => ({
  height: '1px',
  background: 'linear-gradient(to right, rgba(25, 118, 210, 0.5), transparent)',
  flexGrow: 1,
  marginLeft: theme.spacing(2),
}));

const TrackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const GalleryImage = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  position: 'relative',
  height: 0,
  paddingTop: '75%',
  cursor: 'pointer',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  '&:hover .overlay': {
    opacity: 1,
  },
  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  }
}));

const EditControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(10, 25, 41, 0.7)',
  position: 'sticky',
  bottom: 0,
  zIndex: 100,
  borderTop: '1px solid rgba(25, 118, 210, 0.2)',
}));

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#3f51b5',
    },
    background: {
      default: '#000',
      paper: 'rgba(10, 25, 41, 0.6)',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const MusicianProfileEditInline = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    avatar: '',
    coverImage: '',
    tags: [],
    about: '',
    links: [],
    genres: [],
    skills: [],
    tools: [],
    tracks: [],
    galleryImages: []
  });

  // State for editable versions of data
  const [editableData, setEditableData] = useState({
    name: '',
    country: '',
    tags: [],
    about: '',
    links: [],
    genres: [],
    skills: [],
    tools: [],
    tracks: [],
    newTag: '',
    newLink: { platform: '', url: '' },
    newGenre: '',
    newSkill: '',
    newTool: '',
    newTrack: { title: '', duration: '' },
  });

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  
  // File upload states
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [newCoverFile, setNewCoverFile] = useState(null);
  const [newGalleryFile, setNewGalleryFile] = useState(null);
  const [newAudioFile, setNewAudioFile] = useState(null);
  
  // File preview URLs
  const [avatarPreview, setAvatarPreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');

  // Alert notifications
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('You must be logged in to edit your profile', 'error');
      setIsEditing(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  // File upload handlers
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      showNotification('Please select an image file', 'error');
      return;
    }
    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file', 'error');
      return;
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showNotification('Image size should be less than 5MB', 'error');
      return;
    }
    setNewAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      showNotification('Profile image preview updated', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
        showNotification('Cover image preview updated', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGalleryFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newGallery = [...formData.galleryImages, reader.result];
        setFormData({ ...formData, galleryImages: newGallery });
        showNotification('New image added to gallery', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAudioFile(file);
      showNotification('Audio file selected (local only)', 'info');
    }
  };

  // Start editing all sections
  const startEditing = () => {
    setIsEditing(true);
  };

  // Cancel editing all sections
  const cancelEditing = () => {
    setIsEditing(false);
    // Reset all editable data
    setEditableData({
      ...editableData,
      name: formData.name,
      country: formData.country,
      tags: [...formData.tags],
      about: formData.about,
      links: [...formData.links],
      genres: [...formData.genres],
      skills: [...formData.skills],
      tools: [...formData.tools],
      tracks: [...formData.tracks],
      newTag: '',
      newLink: { platform: '', url: '' },
      newGenre: '',
      newSkill: '',
      newTool: '',
      newTrack: { title: '', duration: '' }
    });
    setAvatarPreview('');
    setCoverPreview('');
  };

  // Save the entire profile (with backend API call)
  const handleSaveProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setNotification({ open: true, message: 'You must be logged in to save your profile', severity: 'error' });
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();

    // Add text fields (stringify arrays/objects)
    formDataToSend.append('name', editableData.name);
    formDataToSend.append('country', editableData.country);
    formDataToSend.append('about', editableData.about);
    formDataToSend.append('tags', JSON.stringify(editableData.tags));
    formDataToSend.append('links', JSON.stringify(editableData.links));
    formDataToSend.append('genres', JSON.stringify(editableData.genres));
    formDataToSend.append('skills', JSON.stringify(editableData.skills));
    formDataToSend.append('tools', JSON.stringify(editableData.tools));
    formDataToSend.append('tracks', JSON.stringify(editableData.tracks));

    // Add files if selected
    if (newAvatarFile) formDataToSend.append('avatar', newAvatarFile);
    if (newCoverFile) formDataToSend.append('coverImage', newCoverFile);
    if (newGalleryFile) formDataToSend.append('gallery', newGalleryFile);
    if (newAudioFile) formDataToSend.append('track', newAudioFile);

    try {
      const response = await fetch('http://localhost:5000/api/musician/profile', {
        method: 'PUT',
        headers: {
          'x-auth-token': token
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setNotification({ open: true, message: 'Profile saved successfully!', severity: 'success' });
        setIsEditing(false);
        // Update local state with backend data
        fetchProfile();
      } else {
        setNotification({ open: true, message: data.message || 'Failed to save profile', severity: 'error' });
      }
    } catch (err) {
      setNotification({ open: true, message: 'Unable to connect to the server. Please try again later.', severity: 'error' });
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  // Handle input changes for editable fields
  const handleEditableChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  // Handle array item changes (tags, links, etc.)
  const handleArrayItemChange = (e, index, arrayName) => {
    const { value } = e.target;
    const newArray = [...editableData[arrayName]];
    newArray[index] = value;
    setEditableData({ ...editableData, [arrayName]: newArray });
  };

  // Handle link changes
  const handleLinkChange = (e, index, field) => {
    const { value } = e.target;
    const newLinks = [...editableData.links];
    newLinks[index][field] = value;
    setEditableData({ ...editableData, links: newLinks });
  };

  // Handle track changes
  const handleTrackChange = (e, index, field) => {
    const { value } = e.target;
    const newTracks = [...editableData.tracks];
    newTracks[index][field] = value;
    setEditableData({ ...editableData, tracks: newTracks });
  };

  // Add new items to arrays
  const addNewTag = () => {
    if (editableData.newTag.trim() === '') return;
    setEditableData({
      ...editableData,
      tags: [...editableData.tags, editableData.newTag],
      newTag: ''
    });
  };

  const addNewLink = () => {
    if (editableData.newLink.platform.trim() === '' || editableData.newLink.url.trim() === '') return;
    setEditableData({
      ...editableData,
      links: [...editableData.links, { ...editableData.newLink }],
      newLink: { platform: '', url: '' }
    });
  };

  const addNewGenre = () => {
    if (editableData.newGenre.trim() === '') return;
    setEditableData({
      ...editableData,
      genres: [...editableData.genres, editableData.newGenre],
      newGenre: ''
    });
  };

  const addNewSkill = () => {
    if (editableData.newSkill.trim() === '') return;
    setEditableData({
      ...editableData,
      skills: [...editableData.skills, editableData.newSkill],
      newSkill: ''
    });
  };

  const addNewTool = () => {
    if (editableData.newTool.trim() === '') return;
    setEditableData({
      ...editableData,
      tools: [...editableData.tools, editableData.newTool],
      newTool: ''
    });
  };

  const addNewTrack = () => {
    if (editableData.newTrack.title.trim() === '' || editableData.newTrack.duration.trim() === '') return;
    
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newTrack = {
      id: Date.now(),
      title: editableData.newTrack.title,
      duration: editableData.newTrack.duration,
      uploadDate: today,
      audioFile: newAudioFile ? newAudioFile.name : null
    };
    
    setEditableData({
      ...editableData,
      tracks: [...editableData.tracks, newTrack],
      newTrack: { title: '', duration: '' }
    });
    setNewAudioFile(null);
  };

  // Remove items from arrays
  const removeItem = (index, arrayName) => {
    const newArray = [...editableData[arrayName]];
    newArray.splice(index, 1);
    setEditableData({ ...editableData, [arrayName]: newArray });
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...formData.galleryImages];
    newGallery.splice(index, 1);
    setFormData({ ...formData, galleryImages: newGallery });
    showNotification('Gallery image removed', 'success');
  };

  // Notification helper
  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setNotification({ open: true, message: 'You must be logged in to view your profile', severity: 'error' });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/musician/profiles', {
        method: 'GET',
        headers: {
          'x-auth-token': token
        }
      });
      const data = await response.json();
      if (data.success && data.musician) {
        setFormData({
          name: data.musician.fullName,
          country: data.musician.country,
          avatar: data.musician.profileImage,
          coverImage: data.musician.coverImage,
          tags: data.musician.tags || [],
          about: data.musician.about || '',
          links: data.musician.links || [],
          genres: data.musician.genres || [],
          skills: data.musician.skills || [],
          tools: data.musician.tools || [],
          tracks: (data.musician.featuredTracks || []).map((track, i) => ({
            id: i + 1,
            title: track.title,
            duration: track.duration,
            uploadDate: track.uploadDate,
            audioFile: track.audioUrl
          })),
          galleryImages: data.musician.galleryImages || []
        });
        setEditableData(prev => ({
          ...prev,
          name: data.musician.fullName,
          country: data.musician.country,
          tags: data.musician.tags || [],
          about: data.musician.about || '',
          links: data.musician.links || [],
          genres: data.musician.genres || [],
          skills: data.musician.skills || [],
          tools: data.musician.tools || [],
          tracks: (data.musician.featuredTracks || []).map((track, i) => ({
            id: i + 1,
            title: track.title,
            duration: track.duration,
            uploadDate: track.uploadDate,
            audioFile: track.audioUrl
          })),
          newTag: '',
          newLink: { platform: '', url: '' },
          newGenre: '',
          newSkill: '',
          newTool: '',
          newTrack: { title: '', duration: '' }
        }));
      } else {
        setNotification({ open: true, message: data.message || 'Failed to fetch profile', severity: 'error' });
      }
    } catch (err) {
      setNotification({ open: true, message: 'Server error', severity: 'error' });
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GradientBackground>
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section with Larger Cover Image */}
        <Box sx={{ position: 'relative', mb: 4 }}>
          <HeroSection>
            <ProfileOverlay bgimage={formData.coverImage || coverPreview || ProImg} />
            
            {isEditing && (
              <Box sx={{ 
                position: 'absolute', 
                top: 10,
                right: 10, 
                zIndex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 1,
                padding: '4px'
              }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  size="small"
                >
                  Change Cover
                  <VisuallyHiddenInput 
                    type="file"   
                    accept="image/*"
                    onChange={handleCoverUpload}
                  />
                </Button>
              </Box>
            )}
            
            {/* Producer Info Overlay */}
            <Box sx={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'flex-end', 
              width: '100%', 
              zIndex: 1,
              flexWrap: { xs: 'wrap', md: 'nowrap' }
            }}>
              <Box sx={{ position: 'relative', mb: { xs: 2, md: 0 } }}>
                <LargeAvatar 
                  src={formData.avatar || avatarPreview || ProImg} 
                  alt="Profile Avatar"
                />
                
                {isEditing && (
                  <IconButton 
                    component="label"
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      backgroundColor: 'rgba(25, 118, 210, 0.8)',
                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 1)' }
                    }}
                  >
                    <Edit fontSize="small" />
                    <VisuallyHiddenInput 
                      type="file" 
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </IconButton>
                )}
              </Box>
              
              <Box sx={{ 
                ml: { xs: 0, md: 4 }, 
                flex: 1,
                width: { xs: '100%', md: 'auto' }
              }}>
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      name="name"
                      value={editableData.name}
                      onChange={handleEditableChange}
                      label="Artist/Producer Name"
                      variant="filled"
                      sx={{ 
                        mb: 2,
                        input: { 
                          color: 'white', 
                          fontSize: '2rem',
                          fontWeight: 'bold'
                        }
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      name="country"
                      value={editableData.country}
                      onChange={handleEditableChange}
                      label="Country"
                      variant="filled"
                      sx={{ mb: 2 }}
                    />
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {editableData.tags.map((tag, index) => (
                        <Chip 
                          key={index} 
                          label={tag} 
                          size="small"
                          sx={{ backgroundColor: 'rgba(25, 118, 210, 0.4)' }}
                          onDelete={() => removeItem(index, 'tags')}
                        />
                      ))}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                          size="small"
                          value={editableData.newTag}
                          onChange={(e) => setEditableData({ ...editableData, newTag: e.target.value })}
                          placeholder="Add tag"
                          sx={{ 
                            '& .MuiInputBase-root': { height: 32 },
                            '& .MuiInputBase-input': { py: 0.5, px: 1 }
                          }}
                        />
                        <IconButton size="small" onClick={addNewTag}>
                          <AddCircleOutline fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {formData.name}
                    </Typography>
                    
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      {formData.country}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {formData.tags.map((tag, index) => (
                        <Chip 
                          key={index} 
                          label={tag} 
                          size="small"
                          sx={{ backgroundColor: 'rgba(25, 118, 210, 0.4)' }}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </HeroSection>
        </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Edit Profile Button (when not editing) */}
          {!isEditing && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Edit />}
                onClick={startEditing}
                sx={{ px: 4, py: 1.5 }}
              >
                Edit Profile
              </Button>
            </Box>
          )}

          <Grid container spacing={4}>
            {/* Left Column - About Section */}
            <Grid item xs={12} md={4}>
              {/* About Section */}
              <GradientCard elevation={3}>
                <CardContent>
                  <SectionTitle variant="h5" gutterBottom>
                    <IconContainer>
                      <Person />
                    </IconContainer>
                    About You
                  </SectionTitle>
                  
                  {isEditing ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      value={editableData.about}
                      onChange={(e) => setEditableData({ ...editableData, about: e.target.value })}
                      variant="outlined"
                    />
                  ) : (
                    <Typography variant="body1" paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                      {formData.about}
                    </Typography>
                  )}
                </CardContent>
              </GradientCard>
              
              {/* Links Section */}
              <GradientCard elevation={3}>
                <CardContent>
                  <SectionTitle variant="h5" gutterBottom>
                    <IconContainer>
                      <LinkIcon />
                    </IconContainer>
                    Links
                  </SectionTitle>
                  
                  {isEditing ? (
                    <Stack direction="column" spacing={2}>
                      {editableData.links.map((link, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Platform</InputLabel>
                            <Select
                              value={link.platform}
                              onChange={(e) => handleLinkChange(e, index, 'platform')}
                              label="Platform"
                            >
                              <MenuItem value="Spotify">Spotify</MenuItem>
                              <MenuItem value="YouTube">YouTube</MenuItem>
                              <MenuItem value="Instagram">Instagram</MenuItem>
                              <MenuItem value="SoundCloud">SoundCloud</MenuItem>
                              <MenuItem value="Bandcamp">Bandcamp</MenuItem>
                              <MenuItem value="Apple Music">Apple Music</MenuItem>
                              <MenuItem value="Website">Website</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            size="small"
                            fullWidth
                            value={link.url}
                            onChange={(e) => handleLinkChange(e, index, 'url')}
                            placeholder="URL"
                          />
                          <IconButton size="small" onClick={() => removeItem(index, 'links')}>
                            <Delete />
                          </IconButton>
                        </Box>
                      ))}
                      
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Platform</InputLabel>
                          <Select
                            value={editableData.newLink.platform}
                            onChange={(e) => setEditableData({ 
                              ...editableData, 
                              newLink: { ...editableData.newLink, platform: e.target.value } 
                            })}
                            label="Platform"
                          >
                            <MenuItem value="Spotify">Spotify</MenuItem>
                            <MenuItem value="YouTube">YouTube</MenuItem>
                            <MenuItem value="Instagram">Instagram</MenuItem>
                            <MenuItem value="SoundCloud">SoundCloud</MenuItem>
                            <MenuItem value="Bandcamp">Bandcamp</MenuItem>
                            <MenuItem value="Apple Music">Apple Music</MenuItem>
                            <MenuItem value="Website">Website</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          size="small"
                          fullWidth
                          value={editableData.newLink.url}
                          onChange={(e) => setEditableData({ 
                            ...editableData, 
                            newLink: { ...editableData.newLink, url: e.target.value } 
                          })}
                          placeholder="URL"
                        />
                        <IconButton size="small" onClick={addNewLink}>
                          <AddCircleOutline />
                        </IconButton>
                      </Box>
                    </Stack>
                  ) : (
                    <Stack direction="column" spacing={2}>
                      {formData.links.map((link, index) => (
                        <Button 
                          key={index}
                          variant="contained" 
                          startIcon={link.platform === 'YouTube' ? <YouTube /> : 
                                    link.platform === 'Instagram' ? <Instagram /> : <LinkIcon />} 
                          size="medium"
                          sx={{ 
                            backgroundColor: 'rgba(20, 20, 20, 0.8)',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: 'rgba(40, 40, 40, 0.9)',
                            }
                          }}
                        >
                          {link.platform}
                        </Button>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </GradientCard>
              
              {/* Genres & Skills */}
              <GradientCard elevation={3}>
                <CardContent>
                  <SectionTitle variant="h5" gutterBottom>
                    <IconContainer>
                      <AlbumOutlined />
                    </IconContainer>
                    Genres & Skills
                  </SectionTitle>
                  
                  {/* Genres Section */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase' }}>
                      GENRES
                    </Typography>
                    
                    {isEditing ? (
                      <>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {editableData.genres.map((genre, index) => (
                            <Chip 
                              key={index} 
                              label={genre} 
                              size="small" 
                              sx={{ 
                                mb: 1, 
                                bgcolor: 'rgba(25, 118, 210, 0.2)',
                                fontSize: '0.75rem'
                              }}
                              onDelete={() => removeItem(index, 'genres')}
                            />
                          ))}
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <TextField
                            size="small"
                            fullWidth
                            value={editableData.newGenre}
                            onChange={(e) => setEditableData({ ...editableData, newGenre: e.target.value })}
                            placeholder="Add genre"
                          />
                          <IconButton size="small" onClick={addNewGenre}>
                            <AddCircleOutline fontSize="small" />
                          </IconButton>
                        </Box>
                      </>
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {formData.genres.map((genre, index) => (
                          <Chip 
                            key={index} 
                            label={genre} 
                            size="small" 
                            sx={{ 
                              mb: 1, 
                              bgcolor: 'rgba(25, 118, 210, 0.2)',
                              fontSize: '0.75rem'
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                  
                  {/* Skills Section */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase' }}>
                      SKILLS
                    </Typography>
                    
                    {isEditing ? (
                      <>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {editableData.skills.map((skill, index) => (
                            <Chip 
                              key={index} 
                              label={skill} 
                              variant="outlined" 
                              size="small"
                              sx={{ 
                                mb: 1, 
                                borderColor: 'rgba(25, 118, 210, 0.3)',
                                fontSize: '0.75rem'
                              }}
                              onDelete={() => removeItem(index, 'skills')}
                            />
                          ))}
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <TextField
                            size="small"
                            fullWidth
                            value={editableData.newSkill}
                            onChange={(e) => setEditableData({ ...editableData, newSkill: e.target.value })}
                            placeholder="Add skill"
                          />
                          <IconButton size="small" onClick={addNewSkill}>
                            <AddCircleOutline fontSize="small" />
                          </IconButton>
                        </Box>
                      </>
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {formData.skills.map((skill, index) => (
                          <Chip 
                            key={index} 
                            label={skill} 
                            variant="outlined" 
                            size="small"
                            sx={{ 
                              mb: 1, 
                              borderColor: 'rgba(25, 118, 210, 0.3)',
                              fontSize: '0.75rem'
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                  
                  {/* Tools Section */}
                  <Box>
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase' }}>
                      TOOLS
                    </Typography>
                    
                    {isEditing ? (
                      <>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {editableData.tools.map((tool, index) => (
                            <Chip 
                              key={index} 
                              label={tool} 
                              size="small"
                              sx={{ 
                                mb: 1, 
                                background: 'linear-gradient(90deg, rgba(10,25,41,0.6) 0%, rgba(25,58,95,0.6) 100%)',
                                fontSize: '0.75rem'
                              }}
                              onDelete={() => removeItem(index, 'tools')}
                            />
                          ))}
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <TextField
                            size="small"
                            fullWidth
                            value={editableData.newTool}
                            onChange={(e) => setEditableData({ ...editableData, newTool: e.target.value })}
                            placeholder="Add tool"
                          />
                          <IconButton size="small" onClick={addNewTool}>
                            <AddCircleOutline fontSize="small" />
                          </IconButton>
                        </Box>
                      </>
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {formData.tools.map((tool, index) => (
                          <Chip 
                            key={index} 
                            label={tool} 
                            size="small"
                            sx={{ 
                              mb: 1, 
                              background: 'linear-gradient(90deg, rgba(10,25,41,0.6) 0%, rgba(25,58,95,0.6) 100%)',
                              fontSize: '0.75rem'
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </GradientCard>
            </Grid>
            
            {/* Right Column - Featured Tracks & Gallery */}
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2.25rem' }
                  }}
                >
                  <IconContainer sx={{ mr: 2, p: 1.5 }}>
                    <MusicNote />
                  </IconContainer>
                  Featured Tracks
                  <GradientDivider />
                </Typography>
              </Box>
              
              {/* Tracks Section */}
              {isEditing ? (
                <Stack spacing={2}>
                  {editableData.tracks.map((track, index) => (
                    <TrackContainer key={track.id}>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          fullWidth
                          value={track.title}
                          onChange={(e) => handleTrackChange(e, index, 'title')}
                          variant="outlined"
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            value={track.duration}
                            onChange={(e) => handleTrackChange(e, index, 'duration')}
                            variant="outlined"
                            size="small"
                            label="Duration"
                            sx={{ width: 120 }}
                          />
                          
                          <Button
                            component="label"
                            variant="outlined"
                            size="small"
                            startIcon={<Upload />}
                          >
                            Audio
                            <VisuallyHiddenInput 
                              type="file" 
                              accept="audio/*"
                              onChange={handleAudioUpload}
                            />
                          </Button>
                        </Box>
                      </Box>
                      
                      <IconButton size="small" onClick={() => removeItem(index, 'tracks')}>
                        <Delete />
                      </IconButton>
                    </TrackContainer>
                  ))}
                  
                  {/* Add New Track */}
                  <TrackContainer>
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        value={editableData.newTrack.title}
                        onChange={(e) => setEditableData({ 
                          ...editableData, 
                          newTrack: { ...editableData.newTrack, title: e.target.value } 
                        })}
                        variant="outlined"
                        size="small"
                        placeholder="Track title"
                        sx={{ mb: 1 }}
                      />
                      
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          value={editableData.newTrack.duration}
                          onChange={(e) => setEditableData({ 
                            ...editableData, 
                            newTrack: { ...editableData.newTrack, duration: e.target.value } 
                          })}
                          variant="outlined"
                          size="small"
                          placeholder="Duration"
                          sx={{ width: 120 }}
                        />
                        
                        <Button
                          component="label"
                          variant="outlined"
                          size="small"
                          startIcon={<Upload />}
                        >
                          Audio
                          <VisuallyHiddenInput 
                            type="file" 
                            accept="audio/*"
                            onChange={handleAudioUpload}
                          />
                        </Button>
                      </Box>
                    </Box>
                    
                    <IconButton size="small" onClick={addNewTrack}>
                      <AddCircleOutline />
                    </IconButton>
                  </TrackContainer>
                </Stack>
              ) : (
                <Stack spacing={1}>
                  {formData.tracks.map((track, index) => (
                    <TrackContainer key={track.id}>
                      <Box sx={{ flex: 1, ml: 2 }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 500,
                            color: 'white'
                          }}
                        >
                          {track.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {track.duration}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary">
                            {track.uploadDate}
                          </Typography>
                        </Box>
                        {track.audioFile && (
                          <audio controls style={{ width: '100%', marginTop: '8px' }}>
                            <source src={track.audioFile} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        )}
                      </Box>
                    </TrackContainer>
                  ))}
                </Stack>
              )}
              
              {/* Gallery Section */}
              <Box sx={{ mt: 6 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2.25rem' }
                  }}
                >
                  <IconContainer sx={{ mr: 2, p: 1.5 }}>
                    <Image />
                  </IconContainer>
                  Artist Gallery
                  {isEditing && (
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUpload />}
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      Add Image
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="image/*"
                        onChange={handleGalleryUpload}
                      />
                    </Button>
                  )}
                  <GradientDivider />
                </Typography>
                
                <Grid container spacing={2}>
                  {formData.galleryImages.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <GalleryImage>
                        <img src={image} alt={`Gallery Image ${index + 1}`} />
                        {isEditing && (
                          <Box className="overlay">
                            <IconButton 
                              onClick={() => removeGalleryImage(index)}
                              sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        )}
                      </GalleryImage>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* Edit Controls (Save/Cancel) - Only visible when editing */}
          {isEditing && (
            <EditControls>
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<Clear />}
                onClick={cancelEditing}
                size="large"
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Check />}
                onClick={handleSaveProfile}
                size="large"
              >
                Save Changes
              </Button>
            </EditControls>
          )}
        </Container>
        
        {/* Footer */}
        <Footer />
        
        {/* Notifications */}
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              bgcolor: 'rgba(0,0,0,0.4)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress size={80} color="primary" />
          </Box>
        )}
      </GradientBackground>
    </ThemeProvider>
  );
};

export default MusicianProfileEditInline;