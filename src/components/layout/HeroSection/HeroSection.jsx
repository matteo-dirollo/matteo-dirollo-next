'use client'
// Import necessary Chakra UI components and React
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const HeroSection = () => {
  return (
    <Box
    as= "section"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight={["20vh", "40vh", "60vh", "80vh"]}
      overflow="hidden"
    >
      {/* Left side with text overlay */}
      <Box
        width='90%'
        maxWidth='1000px'
        margin='0 auto'
        display="flex"
      alignItems="center"
      justifyContent="center"
      >
       <Box
        width='50%'
       > <Text fontSize="4xl" color="black">
        I’m Matteo, a graphic designer & content creator based in Geneva. Available for freelance & collaborations.
        </Text></Box>
       
      </Box>
<Box>
      {/* Right side with image */}
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Home%2Ftop_SC05_v1.png?alt=media&token=b7d25dc4-b176-4251-99f4-993da8ecdcff"
        alt="Your Alt Text"
        objectFit="cover"
        width="100%"
        height="100%"
        zIndex="0"
      />
      </Box>
    </Box>

  );
};

export default HeroSection;
