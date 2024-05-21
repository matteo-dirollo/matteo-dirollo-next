import { fetchPosts } from "@/app/(public)/projects/postsSlice";
import { store } from "@/lib/store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
async function generateSitemap() {
  try {
    // Fetch dynamic project IDs
    const projectIds = await fetchProjectIds();
    console.log("Project IDs:", projectIds);

    // Static sitemap entries
    const staticEntries = [
      {
        url: `${BASE_URL}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${BASE_URL}/projects`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ];

    // Dynamic project entries
    const projectEntries = projectIds.map(id => ({
      url: `${BASE_URL}projects/${id}`,
      lastModified: new Date().toISOString(), // Use ISO string format
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    console.log("Project Entries:", projectEntries);

    // Combine static and dynamic entries
    const allEntries = [...staticEntries, ...projectEntries];

    // Convert entries to XML format
    const sitemapXml = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allEntries
          .map(entry => `
            <url>
              <loc>${entry.url}</loc>
              <lastmod>${entry.lastModified}</lastmod>
              <changefreq>${entry.changeFrequency}</changefreq>
              <priority>${entry.priority}</priority>
            </url>
          `)
          .join('')}
      </urlset>
    `.trim();

    return sitemapXml;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return '';
  }
}

// API route handler to serve the sitemap
export default async function handler(req, res) {
  try {
    const sitemapXml = await generateSitemap();
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemapXml);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).send('Internal Server Error');
  }
}
