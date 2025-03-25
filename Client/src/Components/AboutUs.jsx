import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button
} from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <Box 
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh'
      }}
    >
      <Navbar />
      
      <Container 
        maxWidth="lg"
        sx={{
          py: 4,
          textAlign: 'center' // Center the text in the container
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 3,
            letterSpacing: '-1px',
          }}
        >
          Welcome to HarmoniX,
        </Typography>
        
        <Typography 
          variant="body1"
          sx={{ 
            mb: 4, 
            maxWidth: '2000px',
            lineHeight: 1.4,
            textAlign: 'left',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Roboto Mono, monospace' // Set font family to Roboto Mono
          }}
        >
          Developed by Merasic Entertainment, HarmoniX is a cutting-edge professional music collaboration platform designed to seamlessly connect artists, producers, engineers, and other music industry professionals. Whether you're just starting out or an established name in the industry, our mission is to provide you with the ideal space to bring your musical vision to life. HarmoniX empowers you to discover the perfect talent for your project—whether you need composers, sound engineers, vocalists, or mastering professionals—ensuring that you work with the right people to bring out the best in your music. Our platform facilitates easy collaboration, helping you to communicate effectively, share ideas, and refine your project from start to finish. With an intuitive interface and advanced tools, HarmoniX is designed to foster creativity, streamline workflows, and provide the support you need to create high-quality, impactful music. It’s not just about making music; it’s about making music together, effortlessly.
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              mt: 4,
              fontWeight: 'bold',
              textAlign: 'left',
              alignItems: 'center'
            }}
          >
            Global Connections
          </Typography>
          
          <Typography 
            variant="body1"
            sx={{ 
                mb: 4, 
                maxWidth: '2000px',
                lineHeight: 1.4,
                textAlign: 'left',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'Roboto Mono, monospace' // Set font family to Roboto Mono
            }}
          >
            With Merasic Entertainment's extensive network, our platform enables professionals to collaborate across borders, tapping into a diverse pool of talent from all corners of the globe. HarmoniX breaks down geographical barriers, creating a space where artists and professionals can connect and collaborate regardless of location, fostering a truly international creative environment. By providing easy access to previews of previous work, artists and clients can confidently select professionals who best align with their specific project needs, ensuring that the collaborators they choose have the expertise and style that matches their vision. This level of transparency and accessibility helps mitigate risks, empowering users to make informed decisions. In turn, this creates the best opportunity for their music to thrive, whether they are aiming for a regional hit or striving to reach a global audience. With HarmoniX, artists and professionals have the tools and connections they need to succeed in an ever-evolving global market, ensuring that every project has the highest potential to stand out and make an impact.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              fontWeight: 'bold',
              textAlign: 'left',
              alignItems: 'center'
            }}
          >
            Our Commitment
          </Typography>
          
          <Typography 
            variant="body1"
            sx={{ 
                mb: 4, 
            maxWidth: '2000px',
            lineHeight: 1.4,
            textAlign: 'left',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Roboto Mono, monospace' // Set font family to Roboto Mono
            }}
          >
            At HarmoniX, we’re committed to fostering a dynamic and inclusive environment where artists can truly thrive. Our platform is designed to empower artists to collaborate with the right professionals, giving them the tools and resources to bring their creative visions to life in a way that is efficient, streamlined, and fully tailored to their needs. By offering a wide range of talented professionals—each with their unique expertise—artists can select the best fit for their project, ensuring a seamless creative process from start to finish. With ongoing support from Merasic Entertainment, we’re constantly improving and expanding HarmoniX to stay ahead of the curve and meet the demands of the rapidly evolving music industry. We are dedicated to creating a space where innovation, collaboration, and creativity flourish, ensuring that every artist has the best opportunity to succeed in today’s competitive and ever-changing musical landscape.
          </Typography>
        </Box>
        
        <Typography 
          variant="body1"
          sx={{ 
            mb: 4, 
            maxWidth: '2000px',
            lineHeight: 1.4,
            textAlign: 'left',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Roboto Mono, monospace' // Set font family to Roboto Mono
          }}
        >
          Whether you're looking to produce your next hit or refine your sound, HarmoniX provides all the tools and connections you need to succeed. We are more than just a platform - we're a community of passionate music creators driven to make an impact in the world of music.
        </Typography>
        
        {/* Add the "Have Any Questions?" and Contact Us button in the same row */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Typography 
            variant="h3"
            sx={{
              color: 'rgba(255,255,255)', 
              mt: 5,
              mb: 5,
            }}
          >
            Have Any Questions?
          </Typography>
          
          <Button 
            variant="outlined"
            sx={{
                color: '#2196f3',
                borderColor: '#2196f3',
                borderRadius: '10px',
                fontSize: '1.2rem',  // Increase the font size
                padding: '12px 24px',  // Increase the padding for bigger button
                mt: 5,
                mb: 5,
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderColor: '#2196f3'
              }
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutUs;
