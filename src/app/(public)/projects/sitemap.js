import { store } from "@/lib/store";
import { fetchPosts } from "./postsSlice";

// Function to fetch project data using Redux (assuming project data includes ID and date)
async function fetchProjects() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  return articles.map((article) => ({
    id: article.id,
    lastModified: article.date.toDate(), // Assuming 'date' exists in project data
  }));
}

module.exports.generateSitemaps = async function () {
  const projects = await fetchProjects();

  // Check if project data is available before generating sitemap
  if (!projects || projects.length === 0) {
    console.warn('No project data found for sitemap generation.');
    return [];
  }

  // Efficiently map projects to SitemapItem objects for Next.js Sitemap Generator
  return projects.map((project) => ({
    url: `https://matteo-dirollo.com/projects/${project.id}`,
    lastModified: project.lastModified.toISOString(), // Ensure valid format for lastModified
  }));
}
