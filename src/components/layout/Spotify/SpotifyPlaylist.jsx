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
      <Heading my={5} as="h2" size="xl" fontWeight="medium">
        Music I listened to while coding this website
      </Heading>
      <Divider borderWidth="1.5px" borderColor="#000" mb="14px" />
      <Box width='100%' my={20}>
        <SpotifyPlayer
          uri="spotify:playlist:3rRMSaQGXezre7OUJnqrXy?utm_source=generator&theme=0"
          size={size}
          view={view}
          theme={theme}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
        />
      </Box>
    </Box>
  );
};

export default SpotifyPlaylist;

{/* <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/3rRMSaQGXezre7OUJnqrXy?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
