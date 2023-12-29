"use client";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Divider,
  useBreakpointValue
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
  const isDesktop = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);


  const renderCards = _.slice(posts, 0, 3).map((post)=>(

 
      <Box key={post.id} flex="1">
        <VStack justify="start" align='stretch' >
          <Link
           
            href={`/blog/${post.id}`}
            sx={{ "a:hover": { textDecoration: "none" } }}
          >
            <Box
              boxSize="250px"
              w='full'
              sx={{
                backgroundImage: `url(${post.imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </Link>
          <Text
              mb="8px"
             fontSize="lg" fontWeight="bold"
            >
              {post.title}
            </Text>
        </VStack>
      </Box>

  ));

  return (
    <Box width='100%'>
          <Heading mb={5} as="h2" size="xl" fontWeight='medium'>
            Latest Projects
          </Heading>
          <Divider borderWidth='1.5px' borderColor='#000' mb='34px' />
          {isDesktop ? (
        <HStack justifyContent="center" spacing="6" mb={5}>{renderCards}</HStack>
      ) : (
        <VStack my={5} >{renderCards}</VStack>
      )}
        </Box>
  );
};

export default PostsCards;
