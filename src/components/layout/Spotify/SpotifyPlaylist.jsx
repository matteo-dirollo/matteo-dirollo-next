"use client";
import { Box, Divider, Heading } from "@chakra-ui/react";
import React from "react";

const SpotifyPlaylist = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <Box width="100%">
      <Heading mb={5} as="h2" size="xl" fontWeight="medium">
        Latest Projects
      </Heading>
      <Divider borderWidth="1.5px" borderColor="#000" mb="12px" />
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
    </Box>
  );
};

export default SpotifyPlaylist;
