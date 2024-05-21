
import { fetchPosts } from "@/app/(public)/projects/postsSlice";
import { store } from "@/lib/store";

// Function to fetch project IDs using Redux
async function fetchProjectIds() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  return articles.map(article => article.id);
}

export default async function sitemap() {
  // Fetch dynamic project IDs
  const projectIds = await fetchProjectIds();

  // Static sitemap entries
  const staticEntries = [
    {
      url: 'https://matteo-dirollo.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `https://matteo-dirollo.com/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `https://matteo-dirollo.com/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // Dynamic project entries
  const projectEntries = projectIds.map(id => ({
    url: `https://matteo-dirollo.com/projects/${id}`,
    lastModified: new Date(),  // You can customize this if you have individual lastModified dates for each project
    changeFrequency: 'monthly', // Adjust as necessary
    priority: 0.7,  // Adjust as necessary
  }));

  // Combine static and dynamic entries
  const allEntries = [...staticEntries, ...projectEntries];

  // Convert entries to XML format
  return generateSitemapXml(allEntries);
}

function generateSitemapXml(entries) {
  const urls = entries.map(entry => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified}</lastmod>
      <changefreq>${entry.changeFrequency}</changefreq>
      <priority>${entry.priority}</priority>
    </url>`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;
}


