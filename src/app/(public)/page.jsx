import React from "react";
import { fetchUsers } from "@/api/auth/authSlice";
import HeroSection from "@/components/layout/HeroSection/HeroSection";
import Services from "@/components/layout/Services/Services";

import { store } from "@/lib/store";
import { Box, VStack } from "@/styles/ChakraImports";
import PostsCards from './../../components/layout/Posts/PostsCards';
import { fetchPosts } from "./blog/postsSlice";
import SpotifyPlaylist from "@/components/layout/Spotify/SpotifyPlaylist";

export async function generateMetadata() {
  const description =
    "I'm a versatile freelance graphic designer with a passion for crafting graphics and illustrations. I also offer services in photo editing, background removal, and the creation of 2D and 3D animations. Beyond design, I can code for React/Next web applications and edit videos. I'm always eager to take on new design challenges and open to any project propositions. Let's work together to bring your ideas into visual form.";
  const image =
    "https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Blog%2Fcovers%2Flosange.00_00_00_00.Still001.jpg2f3da30f-7490-46ff-916e-68aa65c2de6f?alt=media&token=a7a14880-77ed-4e61-8113-25ae6b0b4950";
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
        <SpotifyPlaylist />
      </VStack>
    </Box>
  );
}
