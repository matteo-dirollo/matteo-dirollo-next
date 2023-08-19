import { store } from "@/lib/store";
import React from "react";
import { fetchPosts } from "./postsSlice";
import { Box, Text } from "@/styles/ChakraImports";
import Link from "next/link";
import CustomHeading from "@/components/ui/text/headings/CustomHeading";
import CustomText from "@/components/ui/text/body/CustomText";

export async function generateStaticParams() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;

  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    author: article.author,
    date: article.date,
    imageUrl: article.imageUrl,
    authorId: article.authorId,
    category: article.category,
    body: article.body,
    comments: article.comments,
  }));
}

export default function Blog({ params }) {
  
  return (
    <Box maxW="250px" m="5px" as="article" key={params.date}>
      <Link
        href={`/blog/${params.id}`}
        sx={{
          "a:hover": { textDecoration: "none", color: "green" },
        }}
      >
        <Text
          sx={{
            "p a:hover": { textDecoration: "none", color: "green" },
          }}
          as="b"
          fontSize="sm"
          color="purple.600"
        >
          {_.first(params.category)}
        </Text>
        <CustomHeading fontSize="xl" as="h2" size="sm">
          {params.title}
        </CustomHeading>
        <CustomText fontSize="xs" post={params.date} />
        <Box
          w="250px"
          h="250px"
          sx={{
            backgroundImage: `url(${params.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          my={5}
        />
      </Link>
    </Box>
  );
}
