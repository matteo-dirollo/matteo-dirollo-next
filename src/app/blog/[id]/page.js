import { store } from "@/lib/store";
import { fetchSinglePost } from "../postsSlice";
import Post from './Post';

export default async function Article({ params }) {
  await store.dispatch(fetchSinglePost(params.id));
  return (
    <div>
      <Post params={params} article={store.getState().posts.currentPost}/>
    </div>
  );
}
