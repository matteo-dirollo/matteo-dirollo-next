"use client";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";

const SpotifyPlaylist = () => {


  return (
    <Box width="100%">
      <Heading mt={10} mb={5} as="h2" size="xl" fontWeight="medium">
        My spotify playlist
      </Heading>
      <Divider borderWidth="1.5px" borderColor="#000" mb="14px" />
      <Text>Music I listened to while coding this application</Text>
      <Box width='100%' mt={10} mb={20}>
      <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/3rRMSaQGXezre7OUJnqrXy?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </Box>
    </Box>
  );
};

export default SpotifyPlaylist;
