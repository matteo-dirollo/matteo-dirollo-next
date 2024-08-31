import { store } from "@/lib/store";
import { fetchPosts } from './(public)/projects/postsSlice';

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  } else {
    // Provide a default base URL if not in development
    return "https://matteo-dirollo.com"; // Replace with your production URL
  }
}

// Function to fetch project data using Redux (assuming project data includes ID and date)
async function fetchProjects() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  return articles
}


export default async function sitemap() {
  const projects = await fetchProjects();
    // Check if project data is available before generating sitemap
    if (!projects || projects.length === 0) {
      console.warn('No project data found for sitemap generation.');
      return [];
    }
  return [
    {
      url: `${getBaseUrl()}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${getBaseUrl()}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${getBaseUrl()}/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}