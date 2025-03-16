import { store } from "@/lib/store";
import { getBaseUrl } from "@/lib/utils";
import { fetchPosts } from "./(public)/projects/postsSlice";


export default async function sitemap() {
  await store.dispatch(fetchPosts());
  const projects = store.getState().posts.posts;


  const post = projects.map((item) => ({

    url: `${getBaseUrl()}/projects/${item.id}`,
    lastModified: new Date(item.date?.seconds * 1000 || 0 + item.date?.nanoseconds / 1000000).toISOString(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  console.log(post)

  const staticPages = [
    {
      url: `${getBaseUrl()}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${getBaseUrl()}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${getBaseUrl()}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
   
  ];

  return [...staticPages, ...post];
}
