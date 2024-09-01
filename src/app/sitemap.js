import { store } from "@/lib/store";
import { getBaseUrl } from "@/lib/utils";
import { fetchPosts } from "./(public)/projects/postsSlice";

export async function generateSitemaps() {
  // Fetch all project data to determine how many sitemaps are needed
  await store.dispatch(fetchPosts());
  const projects = store.getState().posts.posts;
  const sitemapSize = 50000; // Google’s limit for URLs per sitemap
  const numberOfSitemaps = Math.ceil(projects.length / sitemapSize);

  // Generate sitemap IDs based on the number of sitemaps needed
  return Array.from({ length: numberOfSitemaps }, (_, id) => ({ id }));
}

export default async function sitemap({ id }) {
  await store.dispatch(fetchPosts());
  const projects = store.getState().posts.posts;
  const sitemapSize = 50000;
  const start = id * sitemapSize;
  const end = start + sitemapSize;
  const slicedProjects = projects.slice(start, end);

  const post = projects.map((item) => ({
    url: `${getBaseUrl()}/projects/${item.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  console.log(articles);

  // if (!slicedProjects.length) {
  //   console.warn("No project data found for this sitemap ID.");
  //   return [];
  // }

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

  // const projectSitemapItems = projects
  //   .map((project) => {
  //     // Ensure the date is properly formatted
  //     const lastModified = new Date(project.date).toISOString();

  //     // Validate that project.id exists and is valid
  //     if (!project.id) {
  //       console.warn(
  //         `Project with missing or invalid ID found: ${JSON.stringify(project)}`
  //       );
  //       return null;
  //     }

  //     return {
  //       url: `${getBaseUrl()}/projects/${project.id}`,
  //       lastModified: lastModified,
  //       changeFrequency: "weekly", // Assuming this might change weekly
  //       priority: 0.7, // You can adjust priority as needed
  //     };
  //   })
  //   .filter(Boolean); // Remove any null values

  return [...staticPages];
}
