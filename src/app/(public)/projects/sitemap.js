import { store } from "@/lib/store";
import { fetchPosts } from "./postsSlice";

// Function to fetch project data using Redux (assuming project data includes ID and date)
async function fetchProjects() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  return articles
}

function getBaseUrl() {
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    } else {
      // Provide a default base URL if not in development
      return "https://matteo-dirollo.com"; // Replace with your production URL
    }
  }
  

  export async function generateSitemaps() {
  const projects = await fetchProjects();

  // Check if project data is available before generating sitemap
  if (!projects || projects.length === 0) {
    console.warn('No project data found for sitemap generation.');
    return [];
  }

  // Efficiently map projects to SitemapItem objects for Next.js Sitemap Generator
  return projects.map((project) => ({
    url: `${getBaseUrl()}/${project.id}`,
    lastModified: project.date.toISOString(), // Ensure valid format for lastModified
  }));
}
