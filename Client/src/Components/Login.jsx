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
  useMediaQuery
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';  
import axios from 'axios'; // Import axios for making API requests

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== password) { // Update this logic if needed
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        alert("Login successful!");
        window.location.href = "/dashboard"; // Redirect to dashboard after successful login
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert("Login failed! Please try again.");
    }
  };

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: "url('/src/assets/formbg.png') center/cover no-repeat",
        backgroundSize: '105%',
        overflow: 'hidden',
        position: 'fixed',
      }}
    >
      {/* Logo */}
      <Box sx={{
        position: 'absolute',
        top: isSmallScreen ? 20 : -80,
        left: isSmallScreen ? 20 : 0,
        }}>
        <img
          src="/src/assets/logo.png"
          alt="HarmoniX Logo"
          style={{
            width: isSmallScreen ? '30vw' : '15vw',
            maxWidth: '270px',
            height: 'auto',
          }}
        />
      </Box>

      <Paper
        elevation={3}
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%', lg: '410px' },
          p: { xs: 3, sm: 4 },
          borderRadius: 6,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <Typography 
          variant={isSmallScreen ? 'h6' : 'h5'} 
          align="center" 
          sx={{ mb: 3, fontWeight: 500, color: 'white' ,mt: 10}}
        >
          Login to your account
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, color: 'white' }}>Email</Typography>
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
              input: { color: 'white' }, // White text inside the field
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' }, // White border
                '&:hover fieldset': { borderColor: 'white' }, // White border on hover
                '&.Mui-focused fieldset': { borderColor: 'white' }, // White border when focused
              },
              '& .MuiInputLabel-root': { color: 'white' }, // Label color
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' }, // Label color when focused
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'white' }}>Password</Typography>
            <Link href="#" underline="none" color="primary" variant="body2">
              Forgot ?
            </Link>
          </Box>
          
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
            sx={{
              mb: 3,
              input: { color: 'white' }, // White text inside the field
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' }, // White border
                '&:hover fieldset': { borderColor: 'white' }, // White border on hover
                '&.Mui-focused fieldset': { borderColor: 'white' }, // White border when focused
              },
              '& .MuiInputLabel-root': { color: 'white' }, // Label color
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' }, // Label color when focused
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 3,
              py: 1.2,
              textTransform: 'none',
              borderRadius: 1,
              backgroundColor: '#1976d2',
            }}
          >
            Login now
          </Button>
          
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="body2" component="span" sx={{ mr: 1 }}>
              Don't Have An Account ?
            </Typography>
            <Link 
              component={RouterLink} 
              to="/register" 
              underline="none" 
              color="primary" 
              variant="body2"
            >
              Sign Up
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
