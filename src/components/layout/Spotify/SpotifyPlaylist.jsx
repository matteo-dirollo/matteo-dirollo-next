"use client";
import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const SpotifyPlaylist = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken ] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token  = window.localStorage.getItem("token")
  
    if (token || hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
      window.location.hash = ""
      window.localStorage.setItem("token", token)
      setToken(token)
    } 

  }, [])
  
const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}
  return (
    <Box width="100%">
      <Heading mb={5} as="h2" size="xl" fontWeight="medium">
        Latest Projects
      </Heading>
      <Divider borderWidth="1.5px" borderColor="#000" mb="12px" />
     { !token ? <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify
      </a> : <Button onClick={logout}>Logout</Button>}
    </Box>
  );
};

export default SpotifyPlaylist;
