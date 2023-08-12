import Comments from "@/components/ui/comments/Comments";
import PlainEditor from "@/components/ui/lexicalEditor/PlainEditor";
import { store } from "@/lib/store";
import _ from 'lodash';
import {
  Box,
  Container,
  Divider,
  HStack,
  Heading,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { GoShare } from "react-icons/go";
import { fetchPosts } from "../postsSlice";

export default function PostId() {
    store.dispatch(fetchPosts());
  return (
    <Container
      my={10}
      align="stretch"
      maxW={["fit-content", "80%"]}
      style={{ overflowX: "hidden" }}
    >
      <Box as="article" key={""}>
        
        <Text color={textColor} fontSize="xs">
          {article.author} | {_.first(article.category)} |{" "}
          {new Date(
            article.date.seconds * 1000 + article.date.nanoseconds / 1000000
          ).toLocaleDateString()}
        </Text>
        <Box
          w="100%"
          minH={"500"}
          sx={{
            backgroundImage: `url(${article.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          mt={5}
          mb={5}
        />
        <PlainEditor stateInstance={article.body} />
      </Box>

      <Divider my={10} />
      <HStack mb={50}>
        <IconButton
          aria-label=""
          borderRadius={"50%"}
          fontSize={"1.3em"}
          color={"white"}
          bg={"teal.400"}
          size="lg"
          icon={<GoShare />}
          onClick={() => {
            dispatch(openModal({ modalType: "ShareOnSocials" }));
          }}
          _hover={{
            bg: "yellow.300",
          }}
        />

        <Spacer />
        {"renderTags"}
      </HStack>

      <Comments articleId={article.id} comments={comments} />
      <br />

      {cards.length > 0 && (
        <Box>
          <Heading mb={5} as="h2" size="md">
            More Posts
          </Heading>
          <HStack mb={5}>{renderPosts}</HStack>
        </Box>
      )}
    </Container>
  );
}
