"use client";
import React, {useState} from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Pagination from "@/components/ui/buttons/Pagination";

const ArticleCards = ({ articles }) => {
  const textColor = useColorModeValue("gray.700", "gray.100");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderCards = currentPosts.map((article) => (
    <Box maxW="250px" m="5px" as="article" key={article.date}>
      <Link
        href={`/blog/${article.id}`}
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
          {_.first(article.category)}
        </Text>
        <Heading fontSize="xl" color={textColor} as="h2" size="sm">
          {article.title}
        </Heading>
        <Text colorScheme={textColor} fontSize="xs">
          {article.date}
        </Text>
        <Box
          w="250px"
          h="250px"
          sx={{
            backgroundImage: `url(${article.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          my={5}
        />
      </Link>
    </Box>
  ));
  return (
    <Box w="80%" marginX="auto" my={10} minH={"100vh"} as="section">
      <Heading my={10} color={textColor}>
        Latest Projects
      </Heading>
      <Box w="100%" mx="0 auto" display="flex" justifyContent="center">
        <Flex
          maxW="intrinsic"
          mx="auto"
          flexWrap="wrap"
          justifySelf="stretch"
          justify="space-evenly"
          spacing="30px"
        >
          {renderCards}
        </Flex>
      </Box>
      <Center>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={articles.length}
          paginate={paginate}
          active={currentPage}
        />
      </Center>
    </Box>
  );
};

export default ArticleCards;
