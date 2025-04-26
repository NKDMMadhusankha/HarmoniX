import React, { useState, useRef, useEffect } from 'react';
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
  Paper,
  Stack,
  Divider,
  LinearProgress,
  styled,
  Modal,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  PlayArrow, 
  Pause, 
  VolumeUp, 
  AccessTime,
  Instagram,
  YouTube,
  Link as LinkIcon,
  CalendarToday,
  Person,
  Album,
  AlbumOutlined,
  Image,
  Close,
  Send,
  Twitter,
  LinkedIn // Make sure this is imported
} from '@mui/icons-material';
import Navbar from '../Components/Navbar'; // Assuming you have a Navbar component
import Footer from '../Components/Footer'; // Assuming you have a Footer component

import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


// Custom styled components using Material UI's styled API
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

const ProfileOverlay = styled(Box)(({ theme, cover }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.7,
  mixBlendMode: 'normal',
  backgroundImage: `url(${cover})`,
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
        
const PlayButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  }
}));

const TrackItem = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(90deg, rgba(10,25,41,0.7) 0%, rgba(0,0,0,0.7) 100%)',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  border: '1px solid rgba(25, 118, 210, 0.1)',
  '&:hover': {
    background: 'linear-gradient(90deg, rgba(25,58,95,0.7) 0%, rgba(3,3,30,0.7) 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(25, 118, 210, 0.3)',
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(20, 20, 20, 0.8)',
  color: '#fff',
  borderRadius: '12px',
  padding: '10px 16px',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
  '&:hover::before': {
    transform: 'scaleX(1)',
  },
  '& .MuiButton-startIcon': {
    marginRight: '12px',
  },
}));

const GradientCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(19, 38, 57, 0.85)',
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

const AlbumCover = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  width: 80,
  height: 80,
  [theme.breakpoints.down('sm')]: {
    width: 60,
    height: 60,
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover .overlay': {
    opacity: 1,
  },
}));

const GalleryImage = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  position: 'relative',
  height: 0,
  paddingTop: '75%', // 4:3 aspect ratio
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
}));

const ContactCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  marginBottom: theme.spacing(3),
}));

const ContactButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 24px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#1565c0',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
  },
}));

const ContactCancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#1976d2',
  border: '1px solid #1976d2',
  fontWeight: 'bold',
  padding: '10px 24px',
  borderRadius: '4px',
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
  },
}));

const GradientDivider = styled(Box)(({ theme }) => ({
  height: '1px',
  background: 'linear-gradient(to right, rgba(25, 118, 210, 0.5), transparent)',
  flexGrow: 1,
  marginLeft: theme.spacing(2),
}));

const ExpandedImageModal = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1300,
  backdropFilter: 'blur(10px)',
}));

const ExpandedImageContent = styled(Box)(({ theme }) => ({
  maxWidth: '90%',
  maxHeight: '90%',
  position: 'relative',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}));

const ContactFormModal = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(10, 25, 41, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid rgba(25, 118, 210, 0.3)',
    padding: theme.spacing(2),
    maxWidth: '500px',
    width: '100%',
  },
}));

const ContactForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(2),
}));

const ContactTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(25, 118, 210, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
}));

const SendButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2 0%, #7c4dff 100%)',
  color: 'white',
  fontWeight: 'bold',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    background: 'linear-gradient(45deg, #1565c0 0%, #651fff 100%)',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
  },
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

const MusicProducerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Add this line

  const [profile, setProfile] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [links, setLinks] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const [avatar, setAvatar] = useState('');

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openContact, setOpenContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const audioRefs = useRef([]);
  const progressInterval = useRef(null);

  useEffect(() => {
    if (!id) {
      setError('No ID provided');
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:5000/api/musician/lyricists/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Lyricist not found');
        return res.json();
      })
      .then(data => {
        if (data.success && data.lyricist) {
          setProfile(data.lyricist);
          setTracks(data.lyricist.featuredTracks || []);
          setGalleryImages(data.lyricist.galleryImages || []);
          setGenres(data.lyricist.genres || []);
          setSkills(data.lyricist.skills || []);
          setTools(data.lyricist.tools || []);
          setCoverImage(data.lyricist.coverImage || ''); // Ensure cover image is set
          setAvatar(data.lyricist.profileImage || ''); // Ensure profile image is set
        } else {
          setError('No lyricist data found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 0;
          }
          return prevProgress + 0.5;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePlayPause = (trackId) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleAudioPlay = (currentIdx) => {
    audioRefs.current.forEach((player, idx) => {
      if (player && idx !== currentIdx) {
        player.audio.current.pause();
        player.audio.current.currentTime = 0;
      }
    });
    setCurrentTrack(currentIdx);
    setIsPlaying(true);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleOpenContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    // For this frontend example, we'll just show a success message
    console.log('Form submitted:', contactForm);
    
    // Show success message
    setSnackbarMessage('Your message has been sent successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    
    // Reset form and close modal
    setContactForm({
      name: '',
      email: '',
      message: ''
    });
    handleCloseContact();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSeeMore = (producerInfo) => {
    navigate(`/music/producer/${producerInfo.id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ThemeProvider theme={darkTheme}>
      <GradientBackground>
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section with Larger Cover Image */}
        <HeroSection>
          <ProfileOverlay cover={coverImage} />
          
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
                src={avatar} 
                alt={profile?.fullName || ''}
              />
            </Box>
            
            <Box sx={{ 
              ml: { xs: 0, md: 4 }, 
              flex: 1,
              width: { xs: '100%', md: 'auto' }
            }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                {profile?.fullName}
              </Typography>
              
              <Typography variant="subtitle1" color="white" sx={{ mt: 0.5 }}>
                {profile?.country}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {profile?.roles?.map((role, idx) => (
                  <Chip 
                    key={idx}
                    label={role} 
                    size="small"
                    sx={{ backgroundColor: 'rgba(25, 118, 210, 0.4)' }}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1,  }}>
                {profile?.tags?.map((tag, idx) => (
                  <Chip 
                    key={idx}
                    label={tag} 
                    size="small"
                    sx={{ backgroundColor: 'rgba(25, 118, 210, 0.4)' }}
                  />
                ))}
              </Box>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleOpenContact}
              sx={{ 
                px: 3, 
                py: 1.5, 
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                mt: { xs: 2, md: 0 }
              }}
            >
              Contact me
            </Button>
          </Box>
        </HeroSection>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Left Column - About Section */}
            <Grid item xs={12} md={4}>
              <GradientCard elevation={3}>
                <CardContent>
                  <SectionTitle variant="h5" gutterBottom>
                    <IconContainer>
                      <Person />
                    </IconContainer>
                    About ME
                  </SectionTitle>
                  
                <Box sx={{ position: 'relative', pl: 2 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      borderRadius: 4,
                      background: 'linear-gradient(to bottom, #1976d2, #7c4dff)',
                    }}
                  />

                  <Typography variant="body1" 
                  sx={{ fontSize: '1rem', 
                        lineHeight: 1.6, 
                        whiteSpace: 'pre-line', 
                        fontWeight: 'normal' 
                        }}>
                    {profile?.about}
                  </Typography>
                </Box>
        
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
                  
                  {profile && (
                    <Grid container spacing={2}>
                      {/* Spotify */}
                      {profile.portfolioLinks?.spotify && (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button 
                            fullWidth
                            variant="contained"
                            startIcon={<LinkIcon sx={{ 
                              color: '#1DB954',
                              transition: 'color 0.3s ease',
                              '&:hover': { color: '#fff' }
                            }} />}
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              textTransform: 'uppercase',
                              transition: 'background-color 0.3s ease',
                              '&:hover': { 
                                backgroundColor: '#1DB954',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={profile.portfolioLinks.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            SPOTIFY
                          </Button>
                        </Grid>
                      )}

                      {/* SoundCloud */}
                      {profile.portfolioLinks?.soundcloud && (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button 
                            fullWidth
                            variant="contained"
                            startIcon={<LinkIcon sx={{ 
                              color: '#FF7700',
                              transition: 'color 0.3s ease',
                              '&:hover': { color: '#fff' }
                            }} />}
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              textTransform: 'uppercase',
                              transition: 'background-color 0.3s ease',
                              '&:hover': { 
                                backgroundColor: '#FF7700',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={profile.portfolioLinks.soundcloud}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            SOUNDCLOUD
                          </Button>
                        </Grid>
                      )}

                      {/* YouTube */}
                      {profile.portfolioLinks?.youtube && (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button 
                            fullWidth
                            variant="contained"
                            startIcon={<YouTube sx={{ 
                              color: '#FF0000',
                              transition: 'color 0.3s ease',
                              '&:hover': { color: '#fff' }
                            }} />}
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              textTransform: 'uppercase',
                              transition: 'background-color 0.3s ease',
                              '&:hover': { 
                                backgroundColor: '#FF0000',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={profile.portfolioLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            YOUTUBE
                          </Button>
                        </Grid>
                      )}

                      {/* Apple Music */}
                      {profile.portfolioLinks?.appleMusic && (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button 
                            fullWidth
                            variant="contained"
                            startIcon={<LinkIcon sx={{ 
                              color: '#FA57C1',
                              transition: 'color 0.3s ease',
                              '&:hover': { color: '#fff' }
                            }} />}
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              textTransform: 'uppercase',
                              transition: 'background-color 0.3s ease',
                              '&:hover': { 
                                backgroundColor: '#FA57C1',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={profile.portfolioLinks.appleMusic}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            APPLE MUSIC
                          </Button>
                        </Grid>
                      )}

                      {/* Instagram */}
                      {profile.socialMedia?.instagram && (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button 
                            fullWidth
                            variant="contained"
                            startIcon={<Instagram sx={{ 
                              color: '#E4405F',
                              transition: 'color 0.3s ease',
                              '&:hover': { color: '#fff' }
                            }} />}
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              textTransform: 'uppercase',
                              transition: 'background-color 0.3s ease',
                              '&:hover': { 
                                backgroundColor: '#E4405F',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={`https://instagram.com/${profile.socialMedia.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            INSTAGRAM
                          </Button>
                        </Grid>
                      )}

                      {/* Twitter */}
                      {profile.socialMedia?.twitter && (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button 
                            fullWidth
                            variant="contained"
                            startIcon={<Twitter sx={{ 
                              color: '#1DA1F2',
                              transition: 'color 0.3s ease',
                              '&:hover': { color: '#fff' }
                            }} />}
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              textTransform: 'uppercase',
                              transition: 'background-color 0.3s ease',
                              '&:hover': { 
                                backgroundColor: '#1DA1F2',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={`https://twitter.com/${profile.socialMedia.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            TWITTER
                          </Button>
                        </Grid>
                      )}

                      {/* LinkedIn */}
                      {profile.socialMedia?.linkedin && (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button 
                            fullWidth
                            variant="contained"
                            startIcon={<LinkedIn sx={{ 
                              color: '#0A66C2',
                              transition: 'color 0.3s ease',
                              '&:hover': { color: '#fff' }
                            }} />}
                            sx={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.8)',
                              color: '#fff',
                              textTransform: 'uppercase',
                              transition: 'background-color 0.3s ease',
                              '&:hover': { 
                                backgroundColor: '#0A66C2',
                                '& .MuiSvgIcon-root': {
                                  color: '#fff !important'
                                }
                              }
                            }}
                            href={profile.socialMedia.linkedin.includes('linkedin.com') ? 
                                  profile.socialMedia.linkedin : 
                                  `https://linkedin.com/in/${profile.socialMedia.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LINKEDIN
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
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase' }}>
                      GENRES
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {genres.map((genre, index) => (
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
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase' }}>
                      SKILLS
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.map((skill, index) => (
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
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, textTransform: 'uppercase' }}>
                      TOOLS
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {tools.map((tool, index) => (
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
                  </Box>
                </CardContent>
              </GradientCard>
            </Grid>
            
            {/* Right Column - Featured Tracks */}
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
                    <Album />
                  </IconContainer>
                  Featured Tracks
                  <GradientDivider />
                </Typography>
              </Box>
              
              {/* NEW FEATURED TRACKS SECTION - UPDATED */}
              <Stack spacing={1}>
                {tracks.map((track, idx) => (
                  <TrackItem key={track._id || idx}>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                      {track.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {track.duration}
                    </Typography>
                    <AudioPlayer
                      ref={el => audioRefs.current[idx] = el}
                      style={{
                        background: 'transparent',
                        boxShadow: 'none',
                        borderRadius: 0,
                        padding: 0,
                        marginTop: 8,
                      }}
                      src={track.audioUrl}
                      showJumpControls={false}
                      layout="horizontal"
                      customVolumeControls={[]} // Hides volume controller!
                      customAdditionalControls={[]} // Optional: hides loop button etc.
                      showFilledVolume={false} // Optional: disables volume fill
                      onPlay={() => handleAudioPlay(idx)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />
                  </TrackItem>
                ))}
              </Stack>
              
              {/* Artist Gallery Section */}
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
                  <GradientDivider />
                </Typography>
                
                <Grid container spacing={2}>
                  {galleryImages.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <GalleryImage onClick={() => handleImageClick(image)}>
                        <img src={image} alt={`Gallery Image ${index + 1}`} />
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
        
        {/* Audio Element */}
        <audio ref={audioRef} style={{ display: 'none' }}>
          <source src="" type="audio/mpeg" />
        </audio>

        {/* Image Modal */}
        <Modal
          open={!!selectedImage}
          onClose={handleCloseModal}
          aria-labelledby="image-modal"
          aria-describedby="image-modal-description"
        >
          <ExpandedImageModal>
            <ExpandedImageContent>
              <img 
                src={selectedImage} 
                alt="Expanded view" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '90vh',
                  borderRadius: 8,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                }} 
              />
              <CloseButton onClick={handleCloseModal}>
                <Close />
              </CloseButton>
            </ExpandedImageContent>
          </ExpandedImageModal>
        </Modal>

        {/* Contact Form Modal */}
        <ContactFormModal
          open={openContact}
          onClose={handleCloseContact}
          aria-labelledby="contact-form-modal"
          maxWidth="sm"
          fullWidth
        >
          <DialogContent sx={{ backgroundColor: '#000', padding: '24px' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              color: '#fff',
              textAlign: 'center'
            }}>
              Contact {profile?.fullName}
            </Typography>
            
            <ContactForm component="form" onSubmit={handleSubmitContact}>
              <ContactTextField
                fullWidth
                label="Your Name"
                variant="outlined"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
                sx={{ mb: 3 }}
              />
              
              <ContactTextField
                fullWidth
                label="Your Email"
                variant="outlined"
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
                sx={{ mb: 3 }}
              />
              
              <ContactTextField
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                rows={4}
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                required
                sx={{ mb: 3 }}
              />
              
              <DialogActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
                <ContactCancelButton
                  onClick={handleCloseContact} 
                >
                  CANCEL
                </ContactCancelButton>
                <ContactButton
                  type="submit"
                  variant="contained"
                >
                  SEND MESSAGE
                </ContactButton>
              </DialogActions>
            </ContactForm>
          </DialogContent>
        </ContactFormModal>

        {/* Snackbar for success/error messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </GradientBackground>
    </ThemeProvider>
  );
};

export default MusicProducerProfile;