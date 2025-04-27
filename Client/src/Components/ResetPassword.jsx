import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #000000, black)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
}));

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password, confirmPassword }
      );
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <GradientBackground>
      <Paper
        elevation={3}
        sx={{
          width: '400px',
          p: 4,
          borderRadius: 6,
          backgroundColor: 'black',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 500, fontFamily:'' }}>
          Reset Password
        </Typography>

        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="subtitle1" sx={{ textAlign: 'left', mb: 1}}>New Password</Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            size="small"
            required
            sx={{ 
              mb: 3, 
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#666', // Lighter border color for visibility
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#888', // Brighter on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196f3', // Blue when focused
                  borderWidth: '2px',
                }
              }
            }}
          />

          <Typography variant="subtitle1" sx={{ textAlign: 'left', mb: 1}}>Confirm Password</Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            size="small"
            required
            sx={{ 
              mb: 3, 
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#666', // Lighter border color for visibility
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#888', // Brighter on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196f3', // Blue when focused
                  borderWidth: '2px',
                }
              }
            }}
          />

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary"
            sx={{ 
              mt: 1, 
              py: 1.2,
              bgcolor: '#2196f3', // Bright blue button color
              '&:hover': {
                bgcolor: '#1976d2', // Slightly darker when hovered
              }
            }} 
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'RESET PASSWORD'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Remember your password ? <RouterLink to="/login" style={{ color: '#2196f3', textDecoration: 'none' }}>Login</RouterLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </GradientBackground>
  );
};

export default ResetPassword;