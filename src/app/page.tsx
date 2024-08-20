"use client";
import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import Desktop from './desktop/Desktop';
import Mobile from './mobile/Mobile';
import Starter from './Starter/Starter';

const Page = () => {
  const isSmallScreen = useMediaQuery('(max-width:690px)');
//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <>
    <Starter/>
      {isSmallScreen ? (
        <>
          <Mobile />
        </>
      ) : (
        <>
          <Desktop />
        </>
      )}
    </>
  );
};

export default Page;