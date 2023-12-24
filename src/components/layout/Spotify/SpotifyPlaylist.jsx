"use client";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";
import SpotifyPlayer from "react-spotify-player";

const SpotifyPlaylist = () => {


  const size = {
    width: "100%",
    height: 152,
  };
  const view = "coverart"; // or 'coverart'
  const theme = "black"; // or 'white'

  return (
    <Box width="100%">
      <Heading mb={5} as="h2" size="xl" fontWeight="medium">
        My embarassing music
      </Heading>
      <Divider borderWidth="1.5px" borderColor="#000" mb="14px" />
      <Text mb="14px">
        The Spotify playlist I was listining while coding this website
      </Text>
      <SpotifyPlayer
        uri="spotify:playlist:3rRMSaQGXezre7OUJnqrXy"
        size={size}
        view={view}
        theme={theme}
      />
    </Box>
  );
};

export default SpotifyPlaylist;

