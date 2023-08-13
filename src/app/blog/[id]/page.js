import { store } from "@/lib/store";
import { fetchPosts } from "../postsSlice";
import { Box,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
  VStack, } from "@/components/ChakraImports";

export default async function Post() {
  await store.dispatch(fetchPosts());
  return (
    <div>
      <Container minH='100vh'>Hello world</Container>
    </div>
  );
}
