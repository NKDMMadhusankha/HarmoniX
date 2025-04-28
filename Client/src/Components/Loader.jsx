import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Snackbar } from "@mui/material";

const Loader = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to show the success message
  const handleLoginSuccess = () => {
    setOpenSnackbar(true);
  };

  // Function to handle closing the snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        flexDirection: "column", // Align the loader and text vertically
      }}
    >
      {/* Loader animation */}
      <motion.div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: "6px",
              height: "40px", // Set the initial height of the lines
              backgroundColor: "white",
              borderRadius: "4px",
            }}
            animate={{
              scaleY: [1, 0.5, 1], // Decrease the scaleY to make the lines shorter during animation
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Added text under the loader */}
      <Typography
        sx={{
          color: "white",
          marginTop: "10px", // Space between loader and text
          fontSize: "17px",
          fontWeight: "400", // Slightly lighter text for a modern feel
        }}
      >
        Please wait ...
      </Typography>

      {/* Success Popup Message (Snackbar) */}
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={3000} // Snackbar will disappear after 3 seconds
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Login Successful!"
        sx={{
          zIndex: 1200, // Ensure Snackbar appears above other content
        }}
      />
    </Box>
  );
};

export default Loader;
