import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, IconButton, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

  return (
    <Box sx={{ 
      p: 4, 
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: 'white'
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Upload Studio Images
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Please upload at least 6 images of your studio. These images will be displayed on your profile.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
          >
            Upload Images
          </Button>
        </label>
        <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
          Total images: {existingImages.length + images.length} (minimum 6 required)
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {existingImages.map((imageUrl, index) => (
          <Grid item xs={12} sm={6} md={4} key={`existing-${index}`}>
            <Box
              sx={{
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                overflow: 'hidden',
                aspectRatio: '16/9',
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Failed to load image
                </Typography>
              )}
              <IconButton
                onClick={() => handleDeleteImage(index, true)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                  color: 'white',
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
        {previews.map((preview, index) => (
          <Grid item xs={12} sm={6} md={4} key={`preview-${index}`}>
            <Box
              sx={{
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                overflow: 'hidden',
                aspectRatio: '16/9',
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
              <IconButton
                onClick={() => handleDeleteImage(index)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                  color: 'white',
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={existingImages.length + images.length < 6 || loading}
          sx={{ px: 4, py: 1.5 }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
              Uploading...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default StudioUploadImages;