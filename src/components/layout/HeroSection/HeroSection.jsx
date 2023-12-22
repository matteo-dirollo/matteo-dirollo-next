"use client";
// Import necessary Chakra UI components and React
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const HeroSection = () => {
  return (
    <Box
      as="section"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight={["20vh", "40vh", "60vh", "80vh"]}
      overflow="hidden"
    >
      {/* Left side with text overlay */}
      <Box
        className="container"
        width="90%"
        margin="0 auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          className="left"
          width="90%"
     
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin='0'
          marginRight='-150px'
          zIndex='1'
        >
          <Text fontSize="6xl" color="black" fontWeight="300">
            I’m Matteo Di Rollo, a graphic designer & content creator.<br />
            Available for freelance & collaborations.
          </Text>
        </Box>
      
      <Box
        className="right"
        minWidth="50%"
        bgImage="url('https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Home%2Fkombucha_POMEGRANATE_v8.png?alt=media&token=bc44bf97-0fbf-44e3-bda7-9c42f39fb608')"
        bgSize="cover"
        height="500px"
        zIndex='0'
        
      >
        {/* Right side with image */}
        {/* <Image
          src="https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Home%2Fkombucha_POMEGRANATE_v8.png?alt=media&token=bc44bf97-0fbf-44e3-bda7-9c42f39fb608"
          alt="Your Alt Text"
          objectFit="cover"
          width="100%"
          height="600px"
          zIndex="0"
        /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
