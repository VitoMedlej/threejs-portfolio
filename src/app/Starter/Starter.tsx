"use client";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

const Starter = () => {
  const [isFullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const handleFullScreen = () => {
    const canvas = document.querySelector('canvas');

    if (canvas && !document.fullscreenElement) {
      canvas.requestFullscreen().then(() => {
        // Lock pointer immediately after entering fullscreen
        canvas.requestPointerLock();
      }).catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Box className='main-title' sx={{ display: isFullScreen ? 'none' : 'block', width: '200px', height: '100px' }}>
      <Typography sx={{ fontSize: '1.75em', pt: 8, fontWeight: 500 }}>
        Hello Stranger! Welcome to my portfolio.
      </Typography>
      <Typography sx={{ fontSize: '1.05em', pt: 2, fontWeight: 400 }}>
        The web outside can be quite boring sometimes, maybe a 3D website might interest you?
      </Typography>
      <Typography sx={{ fontSize: '1.05em', pt: 1, fontWeight: 400 }}>
        Let me know at contact@vito-medlej.com or if you have any questions!
      </Typography>
      <Button
        onClick={handleFullScreen}
        sx={{ width:'90%', fontStyle: 'italic', ':hover': { color: 'black', border: '1px solid black' }, background: 'black', color: 'white', mt: 4 }}>
        DIVE RIGHT IN!
      </Button>
    </Box>
  );
};

export default Starter;