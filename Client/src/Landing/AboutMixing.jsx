import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  Paper
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TuneIcon from '@mui/icons-material/Tune';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

// Import Navbar and Footer components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

// Import assets (you'll need to update these with your actual image paths)
import mixingEngineer from '../assets/engineer.png';
import balancingTracks from '../assets/dance.png';
import mixingEquipment from '../assets/eq.png';
import effectsProcessing from '../assets/fly.png';

// Parallax effect for background elements
const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -900]);
  
  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 50 + 20)}, ${Math.floor(Math.random() * 50 + 20)}, ${Math.floor(Math.random() * 100 + 50)}, 0.15) 0%, rgba(0,0,0,0) 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            y: i % 3 === 0 ? y1 : i % 3 === 1 ? y2 : y3,
          }}
        />
      ))}
    </Box>
  );
};

// Glow text effect for headings
const GlowText = ({ children, color = "#8254e5", delay = 0, fontSize = "inherit" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={isInView ? { 
        opacity: 1, 
        filter: "blur(0px)",
        transition: { 
          duration: 1.2,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      } : {}}
    >
      <Typography 
        component="span" 
        sx={{ 
          fontSize: fontSize,
          color: color,
          textShadow: `0 0 10px ${color}40, 0 0 20px ${color}30, 0 0 30px ${color}20`,
          display: "inline-block",
        }}
      >
        {children}
      </Typography>
    </motion.div>
  );
};

// Split reveal animation for text
const SplitReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Split text into words
  const words = children.split(" ");
  
  return (
    <motion.div
      ref={ref}
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ 
            display: 'inline-block',
            marginRight: '0.25em',
            overflow: 'hidden'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.7,
              delay: delay + (i * 0.05),
              ease: [0.25, 0.1, 0.25, 1.0]
            }
          } : {}}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Prismatic button effect
const PrismaticButton = styled(motion.div)`
  position: relative;
  padding: 16px 32px;
  background: linear-gradient(135deg, #8254e5 0%, #a87dff 50%, #8254e5 100%);
  background-size: 200% 200%;
  border-radius: 50px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(130, 84, 229, 0.25);
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #8254e5, #a87dff, #8254e5);
    background-size: 400% 400%;
    border-radius: 50px;
    z-index: -1;
    animation: prismatic 6s ease infinite;
  }
  
  @keyframes prismatic {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

// Enhanced jumping text animation component with expanded effects
const JumpingText = ({ text, color = "#8254e5", delay = 0 }) => {
  const letters = text.split("");
  
  return (
    <Box component="span" sx={{ display: "inline-flex", mx: 1, position: "relative" }}>
      {letters.map((letter, index) => {
        // Create different animation patterns based on letter position
        const isEven = index % 2 === 0;
        const animationPattern = index % 3;
        
        return (
          <motion.span
            key={index}
            style={{ 
              display: "inline-block",
              color: color,
              textShadow: `0 0 10px ${color}40, 0 0 20px ${color}30, 0 0 30px ${color}20`,
              position: "relative"
            }}
            initial={{ y: 0, scale: 1, rotate: 0 }}
            animate={{ 
              y: animationPattern === 0 ? [0, -12, 0] : animationPattern === 1 ? [0, -8, 0] : [0, -15, 0],
              scale: [1, isEven ? 1.1 : 1.15, 1],
              rotate: [0, isEven ? 3 : -3, 0],
              transition: {
                duration: 2,
                ease: "easeInOut",
                delay: delay + index * 0.06,
                repeat: Infinity,
                repeatDelay: 3 + (index * 0.3)
              }
            }}
            whileHover={{
              scale: 1.3,
              rotate: isEven ? 10 : -10,
              color: '#ffffff',
              textShadow: `0 0 15px ${color}, 0 0 25px ${color}`,
              transition: { duration: 0.3 }
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </Box>
  );
};

// Image with reveal and perspective effect
const PerspectiveImage = ({ src, alt, index, delay = 0 }) => {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, amount: 0.2 });
  const [hover, setHover] = useState(false);
  
  // Different animation variations based on index
  const variants = [
    {
      hidden: { scale: 0.9, opacity: 0, rotateY: -15 },
      visible: {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        transition: {
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: delay
        }
      },
      hover: {
        scale: 1.03,
        rotateY: 5,
        boxShadow: "0px 30px 60px rgba(0,0,0,0.4)",
        transition: { duration: 0.5 }
      }
    },
    {
      hidden: { opacity: 0, y: 100, rotateX: 10 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 1,
          type: "spring",
          stiffness: 70,
          delay: delay
        }
      },
      hover: {
        scale: 1.05,
        rotateX: -5,
        boxShadow: "0px 30px 60px rgba(0,0,0,0.3)",
        transition: { duration: 0.5 }
      }
    },
    {
      hidden: { opacity: 0, x: -100, rotate: -5 },
      visible: {
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
          duration: 1,
          ease: "easeOut",
          delay: delay
        }
      },
      hover: {
        scale: 1.04,
        rotate: 2,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.3)",
        transition: { duration: 0.5 }
      }
    },
    {
      hidden: { scale: 1.1, opacity: 0, filter: "blur(10px)", rotate: 3 },
      visible: {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        rotate: 0,
        transition: {
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: delay
        }
      },
      hover: {
        scale: 1.05,
        rotate: -2,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.4)",
        transition: { duration: 0.5 }
      }
    }
  ];
  
  const variantToUse = variants[index % variants.length];
  
  return (
    <motion.div
      ref={imageRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      variants={variantToUse}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        borderRadius: '12px',
        overflow: 'hidden',
        maxWidth: '85%', // Reduced from 100%
        margin: '0 auto' // Center the image
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          display: 'block',
          transformStyle: 'preserve-3d'
        }}
      />
    </motion.div>
  );
};

// Reveal section with staggered children animation
const RevealSection = ({ children, direction = 'up', staggerChildren = 0.1, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay
      }
    }
  };
  
  const childVariants = {
    hidden: direction === 'up' 
      ? { y: 50, opacity: 0 } 
      : direction === 'down' 
        ? { y: -50, opacity: 0 }
        : direction === 'left'
          ? { x: 50, opacity: 0 }
          : direction === 'right'
            ? { x: -50, opacity: 0 }
            : { scale: 0.95, opacity: 0 },
    visible: {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {React.Children.map(children, child => (
        <motion.div variants={childVariants}>
          {child}
        </motion.div>
      ))}
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
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });
  
  // Create a smooth scale effect for the progress indicator
  const progressBarWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const progressBarOpacity = useTransform(smoothProgress, [0, 0.05, 0.1], [0, 0.5, 1]);
  
  // Add scrollToSection function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If section doesn't exist on this page, navigate to page with that section
      window.location.href = `./music/mixing`; // Changed to direct to mixing page
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add smooth scrolling to the body
    document.body.style.scrollBehavior = 'smooth';
    
    return () => {
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Box ref={mainRef} sx={{ bgcolor: '#000000', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <ParallaxBackground />
      
      {/* Progress indicator */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '4px',
          width: progressBarWidth,
          opacity: progressBarOpacity,
          background: 'linear-gradient(90deg, #8254e5, #a87dff)',
          zIndex: 9999,
        }}
      />
      
      <Container maxWidth={false} sx={{ 
        py: 12,
        px: isSmallScreen ? 2 : isMobile ? 4 : 8,
        maxWidth: '1400px',
        mx: 'auto'
      }}>
        {/* Hero section */}
        <Box 
          my={0} // Changed from my={isMobile ? 4 : 6} to reduce margin
          pt={isMobile ? 0 : 2} // Changed from pt={isMobile ? 2 : 4} to reduce padding
          mt={-4} // Added negative margin top to move up
          sx={{ 
            mb: isMobile ? 6 : 10 // Add more margin bottom to separate from next section
          }}
        >
          <RevealSection staggerChildren={0.15}>
            <Typography 
              variant={isSmallScreen ? "h3" : "h2"} 
              align="center" 
              mb={3}
              sx={{
                fontWeight: 600,
                letterSpacing: '0.02em',
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              The Art of <JumpingText text="Audio Mixing" delay={0.5} />
            </Typography>
            
            <Typography 
              variant="body1" 
              
              mb={6}
              sx={{
                fontSize: isSmallScreen ? '1.1rem' : '1.25rem',
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.9,
                lineHeight: 1.6,
                textAlign: 'left',
                justifyContent: 'center',
              }}
            >
              <SplitReveal delay={0.6} >
                The creative process of blending multiple audio sources into a harmonious, balanced composition that brings your musical vision to life with clarity, depth, and emotion.
              </SplitReveal>
            </Typography>
          </RevealSection>
        </Box>
        
        {/* What is Mixing Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={mixingEngineer} 
                    alt="Mixing engineer at console"
                    index={0}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="right" delay={0.3}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#8254e5">What Is Audio Mixing?</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Audio mixing is the critical intermediate stage of music production where individual recorded tracks are blended into a coherent, balanced stereo production. It's where a skilled engineer shapes the sonic elements of your composition to create a polished, professional sound that effectively conveys the emotional intent of your music.<br/><br/>
                      
                      During mixing, each instrument and vocal is carefully balanced, positioned in the stereo field, and enhanced with effects to create depth, clarity, and impact. A well-mixed track ensures that each element can be clearly heard while working harmoniously with other elements, allowing the listener to connect with your musical message across any listening environment—from headphones to car speakers to club sound systems.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6}>
                  <RevealSection direction="right" delay={0.3}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#8254e5">What Is Audio Mixing?</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Audio mixing is the critical intermediate stage of music production where individual recorded tracks are blended into a coherent, balanced stereo production. It's where a skilled engineer shapes the sonic elements of your composition to create a polished, professional sound that effectively conveys the emotional intent of your music.<br/><br/>
                      
                      During mixing, each instrument and vocal is carefully balanced, positioned in the stereo field, and enhanced with effects to create depth, clarity, and impact. A well-mixed track ensures that each element can be clearly heard while working harmoniously with other elements, allowing the listener to connect with your musical message across any listening environment—from headphones to car speakers to club sound systems.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6}>
                  <PerspectiveImage 
                    src={mixingEngineer} 
                    alt="Mixing engineer at console"
                    index={0}
                    delay={0.4}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* Balance & EQ Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={mixingEquipment} 
                    alt="Mixing EQ equipment"
                    index={1}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#8254e5">1. Balance & EQ</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The foundation of a great mix begins with setting proper levels and spectral balance. This critical first step determines how instruments interact with each other and establishes the tonal character of your production.<br/><br/>
                      
                      • Setting precise volume relationships between tracks to create a cohesive mix<br/><br/>
                      • Using equalization to carve out frequency space for each instrument<br/><br/>
                      • Removing problematic frequencies while enhancing the natural character of each sound<br/><br/>
                      • Creating clarity and separation between similar instruments through strategic EQ decisions<br/><br/>
                      • Building appropriate low-end foundation while maintaining headroom for the mastering stage<br/><br/>
                      
                      A well-balanced mix with thoughtful EQ decisions ensures that every instrument has its own space in the frequency spectrum, creating clarity and definition.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6} order={{ md: 2 }}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#8254e5">1. Balance & EQ</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The foundation of a great mix begins with setting proper levels and spectral balance. This critical first step determines how instruments interact with each other and establishes the tonal character of your production.<br/><br/>
                      
                      • Setting precise volume relationships between tracks to create a cohesive mix<br/><br/>
                      • Using equalization to carve out frequency space for each instrument<br/><br/>
                      • Removing problematic frequencies while enhancing the natural character of each sound<br/><br/>
                      • Creating clarity and separation between similar instruments through strategic EQ decisions<br/><br/>
                      • Building appropriate low-end foundation while maintaining headroom for the mastering stage<br/><br/>
                      
                      A well-balanced mix with thoughtful EQ decisions ensures that every instrument has its own space in the frequency spectrum, creating clarity and definition.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6} order={{ md: 1 }}>
                  <PerspectiveImage 
                    src={mixingEquipment}
                    alt="Mixing EQ equipment"
                    index={1}
                    delay={0.2}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
                
        {/* Dynamics and Space Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={balancingTracks} 
                    alt="Dynamics and space processing"
                    index={2}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="right" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#8254e5">2. Dynamics & Space</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Creating the impression of three-dimensional space and controlling dynamic range are essential aspects of professional mixing. These techniques transform flat recordings into immersive sonic experiences with depth, width, and emotional impact.<br/><br/>
                      
                      • Compression techniques to control peaks and bring out detail in performances<br/><br/>
                      • Spatial positioning of elements in the stereo field to create width and separation<br/><br/>
                      • Using reverb and delay to create front-to-back depth and acoustic environment<br/><br/>
                      • Automation to bring focus to important elements at the right moments<br/><br/>
                      • Creative use of panning to create movement and interest throughout the arrangement<br/><br/>
                      
                      Through careful management of dynamics and spatial elements, a mix transforms from a collection of individual tracks into a cohesive, immersive sonic landscape that pulls the listener in.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6}>
                  <RevealSection direction="right" delay={0.3} staggerChildren={0.08}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#8254e5">2. Dynamics & Space</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Creating the impression of three-dimensional space and controlling dynamic range are essential aspects of professional mixing. These techniques transform flat recordings into immersive sonic experiences with depth, width, and emotional impact.<br/><br/>
                      
                      • Compression techniques to control peaks and bring out detail in performances<br/><br/>
                      • Spatial positioning of elements in the stereo field to create width and separation<br/><br/>
                      • Using reverb and delay to create front-to-back depth and acoustic environment<br/><br/>
                      • Automation to bring focus to important elements at the right moments<br/><br/>
                      • Creative use of panning to create movement and interest throughout the arrangement<br/><br/>
                      
                      Through careful management of dynamics and spatial elements, a mix transforms from a collection of individual tracks into a cohesive, immersive sonic landscape that pulls the listener in.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6}>
                  <PerspectiveImage 
                    src={balancingTracks} 
                    alt="Dynamics and space processing"
                    index={2}
                    delay={0.2}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        
        {/* Creative Effects and Finalization Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={effectsProcessing} 
                    alt="Effects processing and finalization"
                    index={3}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#8254e5">3. Creative Effects & Finalization</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The final stage of mixing adds distinctive character and polish to your music through creative effects and finishing touches. This is where your production develops its unique sonic signature and emotional resonance.<br/><br/>
                      
                      • Creative effects processing adds excitement, texture, and character to the mix<br/><br/>
                      • Detailed automation brings the mix to life, highlighting important moments<br/><br/>
                      • Bus processing ties groups of instruments together into cohesive sections<br/><br/>
                      • Saturation and harmonic enhancement add analog warmth and dimensionality<br/><br/>
                      • Final adjustments ensure the mix translates well across different playback systems
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6} order={{ md: 2 }}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#8254e5">3. Creative Effects & Finalization</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The final stage of mixing adds distinctive character and polish to your music through creative effects and finishing touches. This is where your production develops its unique sonic signature and emotional resonance.<br/><br/>
                      
                      • Creative effects processing adds excitement, texture, and character to the mix<br/><br/>
                      • Detailed automation brings the mix to life, highlighting important moments<br/><br/>
                      • Bus processing ties groups of instruments together into cohesive sections<br/><br/>
                      • Saturation and harmonic enhancement add analog warmth and dimensionality<br/><br/>
                      • Final adjustments ensure the mix translates well across different playback systems
                    </Typography>
                    <Box mt={4} display="flex" justifyContent={isSmallScreen ? "center" : "flex-start"}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          background: 'linear-gradient(90deg, #8254e5 0%, #a87dff 100%)',
                          padding: '10px 24px',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(90deg, #7142d3 0%, #9263ff 100%)',
                          }
                        }}
                        onClick={() => scrollToSection('contact')}
                      >
                        Get Your Mixing Engineer
                      </Button>
                    </Box>
                  </RevealSection>
                </Grid>
                <Grid item md={6} order={{ md: 1 }}>
                  <PerspectiveImage 
                    src={effectsProcessing} 
                    alt="Effects processing and finalization"
                    index={3}
                    delay={0.2}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        
      </Container>
      <Footer />
    </Box>
  );
};

export default MixingPage;