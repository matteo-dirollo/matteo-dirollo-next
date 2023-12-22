"use client";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Divider
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, fetchPosts, getPostsStatus } from "@/app/(public)/blog/postsSlice";
import _ from "lodash";

const PostsCards = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const textColor = useColorModeValue("gray.700", "gray.100");

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);


  const renderCards = _.slice(posts, 0, 3).map((post)=>(

 
      <Box key={post.id}>
        <VStack justify="start">
          <Link
            href={`/blog/${post.id}`}
            sx={{ "a:hover": { textDecoration: "none" } }}
          >
            <Text
              mb="8px"
              as="h3" fontSize="md" fontWeight="medium"
            >
              {post.title}
            </Text>
            <Box
              boxSize="250px"
              sx={{
                backgroundImage: `url(${post.imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </Link>
        </VStack>
      </Box>

  ));

  return (
    <Box width='100%'>
          <Heading mb={5} as="h2" size="xl" fontWeight='medium'>
            Latest Projects
          </Heading>
          <Divider borderWidth='1.5px' borderColor='#000' mb='12px' />
          <HStack mb={5}>{renderCards}</HStack>
        </Box>
  );
};

export default PostsCards;
