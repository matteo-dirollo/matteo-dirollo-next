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
      margin={0}
    >
      {/* Left side with text overlay */}
      <Box
        className="container"
        width="100%"
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
          <Text fontSize={['3xl','5xl', '6xl']} color="black" fontWeight="300">
            I&apos;m a Graphic, Motion Designer & content creator. <br />
            Available for freelance & collaborations.
          </Text>
        </Box>
      
      <Box
        className="right"
        minWidth="50%"
        bgImage="url('https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        bgSize="cover"
        height={["250px","350px","500px"]}
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
