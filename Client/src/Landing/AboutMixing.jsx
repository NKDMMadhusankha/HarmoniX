import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import styled from '@emotion/styled';

// Import Navbar and Footer components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

// Import assets (you'll need to update these with your actual image paths)
import mixingEngineer from '../assets/engineer.png';
import eqProcessing from '../assets/Boombox-bro.png';
import mixingConsole from '../assets/Karaoke-bro.png';
import studioMonitors from '../assets/Playing Music-bro.png';

// Magnetic component that wraps children
const MagneticElement = ({ children }) => {
  return (
    <Box sx={{ display: 'inline-block' }}>
      {children}
    </Box>
  );
};

// Text reveal animation for headings
const TextReveal = ({ children, delay = 0 }) => {
  const text = children.split('');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  return (
    <motion.div
      style={{ display: 'flex', overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {text.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Liquid button effect
const LiquidButton = styled(Box)`
  position: relative;
  padding: 16px 32px;
  background: linear-gradient(135deg, #3a9bdc 0%, #4a5bdc 100%);
  border-radius: 50px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #4a5bdc 0%, #3a9bdc 100%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(58, 155, 220, 0.5);
    
    &:before {
      opacity: 1;
    }
  }
`;

// Image wrapper with advanced hover effects
const EnhancedImage = ({ src, alt, index }) => {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: false, amount: 0.3 });
  
  const floatingAnimation = {
    animate: {
      y: [0, -30, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Different animation variations based on index
  const variants = [
    {
      hidden: { scale: 0.8, rotate: -5, opacity: 0 },
      visible: { 
        scale: 1, 
        rotate: 0, 
        opacity: 1, 
        transition: { 
          duration: 0.8, 
          ease: "easeOut",
          delay: index * 0.2 
        } 
      }
    },
    {
      hidden: { scale: 1.2, opacity: 0, filter: "blur(10px)" },
      visible: { scale: 1, opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
    },
    {
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.8, type: "spring", stiffness: 50 } },
    },
    {
      hidden: { x: -100, opacity: 0, rotate: -10 },
      visible: { x: 0, opacity: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }
  ];
  
  const variantToUse = variants[index % variants.length];
  
  return (
    <motion.div
      ref={imageRef}
      initial="hidden"
      animate={isInView ? ["visible", "animate"] : "hidden"}
      variants={{
        ...variantToUse,
        ...floatingAnimation
      }}
      style={{ position: 'relative', perspective: '1000px' }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          borderRadius: '12px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(58, 155, 220, 0.4) 0%, rgba(74, 91, 220, 0.1) 100%)',
          opacity: 0,
        }}
      />
    </motion.div>
  );
};

// Scroll-triggered section component
const ScrollSection = ({ children, direction = 'up', delay = 0, duration = 0.8 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const directionVariants = {
    up: {
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    down: {
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    left: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    },
    right: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    },
    scale: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1 }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={directionVariants[direction]}
      transition={{ duration: duration, delay: delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  );
};

// 3D Card component
const Card3D = ({ children }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation values (limited to a subtle effect)
    const rotateXValue = -((y - centerY) / centerY) * 7;
    const rotateYValue = ((x - centerX) / centerX) * 7;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </motion.div>
  );
};

// Main page component
const MixingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add smooth scrolling to the body
    document.body.style.scrollBehavior = 'smooth';
    
    return () => {
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);

  // Scroll progress indicator
  const progressBarScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <Box ref={mainRef} sx={{ bgcolor: '#000', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      
      {/* Progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #3a9bdc, #4a5bdc)',
          transformOrigin: '0%',
          scaleX: progressBarScaleX,
          zIndex: 9999,
        }}
      />
      
      <Container maxWidth={false} sx={{ 
        py: 8,
        px: isSmallScreen ? 2 : isMobile ? 4 : 8,
        maxWidth: '1300px',
        mx: 'auto'
      }}>
        {/* What is Mixing Section */}
        <Box my={isMobile ? 6 : 8}>
          <ScrollSection direction="up">
            <Grid container alignItems="center" spacing={isMobile ? 4 : 6} mb={isMobile ? 4 : 6}>
              {isMobile ? (
                <>
                  <Grid item xs={12}>
                    <EnhancedImage 
                      src={mixingEngineer} 
                      alt="Mixing engineer at console"
                      index={0}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ScrollSection direction="right" delay={0.2}>
                      <Typography variant={isSmallScreen ? "h6" : "h5"} mb={2} color="#3a9bdc">
                        <TextReveal>What Is Mixing?</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7 }}>
                        Mixing is the art and science of balancing all the individual elements in a musical recording to create a cohesive, polished sound. A mixing engineer takes the raw recorded tracks and shapes them into a harmonious whole through careful adjustments of levels, panning, EQ, compression, and effects. The goal is to ensure that each element can be heard clearly while working together to serve the emotional intent of the song.<br/><br/>Quality mixing requires not only technical expertise but also a deep understanding of musical arrangement and a well-trained ear. It's where technical precision meets artistic expression—transforming a collection of separate recordings into a professional-sounding track that connects with listeners across different playback systems.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={6}>
                    <ScrollSection direction="right" delay={0.2}>
                      <Typography variant="h5" mb={2} color="#3a9bdc">
                        <TextReveal>What Is Mixing?</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                        Mixing is the art and science of balancing all the individual elements in a musical recording to create a cohesive, polished sound. A mixing engineer takes the raw recorded tracks and shapes them into a harmonious whole through careful adjustments of levels, panning, EQ, compression, and effects. The goal is to ensure that each element can be heard clearly while working together to serve the emotional intent of the song.<br/><br/>Quality mixing requires not only technical expertise but also a deep understanding of musical arrangement and a well-trained ear. It's where technical precision meets artistic expression—transforming a collection of separate recordings into a professional-sounding track that connects with listeners across different playback systems.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                  <Grid item md={6}>
                    <EnhancedImage 
                      src={mixingEngineer} 
                      alt="Mixing engineer at console"
                      index={0}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </ScrollSection>
        </Box>

        {/* Balance and Levels Section with 3D card effect */}
        <Box my={isMobile ? 10 : 16}>
          <ScrollSection direction="up">
            <Grid container alignItems="center" spacing={isMobile ? 4 : 6} mb={isMobile ? 4 : 6}>
              {isMobile ? (
                <>
                  <Grid item xs={12}>
                    <ScrollSection direction="left" delay={0.3}>
                      <Typography variant={isSmallScreen ? "h6" : "h5"} mb={2} color="#3a9bdc">
                        <TextReveal>1. Balance and Levels</TextReveal>
                      </Typography>
                    </ScrollSection>
                    <Card3D>
                      <EnhancedImage 
                        src={mixingConsole} 
                        alt="Mixing console faders"
                        index={1}
                      />
                    </Card3D>
                    <ScrollSection direction="right" delay={0.4}>
                      <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, mt: 2 }}>
                        The foundation of any good mix starts with setting the right volume levels for each track. This creates the basic balance between all elements of the song.<br/><br/>
                        • Volume balancing determines which elements stand out and which ones support from the background.<br/><br/>
                        • Engineers set relative levels between instruments like drums, bass, guitars, vocals, and other elements.<br/><br/>
                        • They create a hierarchy where lead elements (usually vocals) are prominent, while supporting elements are balanced underneath.<br/><br/>
                        • Automation is often used to adjust levels throughout different sections of the song, creating dynamic movement.<br/><br/>
                        This stage is crucial because even the most sophisticated processing can't fix a fundamentally poor balance of levels.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={6} order={{ md: 2 }}>
                    <ScrollSection direction="left" delay={0.3}>
                      <Typography variant="h5" mb={2} color="#3a9bdc">
                        <TextReveal>1. Balance and Levels</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                        The foundation of any good mix starts with setting the right volume levels for each track. This creates the basic balance between all elements of the song.<br/><br/>
                        • Volume balancing determines which elements stand out and which ones support from the background.<br/><br/>
                        • Engineers set relative levels between instruments like drums, bass, guitars, vocals, and other elements.<br/><br/>
                        • They create a hierarchy where lead elements (usually vocals) are prominent, while supporting elements are balanced underneath.<br/><br/>
                        • Automation is often used to adjust levels throughout different sections of the song, creating dynamic movement.<br/><br/>
                        This stage is crucial because even the most sophisticated processing can't fix a fundamentally poor balance of levels.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                  <Grid item md={6} order={{ md: 1 }}>
                    <Card3D>
                      <EnhancedImage 
                        src={mixingConsole} 
                        alt="Mixing console faders"
                        index={1}
                      />
                    </Card3D>
                  </Grid>
                </>
              )}
            </Grid>
          </ScrollSection>
        </Box>

        {/* EQ and Frequency Management Section */}
        <Box my={isMobile ? 10 : 16}>
          <ScrollSection direction="scale">
            <Grid container alignItems="center" spacing={isMobile ? 4 : 6} mb={isMobile ? 4 : 6}>
              {isMobile ? (
                <>
                  <Grid item xs={12}>
                    <ScrollSection direction="right" delay={0.3}>
                      <Typography variant={isSmallScreen ? "h6" : "h5"} mb={2} color="#3a9bdc">
                        <TextReveal>2. EQ and Frequency Management</TextReveal>
                      </Typography>
                    </ScrollSection>
                    <EnhancedImage 
                      src={eqProcessing} 
                      alt="EQ and frequency processing"
                      index={2}
                    />
                    <ScrollSection direction="left" delay={0.4}>
                      <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, mt: 2 }}>
                        Equalization (EQ) is one of the most powerful tools in mixing. It shapes the tonal balance of each element and helps them fit together in the frequency spectrum.<br/><br/>
                        • Engineers use EQ to cut unwanted frequencies that cause muddiness or harshness.<br/><br/>
                        • They boost frequencies that enhance the natural character of instruments.<br/><br/>
                        • Creating "frequency space" for each element helps prevent instruments from masking one another.<br/><br/>
                        • Strategic EQ decisions ensure that bass instruments don't conflict, midrange elements have clarity, and high-frequency content adds sparkle without harshness.<br/><br/>
                        Proper EQ is like sonic sculpting—carving out space for each element to shine while contributing to a cohesive whole.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={6}>
                    <ScrollSection direction="up" delay={0.3}>
                      <Typography variant="h5" mb={2} color="#3a9bdc">
                        <TextReveal>2. EQ and Frequency Management</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                        Equalization (EQ) is one of the most powerful tools in mixing. It shapes the tonal balance of each element and helps them fit together in the frequency spectrum.<br/><br/>
                        • Engineers use EQ to cut unwanted frequencies that cause muddiness or harshness.<br/><br/>
                        • They boost frequencies that enhance the natural character of instruments.<br/><br/>
                        • Creating "frequency space" for each element helps prevent instruments from masking one another.<br/><br/>
                        • Strategic EQ decisions ensure that bass instruments don't conflict, midrange elements have clarity, and high-frequency content adds sparkle without harshness.<br/><br/>
                        Proper EQ is like sonic sculpting—carving out space for each element to shine while contributing to a cohesive whole.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                  <Grid item md={6}>
                    <EnhancedImage 
                      src={eqProcessing} 
                      alt="EQ and frequency processing"
                      index={2}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </ScrollSection>
        </Box>

        {/* Spatial Processing Section */}
        <Box my={isMobile ? 10 : 16}>
          <ScrollSection direction="up">
            <Grid container alignItems="center" spacing={isMobile ? 4 : 6}>
              {isMobile ? (
                <>
                  <Grid item xs={12}>
                    <ScrollSection direction="left" delay={0.3}>
                      <Typography variant={isSmallScreen ? "h6" : "h5"} mb={2} color="#3a9bdc">
                        <TextReveal>3. Spatial Processing and Effects</TextReveal>
                      </Typography>
                    </ScrollSection>
                    <EnhancedImage 
                      src={studioMonitors} 
                      alt="Studio monitors and spatial processing"
                      index={3}
                    />
                    <ScrollSection direction="right" delay={0.4}>
                      <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, mt: 2 }}>
                        Spatial processing creates the three-dimensional soundstage that gives a mix depth, width, and height. It's what makes the music feel like it exists in a real space.<br/><br/>
                        • Panning positions sounds left to right in the stereo field, creating width and separation.<br/><br/>
                        • Reverb creates the sense of environment—whether that's a small room, concert hall, or abstract space.<br/><br/>
                        • Delay effects add dimension, echo, and rhythmic elements that enhance the groove.<br/><br/>
                        • Modulation effects like chorus, flanger, and phaser add movement and texture.<br/><br/>
                        The judicious use of these tools creates an immersive sonic landscape that draws listeners in and gives the mix a professional polish that turns a flat recording into a captivating experience.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={6} order={{ md: 2 }}>
                    <ScrollSection direction="right" delay={0.3}>
                      <Typography variant="h5" mb={2} color="#3a9bdc">
                        <TextReveal>3. Spatial Processing and Effects</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                        Spatial processing creates the three-dimensional soundstage that gives a mix depth, width, and height. It's what makes the music feel like it exists in a real space.<br/><br/>
                        • Panning positions sounds left to right in the stereo field, creating width and separation.<br/><br/>
                        • Reverb creates the sense of environment—whether that's a small room, concert hall, or abstract space.<br/><br/>
                        • Delay effects add dimension, echo, and rhythmic elements that enhance the groove.<br/><br/>
                        • Modulation effects like chorus, flanger, and phaser add movement and texture.<br/><br/>
                        The judicious use of these tools creates an immersive sonic landscape that draws listeners in and gives the mix a professional polish that turns a flat recording into a captivating experience.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                  <Grid item md={6} order={{ md: 1 }}>
                    <EnhancedImage 
                      src={studioMonitors} 
                      alt="Studio monitors and spatial processing"
                      index={3}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </ScrollSection>
        </Box>
        
        {/* Call to action section with floating elements */}
        <Box my={isMobile ? 10 : 16} position="relative" py={isMobile ? 6 : 8}>
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
              zIndex: 0
            }}
          >
            {[...Array(isMobile ? 10 : 20)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: Math.random() * (isMobile ? 50 : 100) + 50,
                  height: Math.random() * (isMobile ? 50 : 100) + 50,
                  borderRadius: '50%',
                  background: `rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, 0.1)`,
                  filter: 'blur(40px)',
                  mixBlendMode: 'difference',
                  x: Math.random() * 100 - 50 + '%',
                  y: Math.random() * 100 - 50 + '%',
                }}
                animate={{
                  x: [Math.random() * 100 - 50 + '%', Math.random() * 100 - 50 + '%'],
                  y: [Math.random() * 100 - 50 + '%', Math.random() * 100 - 50 + '%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: Math.random() * 10 + 10,
                }}
              />
            ))}
          </Box>
          
          <Box position="relative" zIndex={1} textAlign="center">
            <ScrollSection direction="scale">
              <Typography variant={isMobile ? (isSmallScreen ? "h4" : "h3") : "h3"} mb={4} >
                <TextReveal>Ready to elevate your mixes to professional quality?</TextReveal>
              </Typography>
              
              <Typography variant="body1" mb={6} sx={{ 
                maxWidth: '700px', 
                mx: 'auto',
                fontSize: isSmallScreen ? '1rem' : '1.1rem',
                px: isMobile ? 2 : 0
              }}>
                From balancing levels and shaping frequencies to creating immersive soundscapes, mixing is where technical expertise meets creative expression. Learn how to transform your raw recordings into polished, professional tracks.
              </Typography>
              
              <MagneticElement>
                <LiquidButton sx={{ 
                  display: 'inline-block',
                  padding: isSmallScreen ? '12px 24px' : '16px 32px'
                }}>
                  <Typography variant="button" sx={{ 
                    position: 'relative', 
                    zIndex: 1,
                    fontSize: isSmallScreen ? '0.875rem' : '1rem'
                  }}>
                    Start Mixing Now
                  </Typography>
                </LiquidButton>
              </MagneticElement>
            </ScrollSection>
          </Box>
        </Box>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default MixingPage;