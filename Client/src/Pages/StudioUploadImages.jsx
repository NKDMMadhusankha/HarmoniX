import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, IconButton, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const StudioUploadImages = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExistingImages = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5000/api/studio/me', {
          headers: {
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch existing images');
        }

        const data = await response.json();
        if (data.studioImages && data.studioImages.length > 0) {
          setExistingImages(data.studioImages);
        }
      } catch (error) {
        console.error('Error fetching existing images:', error);
      }
    };

    fetchExistingImages();
  }, []);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...images, ...files];
    
    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
    setImages(newImages);
    setError('');
  };

  const handleDeleteImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      // Revoke the preview URL to free up memory
      URL.revokeObjectURL(previews[index]);
      
      const newPreviews = previews.filter((_, i) => i !== index);
      const newImages = images.filter((_, i) => i !== index);
      setPreviews(newPreviews);
      setImages(newImages);
    }
  };

  const handleImageError = (index) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const handleSubmit = async () => {
    const totalImages = existingImages.length + images.length;
    if (totalImages < 6) {
      setError('Please upload at least 6 images in total');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('studioImages', image);
      });
      
      // Add existing images to form data
      existingImages.forEach(imageUrl => {
        formData.append('existingImages', imageUrl);
      });

      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/studio/upload-images', {
        method: 'POST',
        headers: {
          'x-auth-token': token
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload images');
      }

      // Clean up preview URLs
      previews.forEach(preview => URL.revokeObjectURL(preview));
      
      navigate('/studio/dashboard');
    } catch (error) {
      console.error('Error uploading images:', error);
      setError(error.message || 'Failed to upload images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalImages = existingImages.length + images.length;
  const imagesNeeded = Math.max(0, 6 - totalImages);

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: 'white'
    }}>
      <Box 
        sx={{ 
          maxWidth: '1200px', 
          mx: 'auto', 
          borderRadius: 3,
          p: { xs: 2, md: 4 },
          backgroundColor: 'rgba(18, 18, 18, 0.6)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ 
            mb: 1, 
            background: 'linear-gradient(90deg, #2196f3, #21f3e3)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Studio Gallery
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            mb: 4,
            pb: 2,
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Upload at least 6 high-quality images of your studio space
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: totalImages >= 6 ? '#4caf50' : 'rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {totalImages >= 6 && <CheckCircleOutlineIcon sx={{ mr: 0.5, fontSize: 16 }} />}
              {totalImages} / 6 images
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              backgroundColor: 'rgba(211, 47, 47, 0.1)', 
              color: '#f44336',
              border: '1px solid rgba(211, 47, 47, 0.2)',
              '& .MuiAlert-icon': {
                color: '#f44336'
              }
            }}
          >
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {existingImages.map((imageUrl, index) => (
            <Grid item xs={12} sm={6} md={4} key={`existing-${index}`}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }
                }}
              >
                {!imageLoadErrors[index] ? (
                  <img 
                    src={imageUrl} 
                    alt={`Studio ${index + 1}`} 
                    onError={() => handleImageError(index)}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }} 
                  />
                ) : (
                  <Box sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)'
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Failed to load image
                    </Typography>
                  </Box>
                )}
                <IconButton
                  onClick={() => handleDeleteImage(index, true)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    '&:hover': {
                      backgroundColor: 'rgba(244, 67, 54, 0.8)',
                    },
                    color: 'white',
                    transition: 'all 0.2s',
                    width: 36,
                    height: 36,
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
          
          {previews.map((preview, index) => (
            <Grid item xs={12} sm={6} md={4} key={`preview-${index}`}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }
                }}
              >
                <img 
                  src={preview} 
                  alt={`New Studio ${index + 1}`} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 30%)',
                  }}
                />
                <IconButton
                  onClick={() => handleDeleteImage(index)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    '&:hover': {
                      backgroundColor: 'rgba(244, 67, 54, 0.8)',
                    },
                    color: 'white',
                    transition: 'all 0.2s',
                    width: 36,
                    height: 36,
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
          
          {/* Upload New Image Tile */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              component="label"
              htmlFor="raised-button-file"
              sx={{
                position: 'relative',
                borderRadius: 2,
                aspectRatio: '4/3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px dashed rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(33, 150, 243, 0.6)',
                }
              }}
            >
              <AddPhotoAlternateIcon 
                sx={{ 
                  fontSize: 48, 
                  mb: 1, 
                  color: 'rgba(33, 150, 243, 0.8)' 
                }} 
              />
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {imagesNeeded > 0 ? 
                  `Add ${imagesNeeded} more image${imagesNeeded > 1 ? 's' : ''}` : 
                  'Add more images'}
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileSelect}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ 
          mt: 6, 
          pt: 3, 
          display: 'flex', 
          justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={totalImages < 6 || loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
            sx={{ 
              px: 5, 
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 8,
              backgroundColor: 'rgba(33, 150, 243, 0.9)',
              backgroundImage: 'linear-gradient(45deg, #2196f3, #21cbf3)',
              boxShadow: '0 4px 20px rgba(33, 150, 243, 0.5)',
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: '0 6px 25px rgba(33, 150, 243, 0.7)',
                transform: 'translateY(-2px)'
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.4)'
              }
            }}
          >
            {loading ? 'Uploading...' : 'Save Gallery'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudioUploadImages;