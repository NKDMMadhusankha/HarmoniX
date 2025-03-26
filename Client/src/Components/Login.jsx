import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  InputAdornment, 
  IconButton, 
  Link,
  useMediaQuery,
  Alert
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';  // ✅ Import useNavigate
import axios from 'axios';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();  // ✅ Initialize navigate

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem('authToken', response.data.token);
      console.log('Login success:', response.data);

      // ✅ Navigate to Home after successful login
      navigate('/home');

    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      setError('Invalid email or password');
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
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%', lg: '410px' },
          p: 4,
          borderRadius: 6,
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 500 }}>
          Login to your account
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            placeholder="harmonix@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 3, input: { color: 'white' } }}
          />

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
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3, input: { color: 'white' } }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, py: 1.2 }}>
            Login now
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" component="span">Don't have an account?</Typography>
            <Link component={RouterLink} to="/register" sx={{ ml: 1 }}>Sign Up</Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
