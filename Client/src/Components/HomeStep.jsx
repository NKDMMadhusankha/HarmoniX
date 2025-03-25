import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Modal, 
  TextField, 
  Button, 
  Container
} from '@mui/material';

const HarmoniXProcess = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPrompt, setAIPrompt] = useState('');
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const steps = [
    {
        title: "Initial Consultation",
        subtitle: "Discover Your Needs",
        details: [
            "Get To Know Your Project Charter: Understand the project's overall vision and goals.",
            "Define Your Project Needs: Clarify the services and specific requirements you need for your project.",
            "Clarify Your Goals For Collaboration: Set expectations for timelines, communication, and the desired outcome."
        ]
    },
    {
      title: "Connecting with Professionals",
      subtitle: "Based On Your Requirements",
      details: [
        "Browse Through Talent Profiles: Explore a variety of professionals showcasing their expertise, experience, and style.",
        "Listen To Various Voices: Hear samples of their previous work to help you choose the right fit for your project.",
        "Connect Directly With Professionals: Reach out and discuss your project directly with the selected professionals to start the collaboration."
  ]
    },
    {
      title: "Collaborative Music Production",
      subtitle: "Once You Find Your Match",
      details: [
        "Start Your Music Project: Begin your journey by setting up the project with your chosen professional.",
        "Collaborate With Your Chosen Professional: Work together, share ideas, and refine your sound throughout the production process.",
        "Bring Your Sound To Life: Transform your vision into a final track, blending creativity, expertise, and technology."
  ]
    }
  ];

  const handleOpenAIModal = () => {
    setIsAIModalOpen(true);
  };

  const handleCloseAIModal = () => {
    setIsAIModalOpen(false);
    setAIPrompt('');
  };

  const handleSubmitAIPrompt = () => {
    console.log('Submitted AI Prompt:', aiPrompt);
    handleCloseAIModal();
  };

  return (
    <Box 
      ref={containerRef}
      sx={{
        backgroundColor: 'black',
        color: 'white',
        minHeight: '100vh',
        position: 'relative',
        overflowY: 'scroll',
        py: 4
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            mb: 1, 
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Montserrat',
          }}
        >
          HarmoniX In 3 Steps
        </Typography>

        <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
                mb: 6, 
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Montserrat'
            }}
            >
            Our process guarantees that we connect artists and professionals to create music that meets your unique vision.
        </Typography>

        {/* Animated Vertical Line */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: '140px', // Start below the title
            height: '89%',
            width: '2px',
            backgroundColor: 'white',
            scaleY: scrollYProgress,
            transformOrigin: 'top',
            zIndex: 1
          }}
        />

        {steps.map((step, index) => (
          <Box 
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 4,
              position: 'relative',
            }}
          >
            {/* Step Number */}
            <Box 
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'white',
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                zIndex: 2
              }}
            >
              {index + 1}
            </Box>

            {/* Step Content */}
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.9, 
                  ease: "easeOut" 
                }
              }}
              viewport={{ once: true }}
              style={{ 
                width: '100%',
                maxWidth: '400px', // Ensure the box does not get too wide
                padding: '30px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                textAlign: 'left', // Keep text aligned left initially
                border: '1px solid',
                borderColor: index % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.9)',
                marginLeft: index % 2 === 0 ? 'auto' : -30,
                marginRight: index % 2 === 0 ? -30 : 'auto',
              }}
            >
              {/* Centering the content inside the box */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                  {step.subtitle}
                </Typography>
                {step.details.map((detail, detailIndex) => (
                  <Typography 
                    key={detailIndex} 
                    variant="body2"
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      mb: 0.9,
                    }}
                  >
                    {detail}
                  </Typography>
                ))}
              </Box>
            </motion.div>
          </Box>
        ))}    
      </Container>
    </Box>
  );
};

export default HarmoniXProcess;
