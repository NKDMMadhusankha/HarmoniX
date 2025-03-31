import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Card, 
  CardContent, 
  CardMedia,
  Grid,
  Slider,
  Container,
  Tabs,
  Tab,
  InputBase,
  alpha,
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  LinearProgress,
  TextField
} from '@mui/material';
import { 
  Search, 
  Notifications,
  Settings,
  PlayArrow,
  Favorite,
  SkipPrevious,
  SkipNext,
  Pause,
  Close,
  MoreVert,
  ArrowForward,
  VolumeUp
} from '@mui/icons-material';
import { 
  Facebook, 
  Twitter,
  Instagram
} from '@mui/icons-material';

function MusicStreamingApp() {
  const [value, setValue] = React.useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (event, newValue) => {
    setCurrentTime(newValue);
  };

  const openPlayer = (artist) => {
    setSelectedArtist(artist);
    setPlayerOpen(true);
    setIsPlaying(true);
  };

  const closePlayer = () => {
    setPlayerOpen(false);
    setIsPlaying(false);
  };

  // Top Artists data
  const topArtists = [
    { 
      name: 'Travis Scott', 
      plays: '444M Plays', 
      image: 'https://i.pinimg.com/736x/fb/77/7e/fb777e2a3fdb1b12a5947dd790226ebc.jpg', 
      color: '#3b82f6',
      trackName: 'Goosebumps',
      duration: 243 // in seconds
    },
    { 
      name: 'Billie Eilish', 
      plays: '292M Plays', 
      image: 'https://i.pinimg.com/736x/53/03/92/530392ab97543bba3a73a1f700cf9111.jpg',
      color: '#facc15',
      trackName: 'Bad Guy',
      duration: 194
    },
    { 
      name: 'The Kid', 
      plays: '63M Plays', 
      image: 'https://i.pinimg.com/736x/ac/26/8f/ac268f8bde82162d92cc36557eeeedbe.jpg',
      color: '#14b8a6',
      trackName: 'Ransom',
      duration: 180
    },
    { 
      name: 'Kanye', 
      plays: '194M Plays', 
      image: 'https://i.pinimg.com/736x/d3/46/0e/d3460e487b05d217d9f415ce26454b5d.jpg',
      color: '#f97316',
      trackName: 'Stronger',
      duration: 312
    },
    { 
      name: 'Nicki Minaj', 
      plays: '155M Plays', 
      image: 'https://i.pinimg.com/736x/c8/7e/c7/c87ec74b6ec29717e14fe5aa17cdda6d.jpg',
      color: '#e5e7eb',
      trackName: 'Super Bass',
      duration: 210
    },
    { 
      name: 'Starboy', 
      plays: '102M Plays', 
      image: 'https://i.pinimg.com/736x/46/42/8d/46428deafc947ae8bd40fa8f475b97f1.jpg',
      color: '#dc2626',
      trackName: 'Blinding Lights',
      duration: 201
    }
  ];

  // Format time (seconds) to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Box sx={{ 
      bgcolor: '#121212', 
      color: 'white', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'auto',  // Changed from 'hidden' to 'auto'
      position: 'relative'
    }}>
      {/* Background Image */}
      <Box sx={{ 
        position: 'absolute',
        left: 0,
        top: 0,
        height: '70%',
        width: '100%',
        backgroundImage: 'url(https://img.freepik.com/free-photo/music-producer-work_23-2151953448.jpg?t=st=1743411502~exp=1743415102~hmac=fa26b1767c2f9a367b86004260ca1b6bf86e1c3ed381c56c552cf2beed7c8f6d&w=900)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundBlendMode: 'darken',
        backgroundPosition: 'center',
        opacity: 0.3,
        zIndex: 0
      }} />
      
      {/* Content Container - all content needs to be above the background */}
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
       
        <Container maxWidth="xl" sx={{ mt: 4, pb: 6 }}>
          {/* Featured Content */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Trending New Hits
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex',
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              height: 280
            }}>
              <Box sx={{ padding: 4, zIndex: 1, alignSelf: 'flex-end' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 0 }}>
                  In My Feelings
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                  Camila Cabello · 63M Plays
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<PlayArrow />} 
                    sx={{ 
                      bgcolor: '#1976d2', 
                      borderRadius: 28,
                      '&:hover': { bgcolor: '#1565c0' }
                    }}
                  >
                    Listen Now
                  </Button>
                  <IconButton 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.1)', 
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } 
                    }}
                  >
                    <Favorite />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Top Artists Section */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',   mt: 15,}}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Top Artists
              </Typography>
              <Button 
                endIcon={<ArrowForward />} 
                sx={{ 
                  color: '#888',
                  '&:hover': { color: 'white' }
                }}
              >
                See all
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {topArtists.map((artist, index) => (
                <Grid item key={index} xs={6} sm={4} md={2}>
                  <Box 
                    sx={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                        
                      }
                    }}
                    onClick={() => openPlayer(artist)}
                  >
                    <Box 
                      sx={{ 
                        mt: 15,
                        borderRadius: 2, 
                        overflow: 'hidden', 
                        mb: 1,
                        bgcolor: artist.color,
                        height: 0,
                        paddingTop: '100%',
                        position: 'relative'
                      }}
                    >
                      <Box
                        component="img"
                        src={artist.image}
                        alt={artist.name}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {artist.name}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {artist.plays}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        <Box sx={{ 
      bgcolor: '#000000', 
      color: 'white',
      py: 8,
      position: 'relative',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://img.freepik.com/free-photo/music-producer-work_23-2151953448.jpg?w=900)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <Container maxWidth="lg">
        {/* BEAT ME Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              letterSpacing: '2px',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            BEAT ME
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              maxWidth: '800px', 
              mx: 'auto', 
              mt: 2,
              mb: 4,
              textAlign: 'center',
              fontSize: '0.9rem',
              lineHeight: 1.6
            }}
          >
            BEAT RECORDS is the most famous recording studio in Sri Lanka, renowned
            for its creativity and technological excellence. And it has been musical home to
            Billy Ocean, Jay Leno, Richie Benaud, Adam Faith, Jay-Z and many more.
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              maxWidth: '800px', 
              mx: 'auto',
              textAlign: 'center',
              fontSize: '0.9rem',
              lineHeight: 1.6
            }}
          >
            Beat RECORDS was founded by Adam Lee and Jordi Lee. Beat Studio is platform
            that consists of music based networks. It has contracts with major
            label services and PR companies. Our services are comprehensive and
            tailor to the needs of our clients. They include artist development,
            day-to-day operations, publishing, international representation, marketing
            as well as distribution and public relations.
          </Typography>
        </Box>
        
        {/* CONTACT Section */}
        <Box sx={{ mb: 6, mt: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 'bold', 
              letterSpacing: '2px'
            }}
          >
            CONTACT
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            gap: 2,
            maxWidth: '600px',
            mx: 'auto',
            mb: 6
          }}>
            <TextField
              variant="outlined"
              placeholder="Enter your Email"
              fullWidth
              InputProps={{
                sx: {
                  color: 'white',
                  bgcolor: 'rgba(30, 30, 30, 0.5)',
                  border: '1px solid rgba(244, 67, 54, 0.5)',
                  borderRadius: 0,
                  '&:hover': {
                    borderColor: 'rgba(244, 67, 54, 0.8)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  }
                }
              }}
            />
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#f44336',
                color: 'white',
                borderRadius: 0,
                py: 1.5,
                px: 4,
                '&:hover': {
                  bgcolor: '#d32f2f'
                },
                minWidth: { xs: '100%', sm: '120px' }
              }}
            >
              Connect
            </Button>
          </Box>
          
          {/* Contact Information */}
          <Grid container spacing={4} justifyContent="center" sx={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ mb: 2, letterSpacing: '1px' }}>
                Address
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Pame Towers, Colombo 05 Sri Lanka
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ mb: 2, letterSpacing: '1px' }}>
                Email
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                beatme@beat.com
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ mb: 2, letterSpacing: '1px' }}>
                Phone
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                011-234-5343
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
        {/* Social Media Icons - Positioned at the right edge of the screen */}
        <Box sx={{ 
          position: { xs: 'static', md: 'absolute' },
          right: 20,
          bottom: 20,
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          gap: 2,
          justifyContent: { xs: 'center', md: 'flex-end' },
          mt: { xs: 4, md: 0 }
        }}>
          <IconButton sx={{ color: 'white' }}>
            <Facebook />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Twitter />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Instagram />
          </IconButton>
        </Box>
      </Container>
    </Box>

        {/* Music Player Dialog */}
        <Dialog
          open={playerOpen}
          onClose={closePlayer}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#1a1a2e',
              color: 'white',
              borderRadius: 2,
              backgroundImage: selectedArtist 
                ? `linear-gradient(to bottom, #1a1a2e, ${selectedArtist.color})` 
                : 'linear-gradient(to bottom, #1a1a2e, rgba(0, 102, 255, 0.7))'
            }
          }}
        >
          <DialogContent sx={{ position: 'relative', p: 0, overflow: 'hidden', height: '500px' }}>
            {/* Close button */}
            <IconButton 
              onClick={closePlayer} 
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.3)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
              }}
            >
              <Close />
            </IconButton>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              height: '100%'
            }}>
              {/* Artist Image */}
              <Box sx={{ 
                flex: { xs: '1', md: '0.4' },
                p: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {selectedArtist && (
                  <Box 
                    component="img"
                    src={selectedArtist.image}
                    alt={selectedArtist.name}
                    sx={{
                      width: '100%',
                      maxHeight: '300px',
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                  />
                )}
              </Box>
              
              {/* Track Info and Controls */}
              <Box sx={{ 
                flex: { xs: '1', md: '0.6' },
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                {selectedArtist && (
                  <>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {selectedArtist.trackName}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255,255,255,0.7)' }}>
                      {selectedArtist.name}
                    </Typography>
                    
                    {/* Player Controls */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                      <IconButton sx={{ color: 'white' }}>
                        <SkipPrevious fontSize="large" />
                      </IconButton>
                      <IconButton 
                        sx={{ 
                          color: 'white', 
                          bgcolor: '#1976d2',
                          mx: 2,
                          '&:hover': { bgcolor: '#1565c0' }
                        }}
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                      </IconButton>
                      <IconButton sx={{ color: 'white' }}>
                        <SkipNext fontSize="large" />
                      </IconButton>
                    </Box>
                    
                    {/* Timeline */}
                    <Box sx={{ mb: 2 }}>
                      <Slider
                        value={currentTime}
                        onChange={handleTimeChange}
                        max={selectedArtist.duration}
                        sx={{
                          color: '#1976d2',
                          '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12,
                            '&:hover, &.Mui-active': {
                              boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)'
                            }
                          }
                        }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatTime(currentTime)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatTime(selectedArtist.duration)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Volume */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <VolumeUp sx={{ color: 'rgba(255,255,255,0.7)', mr: 2 }} />
                      <Slider
                        defaultValue={70}
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12
                          }
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default MusicStreamingApp;