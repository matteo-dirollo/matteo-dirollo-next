// app/projects/sitemap.js

import { store } from "@/lib/store";
import { getBaseUrl } from "@/lib/utils";
import { fetchPosts } from "./postsSlice";

export async function generateSitemaps() {
  // Fetch all project data to determine how many sitemaps are needed
  const projects = await fetchProjects();
  const sitemapSize = 50000; // Google’s limit for URLs per sitemap
  const numberOfSitemaps = Math.ceil(projects.length / sitemapSize);

  // Generate sitemap IDs based on the number of sitemaps needed
  return Array.from({ length: numberOfSitemaps }, (_, id) => ({ id }));
}

async function fetchProjects() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  return articles;
}

export default async function sitemap({ id }) {
  const projects = await fetchProjects();
  const sitemapSize = 50000;
  const start = id * sitemapSize;
  const end = start + sitemapSize;
  const slicedProjects = projects.slice(start, end);

  if (!slicedProjects.length) {
    console.warn('No project data found for this sitemap ID.');
    return [];
  }

  const baseUrl = getBaseUrl();

  return slicedProjects.map((project) => {
    const lastModified = new Date(project.date).toISOString();

    if (!project.id) {
      console.warn(`Project with missing or invalid ID found: ${JSON.stringify(project)}`);
      return null;
    }

    return {
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  }).filter(Boolean); // Remove any null values
}
