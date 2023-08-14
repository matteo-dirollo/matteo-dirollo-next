"use client";
import React from "react";
import { fetchUsers } from "@/api/auth/authSlice";
import BackgroundVideo from "@/components/layout/BackgroundVideo/BackgroundVideo";
import Services from "@/components/layout/Services/Services";
import { Box, VStack } from "@/styles/ChakraImports";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export async function generateMetadata({ params }) {
  console.log(params)
  await store.dispatch(fetchSinglePost(params.id));
  const article = store.getState().posts.currentPost;
  const parsedBody = JSON.parse(article.body);
  const articleBody = extractTextNodes(parsedBody.root);
  const truncatedArticleDescription = _.truncate(articleBody, {
    length: 150,
    omission: "...",
  });
  let modifiedArticle = { ...article };

  modifiedArticle.date = new Date(
    article.date.seconds * 1000 + article.date.nanoseconds / 1000000
  ).toLocaleDateString();
  modifiedArticle.body = JSON.parse(article.body);
  return {
    title: article.title,
    description: truncatedArticleDescription,
    openGraph: {
      title: article.title,
      description: truncatedArticleDescription,
      type: "article",
      keywords: article.category,
      publishedTime: modifiedArticle.date,
      authors: modifiedArticle.author,
      url: `https:/matteo-dirollo.com/blog/${params.id}`,
      siteName: "Matteo's Portfolio & Blog",
      images: [
        {
          url: article.imageUrl,
          width: 800,
          height: 600,
        },
        {
          url: article.imageUrl,
          width: 1800,
          height: 1600,
          alt: "",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: article.imageUrl,
      title: article.title,
      description: truncatedArticleDescription,
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

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <Box>
      <VStack justifyContent="center" alignItems="center">
        <BackgroundVideo />
        <Services />
        {/* <LatestPosts /> */}
      </VStack>
    </Box>
  );
};

export default Home;
