import { store } from "@/lib/store";
import { fetchPosts } from "../postsSlice";
import { Container } from "@chakra-ui/react";

export default async function Post() {
  await store.dispatch(fetchPosts());
  return (
    <div>
      <Container></Container>
    </div>
  );
}
