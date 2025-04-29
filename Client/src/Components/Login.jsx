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
  Alert,
  styled
} from '@mui/material';
import { motion } from "framer-motion";  
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import Loader from './Loader';  // Importing the Loader component

// Add the background styling from the first code
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

const BackgroundEffect = styled(Box)({
  position: 'absolute',
  width: '500px',
  height: '500px',
  background: 'radial-gradient(circle, #0F3754, rgba(0, 0, 0, 0))',
  borderRadius: '50%',
  filter: 'blur(40px)',
  opacity: 0.7,
  animation: 'float 8s infinite ease-in-out',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) scale(1)',
    },
    '50%': {
      transform: 'translateY(-30px) scale(1.1)',
    },
  },
});

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
      // 1. Try regular user login
      let response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'user');
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
      return;
    } catch (userError) {
      // 2. Try musician login
      try {
        let musicianResponse = await axios.post('http://localhost:5000/api/musician/login', { email, password });
        localStorage.setItem('authToken', musicianResponse.data.token);
        localStorage.setItem('token', musicianResponse.data.token);
        localStorage.setItem('userType', 'musician');
        localStorage.setItem('userData', JSON.stringify(musicianResponse.data.musician));
        setSuccess(true);
        let dashboardRoute = '/musician/dashboard';
        const musicianRole = musicianResponse.data.musician.role;
        switch (musicianRole) {
          case 'Music Producer': dashboardRoute = '/musicpro/dashboard'; break;
          case 'Mixing Engineer': dashboardRoute = '/mixing/dashboard'; break;
          case 'Mastering Engineer': dashboardRoute = '/mastering/dashboard'; break;
          case 'Lyricist': dashboardRoute = '/lyricist/dashboard'; break;
        }
        setTimeout(() => {
          navigate(dashboardRoute);
        }, 2000);
        return;
      } catch (musicianError) {
        // 3. Try studio login
        try {
          let studioResponse = await axios.post('http://localhost:5000/api/studio/login', { email, password });
          localStorage.setItem('authToken', studioResponse.data.token);
          localStorage.setItem('token', studioResponse.data.token);
          localStorage.setItem('userType', 'studio');
          localStorage.setItem('userData', JSON.stringify(studioResponse.data.studio));
          setSuccess(true);
          setTimeout(() => {
            navigate('/studio/dashboard');
          }, 2000);
          return;
        } catch (studioError) {
          let errorMessage = 'Invalid email or password';
          if (studioError.response && studioError.response.data && studioError.response.data.message) {
            errorMessage = studioError.response.data.message;
          }
          setError(errorMessage);
          setLoading(false);
        }
      }
    }
  };

  return (
    <GradientBackground>
      {/* Background Effects */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <BackgroundEffect sx={{ top: -100, right: -100, opacity: 0.7 }} />
        <BackgroundEffect sx={{ bottom: -150, left: -150, animationDelay: '2s', opacity: 0.7 }} />
        <BackgroundEffect sx={{ top: '50%', left: '50%', marginLeft: -250, marginTop: -250, animationDelay: '4s', opacity: 0.7 }} />
      </Box>

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
              <Typography variant="body2">Don't have an account ? <RouterLink to="/catogary" style={{ color: '#1976d2', textDecoration: 'none' }}>Sign Up</RouterLink></Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </GradientBackground>
  );
};

export default LoginForm;