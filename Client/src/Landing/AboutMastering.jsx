import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

// Import Navbar and Footer components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

// Import assets (you'll need to update these with your actual image paths)
import masteringEngineer from '../assets/think.png';
import loudnessProcessing from '../assets/monitors.png';
import masteringEquipment from '../assets/mastering.png';
import referenceMonitors from '../assets/player.png';

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
const GlowText = ({ children, color = "#2da84a", delay = 0, fontSize = "inherit" }) => {
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
  background: linear-gradient(135deg, #2da84a 0%, #7ddb92 50%, #2da84a 100%);
  background-size: 200% 200%;
  border-radius: 50px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(45, 168, 74, 0.25);
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #2da84a, #7ddb92, #2da84a);
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
const JumpingText = ({ text, color = "#2da84a", delay = 0 }) => {
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
const MasteringPage = () => {
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
      window.location.href = `./music/mastering`; // Changed to direct to mastering page
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
          background: 'linear-gradient(90deg, #2da84a, #7ddb92)',
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
              The Art of <JumpingText text="Audio Mastering" delay={0.5} />
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
                The final crucial step in music production that transforms good mixes into exceptional commercial-ready releases that sound phenomenal on any playback system.
              </SplitReveal>
            </Typography>
          </RevealSection>
        </Box>
        
        {/* What is Mastering Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={masteringEngineer} 
                    alt="Mastering engineer at console"
                    index={0}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="right" delay={0.3}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#2da84a">What Is Audio Mastering?</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Audio mastering is the final creative and technical step in the music production process. It's where a skilled engineer applies precise sonic enhancements to prepare your music for distribution across all listening platforms and environments. Mastering engineers use specialized equipment in acoustically-treated rooms to bring cohesion, clarity, and commercial loudness to your tracks.<br/><br/>
                      
                      During mastering, subtle adjustments to EQ, dynamics, stereo imaging, and loudness are made to ensure your music translates perfectly across all playback systems—from high-end studio monitors to earbuds, car stereos, and club sound systems. A properly mastered track will sound polished, professional, and competitive with commercial releases while preserving the creative vision of the artist and mixer.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6}>
                  <RevealSection direction="right" delay={0.3}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#2da84a">What Is Audio Mastering?</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Audio mastering is the final creative and technical step in the music production process. It's where a skilled engineer applies precise sonic enhancements to prepare your music for distribution across all listening platforms and environments. Mastering engineers use specialized equipment in acoustically-treated rooms to bring cohesion, clarity, and commercial loudness to your tracks.<br/><br/>
                      
                      During mastering, subtle adjustments to EQ, dynamics, stereo imaging, and loudness are made to ensure your music translates perfectly across all playback systems—from high-end studio monitors to earbuds, car stereos, and club sound systems. A properly mastered track will sound polished, professional, and competitive with commercial releases while preserving the creative vision of the artist and mixer.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6}>
                  <PerspectiveImage 
                    src={masteringEngineer} 
                    alt="Mastering engineer at console"
                    index={0}
                    delay={0.4}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* Frequency Balance Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={masteringEquipment} 
                    alt="Mastering EQ equipment"
                    index={1}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#2da84a">1. Tonal Balance & EQ</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The first critical step in mastering is achieving perfect tonal balance through precise equalization. Unlike mixing EQ which shapes individual elements, mastering EQ makes subtle, musical adjustments to the entire mix as a cohesive whole.<br/><br/>
                      
                      • Mastering engineers use high-resolution equalizers to enhance clarity, warmth, and presence<br/><br/>
                      • They correct frequency imbalances without compromising the artistic intent of the mix<br/><br/>
                      • Strategic high-pass filtering removes inaudible ultra-low frequencies that consume headroom<br/><br/>
                      • Mid-side EQ techniques can enhance stereo width while maintaining mono compatibility<br/><br/>
                      • Reference tracks in similar styles help ensure the frequency balance matches commercial standards<br/><br/>
                      
                      The goal is a natural, balanced sound that translates well across all playback systems while retaining the original character of the music.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6} order={{ md: 2 }}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#2da84a">1. Tonal Balance & EQ</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The first critical step in mastering is achieving perfect tonal balance through precise equalization. Unlike mixing EQ which shapes individual elements, mastering EQ makes subtle, musical adjustments to the entire mix as a cohesive whole.<br/><br/>
                      
                      • Mastering engineers use high-resolution equalizers to enhance clarity, warmth, and presence<br/><br/>
                      • They correct frequency imbalances without compromising the artistic intent of the mix<br/><br/>
                      • Strategic high-pass filtering removes inaudible ultra-low frequencies that consume headroom<br/><br/>
                      • Mid-side EQ techniques can enhance stereo width while maintaining mono compatibility<br/><br/>
                      • Reference tracks in similar styles help ensure the frequency balance matches commercial standards<br/><br/>
                      
                      The goal is a natural, balanced sound that translates well across all playback systems while retaining the original character of the music.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6} order={{ md: 1 }}>
                  <PerspectiveImage 
                    src={masteringEquipment}
                    alt="Mastering EQ equipment"
                    index={1}
                    delay={0.2}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
                
        {/* Dynamics and Loudness Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8} mb={isMobile ? 4 : 6}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={loudnessProcessing} 
                    alt="Loudness and dynamics processing"
                    index={2}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="right" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#2da84a">2. Dynamics & Loudness</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Achieving the right balance between dynamic expression and commercial loudness is perhaps the most challenging aspect of modern mastering. It requires careful application of compression, limiting, and saturation to increase perceived loudness while preserving musical impact.<br/><br/>
                      
                      • Multi-band compression allows for targeted dynamic control across different frequency ranges<br/><br/>
                      • Careful peak limiting increases overall loudness while minimizing distortion and preserving transients<br/><br/>
                      • Mastering engineers target appropriate LUFS levels for different distribution platforms<br/><br/>
                      • Subtle saturation adds density and warmth without obvious distortion<br/><br/>
                      • Parallel compression techniques can add energy while preserving dynamics<br/><br/>
                      
                      The best mastering avoids the "louder is better" trap, instead focusing on creating impact and punch that remains effective at any volume level, while still meeting modern loudness expectations.
                    </Typography>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6}>
                  <RevealSection direction="right" delay={0.3} staggerChildren={0.08}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#2da84a">2. Dynamics & Loudness</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      Achieving the right balance between dynamic expression and commercial loudness is perhaps the most challenging aspect of modern mastering. It requires careful application of compression, limiting, and saturation to increase perceived loudness while preserving musical impact.<br/><br/>
                      
                      • Multi-band compression allows for targeted dynamic control across different frequency ranges<br/><br/>
                      • Careful peak limiting increases overall loudness while minimizing distortion and preserving transients<br/><br/>
                      • Mastering engineers target appropriate LUFS levels for different distribution platforms<br/><br/>
                      • Subtle saturation adds density and warmth without obvious distortion<br/><br/>
                      • Parallel compression techniques can add energy while preserving dynamics<br/><br/>
                      
                      The best mastering avoids the "louder is better" trap, instead focusing on creating impact and punch that remains effective at any volume level, while still meeting modern loudness expectations.
                    </Typography>
                  </RevealSection>
                </Grid>
                <Grid item md={6}>
                  <PerspectiveImage 
                    src={loudnessProcessing} 
                    alt="Loudness and dynamics processing"
                    index={2}
                    delay={0.2}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        
        {/* Stereo Image and Enhancement Section */}
        <Box my={isMobile ? 8 : 12}>
          <Grid container alignItems="center" spacing={isMobile ? 4 : 8}>
            {isMobile ? (
              <>
                <Grid item xs={12}>
                  <PerspectiveImage 
                    src={referenceMonitors} 
                    alt="Reference monitors for spatial enhancement"
                    index={3}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} mb={3}>
                      <GlowText color="#2da84a">3. Stereo Enhancement & Finalization</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The final stage of mastering focuses on enhancing the stereo image and adding the finishing touches that give commercial releases their characteristic polish and dimension. This includes careful adjustments to stereo width, depth, and imaging.<br/><br/>
                      • Stereo width enhancement creates an immersive listening experience without causing phase issues<br/><br/>
                      • Specialized tools analyze and ensure mono compatibility for radio and club playback<br/><br/>
                      • Harmonic excitement adds subtle air and sheen to the high frequencies<br/><br/>
                      • Meticulous attention to detail ensures your music translates perfectly across all playback systems<br/><br/>
                      • Final limiting and dithering optimizes your music for digital distribution platforms
                    </Typography>
                    <Box mt={4} display="flex" justifyContent={isSmallScreen ? "center" : "flex-start"}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          background: 'linear-gradient(90deg, #2da84a 0%, #55c370 100%)',
                          padding: '10px 24px',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(90deg, #35b556 0%, #65d380 100%)',
                          }
                        }}
                        onClick={() => scrollToSection('contact')}
                      >
                        Get Your Music Mastered
                      </Button>
                    </Box>
                  </RevealSection>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6}>
                  <PerspectiveImage 
                    src={referenceMonitors} 
                    alt="Reference monitors for spatial enhancement"
                    index={3}
                    delay={0.2}
                  />
                </Grid>
                <Grid item md={6}>
                  <RevealSection direction="left" delay={0.3} staggerChildren={0.08}>
                    <Typography variant="h4" mb={3}>
                      <GlowText color="#2da84a">3. Stereo Enhancement & Finalization</GlowText>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                      The final stage of mastering focuses on enhancing the stereo image and adding the finishing touches that give commercial releases their characteristic polish and dimension. This includes careful adjustments to stereo width, depth, and imaging.<br/><br/>
                      • Stereo width enhancement creates an immersive listening experience without causing phase issues<br/><br/>
                      • Specialized tools analyze and ensure mono compatibility for radio and club playback<br/><br/>
                      • Harmonic excitement adds subtle air and sheen to the high frequencies<br/><br/>
                      • Meticulous attention to detail ensures your music translates perfectly across all playback systems<br/><br/>
                      • Final limiting and dithering optimizes your music for digital distribution platforms
                    </Typography>
                    <Box mt={4} display="flex" justifyContent="flex-start">
                      <Button 
                        variant="contained" 
                        color="primary"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          background: 'linear-gradient(90deg, #2da84a 0%, #55c370 100%)',
                          padding: '10px 24px',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(90deg, #35b556 0%, #65d380 100%)',
                          }
                        }}
                        onClick={() => scrollToSection('contact')}
                      >
                        Get Your Music Mastered
                      </Button>
                    </Box>
                  </RevealSection>
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

export default MasteringPage;