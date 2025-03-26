import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  InputAdornment, 
  IconButton, 
  Snackbar,
  Alert 
} from '@mui/material';
import { motion } from "framer-motion";  
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import Loader from './Loader';  // Importing the Loader component

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);  

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      localStorage.setItem('authToken', response.data.token);
      setSuccess(true);

      setTimeout(() => {
        navigate('/home');
      }, 3000);

    } catch (error) {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: "url('/src/assets/formbg.png') center/cover no-repeat",
        position: 'relative'
      }}
    >
      {/* ✅ Success Message - Always Visible on Top */}
      <Snackbar 
        open={success} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 99999 }}  // ✅ This keeps it above the loader
      >
        <Alert severity="success" variant="filled" sx={{ fontSize: '1rem', fontWeight: 'bold' , color: 'white', backgroundColor: 'green' }}>
          ✅ Login successful! Redirecting...
        </Alert>
      </Snackbar>

      {/* ✅ Fullscreen Loader - Replaced with Loader Component */}
      {loading ? (
        <Loader /> 
      ) : (
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
          <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 500 }}>
            Login to your account
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2  }}>
            {/* Title for Email */}
            <Typography variant="subtitle1" sx={{ textAlign: 'left', mb: 1,  }}>Email </Typography>
            <TextField
              fullWidth
              placeholder="harmonix@gmail.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                mb: 3,
                input: { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2', // Border color when focused
                  },
                },
              }}
            />

            {/* Title for Password */}
            <Typography variant="subtitle1" sx={{ textAlign: 'left', mb: 1 }}>Password</Typography>
            <TextField
              fullWidth
              placeholder="Enter your password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                      {showPassword ? <VisibilityIcon sx={{ color: 'white',fontSize: '18px' }}/> : <VisibilityOffIcon sx={{ color: 'white',fontSize: '18px' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                input: { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2', // Border color when focused
                  },
                },
              }}
            />

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: 'left', mb: 2 }}>
              <RouterLink to="/forgot-password" style={{ color: '#1976d2', textDecoration: 'none', fontSize: '0.875rem' }}>
                Forgot Password?
              </RouterLink>
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, py: 1.2 }} disabled={loading}>
              Login now
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">Don't have an account? <RouterLink to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>Sign Up</RouterLink></Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default LoginForm;
