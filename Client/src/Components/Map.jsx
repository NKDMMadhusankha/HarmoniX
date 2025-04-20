import React, { useState } from 'react';
import { 
  GoogleMap, 
  LoadScript, 
  Marker, 
  InfoWindow,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

const MapComponent = ({ center = { lat: 6.9271, lng: 79.8612 } }) => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [showDirections, setShowDirections] = useState(false);
  
  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const options = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
  };

  const getDirections = () => {
    if (!origin) return;
    
    setShowDirections(true);
  };

  const directionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={['places']}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={options}
        >
          <Marker 
            position={center} 
            onClick={() => setIsInfoWindowOpen(true)}
          >
            {isInfoWindowOpen && (
              <InfoWindow
                position={center}
                onCloseClick={() => setIsInfoWindowOpen(false)}
              >
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Sound Wave Studios
                  </Typography>
                  <Typography variant="body2">
                    123 Music Street, Melody City
                  </Typography>
                  <Button 
                    size="small" 
                    startIcon={<DirectionsIcon />}
                    onClick={() => {
                      setIsInfoWindowOpen(false);
                      setShowDirections(true);
                    }}
                  >
                    Get Directions
                  </Button>
                </Box>
              </InfoWindow>
            )}
          </Marker>

          {showDirections && origin && (
            <DirectionsService
              options={{
                destination: center,
                origin: origin,
                travelMode: 'DRIVING'
              }}
              callback={directionsCallback}
            />
          )}

          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions
              }}
            />
          )}
        </GoogleMap>
        
        {showDirections && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              left: 10, 
              right: 10, 
              bgcolor: 'rgba(255,255,255,0.8)', 
              p: 1, 
              borderRadius: 1 
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Enter your location"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={getDirections}
                >
                  Go
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  size="small"
                  onClick={() => {
                    setShowDirections(false);
                    setDirections(null);
                    setOrigin("");
                  }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </LoadScript>
  );
};

export default MapComponent;