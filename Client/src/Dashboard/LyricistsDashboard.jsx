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
  Clear,
  Twitter,
  LinkedIn
} from '@mui/icons-material';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { authFetch } from '../utils/authFetch';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import CoverImageCropper from '../Components/CoverImageCropper';
import ProfileImageCropper from '../Components/ProfileImageCropper';

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  background: '#000000',
  minHeight: '100vh',
  color: '#fff',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '550px',
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
  backgroundImage: bgimage ? `url(${bgimage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: bgimage ? 0.7 : 0,
  mixBlendMode: 'normal',
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 220,
  height: 220,
  border: '4px solid #1976d2',
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  marginBottom: theme.spacing(2),
  backgroundColor: '#1976d2', // Default background color if no image
  [theme.breakpoints.down('sm')]: {
    width: 160,
    height: 160,
  },
}));

const GradientCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(19, 38, 57, 0.85)', // Darker background
  backdropFilter: 'blur(10px)',
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(25, 118, 210, 0.1)',
  '& .MuiCardContent-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker inner content
  }
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
    galleryImages: [],
    portfolioLinks: {
      spotify: '',
      soundcloud: '',
      youtube: '',
      appleMusic: ''
    },
    socialMedia: {
      instagram: '',
      twitter: '',
      linkedin: ''
    }
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
    portfolioLinks: {
      spotify: '',
      soundcloud: '',
      youtube: '',
      appleMusic: ''
    },
    socialMedia: {
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    newTag: '',
    newLink: { platform: '', url: '' },
    newGenre: '',
    newSkill: '',
    newTool: '',
    newTrack: { title: '' },
  });

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  
  // File upload states
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [newCoverFile, setNewCoverFile] = useState(null);
  const [newGalleryFile, setNewGalleryFile] = useState(null);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]); // Array of files
  const [newAudioFile, setNewAudioFile] = useState(null);
  
  // File preview URLs
  const [avatarPreview, setAvatarPreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [galleryPreviews, setGalleryPreviews] = useState([]); // For local preview only

  // Alert notifications
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [loading, setLoading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [rawCoverImage, setRawCoverImage] = useState(null);
  const [profileCropperOpen, setProfileCropperOpen] = useState(false);
  const [rawProfileImage, setRawProfileImage] = useState(null);

  const [lyricists, setLyricists] = useState([]);
  const [loadingLyricists, setLoadingLyricists] = useState(true);
  const [lyricistsError, setLyricistsError] = useState(null);

  useEffect(() => {
    const fetchLyricists = async () => {
      setLoadingLyricists(true);
      try {
        const response = await fetch('http://localhost:5000/api/musician/lyricists');
        const data = await response.json();
        if (data.success) {
          setLyricists(data.lyricists);
        } else {
          setLyricistsError(data.message || 'Failed to fetch lyricists');
        }
      } catch (err) {
        setLyricistsError('Server error');
      } finally {
        setLoadingLyricists(false);
      }
    };
    fetchLyricists();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      // Redirect to login if no user data
      window.location.href = '/login';
      return;
    }
    
    // Optionally verify with backend
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/musician/current', {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error('User verification failed');
      }
      // Optionally handle the response data
      const data = await response.json();
      console.log('User verified:', data);
    } catch (error) {
      console.error('Error verifying user:', error);
      // Redirect to login on verification failure
      window.location.href = '/login';
    }
  };

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
    const reader = new FileReader();
    reader.onloadend = () => {
      setRawProfileImage(reader.result);
      setProfileCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileCropComplete = (croppedBlob) => {
    setNewAvatarFile(new File([croppedBlob], "avatar.jpg", { type: "image/jpeg" }));
    const previewUrl = URL.createObjectURL(croppedBlob);
    setAvatarPreview(previewUrl);
    setProfileCropperOpen(false);
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawCoverImage(reader.result);
        setCropperOpen(true); // Open cropper dialog
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBlob) => {
    setNewCoverFile(new File([croppedBlob], "cover.jpg", { type: "image/jpeg" }));
    const previewUrl = URL.createObjectURL(croppedBlob);
    setCoverPreview(previewUrl);
    setCropperOpen(false);
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setNewGalleryFiles(files); // For upload

    // Show previews immediately, but keep them separate
    const previews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews(previews);

    showNotification(`${files.length} new image(s) added to gallery`, 'success');
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
      newTrack: { title: '' }
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

    // Always send these fields
    formDataToSend.append('name', editableData.name);
    formDataToSend.append('country', editableData.country);
    formDataToSend.append('about', editableData.about);
    formDataToSend.append('tags', JSON.stringify(editableData.tags));
    formDataToSend.append('links', JSON.stringify(editableData.links));
    formDataToSend.append('genres', JSON.stringify(editableData.genres));
    formDataToSend.append('skills', JSON.stringify(editableData.skills));
    formDataToSend.append('tools', JSON.stringify(editableData.tools));
    formDataToSend.append('portfolioLinks', JSON.stringify(editableData.portfolioLinks));
    formDataToSend.append('socialMedia', JSON.stringify(editableData.socialMedia));

    // Only send new avatar/cover/gallery if changed
    if (newAvatarFile) formDataToSend.append('avatar', newAvatarFile);
    if (newCoverFile) formDataToSend.append('coverImage', newCoverFile);
    if (newGalleryFiles && newGalleryFiles.length > 0) {
      newGalleryFiles.forEach(file => {
        formDataToSend.append('gallery', file); // Multer will handle as array
      });
    }

    // Only send 'track' and its metadata if a new audio file is selected
    if (newAudioFile) {
      formDataToSend.append('track', newAudioFile);
      formDataToSend.append('tracks', JSON.stringify([editableData.newTrack]));
    }

    try {
      const response = await fetch('http://localhost:5000/api/musician/profile', {
        method: 'PUT',
        headers: { 'x-auth-token': token },
        body: formDataToSend
      });

      if (!response.ok) throw new Error(`Server responded with status ${response.status}`);

      const data = await response.json();
      if (data.success) {
        setNotification({ open: true, message: 'Profile saved successfully!', severity: 'success' });
        setIsEditing(false);
        setNewGalleryFiles([]);      // Clear upload queue
        setGalleryPreviews([]);      // Clear local previews
        setNewAudioFile(null);       // Reset audio state
        fetchProfile();              // Reload real images from backend
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
    if (editableData.newTrack.title.trim() === '') return;
    
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newTrack = {
      id: Date.now(),
      title: editableData.newTrack.title,
      uploadDate: today,
      audioFile: newAudioFile ? newAudioFile.name : null
    };
    
    setEditableData({
      ...editableData,
      tracks: [...editableData.tracks, newTrack],
      newTrack: { title: '' }
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
    // Also update editableData to maintain consistency
    setEditableData(prev => ({
      ...prev,
      galleryImages: newGallery
    }));
    showNotification('Gallery image removed', 'success');
  };

  const deleteGalleryImage = async (imageUrl) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        showNotification('You must be logged in to delete images', 'error');
        return;
      }

      const response = await authFetch('http://localhost:5000/api/musician/profile/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ imageUrl })
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the local state to remove the deleted image
        const updatedGallery = formData.galleryImages.filter(img => img !== imageUrl);
        setFormData({ ...formData, galleryImages: updatedGallery });
        showNotification('Image deleted successfully', 'success');
      } else {
        showNotification(data.message || 'Failed to delete image', 'error');
      }
    } catch (err) {
      showNotification('Error deleting image', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGalleryImage = async (imageUrlOrKey, index) => {
    let imageKey = imageUrlOrKey;
    
    // Extract key from URL if it's a full URL
    if (imageUrlOrKey.startsWith('http')) {
      const url = new URL(imageUrlOrKey);
      imageKey = url.pathname.substring(1); // Remove leading slash
    }
  
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/musician/gallery/${encodeURIComponent(imageKey)}`,
        {
          method: 'DELETE',
          headers: { 'x-auth-token': token },
        }
      );
  
      const data = await response.json();
      if (data.success) {
        // Update both formData and editableData
        const newGallery = formData.galleryImages.filter((_, i) => i !== index);
        
        setFormData(prev => ({
          ...prev,
          galleryImages: newGallery
        }));
        
        setEditableData(prev => ({
          ...prev,
          galleryImages: newGallery
        }));
  
        showNotification('Image deleted from gallery', 'success');
      } else {
        showNotification(data.message || 'Failed to delete image', 'error');
      }
    } catch (err) {
      showNotification('Server error while deleting image', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrack = async (index) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/musician/track/${index}`,
        {
          method: 'DELETE',
          headers: { 'x-auth-token': token }
        }
      );
      const data = await response.json();
      if (data.success) {
        // Remove from local state
        const updatedTracks = [...formData.tracks];
        updatedTracks.splice(index, 1);
        setFormData({ ...formData, tracks: updatedTracks });
        setEditableData(prev => ({
          ...prev,
          tracks: updatedTracks
        }));
        showNotification('Track deleted', 'success');
      } else {
        showNotification(data.message || 'Failed to delete track', 'error');
      }
    } catch (err) {
      showNotification('Error deleting track', 'error');
    } finally {
      setLoading(false);
    }
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
            uploadDate: track.uploadDate,
            audioFile: track.audioUrl
          })),
          galleryImages: data.musician.galleryImages || [],
          portfolioLinks: data.musician.portfolioLinks || {
            spotify: '',
            soundcloud: '',
            youtube: '',
            appleMusic: ''
          },
          socialMedia: data.musician.socialMedia || {
            instagram: '',
            twitter: '',
            linkedin: ''
          }
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
            uploadDate: track.uploadDate,
            audioFile: track.audioUrl
          })),
          galleryImages: data.musician.galleryImages || [],
          portfolioLinks: data.musician.portfolioLinks || {
            spotify: '',
            soundcloud: '',
            youtube: '',
            appleMusic: ''
          },
          socialMedia: data.musician.socialMedia || {
            instagram: '',
            twitter: '',
            linkedin: ''
          },
          newTag: '',
          newLink: { platform: '', url: '' },
          newGenre: '',
          newSkill: '',
          newTool: '',
          newTrack: { title: '' }
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
            <ProfileOverlay bgimage={formData.coverImage || coverPreview} />
            
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
                  src={formData.avatar || avatarPreview || ''} 
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
                      {/* Existing custom links */}
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

                      {/* Portfolio Links */}
                      <Typography variant="subtitle2" color="primary.light" sx={{ mt: 3, textTransform: 'uppercase' }}>
                        PORTFOLIO LINKS
                      </Typography>

                      {Object.entries(editableData.portfolioLinks).map(([key, value]) => (
                        <Box key={key} sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                          <TextField
                            fullWidth
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={value}
                            onChange={(e) => setEditableData({
                              ...editableData,
                              portfolioLinks: {
                                ...editableData.portfolioLinks,
                                [key]: e.target.value
                              }
                            })}
                          />
                          <IconButton 
                            onClick={() => setEditableData({
                              ...editableData,
                              portfolioLinks: {
                                ...editableData.portfolioLinks,
                                [key]: ''
                              }
                            })}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      ))}

                      {/* Social Media Links */}
                      <Typography variant="subtitle2" color="primary.light" sx={{ mt: 3, textTransform: 'uppercase' }}>
                        SOCIAL MEDIA
                      </Typography>

                      {Object.entries(editableData.socialMedia).map(([key, value]) => (
                        <Box key={key} sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                          <TextField
                            fullWidth
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={value}
                            onChange={(e) => setEditableData({
                              ...editableData,
                              socialMedia: {
                                ...editableData.socialMedia,
                                [key]: e.target.value
                              }
                            })}
                            InputProps={{
                              startAdornment: key === 'instagram' ? <Instagram color="primary" sx={{ mr: 1 }} /> :
                                              key === 'twitter' ? <Twitter color="primary" sx={{ mr: 1 }} /> :
                                              <LinkedIn color="primary" sx={{ mr: 1 }} />
                            }}
                          />
                          <IconButton 
                            onClick={() => setEditableData({
                              ...editableData,
                              socialMedia: {
                                ...editableData.socialMedia,
                                [key]: ''
                              }
                            })}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Grid container spacing={2}>
                      {formData.links.map((link, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Button 
                            fullWidth
                            variant="contained" 
                            startIcon={
                              link.platform === 'YouTube' ? <YouTube sx={{ color: '#FF0000' }} /> : 
                              link.platform === 'Instagram' ? <Instagram sx={{ color: '#E4405F' }} /> : 
                              link.platform === 'Spotify' ? <LinkIcon sx={{ color: '#1DB954' }} /> :
                              link.platform === 'SoundCloud' ? <LinkIcon sx={{ color: '#FF7700' }} /> :
                              link.platform === 'Bandcamp' ? <LinkIcon sx={{ color: '#629aa9' }} /> :
                              link.platform === 'Apple Music' ? <LinkIcon sx={{ color: '#FA57C1' }} /> :
                              <LinkIcon />
                            } 
                            size="medium"
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: 'rgba(40, 40, 40, 0.9)',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                          >
                            {link.platform}
                          </Button>
                        </Grid>
                      ))}

                      {/* Portfolio Links */}
                      {formData.portfolioLinks.spotify && (
                        <Grid item xs={12} sm={6}>
                          <Button 
                            fullWidth
                            variant="contained" 
                            startIcon={<LinkIcon sx={{ color: '#1DB954' }} />}
                            size="medium"
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: '#1DB954',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={formData.portfolioLinks.spotify}
                            target="_blank"
                          >
                            Spotify
                          </Button>
                        </Grid>
                      )}

                      {formData.portfolioLinks.soundcloud && (
                        <Grid item xs={12} sm={6}>
                          <Button 
                            fullWidth
                            variant="contained" 
                            startIcon={<LinkIcon sx={{ color: '#FF7700' }} />}
                            size="medium"
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: '#FF7700',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={formData.portfolioLinks.soundcloud}
                            target="_blank"
                          >
                            SoundCloud
                          </Button>
                        </Grid>
                      )}

                      {formData.portfolioLinks.youtube && (
                        <Grid item xs={12} sm={6}>
                          <Button 
                            fullWidth
                            variant="contained" 
                            startIcon={<YouTube sx={{ color: '#FF0000' }} />}
                            size="medium"
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: '#FF0000',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={formData.portfolioLinks.youtube}
                            target="_blank"
                          >
                            YouTube
                          </Button>
                        </Grid>
                      )}

                      {formData.portfolioLinks.appleMusic && (
                        <Grid item xs={12} sm={6}>
                          <Button 
                            fullWidth
                            variant="contained" 
                            startIcon={<LinkIcon sx={{ color: '#FA57C1' }} />}
                            size="medium"
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: '#FA57C1',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={formData.portfolioLinks.appleMusic}
                            target="_blank"
                          >
                            Apple Music
                          </Button>
                        </Grid>
                      )}

                      {/* Social Media Links */}
                      {formData.socialMedia.instagram && (
                        <Grid item xs={12} sm={6}>
                          <Button 
                            fullWidth
                            variant="contained" 
                            startIcon={<Instagram sx={{ color: '#E4405F' }} />}
                            size="medium"
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: '#E4405F',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={`https://instagram.com/${formData.socialMedia.instagram}`}
                            target="_blank"
                          >
                            Instagram
                          </Button>
                        </Grid>
                      )}

                      {formData.socialMedia.twitter && (
                        <Grid item xs={12} sm={6}>
                          <Button 
                            fullWidth
                            variant="contained" 
                            startIcon={<Twitter sx={{ color: '#1DA1F2' }} />}
                            size="medium"
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: '#629aa9',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={`https://twitter.com/${formData.socialMedia.twitter}`}
                            target="_blank"
                          >
                            Twitter
                          </Button>
                        </Grid>
                      )}

                      {formData.socialMedia.linkedin && (
                        <Grid item xs={12} sm={6}>
                          <Button 
                            fullWidth
                            variant="contained" 
                            startIcon={<LinkedIn sx={{ color: '#0A66C2' }} />}
                            size="medium"
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: 'rgba(40, 40, 40, 0.9)',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={formData.socialMedia.linkedin}
                            target="_blank"
                          >
                            LinkedIn
                          </Button>
                        </Grid>
                      )}
                    </Grid>
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
                      <IconButton size="small" onClick={() => handleDeleteTrack(index)}>
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
                            color: 'white',
                            fontSize: '1.5rem',  // Increased from default
                            letterSpacing: '0.01em'
                          }}
                        >
                          {track.title}
                        </Typography>
                        
                        {track.audioFile && (
                          <AudioPlayer
                            src={track.audioFile}
                            style={{ borderRadius: 10, background: '#181818', marginTop: 8 }}
                            showJumpControls={false}
                            showDownloadProgress={false}
                            customAdditionalControls={[]} // Hide extra controls
                            customVolumeControls={[]}    // Hide volume if you want
                            layout="horizontal"
                            controlsList="nodownload"    // This hides the download button in most browsers
                            onPlay={() => {
                              // Get all audio elements
                              const audioElements = document.querySelectorAll('audio');
                              // Pause all other audio elements except the current one
                              audioElements.forEach(audio => {
                                if (audio !== document.querySelector(`audio[src="${track.audioFile}"]`)) {
                                  audio.pause();
                                }
                              });
                            }}
                          />
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
                      Add Images
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="image/*"
                        multiple // Allow multiple selection
                        onChange={handleGalleryUpload}
                      />
                    </Button>
                  )}
                  <GradientDivider />
                </Typography>
                
                <Grid container spacing={2}>
                  {/* Existing images from backend */}
                  {formData.galleryImages.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`existing-${index}`}>
                      <GalleryImage>
                        <img src={image} alt={`Gallery Image ${index + 1}`} />
                        {isEditing && (
                          <Box className="overlay">
                            <IconButton
                              onClick={() => handleDeleteGalleryImage(formData.galleryImages[index], index)}
                              sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        )}
                      </GalleryImage>
                    </Grid>
                  ))}
                  {/* New previews (not yet uploaded) */}
                  {galleryPreviews.map((preview, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`preview-${index}`}>
                      <GalleryImage>
                        <img src={preview} alt={`New Gallery Preview ${index + 1}`} style={{ opacity: 0.7 }} />
                        {/* Optionally a remove button for previews */}
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

        <CoverImageCropper
          open={cropperOpen}
          imageSrc={rawCoverImage}
          onClose={() => setCropperOpen(false)}
          onCropComplete={handleCropComplete}
        />

        <ProfileImageCropper
          open={profileCropperOpen}
          imageSrc={rawProfileImage}
          onClose={() => setProfileCropperOpen(false)}
          onCropComplete={handleProfileCropComplete}
        />
      </GradientBackground>
    </ThemeProvider>
  );
};

export default MusicianProfileEditInline;