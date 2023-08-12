import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function MorePosts({ article }) {
  const posts = useSelector(selectAllPosts);
  const cards = useMemo(
    () => _.filter(posts, (post) => post !== article),
    [posts, article]
  );
  const renderPosts = _.slice(cards, 0, 3).map((card) => (
    <React.Fragment key={card.id}>
      <VStack justify="start">
        <Link
          href={`/blog/${card.id}`}
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
      {cards.length > 0 && (
        <Box>
          <Heading mb={5} as="h2" size="md">
            More Posts
          </Heading>
          <HStack mb={5}>{renderPosts}</HStack>
        </Box>
      )}
    </div>
  );
}

export default MorePosts;
