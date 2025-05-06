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
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsIcon from '@mui/icons-material/Settings';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

// Import Navbar and Footer components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

// Import assets (you'll need to update these with your actual image paths)
import musicProducer from '../assets/ab2.png';
import recordingStudio from '../assets/ab3.png';
import arrangements from '../assets/ab4.png';
import finalTouches from '../assets/ab5.png';

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
            background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 50 + 20)}, ${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 150 + 100)}, 0.15) 0%, rgba(0,0,0,0) 70%)`,
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
const GlowText = ({ children, color = "#3a9bdc", delay = 0, fontSize = "inherit" }) => {
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
  background: linear-gradient(135deg, #3a9bdc 0%, #63b8f0 50%, #3a9bdc 100%);
  background-size: 200% 200%;
  border-radius: 50px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(58, 155, 220, 0.25);
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #3a9bdc, #63b8f0, #3a9bdc);
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
const JumpingText = ({ text, color = "#3a9bdc", delay = 0 }) => {
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
const ProducingPage = () => {
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
      window.location.href = `./music/producing`; // Changed to direct to producing page
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
          background: 'linear-gradient(90deg, #3a9bdc, #63b8f0)',
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
          my={0}
          pt={isMobile ? 0 : 2}
          mt={-4}
          sx={{ 
            mb: isMobile ? 6 : 10
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
              The Art of <JumpingText text="Music Production" delay={0.5} />
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
              The transformative process of crafting sonic experiences, combining technical expertise with creative vision to shape raw musical ideas into polished, professional productions.
              </SplitReveal>
            </Typography>
          </RevealSection>
        </Box>
        
        {/* What is Music Production Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={musicProducer} 
                    alt="Music producer in studio"
                    index={0}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="right" delay={0.3}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#3a9bdc">What Is Music Production?</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Music production is the comprehensive creative and technical process of bringing a musical idea to life as a finished recording. A skilled producer serves as both visionary and technical guide, shaping all aspects of a project from songwriting and arrangement to recording, editing, mixing, and finalizing.<br/><br/>
                      
                      At its heart, music production is about capturing and enhancing artistic expression. It balances technical precision with creative intuition, combining advanced audio engineering with musical theory and artistic direction. A producer makes countless decisions that ultimately define the sonic identity and emotional impact of a recording—choosing instruments, crafting arrangements, directing performances, and sculpting sounds to create a cohesive musical statement that resonates with listeners.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6}>
                  <RevealSection direction="right" delay={0.3}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#3a9bdc">What Is Music Production?</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Music production is the comprehensive creative and technical process of bringing a musical idea to life as a finished recording. A skilled producer serves as both visionary and technical guide, shaping all aspects of a project from songwriting and arrangement to recording, editing, mixing, and finalizing.<br/><br/>
                      
                      At its heart, music production is about capturing and enhancing artistic expression. It balances technical precision with creative intuition, combining advanced audio engineering with musical theory and artistic direction. A producer makes countless decisions that ultimately define the sonic identity and emotional impact of a recording—choosing instruments, crafting arrangements, directing performances, and sculpting sounds to create a cohesive musical statement that resonates with listeners.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6}>
                  <PerspectiveImage 
                    src={musicProducer} 
                    alt="Music producer in studio"
                    index={0}
                    delay={0.4}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* Composition & Recording Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={recordingStudio} 
                    alt="Recording studio session"
                    index={1}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#3a9bdc">1. Composition & Recording</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The foundation of any musical project begins with capturing inspired performances and developing the core musical ideas. This first phase focuses on translating creative vision into recorded audio.<br/><br/>
                      
                      • Songwriting development and refinement of musical structure<br/><br/>
                      • Selection of key instruments and sounds that define the track's character<br/><br/>
                      • Capturing pristine audio through strategic microphone placement and selection<br/><br/>
                      • Directing performers to achieve the optimal emotional delivery<br/><br/>
                      • Building a solid foundation of rhythm, harmony, and melody<br/><br/>
                      
                      During this phase, a producer helps artists refine their ideas while capturing performances that maintain both technical excellence and emotional authenticity—creating the raw materials that will become the finished production.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6} order={{ md: 2 }}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#3a9bdc">1. Composition & Recording</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The foundation of any musical project begins with capturing inspired performances and developing the core musical ideas. This first phase focuses on translating creative vision into recorded audio.<br/><br/>
                      
                      • Songwriting development and refinement of musical structure<br/><br/>
                      • Selection of key instruments and sounds that define the track's character<br/><br/>
                      • Capturing pristine audio through strategic microphone placement and selection<br/><br/>
                      • Directing performers to achieve the optimal emotional delivery<br/><br/>
                      • Building a solid foundation of rhythm, harmony, and melody<br/><br/>
                      
                      During this phase, a producer helps artists refine their ideas while capturing performances that maintain both technical excellence and emotional authenticity—creating the raw materials that will become the finished production.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6} order={{ md: 1 }}>
                  <PerspectiveImage 
                    src={recordingStudio}
                    alt="Recording studio session"
                    index={1}
                    delay={0.2}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
                
        {/* Arrangement & Sound Design Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={arrangements} 
                    alt="Arrangement and sound design"
                    index={2}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="right" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#3a9bdc">2. Arrangement & Sound Design</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Transforming raw recordings into a compelling musical journey requires thoughtful arrangement and sonic craftsmanship. This phase focuses on building the architecture of the music while developing unique sonic textures.<br/><br/>
                      
                      • Strategic structuring of musical sections to create emotional flow and listener engagement<br/><br/>
                      • Layering complementary instruments and sounds to build depth and dimension<br/><br/>
                      • Creating custom sound design elements that give the production a unique signature<br/><br/>
                      • Crafting transitions and builds that maintain energy and interest throughout<br/><br/>
                      • Editing performances for timing precision while preserving natural feel<br/><br/>
                      
                      Through careful arrangement decisions and creative sound design, a producer transforms individual recordings into a cohesive musical experience with its own unique sonic identity and emotional arc.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6}>
                  <RevealSection direction="right" delay={0.3} staggerChildren={0.08}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#3a9bdc">2. Arrangement & Sound Design</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Transforming raw recordings into a compelling musical journey requires thoughtful arrangement and sonic craftsmanship. This phase focuses on building the architecture of the music while developing unique sonic textures.<br/><br/>
                      
                      • Strategic structuring of musical sections to create emotional flow and listener engagement<br/><br/>
                      • Layering complementary instruments and sounds to build depth and dimension<br/><br/>
                      • Creating custom sound design elements that give the production a unique signature<br/><br/>
                      • Crafting transitions and builds that maintain energy and interest throughout<br/><br/>
                      • Editing performances for timing precision while preserving natural feel<br/><br/>
                      
                      Through careful arrangement decisions and creative sound design, a producer transforms individual recordings into a cohesive musical experience with its own unique sonic identity and emotional arc.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6}>
                  <PerspectiveImage 
                    src={arrangements} 
                    alt="Arrangement and sound design"
                    index={2}
                    delay={0.2}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        
        {/* Mixing & Finalizing Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={finalTouches} 
                    alt="Mixing and finalizing"
                    index={3}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}> 
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}> 
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}> 
                      <GlowText color="#3a9bdc">3. Mixing & Finalizing</GlowText> 
                    </Typography> 
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}> 
                      The final stage transforms a well-arranged production into a polished, professional recording ready for release. This phase focuses on sonic enhancement and ensuring the music translates across all listening environments.<br/><br/> 
                      • Balancing levels to create a clear, defined mix where all elements work in harmony<br/><br/> 
                      • Applying EQ, compression, and effects to enhance each sound's character<br/><br/> 
                      • Creating a three-dimensional soundscape through panning and spatial processing<br/><br/> 
                      • Dynamic automation that brings the emotional journey to life<br/><br/> 
                      • Final polishing to ensure the production sounds professional across all platforms 
                    </Typography> 
                  </RevealSection> 
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6} order={{ md: 2 }}> 
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}> 
                    <Typography variant="h4" mb={3}> 
                      <GlowText color="#3a9bdc">3. Production and Refinement</GlowText> 
                    </Typography> 
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}> 
                        In this final producing stage, everything gets cleaned up, polished, and finalized as much as possible before moving into technical processes like mixing.<br/><br/>
                        • The producer listens carefully to how the elements blend together.<br/><br/>
                        • They may fine-tune the volume of instruments, adjust how certain sounds interact, and make sure nothing feels too empty or too crowded.<br/><br/>
                        • Sometimes, parts get added or removed to make the song tighter and more effective.<br/><br/>
                        • This stage also involves making rough versions (called rough mixes) so the song can be shared with mixing engineers later.<br/><br/>
                        At the end of the production phase, the song should already sound very close to a finished track — full, emotional, and professional — even before mixing and mastering happen.
                      </Typography>
                      
                      <Box mt={4} display="flex" justifyContent="flex-start">
                        <Button 
                          variant="contained" 
                          color="primary"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            background: 'linear-gradient(90deg, #3a9bdc 0%, #63b8f0 100%)',
                            padding: '10px 24px',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(90deg, #2c87c7 0%, #4da9e6 100%)',
                            }
                          }}
                          onClick={() => window.location.href = "/music/producer"}
                        >
                          Get Your Music Producer
                        </Button>
                      </Box>
                  </RevealSection> 
                </Grid> 
                <Grid item md={6} order={{ md: 1 }}> 
                  <PerspectiveImage 
                    src={finalTouches} 
                    alt="Mixing and finalizing"
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

export default ProducingPage;