import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Snackbar, Alert, styled } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
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
          Forgot Password
        </Typography>

        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="subtitle1" sx={{ textAlign: 'left', mb: 1}}>Email</Typography>
          <TextField
            fullWidth
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 3, input: { color: 'white'} }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, py: 1.2 }} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Remember your password ? <RouterLink to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>Login</RouterLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </GradientBackground>
  );
};

export default ForgotPassword;
