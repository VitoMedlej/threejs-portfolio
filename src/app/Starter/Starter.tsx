"use client";
import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useFullscreen } from '../Context/Context';

const Starter = () => {
  const { isfullscreen, setFullScreen } = useFullscreen();

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, [setFullScreen]);

  const handleFullScreen = () => {
    const container = document.getElementById('fullscreen-container');
    setFullScreen(true);

    if (container && !document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        document.querySelector('canvas')?.requestPointerLock();
      }).catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };

  return (
    <Box className='main-title' 
      sx={{ display: isfullscreen ? 'none' : 'block', width: '200px', height: '100px' }}>
        <Box sx={{display:'flex' ,flexDirection:'column', maxWidth:'400px',margin:'0 auto'}}>

      <Typography component={'h1'} sx={{ fontSize: '1.75em', pt: 8, fontWeight: 600 }}>
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
        sx={{ py:2,fontWeight:600,width: '90%', fontStyle: 'italic', ':hover': { color: 'black', border: '1px solid black' }, background: 'black', color: 'white', mt: 4 }}>
        DIVE RIGHT IN!
      </Button>
      </Box>

    </Box>
  );
};

export default Starter;
