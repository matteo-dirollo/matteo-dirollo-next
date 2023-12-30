import React from "react";
import { fetchUsers } from "@/api/auth/authSlice";
import HeroSection from "@/components/layout/HeroSection/HeroSection";
import Services from "@/components/layout/Services/Services";

import { store } from "@/lib/store";
import { Box, VStack } from "@/styles/ChakraImports";
import PostsCards from './../../components/layout/Posts/PostsCards';
import { fetchPosts } from "./projects/postsSlice";
import SpotifyPlaylist from "@/components/layout/Spotify/SpotifyPlaylist";

export async function generateMetadata() {
  const description =
    "I'm a Graphic, Motion Designer & content creator. Available for freelance & collaborations.";
  const image =
    "https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return {
    title: {
      template: "%s | MdR",
      default: "MdR",
    },
    description: description,
    openGraph: {
      title: {
        template: "%s | MdR",
        default: "MdR",
      },
      description: description,
      keywords: ["graphic design", "video editing", "web design"],
      url: `https:/matteo-dirollo.com`,
      siteName: "Matteo's Portfolio & Blog",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
        {
          url: image,
          width: 1800,
          height: 1600,
          alt: "",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    openGraph: {
      title: {
        template: "%s | MdR",
        default: "MdR",
      },
      description: description,
      keywords: ["graphic design", "video editing", "web design"],
      url: "https:/matteo-dirollo.com",
      siteName: "Matteo's Portfolio",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
        {
          url: image,
          width: 1800,
          height: 1600,
          alt: "3D rendering of abstract shapes created with Blender Cycles, featuring a rotating losange.",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: image,
      title: {
        template: "%s | MdR",
        default: "MdR",
      },
      description: description,
      creator: "@matteodirollo",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      googleBotNews: {
        index: false,
      },
    },
  };
}

export default async function Home() {
  await store.dispatch(fetchUsers());
  await store.dispatch(fetchPosts());

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={20} >
      <VStack justifyContent="center" alignItems="center" maxW={'90%'} >
        <HeroSection />
        <Services my='100px'  />
        <PostsCards />
        {/* <SpotifyPlaylist /> */}
      </VStack>
    </Box>
  );
}
