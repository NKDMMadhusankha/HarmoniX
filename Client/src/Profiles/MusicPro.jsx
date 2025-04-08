import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  IconButton, 
  Grid, 
  Paper, 
  Chip, 
  Avatar, 
  List, 
  ListItem,
  ListItemText,
  Divider,
  Link,
  alpha,
  createTheme,
  ThemeProvider,
  LinearProgress,
  Modal,
  Fade
} from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Material UI Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import TikTokIcon from '@mui/icons-material/MusicNote'; // Using MusicNote for TikTok
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LanguageIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code';
import PianoIcon from '@mui/icons-material/Piano';

const trackList = [
  { 
    id: 1, 
    name: 'Memoman, DeDeXgrande - Motion Feat. Erik Peers (Radio Edit)',
    duration: '03:02',
    date: 'Mar 28, 2024',
    youtubeLink: 'https://youtube.com/watch?v=example1',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 2, 
    name: 'Deemie - Drop That (Vocals)',
    duration: '02:48',
    date: 'Mar 28, 2024',
    youtubeLink: 'https://youtube.com/watch?v=example2',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 3, 
    name: 'Jessica Kuka - Body Language V2',
    duration: '03:18',
    date: 'Mar 28, 2024',
    youtubeLink: 'https://youtube.com/watch?v=example3',
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 4, 
    name: 'Luciano Aguilar - Follow Me',
    duration: '06:00',
    date: 'Mar 28, 2024',
    youtubeLink: 'https://youtube.com/watch?v=example4',
    coverArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 5, 
    name: 'Elliott Keefe - Universe',
    duration: '03:04',
    date: 'Mar 28, 2024',
    youtubeLink: 'https://youtube.com/watch?v=example5',
    coverArt: 'https://images.unsplash.com/photo-1557787163-1635e2efb160?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
];

const genres = [
  'EDM', 'Pop', 'Brooklyn Drill', 'Hip Hop', 'House', 'Deep House', 'Techno', 'Dark Trap', 'Trap'
];

const skills = [
  'Mastering Engineer', 'Mixing Engineer', 'Producer', 'Recording Engineer'
];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d5ff', // Neon blue
      light: '#33ddff',
      dark: '#00a6cc',
    },
    secondary: {
      main: '#ff0099', // Neon pink
      light: '#ff33ad',
      dark: '#cc007a',
    },
    background: {
      default: '#000000',
      paper: '#0a0a0a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Sora", "Inter", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 12,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #00d5ff 0%, #0095ff 100%)',
          boxShadow: '0 8px 20px -8px rgba(0, 213, 255, 0.5)',
          '&:hover': {
            background: 'linear-gradient(135deg, #00d5ff 20%, #0095ff 120%)',
            boxShadow: '0 10px 24px -8px rgba(0, 213, 255, 0.6)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const GlassCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: 'rgba(10, 10, 10, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
  },
}));

const TrackItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: 'scale(1.02)',
  },
}));

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const PlayerModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(8px)',
}));

const PlayerContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: { xs: '90%', sm: 400, md: 480 }, // Increased responsive width
  maxWidth: '95%',
  padding: theme.spacing(4),
  // borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(20px)',
  border: '1px solid',
  borderColor: alpha(theme.palette.primary.main, 0.2),
  boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.2)}`,
  textAlign: 'center',
  color: '#ffffff',
}));

const RotatingCover = styled(Box)(({ theme, isplaying }) => ({
  width: 200,
  height: 200,
  margin: '0 auto 20px',
  borderRadius: '50%',
  overflow: 'hidden',
  boxShadow: '0 0 30px rgba(0,0,0,0.5)',
  animation: isplaying ? `${rotate} 20s linear infinite` : 'none',
  animationPlayState: isplaying ? 'running' : 'paused',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}));

const MusicProducerProfile = () => {
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState(0);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  
  const handlePlayTrack = (id) => {
    const track = trackList.find(t => t.id === id);
    if (playing === id) {
      setPlaying(null);
      setOpenPlayer(false);
    } else {
      setPlaying(id);
      setCurrentTrack(track);
      setOpenPlayer(true);
    }
  };

  useEffect(() => {
    let timer;
    if (playing !== null) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            setPlaying(null);
            return 0;
          }
          return oldProgress + 1;
        });
      }, 1000);
    } else {
      setProgress(0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [playing]);

  const handleClosePlayer = () => {
    setPlaying(null);
    setOpenPlayer(false);
    setProgress(0);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 0%, rgba(0, 213, 255, 0.15), transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container>
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 4 }}>
            Music Producer Profile
          </Typography>
        </Container>
        {/* Hero Section - Enhanced with better visual impact */}
        <Box 
          sx={{ 
            position: 'relative',
            height: { xs: 380, md: 400 },
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #121212 0%, #080808 100%)',
          }}
        >
          {/* Abstract background pattern */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.15,
              backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(6px) saturate(120%)",
            }}
          />
          
          {/* Colored overlay */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 30% 70%, rgba(156, 39, 176, 0.15), transparent 60%), radial-gradient(circle at 70% 30%, rgba(33, 150, 243, 0.15), transparent 60%)',
            }}
          />
          
          {/* Bottom gradient fade */}
          <Box 
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '40%',
              background: 'linear-gradient(to top, rgba(8,8,8,1), rgba(8,8,8,0))'
            }}
          />
          
          {/* Content */}
          <Container sx={{ 
            position: 'relative', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            pb: { xs: 4, md: 6 },
            pt: { xs: 2, md: 4 }, 
          }}>
            <Grid container spacing={4} alignItems="flex-end">
              <Grid item xs={12} sm="auto">
                <Box sx={{ 
                  position: 'relative',
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  mb: { xs: 2, sm: 0 },
                }}>
                  <Avatar 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    alt="Noize London"
                    sx={{ 
                      width: { xs: 140, md: 180 }, 
                      height: { xs: 140, md: 180 },
                      border: 4,
                      borderColor: 'primary.main',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 0 4px rgba(156, 39, 176, 0.3)',
                    }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      bottom: -8, 
                      right: { xs: 'calc(50% - 78px)', sm: -8 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.main',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    }}
                  >
                    <MusicNoteIcon fontSize="small" />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 0.5 }}>
                  <Typography variant="h4" component="h1" sx={{ mr: 1 }}>
                    Noize London
                  </Typography>
                  <VerifiedIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                </Box>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  London, United Kingdom
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1, 
                  mb: 2,
                  justifyContent: { xs: 'center', sm: 'flex-start' } 
                }}>
                  {skills.slice(0, 3).map((skill, index) => (
                    <Chip 
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ 
                        bgcolor: alpha(darkTheme.palette.primary.main, 0.2),
                        color: 'primary.light',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: alpha(darkTheme.palette.primary.main, 0.4),
                        '&:hover': {
                          bgcolor: alpha(darkTheme.palette.primary.main, 0.3),
                        }
                      }}
                    />
                  ))}
                  <Chip 
                    icon={<HeadphonesIcon fontSize="small" />}
                    label="Available for hire"
                    size="small"
                    sx={{ 
                      bgcolor: alpha(darkTheme.palette.secondary.main, 0.2),
                      color: 'secondary.light',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: alpha(darkTheme.palette.secondary.main, 0.4),
                      '&:hover': {
                        bgcolor: alpha(darkTheme.palette.secondary.main, 0.3),
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm="auto" sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    sx={{ 
                      borderRadius: 28,
                      px: 3,
                      py: 1,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 'bold',
                    }}
                  >
                    Hire me
                  </Button>
                  <IconButton 
                    aria-label="Share profile"
                    sx={{ 
                      bgcolor: alpha(darkTheme.palette.background.paper, 0.6),
                      backdropFilter: 'blur(10px)',
                      width: 40,
                      height: 40,
                      '&:hover': { 
                        bgcolor: alpha(darkTheme.palette.background.paper, 0.8),
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Container sx={{ py: 5 }}>
          <Grid container spacing={4}>
            {/* Left Column - Featured Tracks */}
            <Grid item xs={12} md={8}>
              <GlassCard sx={{ p: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4 
                  }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(to right, #fff, #b3b3b3)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <PlayArrowIcon sx={{ color: 'primary.main' }} />
                      Featured Tracks
                    </Typography>
                    <Button 
                      variant="outlined"
                      size="small"
                      endIcon={<KeyboardArrowRightIcon />}
                      sx={{ 
                        borderRadius: 5,
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          borderColor: 'primary.light',
                          bgcolor: alpha(darkTheme.palette.primary.main, 0.1)
                        }
                      }}
                    >
                      View all
                    </Button>
                  </Box>

                  <Grid container spacing={2}>
                    {trackList.map((track) => (
                      <Grid item xs={12} sm={6} key={track.id}>
                        <Box
                          sx={{
                            position: 'relative',
                            bgcolor: alpha('#ffffff', 0.03),
                            borderRadius: 3,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            border: '1px solid',
                            borderColor: playing === track.id 
                              ? 'primary.main'
                              : 'transparent',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: `0 8px 24px ${alpha(darkTheme.palette.primary.main, 0.2)}`,
                              bgcolor: alpha('#ffffff', 0.05),
                            }
                          }}
                        >
                          <Box sx={{ position: 'relative', pt: '56.25%' }}>
                            <img
                              src={track.coverArt}
                              alt={track.name}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: playing === track.id ? 'none' : 'grayscale(0.5)',
                                transition: 'filter 0.3s ease'
                              }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                              }}
                            />
                            <IconButton
                              onClick={() => handlePlayTrack(track.id)}
                              sx={{
                                position: 'absolute',
                                bottom: 16,
                                left: 16,
                                bgcolor: playing === track.id ? 'primary.main' : alpha('#ffffff', 0.1),
                                backdropFilter: 'blur(4px)',
                                '&:hover': {
                                  bgcolor: playing === track.id ? 'primary.dark' : alpha('#ffffff', 0.2),
                                }
                              }}
                            >
                              {playing === track.id ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                            
                            <Box sx={{ 
                              position: 'absolute',
                              bottom: 16,
                              right: 16,
                              display: 'flex',
                              gap: 1
                            }}>
                              <IconButton
                                component={Link}
                                href={track.youtubeLink}
                                target="_blank"
                                size="small"
                                sx={{
                                  bgcolor: alpha('#ff0000', 0.2),
                                  '&:hover': { bgcolor: alpha('#ff0000', 0.3) }
                                }}
                              >
                                <YouTubeIcon sx={{ color: '#ff0000' }} />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{
                                  bgcolor: alpha('#ffffff', 0.1),
                                  '&:hover': { bgcolor: alpha('#ffffff', 0.2) }
                                }}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Box>
                          </Box>

                          <Box sx={{ p: 2 }}>
                            <Typography 
                              variant="subtitle1"
                              sx={{ 
                                fontWeight: playing === track.id ? 600 : 500,
                                color: playing === track.id ? 'primary.light' : 'text.primary',
                                mb: 1
                              }}
                            >
                              {track.name}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 2,
                              color: 'text.secondary'
                            }}>
                              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarMonthIcon fontSize="inherit" />
                                {track.date}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTimeIcon fontSize="inherit" />
                                {track.duration}
                              </Typography>
                            </Box>
                          </Box>

                          {playing === track.id && (
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 2,
                                bgcolor: alpha(darkTheme.palette.primary.main, 0.1),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: 'primary.main',
                                }
                              }}
                            />
                          )}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </GlassCard>
              
              {/* Equipment Section - Improved styling */}
              <GlassCard>
                <Box sx={{ position: 'relative' }}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Equipment & Tools
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        mb: 1.5,
                        color: 'text.secondary' 
                      }}>
                        <CodeIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={500}>
                          DAW & Software
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                          label="Ableton Live" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                        <Chip 
                          label="Logic Pro" 
                          size="small"
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                        <Chip 
                          label="FL Studio" 
                          size="small"
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        mb: 1.5,
                        color: 'text.secondary' 
                      }}>
                        <PianoIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={500}>
                          Instruments
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                          label="Piano" 
                          size="small"
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                        <Chip 
                          label="Guitar" 
                          size="small"
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                        <Chip 
                          label="Synths" 
                          size="small"
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        mb: 1.5,
                        color: 'text.secondary' 
                      }}>
                        <LanguageIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={500}>
                          Languages
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                          label="English" 
                          size="small"
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                        <Chip 
                          label="Italian" 
                          size="small"
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                        <Chip 
                          label="French" 
                          size="small"
                          sx={{ 
                            bgcolor: alpha('#ffffff', 0.05),
                            '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </GlassCard>
            </Grid>
            
           {/* Right Column - Bio and Info */}
<Grid item xs={12} md={4}>
  {/* About Section - Improved styling */}
  <GlassCard>
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h6" sx={{ mb: 2, pl: 1 }}>
        About
      </Typography>
      
      <Box sx={{ color: 'text.secondary' }}>
        <Typography variant="body2" paragraph>
          Fabio is a songwriter, producer and mixing/mastering engineer from London with over 16 years professional experience dedicated to helping musicians accelerate their growth in all areas of the industry.
        </Typography>
        
        <Typography variant="body2" paragraph>
          Noize is run by Fabio Lendrum, a singer, songwriter, producer and mixing engineer who has worked along side some of the biggest names in music including Dallas Austin (Michael Jackson, Kelis), Rick Nowles (Nelly Furtado, Lykke Li, Stevie Knicks), and Kool Kojak (Britney Spears, Nicki Minaj, Flo Rida).
        </Typography>
        
        <Typography variant="body2" paragraph>
          Fabio's personal focus is now on making underground house music and techno but he still mixes and masters a wide variety of music including Hip-Hop, Pop and World music.
        </Typography>
      </Box>
    </Box>
  </GlassCard>
  
  {/* Genres Section - Enhanced styling */}
  <GlassCard>
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h6" sx={{ mb: 2, pl: 1 }}>
        Genres
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {genres.map((genre, index) => (
          <Chip 
            key={index} 
            label={genre} 
            size="small"
            sx={{ 
              bgcolor: alpha('#ffffff', 0.05),
              '&:hover': { 
                bgcolor: alpha('#ffffff', 0.1),
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease',
            }}
            clickable
          />
        ))}
      </Box>
    </Box>
  </GlassCard>
  
  {/* Connect Section - Enhanced styling */}
  <GlassCard>
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h6" sx={{ mb: 3, pl: 1 }}>
        Connect
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        justifyContent: { xs: 'center', sm: 'flex-start' }
      }}>
        <IconButton 
          component={Link}
          href="https://instagram.com/noizelondon"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          sx={{ 
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            color: 'white',
            width: 48,
            height: 48,
            boxShadow: '0 4px 10px rgba(225, 48, 108, 0.3)',
            '&:hover': { 
              opacity: 0.9,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <InstagramIcon />
        </IconButton>
        
        <IconButton 
          component={Link}
          href="https://youtube.com/@noizelondon"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          sx={{ 
            bgcolor: '#c4302b',
            color: 'white',
            width: 48,
            height: 48,
            boxShadow: '0 4px 10px rgba(196, 48, 43, 0.3)',
            '&:hover': { 
              opacity: 0.9,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <YouTubeIcon />
        </IconButton>
        
        <IconButton 
          component={Link}
          href="https://tiktok.com/@noizelondon"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          sx={{ 
            background: 'linear-gradient(45deg, #000000, #333333)',
            color: 'white',
            width: 48,
            height: 48,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            '&:hover': { 
              opacity: 0.9,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <TikTokIcon />
        </IconButton>
      </Box>
      
      <Divider sx={{ 
        my: 3, 
        background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(255,255,255,0.2), rgba(0,0,0,0))' 
      }} />
      
      <Box sx={{ 
        p: 2, 
        borderRadius: 2, 
        bgcolor: alpha('#ffffff', 0.03),
        border: '1px solid',
        borderColor: alpha('#ffffff', 0.05),
      }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Fabio's past personal project KAIOS has had huge success in a very small time frame. Deemed by Pete Tong as BBC Radio 1's Future Stars of 2021 and coming with over 1,000,000 streams on their first ever remix for Martin Garrix and Elderbrook.
        </Typography>
      </Box>
    </Box>
  </GlassCard>
</Grid>
          </Grid>
        </Container>
        <PlayerModal
          open={openPlayer}
          onClose={handleClosePlayer}
          closeAfterTransition
        >
          <Fade in={openPlayer}>
            <PlayerContent>
              <RotatingCover isplaying={playing !== null}>
                <img 
                  src={currentTrack?.coverArt} 
                  alt={currentTrack?.name}
                />
              </RotatingCover>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1,
                  color: 'common.white',  // Add this line
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)' // Optional: adds depth
                }}
              >
                {currentTrack?.name}
              </Typography>
              <Box sx={{ px: 4 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    mb: 2,
                    bgcolor: alpha(darkTheme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'primary.main',
                    }
                  }}
                />
              </Box>
              <IconButton
                onClick={() => handlePlayTrack(currentTrack?.id)}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
            </PlayerContent>
          </Fade>
        </PlayerModal>
      </Box>
    </ThemeProvider>
 
  );
}
export default MusicProducerProfile;