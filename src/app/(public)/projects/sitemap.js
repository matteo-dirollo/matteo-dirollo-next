import { fetchPosts } from "./postsSlice";
import { store } from "@/lib/store";

// Function to fetch project IDs using Redux
async function fetchProjectIds() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  return articles.map(article => article.id);
}

export async function generateSitemaps() {
    const projects = fetchProjectIds()
    return projects;
  }

export default function sitemap({projects}) {
    return projects.map((project) => ({
        url: `https://matteo-dirollo.com/projects/${id}`,
        lastModified: project.date,
      }))
  }