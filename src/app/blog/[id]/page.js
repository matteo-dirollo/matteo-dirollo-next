import { store } from "@/lib/store";
import { fetchSinglePost } from "../postsSlice";
import Post from './Post';
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

export default async function Article({ params }) {
  await store.dispatch(fetchSinglePost(params.id));
  console.log(params);
  return (
    <div>
      <Post article={store.getState().posts.currentPost}/>
    </div>
  );
}
