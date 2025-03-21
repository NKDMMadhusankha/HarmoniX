import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton, 
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter'; // Import Typewriter directly


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('', fullname, email, password)
    .then(result => console.log(result))
    .catch(err => console.log(err))
  };

  return (
    <Box sx={{ 
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'fixed', // Prevents scrolling
      top: 0,
      left: 0
    }}>
      {/* Left side with gradient */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: '50%',
          background: 'linear-gradient(to bottom, #000000, #0a192f)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem',
          '@media (max-width: 900px)': {
            display: 'none'
          }
        }}
      >
        <Typography 
          variant="h4" 
          component={motion.h1}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          fontWeight="bold"
        >
          HarmoniX
        </Typography>

        {/* Inline Animated Typography */}
        <Typography
          variant="h2"
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          sx={{ mb: 24, fontWeight: 300 }}
        >
          <Typewriter
            words={['Join Now And Start\nYour Music Journey\nWith Us !']}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={50}
            delaySpeed={3000}
          />
        </Typography>
      </Box>
      
      {/* Right side with form */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: { xs: 2, sm: 0 }
            }}
          >
            <Typography 
              component={motion.h2}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              variant="h5" 
              sx={{ mb: 1, fontWeight: 600 , color: 'black', fontSize: '2rem', fontFamily: 'Poppins' }}
            >
              Create an account
            </Typography>
            
            {/* Full Name Field */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Box>
            
            {/* Email Field */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                placeholder="harmonix@gmail.com"
                value={formData.email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Box>
            
            {/* Password Field */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Box>
            
            {/* Confirm Password Field */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Box>
            
            {/* Create Account Button */}
            <Button
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                py: 1.5,
                textTransform: 'none',
                borderRadius: 1,
                bgcolor: '#1976d2'
              }}
            >
              Create account
            </Button>
            
            {/* Google Sign-In Button */}
            <Button
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{
                mt: 1.5,
                py: 1.5,
                textTransform: 'none',
                borderRadius: 1,
                bgcolor: '#e3f2fd',
                borderColor: '#e3f2fd',
                color: '#1976d2',
                '&:hover': {
                  bgcolor: '#d0e7f7',
                  borderColor: '#d0e7f7'
                }
              }}
            >
              Continue with Google
            </Button>
            
            {/* Login Link */}
            <Typography 
              variant="body2" 
              align="center"
              sx={{ mt: 2, color: 'black' }}
            >
              Already Have An Account? <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>Log in</Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Register;
