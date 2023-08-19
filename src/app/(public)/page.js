import React from "react";
import { fetchUsers } from "@/api/auth/authSlice";
import BackgroundVideo from "@/components/layout/BackgroundVideo/BackgroundVideo";
import Services from "@/components/layout/Services/Services";

import { store } from "@/lib/store";
import { Box, VStack } from '@/styles/ChakraImports';

export async function generateMetadata() {
  const description = "I'm a freelance graphic designer specializing in creating captivating graphics, stunning illustrations, and mesmerizing animations. Let's bring your ideas to life with unique and eye-catching visual designs.";
  return {
    title: {
      template: '%s | MdR',
      default: 'MdR', 
    },
    description: description,
    openGraph: {
      title: {
        template: '%s | MdR',
        default: 'MdR', 
      },
      description: description,
      keywords: ['graphic design', 'video editing', 'web design'],
      url: `https:/matteo-dirollo.com`,
      siteName: "Matteo's Portfolio & Blog",
      images: [
        {
          url: 'https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Blog%2Fcovers%2Flosange.00_00_00_00.Still001.jpg2f3da30f-7490-46ff-916e-68aa65c2de6f?alt=media&token=a7a14880-77ed-4e61-8113-25ae6b0b4950',
          width: 800,
          height: 600,
        },
        {
          url: 'https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Blog%2Fcovers%2Flosange.00_00_00_00.Still001.jpg2f3da30f-7490-46ff-916e-68aa65c2de6f?alt=media&token=a7a14880-77ed-4e61-8113-25ae6b0b4950',
          width: 1800,
          height: 1600,
          alt: "",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: 'https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Blog%2Fcovers%2Flosange.00_00_00_00.Still001.jpg2f3da30f-7490-46ff-916e-68aa65c2de6f?alt=media&token=a7a14880-77ed-4e61-8113-25ae6b0b4950',
      title: {
        template: '%s | MdR',
        default: 'MdR', 
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
 
  return (
   
    <Box>
      <VStack justifyContent="center" alignItems="center">
        <BackgroundVideo />
        <Services />
        {/* <LatestPosts /> */}
      </VStack>
    </Box>
  );
}
