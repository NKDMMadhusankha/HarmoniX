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
import producerStudio from '../assets/ab2.png';
import musicEquipment from '../assets/ab3.png';
import daw from '../assets/ab4.png';
import mixingConsole from '../assets/ab5.png';

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
const MusicProducingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
        px: { xs: 2, sm: 4, md: 8, lg: 12 },
        maxWidth: '1300px',
        mx: 'auto'
      }}>
        {/* What is Music Production Section - Starting with this section instead of the header */}
        <Box my={8}>
          <ScrollSection direction="up">
            
            <Grid container alignItems="center" spacing={6} mb={6}>
              {isMobile ? (
                <>
                  <Grid item xs={12}>
                    <EnhancedImage 
                      src={producerStudio} 
                      alt="Music producer in studio"
                      index={0}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ScrollSection direction="right" delay={0.2}>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                        Music production is the process of creating, recording, mixing, and mastering audio to produce a finished musical piece. It involves both technical skills and artistic creativity as producers work with artists to realize their musical vision. A music producer oversees all aspects of a recording project, from pre-production planning through final mastering, acting as both a technical expert and creative collaborator.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={6}>
                    <ScrollSection direction="right" delay={0.2}>
                    <Typography variant="h5" mb={2} color="#3a9bdc">
                        <TextReveal>What Ia Music Producing ?</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                      Music producing is the art and process of creating a complete piece of music from scratch or from a basic idea. A music producer is like both a director and a creative partner — they guide the overall sound, style, and feel of a song. They work on everything from composing melodies and building beats to arranging instruments and helping artists bring their vision to life.<br/><br/>Good music producing is not just about technical skills; it’s about having a strong sense of musicality, creativity, and the ability to turn raw ideas into something polished and professional. Whether it's a pop song, a rap track, an acoustic ballad, or an electronic anthem, the producer shapes the journey from idea to reality.
                        </Typography>
                    </ScrollSection>
                  </Grid>
                  <Grid item md={6}>
                    <EnhancedImage 
                      src={producerStudio} 
                      alt="Music producer in studio"
                      index={0}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </ScrollSection>
        </Box>

        {/* Music Production Equipment Section with 3D card effect */}
        <Box my={16}>
          <ScrollSection direction="up">
            
            
            <Grid container alignItems="center" spacing={6} mb={6}>
              {isMobile ? (
                <>
                  <Grid item xs={12}>
                    <Card3D>
                      <EnhancedImage 
                        src={musicEquipment} 
                        alt="Music production equipment"
                        index={1}
                      />
                    </Card3D>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={6} order={{ md: 2 }}>
                    <ScrollSection direction="left" delay={0.3}>
                      <Typography variant="h5" mb={2} color="#3a9bdc">
                        <TextReveal>1. Song Creation and Composition</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                      This is the first stage, where the basic idea of the song is born. The producer helps create melodies, chord progressions, rhythms, and the overall vibe of the track. Sometimes the producer will start from scratch, building the song from a small idea, a lyric, or even just a mood. <br/><br/>
                      • They might work closely with artists, songwriters, or instrumentalists to develop the song’s core elements.<br/><br/>• They decide on the key, tempo, style, and emotional tone.<br/><br/>In some cases, the producer themselves plays instruments or programs beats to form the early version of the song (called a demo).<br/><br/>At this stage, it's all about creativity and exploring different possibilities for how the song could sound.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                  <Grid item md={6} order={{ md: 1 }}>
                    <Card3D>
                      <EnhancedImage 
                        src={musicEquipment} 
                        alt="Music production equipment"
                        index={1}
                      />
                    </Card3D>
                  </Grid>
                </>
              )}
            </Grid>
          </ScrollSection>
        </Box>

        {/* Digital Audio Workstations Section */}
        <Box my={16}>
          <ScrollSection direction="scale">
            
            
            <Grid container alignItems="center" spacing={6} mb={6}>
              {isMobile ? (
                <>
                  <Grid item xs={12}>
                    <EnhancedImage 
                      src={daw} 
                      alt="Digital Audio Workstation interface"
                      index={2}
                    />
                  </Grid>
                </>
                  ) : (
                <>
                  <Grid item md={6}>
                    <ScrollSection direction="up" delay={0.3}>
                      <Typography variant="h5" mb={2} color="#3a9bdc">
                    <TextReveal>2. Arrangement and Sound Design</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                    Once the basic idea is ready, the next part is arranging and designing the sounds. This is where the song starts to feel more full and structured.<br/><br/>
                    • Arrangement means deciding where different parts of the song happen — like when the drums kick in, when the chorus arrives, or when an instrumental break happens.<br/><br/>
                    • Producers think about the dynamics — how the song builds up and cools down to keep the listener interested.<br/><br/>
                    • Sound design involves choosing or creating the right sounds — for example, picking a warm piano, a powerful drum kit, or crafting a unique synth lead.<br/><br/>
                    • They might add additional layers like background vocals, electronic effects, or real-world sounds (like claps, snaps, or ambient textures).<br/><br/>
                    The goal here is to make the song exciting, emotional, and to tell a story through sound.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                  <Grid item md={6}>
                    <EnhancedImage 
                      src={daw} 
                      alt="Digital Audio Workstation interface"
                      index={2}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </ScrollSection>
        </Box>

        {/* Mixing and Mastering Section */}
        <Box my={16}>
          <ScrollSection direction="up">
            
            
            <Grid container alignItems="center" spacing={6}>
              {isMobile ? (
                <>
                  <Grid item xs={12}>
                    <EnhancedImage 
                      src={mixingConsole} 
                      alt="Audio mixing console"
                      index={3}
                    />
                  </Grid>
                </>
                  ) : (
                <>
                  <Grid item md={6} order={{ md: 2 }}>
                    <ScrollSection direction="right" delay={0.3}>
                    <Typography variant="h5" mb={2} color="#3a9bdc">
                    <TextReveal>3. Production and Refinement</TextReveal>
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                    In this final producing stage, everything gets cleaned up, polished, and finalized as much as possible before moving into technical processes like mixing.<br/><br/>
                    • The producer listens carefully to how the elements blend together.<br/><br/>
                    • They may fine-tune the volume of instruments, adjust how certain sounds interact, and make sure nothing feels too empty or too crowded.<br/><br/>
                    • Sometimes, parts get added or removed to make the song tighter and more effective.<br/><br/>
                    • This stage also involves making rough versions (called rough mixes) so the song can be shared with mixing engineers later.<br/><br/>
                    At the end of the production phase, the song should already sound very close to a finished track — full, emotional, and professional — even before mixing and mastering happen.
                      </Typography>
                    </ScrollSection>
                  </Grid>
                  <Grid item md={6} order={{ md: 1 }}>
                    <EnhancedImage 
                      src={mixingConsole} 
                      alt="Audio mixing console"
                      index={3}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </ScrollSection>
        </Box>
        
        {/* Call to action section with floating elements */}
        <Box my={16} position="relative" py={8}>
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
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
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
              <Typography variant="h3" mb={4}>
                <TextReveal>Ready to start your music production journey?</TextReveal>
              </Typography>
              
              <Typography variant="body1" mb={6} sx={{ maxWidth: '700px', mx: 'auto' }}>
                From composing and arranging to mixing and mastering, music production is a rewarding creative pursuit that combines technical skill with artistic vision. Start creating your own professional tracks today.
              </Typography>
              
              <MagneticElement>
                <LiquidButton sx={{ display: 'inline-block' }}>
                  <Typography variant="button" sx={{ position: 'relative', zIndex: 1 }}>
                    Get Started Now
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

export default MusicProducingPage;