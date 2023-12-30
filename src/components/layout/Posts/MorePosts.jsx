"use client";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "@/app/(public)/projects/postsSlice";
import _ from "lodash";

const MorePosts = ({ article }) => {
  const posts = useSelector(selectAllPosts);
  const textColor = useColorModeValue("gray.700", "gray.100");
  const cards = useMemo(() =>{ 
     return _.filter(posts, (post) => post.id !== article.id)
  }, [posts, article]);
  const [morePosts, setMorePosts] = useState([]);

  useEffect(() => {
    if (cards) {
      setMorePosts(cards);
    }
  }, [article, cards]);

  const renderPosts = _.slice(morePosts, 0, 3).map((card) => (
    <React.Fragment key={card.id}>
      <VStack justify="start" align='stretch' w='100%'>
        <Link
          href={`/projects/${card.id}`}
          sx={{ "a:hover": { textDecoration: "none" } }}
        >
          <Text
            mb="8px"
            color={textColor}
            fontSize="14px"
            sx={{ lineHeight: "1.5 !important", fontWeight: "bold" }}
          >
            {card.title}
          </Text>
          <Box
            boxSize="250px"
            w={['250px','full']}
            sx={{
              backgroundImage: `url(${card.imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Link>
      </VStack>
    </React.Fragment>
  ));
  return (
    <div>
      {morePosts?.length > 0 && (
        <Box>
          <Heading mb={5} as="h2" size="md">
            More Posts
          </Heading>
          <HStack justifyContent="center" spacing="6" mb={5}>{renderPosts}</HStack>
        </Box>
      )}
    </div>
  );
};

export default MorePosts;
