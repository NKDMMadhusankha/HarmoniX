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
import { Link as RouterLink } from 'react-router-dom';  // Import Link from react-router-dom

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
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
        backgroundSize: '105%', // Fix for Img
        overflow: 'hidden',
        position: 'fixed',
      }}
    >
     {/* Logo Image */}
     <Box sx={{
        position: 'absolute',
        top: isSmallScreen ? 20 : -80,
        left: isSmallScreen ? 20 : 0,
        }}>
    <img
        src="/src/assets/logo.png"
        alt="HarmoniX Logo"
        style={{
        width: isSmallScreen ? '30vw' : '15vw', // Adjust the width based on screen size
        maxWidth: '270px', // Optional: maximum width for larger screens
        height: 'auto', // Maintain the aspect ratio
        }}
    />
    </Box>
      <Paper
        elevation={3}
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%', lg: '410px' },
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: 'white',
        }}
      >
        <Typography 
          variant={isSmallScreen ? 'h6' : 'h5'} 
          align="center" 
          sx={{ mb: 3, fontWeight: 500 }}
        >
          Login to your account
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Email</Typography>
          <TextField
            fullWidth
            placeholder="harmonix@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 3, borderRadius: 1 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2">Password</Typography>
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
            sx={{ mb: 3, borderRadius: 1 }}
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
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" component="span" sx={{ mr: 1 }}>
              Don't Have An Account ?
            </Typography>
            <Link 
              component={RouterLink} // Link from react-router-dom for internal routing
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
