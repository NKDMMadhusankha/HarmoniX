import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slider, Button } from '@mui/material';

function getCroppedImg(imageSrc, croppedAreaPixels) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg');
    };
    image.onerror = reject;
  });
}

const CoverImageCropper = ({
  open,
  imageSrc,
  onClose,
  onCropComplete
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedBlob);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      BackdropProps={{
        style: { backgroundColor: 'rgba(0,0,0,0.95)' }
      }}
    >
      <DialogTitle style={{ color: '#fff', background: '#111' }}>
        Crop & Position Cover Image
      </DialogTitle>
      <DialogContent style={{ background: '#000', padding: 0 }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 550, // Increased from 350 to 500
            background: '#000',
            borderRadius: 8,
            overflow: 'hidden'
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.01}
          onChange={(_, value) => setZoom(value)}
          style={{ marginTop: 16, color: '#fff' }}
        />
      </DialogContent>
      <DialogActions style={{ background: '#111' }}>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoverImageCropper;
