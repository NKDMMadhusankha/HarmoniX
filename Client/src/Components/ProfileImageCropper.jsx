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

const ProfileImageCropper = ({
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
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: { backgroundColor: '#000', borderRadius: '8px' }
      }}
      BackdropProps={{
        style: { backgroundColor: 'rgba(0,0,0,0.95)' }
      }}
    >
      <DialogTitle style={{ color: '#fff', background: '#000', borderBottom: '1px solid #333' }}>
        Crop & Position Profile Image
      </DialogTitle>
      <DialogContent style={{ background: '#000', padding: 0 }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 350,
            background: '#000',
            overflow: 'hidden'
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div style={{ padding: '16px 24px', background: '#000' }}>
          <p style={{ color: '#aaa', margin: '0 0 8px 0', fontSize: '14px' }}>Zoom</p>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.01}
            onChange={(_, value) => setZoom(value)}
            style={{ color: '#3f51b5' }}
          />
        </div>
      </DialogContent>
      <DialogActions style={{ background: '#000', borderTop: '1px solid #333', padding: '16px 24px' }}>
        <Button onClick={onClose} style={{ color: '#aaa' }}>CANCEL</Button>
        <Button onClick={handleSave} variant="contained" color="primary">SAVE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileImageCropper;
