import { fetchPosts } from "@/app/(public)/projects/postsSlice";
import { store } from "@/lib/store";

// Function to fetch project IDs using Redux
async function fetchProjectIds() {
  try {
    await store.dispatch(fetchPosts());
    const articles = store.getState().posts.posts;
    console.log("Fetched articles:", articles);
    return articles.map(article => article.id);
  } catch (error) {
    console.error("Error fetching project IDs:", error);
    return [];
  }
}

// Function to generate the sitemap
export default async function sitemap() {
  try {
    // Fetch dynamic project IDs
    const projectIds = await fetchProjectIds();
    console.log("Project IDs:", projectIds);

    // Static sitemap entries
    const staticEntries = [
      {
        url: 'https://matteo-dirollo.com',
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `https://matteo-dirollo.com/projects`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `https://matteo-dirollo.com/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ];

    // Dynamic project entries
    const projectEntries = projectIds.map(id => ({
      url: `https://matteo-dirollo.com/projects/${id}`,
      lastModified: new Date().toISOString(), // Use ISO string format
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    console.log("Project Entries:", projectEntries);

    // Combine static and dynamic entries
    const allEntries = [...staticEntries, ...projectEntries];

    // Convert entries to XML format
    const sitemapXml = generateSitemapXml(allEntries);
    console.log("Generated Sitemap XML:", sitemapXml);

    return sitemapXml;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return '';
  }
}

// Function to convert entries to XML format
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
