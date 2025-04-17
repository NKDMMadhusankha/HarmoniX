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
  Checkbox,
  FormControlLabel
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

// Styled components (same as before)
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

const ProfileOverlay = styled(Box)(({ theme, bgImage }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${bgImage || ProImg})`,
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

const AvatarBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 12,
  right: 12,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: '50%',
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
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

const EditableField = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .edit-button': {
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  '&:hover .edit-button': {
    opacity: 1,
  }
}));

const EditControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
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
    name: 'Mithila Madhusankha',
    location: 'Los Angeles, CA · United States',
    avatar: 'https://img.freepik.com/free-photo/medium-shot-man-playing-guitar-studio_23-2150232123.jpg?t=st=1744101142~exp=1744104742~hmac=dd039b0e837d5847a9cf25a79c4fc73db3aa76a68129ff1ca1d67bea0a9f5d9a&w=996',
    coverImage: ProImg,
    tags: ['Producer', 'Composer', 'Mixing Engineer'],
    about: [
      'Enter the immersive sonic universe of SOUNDWAVE, where electronic elements blend with organic textures to create memorable auditory experiences.',
      'With over 10 years in the industry, SOUNDWAVE has crafted sounds for films, commercials, and chart-topping artists. His unique approach to music production combines traditional composition techniques with cutting-edge digital tools.',
      'Specializing in atmospheric electronic, hip-hop fusion, and cinematic compositions, SOUNDWAVE\'s unique approach has earned recognition across multiple platforms and continents.',
      'His work has been featured in major film festivals, international advertising campaigns, and on platforms like Spotify, Apple Music, and SoundCloud with millions of streams.'
    ],
    links: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/example' },
      { platform: 'YouTube', url: 'https://youtube.com/channel/example' },
      { platform: 'Instagram', url: 'https://instagram.com/example' }
    ],
    genres: ['Electronic', 'Hip Hop', 'House', 'Cinematic', 'Ambient', 'Pop', 'R&B', 'Trap', 'Lo-fi', 'Synthwave', 'Future Bass'],
    skills: ['Music Production', 'Mixing', 'Mastering', 'Sound Design', 'Composition', 'Arrangement', 'Vocal Tuning', 'Audio Engineering', 'MIDI Programming', 'Soundtrack Production'],
    tools: ['Ableton Live', 'Logic Pro', 'Pro Tools', 'Native Instruments', 'FL Studio', 'Serum', 'Omnisphere', 'Kontakt', 'Waves Plugins', 'iZotope', 'Melodyne', 'Auto-Tune'],
    tracks: [
      {
        id: 1,
        title: "Goddam ft. Olivia Ruff | Jazz Mafia (co-written & produced by Adam Theis)",
        duration: "04:25",
        uploadDate: "Mar 26, 2024",
        audioFile: null
      },
      {
        id: 2,
        title: "The Situation ft. Lateef The Truthspeaker | Jazz Mafia (produced by Adam Theis)",
        duration: "05:17",
        uploadDate: "Mar 26, 2024",
        audioFile: null
      },
      {
        id: 3,
        title: "Kill Em With Kindness | Cosa Nostra Strings (written & produced by Adam Theis)",
        duration: "07:57",
        uploadDate: "Mar 26, 2024",
        audioFile: null
      },
      {
        id: 4,
        title: "China Cat Sunflower | Grateful Brass (prod, arr, ft. Adam Theis)",
        duration: "06:25",
        uploadDate: "Mar 26, 2024",
        audioFile: null
      },
      {
        id: 5,
        title: "Stone Cold Lovin | Jazz Mafia (co-written, produced by Adam Theis)",
        duration: "04:20",
        uploadDate: "Mar 26, 2024",
        audioFile: null
      },
      {
        id: 6,
        title: "Rock and Clap | Jazz Mafia (written & produced by Adam Theis)",
        duration: "05:20",
        uploadDate: "Mar 26, 2024",
        audioFile: null
      }
    ],
    galleryImages: [
      "https://img.freepik.com/free-photo/music-engineer-playing-new-tunes-acoustic-guitar-recording_482257-83362.jpg?t=st=1744890482~exp=1744894082~hmac=a5c6fdf1b2f59428543b62c0b55395ccd96a98bc6d4a61bf06eb28f860ea4969&w=996",
      "https://img.freepik.com/free-photo/sound-mixer-studio_107420-64845.jpg?t=st=1744891688~exp=1744895288~hmac=2aa6da37a9bd90b54cffa5f600f41a1e57bf550e676bcb0ad342334100ec4846&w=826",
      "https://img.freepik.com/free-photo/sound-designer-working-track-recording-with-audio-professional-software_482257-97669.jpg?t=st=1744891634~exp=1744895234~hmac=f63d3a388c15cc5d15fa3af8be670d45625190b953da63bd06a2f2563f3b6db5&w=1380",
      "https://img.freepik.com/free-photo/male-audio-engineer-using-sound-mixer_107420-96112.jpg?t=st=1744891707~exp=1744895307~hmac=2f3a20dd7429f5b11dd47ea1ada16d4001c52cd2f24d51d320150496c4a1b748&w=996",
      "https://img.freepik.com/free-photo/portrait-confident-artist-playing-acoustic-guitar-his-home-studio_482257-83428.jpg?t=st=1744890502~exp=1744894102~hmac=146dc641673d7c72424a0839dd89caafdd7b02c31fb3dd3872c04bf9edc1dbba&w=996",
      "https://img.freepik.com/free-photo/skilled-artist-working-with-audio-technician-edit-recorded-songs_482257-84400.jpg?t=st=1744890632~exp=1744894232~hmac=8c6400b8b28cf90d55055de95b0e929489d2d5b0e89808725e871787edce12f0&w=996",
    ]
  });

  // State for editable versions of data
  const [editableData, setEditableData] = useState({
    name: '',
    location: '',
    tags: [],
    about: [],
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
    newParagraph: '',
  });

  // Editing states for each section
  const [editing, setEditing] = useState({
    basicInfo: false,
    about: false,
    links: false,
    genres: false,
    skills: false,
    tools: false,
    tracks: false,
    gallery: false
  });

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

  // Initialize editable data
  useEffect(() => {
    setEditableData({
      ...editableData,
      name: formData.name,
      location: formData.location,
      tags: [...formData.tags],
      about: [...formData.about],
      links: [...formData.links],
      genres: [...formData.genres],
      skills: [...formData.skills],
      tools: [...formData.tools],
      tracks: [...formData.tracks]
    });
  }, []);

  // File upload handlers
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
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
      showNotification('Audio file selected', 'info');
    }
  };

  // Start editing a section
  const startEditing = (section) => {
    setEditing({ ...editing, [section]: true });
  };

  // Cancel editing a section
  const cancelEditing = (section) => {
    setEditing({ ...editing, [section]: false });
    // Reset editable data for that section
    switch (section) {
      case 'basicInfo':
        setEditableData({
          ...editableData,
          name: formData.name,
          location: formData.location,
          tags: [...formData.tags]
        });
        break;
      case 'about':
        setEditableData({ ...editableData, about: [...formData.about] });
        break;
      case 'links':
        setEditableData({ 
          ...editableData, 
          links: [...formData.links],
          newLink: { platform: '', url: '' }
        });
        break;
      case 'genres':
        setEditableData({ 
          ...editableData, 
          genres: [...formData.genres],
          newGenre: ''
        });
        break;
      case 'skills':
        setEditableData({ 
          ...editableData, 
          skills: [...formData.skills],
          newSkill: ''
        });
        break;
      case 'tools':
        setEditableData({ 
          ...editableData, 
          tools: [...formData.tools],
          newTool: ''
        });
        break;
      case 'tracks':
        setEditableData({ 
          ...editableData, 
          tracks: [...formData.tracks],
          newTrack: { title: '', duration: '' }
        });
        break;
      default:
        break;
    }
  };

  // Save changes for a section
  const saveChanges = (section) => {
    let newFormData = { ...formData };
    
    switch (section) {
      case 'basicInfo':
        newFormData = {
          ...newFormData,
          name: editableData.name,
          location: editableData.location,
          tags: [...editableData.tags]
        };
        break;
      case 'about':
        newFormData = { ...newFormData, about: [...editableData.about] };
        break;
      case 'links':
        newFormData = { ...newFormData, links: [...editableData.links] };
        break;
      case 'genres':
        newFormData = { ...newFormData, genres: [...editableData.genres] };
        break;
      case 'skills':
        newFormData = { ...newFormData, skills: [...editableData.skills] };
        break;
      case 'tools':
        newFormData = { ...newFormData, tools: [...editableData.tools] };
        break;
      case 'tracks':
        newFormData = { ...newFormData, tracks: [...editableData.tracks] };
        break;
      default:
        break;
    }
    
    setFormData(newFormData);
    setEditing({ ...editing, [section]: false });
    showNotification(`${section} updated successfully`, 'success');
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

  const addNewParagraph = () => {
    if (editableData.newParagraph.trim() === '') return;
    setEditableData({
      ...editableData,
      about: [...editableData.about, editableData.newParagraph],
      newParagraph: ''
    });
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

  // Save the entire profile
  const handleSaveProfile = () => {
    // Apply avatarPreview and coverPreview to formData if they exist
    let updatedFormData = { ...formData };
    
    if (avatarPreview) {
      updatedFormData.avatar = avatarPreview;
    }
    
    if (coverPreview) {
      updatedFormData.coverImage = coverPreview;
    }

    setFormData(updatedFormData);
    showNotification('Profile saved successfully !', 'success');
    console.log("SAVED PROFILE DATA:", updatedFormData);
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

  return (
    <ThemeProvider theme={darkTheme}>
      <GradientBackground>
        {/* Navbar */}
        <Navbar />
        
        {/* Page Title */}
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Edit Your Profile
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Save />}
              onClick={handleSaveProfile}
            >
              Save Profile
            </Button>
          </Box>
          <Divider sx={{ mb: 4 }} />
        </Container>
        
        {/* Hero Section with Larger Cover Image */}
        <Box sx={{ position: 'relative', mb: 4 }}>
          <HeroSection>
            <ProfileOverlay bgImage={coverPreview || formData.coverImage} />
            
            <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
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
                  src={avatarPreview || formData.avatar} 
                  alt="Profile Avatar"
                />
                <AvatarBadge>
                  <Person fontSize="small" />
                </AvatarBadge>
                
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
              </Box>
              
              <Box sx={{ 
                ml: { xs: 0, md: 4 }, 
                flex: 1,
                width: { xs: '100%', md: 'auto' }
              }}>
                {editing.basicInfo ? (
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
                      name="location"
                      value={editableData.location}
                      onChange={handleEditableChange}
                      label="Location"
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
                    
                    <EditControls>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        startIcon={<Clear />}
                        onClick={() => cancelEditing('basicInfo')}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<Check />}
                        onClick={() => saveChanges('basicInfo')}
                      >
                        Save
                      </Button>
                    </EditControls>
                  </>
                ) : (
                  <>
                    <EditableField>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {formData.name}
                      </Typography>
                      <IconButton 
                        className="edit-button"
                        size="small"
                        onClick={() => startEditing('basicInfo')}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </EditableField>
                    
                    <EditableField>
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        {formData.location}
                      </Typography>
                    </EditableField>
                    
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
                  
                  {editing.about ? (
                    <>
                      <Box sx={{ position: 'relative', pl: 2 }}>
                        <Box sx={{ 
                          position: 'absolute', 
                          left: 0, 
                          top: 0, 
                          bottom: 0, 
                          width: '4px', 
                          borderRadius: 4,
                          background: 'linear-gradient(to bottom, #1976d2, #7c4dff)' 
                        }} />
                        
                        {editableData.about.map((paragraph, index) => (
                          <Box key={index} sx={{ mb: 2, position: 'relative' }}>
                            <TextField
                              fullWidth
                              multiline
                              rows={3}
                              value={paragraph}
                              onChange={(e) => handleArrayItemChange(e, index, 'about')}
                              variant="outlined"
                              sx={{ mb: 1 }}
                            />
                            <IconButton 
                              size="small"
                              onClick={() => removeItem(index, 'about')}
                              sx={{ position: 'absolute', top: 0, right: 0 }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        ))}
                        
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            value={editableData.newParagraph}
                            onChange={(e) => setEditableData({ ...editableData, newParagraph: e.target.value })}
                            variant="outlined"
                            placeholder="Add new paragraph"
                          />
                          <IconButton onClick={addNewParagraph}>
                            <AddCircleOutline />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <EditControls>
                        <Button 
                          variant="outlined" 
                          color="secondary" 
                          startIcon={<Clear />}
                          onClick={() => cancelEditing('about')}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          startIcon={<Check />}
                          onClick={() => saveChanges('about')}
                        >
                          Save
                        </Button>
                      </EditControls>
                    </>
                  ) : (
                    <>
                      <Box sx={{ position: 'relative', pl: 2 }}>
                        <Box sx={{ 
                          position: 'absolute', 
                          left: 0, 
                          top: 0, 
                          bottom: 0, 
                          width: '4px', 
                          borderRadius: 4,
                          background: 'linear-gradient(to bottom, #1976d2, #7c4dff)' 
                        }} />
                        
                        {formData.about.map((paragraph, index) => (
                          <Typography key={index} variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                            {paragraph}
                          </Typography>
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button 
                          variant="outlined" 
                          startIcon={<Edit />}
                          onClick={() => startEditing('about')}
                        >
                          Edit Bio
                        </Button>
                      </Box>
                    </>
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
                  
                  {editing.links ? (
                    <>
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
                      
                      <EditControls>
                        <Button 
                          variant="outlined" 
                          color="secondary" 
                          startIcon={<Clear />}
                          onClick={() => cancelEditing('links')}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          startIcon={<Check />}
                          onClick={() => saveChanges('links')}
                        >
                          Save
                        </Button>
                      </EditControls>
                    </>
                  ) : (
                    <>
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
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button 
                          variant="outlined" 
                          startIcon={<Edit />}
                          onClick={() => startEditing('links')}
                        >
                          Edit Links
                        </Button>
                      </Box>
                    </>
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
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                      GENRES
                      {editing.genres ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" onClick={addNewGenre}>
                            <AddCircleOutline fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton 
                          size="small"
                          onClick={() => startEditing('genres')}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      )}
                    </Typography>
                    
                    {editing.genres ? (
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
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                      SKILLS
                      {editing.skills ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" onClick={addNewSkill}>
                            <AddCircleOutline fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton 
                          size="small"
                          onClick={() => startEditing('skills')}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      )}
                    </Typography>
                    
                    {editing.skills ? (
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
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                      TOOLS
                      {editing.tools ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" onClick={addNewTool}>
                            <AddCircleOutline fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton 
                          size="small"
                          onClick={() => startEditing('tools')}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      )}
                    </Typography>
                    
                    {editing.tools ? (
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
                        
                        <EditControls>
                          <Button 
                            variant="outlined" 
                            color="secondary" 
                            startIcon={<Clear />}
                            onClick={() => cancelEditing('tools')}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<Check />}
                            onClick={() => saveChanges('tools')}
                          >
                            Save
                          </Button>
                        </EditControls>
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
                  {!editing.tracks && (
                    <Button 
                      variant="outlined" 
                      startIcon={<Edit />}
                      sx={{ ml: 2 }}
                      onClick={() => startEditing('tracks')}
                    >
                      Edit Tracks
                    </Button>
                  )}
                  <GradientDivider />
                </Typography>
              </Box>
              
              {/* Tracks Section */}
              {editing.tracks ? (
                <>
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
                  
                  <EditControls>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      startIcon={<Clear />}
                      onClick={() => cancelEditing('tracks')}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      startIcon={<Check />}
                      onClick={() => saveChanges('tracks')}
                    >
                      Save
                    </Button>
                  </EditControls>
                </>
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
                  <GradientDivider />
                </Typography>
                
                <Grid container spacing={2}>
                  {formData.galleryImages.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <GalleryImage>
                        <img src={image} alt={`Gallery Image ${index + 1}`} />
                        <Box className="overlay">
                          <IconButton 
                            onClick={() => removeGalleryImage(index)}
                            sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </GalleryImage>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
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
      </GradientBackground>
    </ThemeProvider>
  );
};

export default MusicianProfileEditInline;