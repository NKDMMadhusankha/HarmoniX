import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button
} from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  // For typing effect
  const [text, setText] = useState('');
  const fullText = 'Have Any Questions ?';
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  // For scroll animations
  const [isVisible, setIsVisible] = useState({
    welcome: false,
    description: false,
    globalConnections: false,
    commitment: false,
    closing: false,
    contactSection: false
  });

  // Create refs for each section
  const welcomeRef = useRef(null);
  const descriptionRef = useRef(null);
  const globalConnectionsRef = useRef(null);
  const commitmentRef = useRef(null);
  const closingRef = useRef(null);
  const contactSectionRef = useRef(null);

  // Handle typing effect
  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (text.length < fullText.length) {
          setText(fullText.slice(0, text.length + 1));
        } else {
          // Start deleting after a pause
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(fullText.slice(0, text.length - 1));
        } else {
          // Reset to typing forward
          setIsDeleting(false);
        }
      }
    };

    const typingTimer = setTimeout(handleTyping, isDeleting ? typingSpeed / 2 : typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [text, isDeleting, typingSpeed]);

  // Set up Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === welcomeRef.current) {
            setIsVisible(prev => ({ ...prev, welcome: true }));
          } else if (entry.target === descriptionRef.current) {
            setIsVisible(prev => ({ ...prev, description: true }));
          } else if (entry.target === globalConnectionsRef.current) {
            setIsVisible(prev => ({ ...prev, globalConnections: true }));
          } else if (entry.target === commitmentRef.current) {
            setIsVisible(prev => ({ ...prev, commitment: true }));
          } else if (entry.target === closingRef.current) {
            setIsVisible(prev => ({ ...prev, closing: true }));
          } else if (entry.target === contactSectionRef.current) {
            setIsVisible(prev => ({ ...prev, contactSection: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (welcomeRef.current) observer.observe(welcomeRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    if (globalConnectionsRef.current) observer.observe(globalConnectionsRef.current);
    if (commitmentRef.current) observer.observe(commitmentRef.current);
    if (closingRef.current) observer.observe(closingRef.current);
    if (contactSectionRef.current) observer.observe(contactSectionRef.current);

    return () => {
      if (welcomeRef.current) observer.unobserve(welcomeRef.current);
      if (descriptionRef.current) observer.unobserve(descriptionRef.current);
      if (globalConnectionsRef.current) observer.unobserve(globalConnectionsRef.current);
      if (commitmentRef.current) observer.unobserve(commitmentRef.current);
      if (closingRef.current) observer.unobserve(closingRef.current);
      if (contactSectionRef.current) observer.unobserve(contactSectionRef.current);
    };
  }, []);

  return (
    <Box 
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
        overflow: 'hidden' // Prevent horizontal scrollbar during animations
      }}
    >
      <Navbar />
      
      <Container 
        maxWidth="lg"
        sx={{
          py: 5,
          textAlign: 'center'
        }}
      >
        {/* Welcome Section with Fade and Slide Up Animation */}
        <Box 
          ref={welcomeRef}
          sx={{
            opacity: isVisible.welcome ? 1 : 0,
            transform: isVisible.welcome ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              letterSpacing: '-1px',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: isVisible.welcome ? '100%' : '0%',
                height: '3px',
                bottom: '-10px',
                left: '0',
                backgroundColor: '#2196f3',
                transition: 'width 1.2s ease-in-out',
              }
            }}
          >
            Welcome to HarmoniX,
          </Typography>
        </Box>
        
        {/* Main Description with Staggered Fade In */}
        <Box 
          ref={descriptionRef}
          sx={{ 
            opacity: isVisible.description ? 1 : 0,
            transform: isVisible.description ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            mb: 4
          }}
        >
          <Typography 
            variant="body1"
            sx={{ 
              mb: 4, 
              maxWidth: '2000px',
              lineHeight: 1.4,
              textAlign: 'left',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Roboto Mono, monospace'
            }}
          >
            Developed by Merasic Entertainment, HarmoniX is a cutting-edge professional music collaboration platform designed to seamlessly connect artists, producers, engineers, and other music industry professionals. Whether you're just starting out or an established name in the industry, our mission is to provide you with the ideal space to bring your musical vision to life. HarmoniX empowers you to discover the perfect talent for your project—whether you need composers, sound engineers, vocalists, or mastering professionals—ensuring that you work with the right people to bring out the best in your music. Our platform facilitates easy collaboration, helping you to communicate effectively, share ideas, and refine your project from start to finish. With an intuitive interface and advanced tools, HarmoniX is designed to foster creativity, streamline workflows, and provide the support you need to create high-quality, impactful music. It's not just about making music; it's about making music together, effortlessly.
          </Typography>
        </Box>
        
        {/* Global Connections Section with Slide In from Left */}
        <Box 
          ref={globalConnectionsRef}
          sx={{ 
            mb: 4,
            opacity: isVisible.globalConnections ? 1 : 0,
            transform: isVisible.globalConnections ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              mt: 4,
              fontWeight: 'bold',
              textAlign: 'left',
              alignItems: 'center',
              position: 'relative',
              display: 'inline-block',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: isVisible.globalConnections ? '30px' : '0px',
                height: '3px',
                top: '50%',
                left: '-40px',
                backgroundColor: '#2196f3',
                transition: 'width 0.8s ease-in-out 0.4s',
              }
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
              fontFamily: 'Roboto Mono, monospace'
            }}
          >
            With Merasic Entertainment's extensive network, our platform enables professionals to collaborate across borders, tapping into a diverse pool of talent from all corners of the globe. HarmoniX breaks down geographical barriers, creating a space where artists and professionals can connect and collaborate regardless of location, fostering a truly international creative environment. By providing easy access to previews of previous work, artists and clients can confidently select professionals who best align with their specific project needs, ensuring that the collaborators they choose have the expertise and style that matches their vision. This level of transparency and accessibility helps mitigate risks, empowering users to make informed decisions. In turn, this creates the best opportunity for their music to thrive, whether they are aiming for a regional hit or striving to reach a global audience. With HarmoniX, artists and professionals have the tools and connections they need to succeed in an ever-evolving global market, ensuring that every project has the highest potential to stand out and make an impact.
          </Typography>
        </Box>
        
        {/* Commitment Section with Slide In from Right */}
        <Box 
          ref={commitmentRef}
          sx={{ 
            mb: 4,
            opacity: isVisible.commitment ? 1 : 0,
            transform: isVisible.commitment ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              fontWeight: 'bold',
              textAlign: 'left',
              alignItems: 'center',
              position: 'relative',
              display: 'inline-block',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: isVisible.commitment ? '30px' : '0px',
                height: '3px',
                top: '50%',
                left: '-40px',
                backgroundColor: '#2196f3',
                transition: 'width 0.8s ease-in-out 0.4s',
              }
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
              fontFamily: 'Roboto Mono, monospace'
            }}
          >
            At HarmoniX, we're committed to fostering a dynamic and inclusive environment where artists can truly thrive. Our platform is designed to empower artists to collaborate with the right professionals, giving them the tools and resources to bring their creative visions to life in a way that is efficient, streamlined, and fully tailored to their needs. By offering a wide range of talented professionals—each with their unique expertise—artists can select the best fit for their project, ensuring a seamless creative process from start to finish. With ongoing support from Merasic Entertainment, we're constantly improving and expanding HarmoniX to stay ahead of the curve and meet the demands of the rapidly evolving music industry. We are dedicated to creating a space where innovation, collaboration, and creativity flourish, ensuring that every artist has the best opportunity to succeed in today's competitive and ever-changing musical landscape.
          </Typography>
        </Box>
        
        {/* Closing Statement with Fade In */}
        <Box 
          ref={closingRef}
          sx={{ 
            opacity: isVisible.closing ? 1 : 0,
            transform: isVisible.closing ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Typography 
            variant="body1"
            sx={{ 
              mb: 4, 
              maxWidth: '2000px',
              lineHeight: 1.4,
              textAlign: 'left',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Roboto Mono, monospace'
            }}
          >
            Whether you're looking to produce your next hit or refine your sound, HarmoniX provides all the tools and connections you need to succeed. We are more than just a platform - we're a community of passionate music creators driven to make an impact in the world of music.
          </Typography>
        </Box>
        
        {/* Questions and Contact Us section with animations */}
        <Box 
          ref={contactSectionRef}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            opacity: isVisible.contactSection ? 1 : 0,
            transition: 'opacity 1s ease 0.3s',
          }}
        >
          <Typography 
            variant="h3"
            sx={{
              color: 'rgba(255,255,255)', 
              mt: 5,
              mb: 5,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                bottom: '-10px',
                left: 0,
                backgroundColor: '#2196f3',
                transform: isVisible.contactSection ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.2s ease-in-out 0.5s',
              }
            }}
          >
            {text}
            <span style={{ 
              borderLeft: '2px solid white', 
              animation: 'blink 0.7s infinite' 
            }}>
              &nbsp;
            </span>
          </Typography>
          
          <Button 
            variant="outlined"
            sx={{
              color: '#2196f3',
              borderColor: '#2196f3',
              borderRadius: '10px',
              fontSize: '1.2rem',
              padding: '12px 24px',
              mt: 5,
              mb: 5,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderColor: '#2196f3',
                transform: 'scale(1.05)',
                boxShadow: '0 0 15px rgba(33, 150, 243, 0.5)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '0',
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.2), transparent)',
                transition: 'left 0.7s ease',
              },
              '&:hover::before': {
                left: '100%',
              }
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(33, 150, 243, 0); }
          100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
        }

        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }

        /* Add smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
      <Footer />
    </Box>
  );
};

export default AboutUs;