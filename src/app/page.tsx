"use client";
import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import Desktop from './desktop/Desktop';
import Mobile from './mobile/Mobile';

const Page = () => {
  const isSmallScreen = useMediaQuery('(max-width:690px)');

  return (
    <>

    {  isSmallScreen ? (
  <>
  <Mobile></Mobile>
  </>  
  )
:
      <>
      <Desktop/>
      </>
      }

      
    
    </>
  )}

  export default Page