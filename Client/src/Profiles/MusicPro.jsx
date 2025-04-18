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
  DialogActions
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
  Close
} from '@mui/icons-material';
import Navbar from '../Components/Navbar'; // Assuming you have a Navbar component
import Footer from '../Components/Footer'; // Assuming you have a Footer component
import ProImg from '../assets/procover.jpg'; // Assuming you have a profile image

// Custom styled components using Material UI's styled API
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

const ProfileOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  
  backgroundImage: `url(${ProImg})`,
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

// New TrackContainer style for the updated track listing
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
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);
  
  // New tracks data that matches the format in the image
  const tracks = [
    {
      id: 1,
      title: "Goddam ft. Olivia Ruff | Jazz Mafia (co-written & produced by Adam Theis)",
      duration: "04:25",
      uploadDate: "Mar 26, 2024"
    },
    {
      id: 2,
      title: "The Situation ft. Lateef The Truthspeaker | Jazz Mafia (produced by Adam Theis)",
      duration: "05:17",
      uploadDate: "Mar 26, 2024"
    },
    {
      id: 3,
      title: "Kill Em With Kindness | Cosa Nostra Strings (written & produced by Adam Theis)",
      duration: "07:57",
      uploadDate: "Mar 26, 2024"
    },
    {
      id: 4,
      title: "China Cat Sunflower | Grateful Brass (prod, arr, ft. Adam Theis)",
      duration: "06:25",
      uploadDate: "Mar 26, 2024"
    },
    {
      id: 5,
      title: "Stone Cold Lovin | Jazz Mafia (co-written, produced by Adam Theis)",
      duration: "04:20",
      uploadDate: "Mar 26, 2024"
    },
    {
      id: 6,
      title: "Rock and Clap | Jazz Mafia (written & produced by Adam Theis)",
      duration: "05:20",
      uploadDate: "Mar 26, 2024"
    }
  ];

  const galleryImages = [
    "https://picsum.photos/800/600?random=20",
    "https://picsum.photos/800/600?random=21",
    "https://picsum.photos/800/600?random=22",
    "https://picsum.photos/800/600?random=23",
    "https://picsum.photos/800/600?random=24",
    "https://picsum.photos/800/600?random=25",
  ];

  const genres = [
    "Electronic", "Hip Hop", "House", "Cinematic", "Ambient", 
    "Pop", "R&B", "Trap", "Lo-fi", "Synthwave", "Future Bass"
  ];

  const skills = [
    "Music Production", "Mixing", "Mastering", "Sound Design",
    "Composition", "Arrangement", "Vocal Tuning", "Audio Engineering",
    "MIDI Programming", "Soundtrack Production"
  ];

  const tools = [
    "Ableton Live", "Logic Pro", "Pro Tools", "Native Instruments",
    "FL Studio", "Serum", "Omnisphere", "Kontakt", "Waves Plugins",
    "iZotope", "Melodyne", "Auto-Tune"
  ];

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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GradientBackground>
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section with Larger Cover Image */}
        <HeroSection>
          <ProfileOverlay />
          
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
                src="https://img.freepik.com/free-photo/medium-shot-man-playing-guitar-studio_23-2150232123.jpg?t=st=1744101142~exp=1744104742~hmac=dd039b0e837d5847a9cf25a79c4fc73db3aa76a68129ff1ca1d67bea0a9f5d9a&w=996" 
                alt="SOUNDWAVE"
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
                Mithila Madhusankha
              </Typography>
              
              <Typography variant="subtitle1" color="white" sx={{ mt: 0.5 }}>
                Los Angeles, CA · United States
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                <Chip 
                  label="Producer" 
                  size="small"
                  sx={{ backgroundColor: 'rgba(25, 118, 210, 0.4)' }}
                />
                <Chip 
                  label="Composer" 
                  size="small" 
                  sx={{ backgroundColor: 'rgba(25, 118, 210, 0.4)' }}
                />
                <Chip 
                  label="Mixing Engineer" 
                  size="small" 
                  sx={{ backgroundColor: 'rgba(25, 118, 210, 0.4)' }}
                />
              </Box>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary"
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
                    {`Enter the immersive sonic universe of SOUNDWAVE, where electronic elements 
                    blend with organic textures to create memorable auditory experiences.

                    With over 10 years in the industry, SOUNDWAVE has crafted sounds for films, 
                    commercials, and chart-topping artists. His unique approach to music production 
                    combines traditional composition techniques with cutting-edge digital tools.

                    Specializing in atmospheric electronic, hip-hop fusion, and cinematic compositions, 
                    SOUNDWAVE's unique approach has earned recognition across multiple platforms and continents.

                    His work has been featured in major film festivals, international advertising campaigns, 
                    and on platforms like Spotify, Apple Music, and SoundCloud with millions of streams.`}
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
                  
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <SocialButton 
                      variant="contained" 
                      startIcon={<LinkIcon sx={{ color: '#1DB954' }} />} 
                      size="medium"
                      sx={{ mb: 1 }}
                    >
                      Spotify
                    </SocialButton>
                    <SocialButton 
                      variant="contained" 
                      startIcon={<YouTube sx={{ color: '#FF0000' }} />} 
                      size="medium"
                      sx={{ mb: 1 }}
                    >
                      YouTube
                    </SocialButton>
                    <SocialButton 
                      variant="contained" 
                      startIcon={<Instagram sx={{ color: '#E1306C' }} />}
                      size="medium"
                      sx={{ mb: 1 }}
                    >
                      Instagram
                    </SocialButton>
                  </Stack>
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
                {tracks.map(track => (
                  <TrackContainer key={track.id}>
                    {/* Play Button */}
                    <PlayButton 
                      onClick={() => handlePlayPause(track.id)}
                      size="medium"
                    >
                      {isPlaying && currentTrack === track.id ? (
                        <Pause sx={{ fontSize: 24 }} />
                      ) : (
                        <PlayArrow sx={{ fontSize: 24 }} />
                      )}
                    </PlayButton>
                    
                    {/* Track Information */}
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      flex: 1, 
                      ml: 2 
                    }}>
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
                      
                      {/* Progress Bar */}
                      {currentTrack === track.id && (
                        <LinearProgress 
                          variant="determinate" 
                          value={progress} 
                          sx={{ 
                            mt: 1.5,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(to right, #1976d2, #7c4dff)',
                              borderRadius: 2,
                            }
                          }} 
                        />
                      )}
                    </Box>
                  </TrackContainer>
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
      </GradientBackground>
    </ThemeProvider>
  );
};

export default MusicProducerProfile;