import { fetchPosts } from "@/app/(public)/projects/postsSlice";
import { store } from "@/lib/store";


// Function to fetch project IDs using Redux
async function fetchProjectIds() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  return articles.map(article => article.id);
}

// API route handler for GET requests
export async function GET(req, res) {
  const projectIds = await fetchProjectIds();
  const projectUrls = projectIds.map(id => ({
    url: `https://matteo-dirollo.com/projects/${id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const urls = [
    {
      url: 'https://matteo-dirollo.com',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://matteo-dirollo.com/projects',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://matteo-dirollo.com/contact',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...projectUrls,
  ];

  const sitemapXml = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(url => `
          <url>
            <loc>${url.url}</loc>
            <lastmod>${url.lastModified}</lastmod>
            <changefreq>${url.changeFrequency}</changefreq>
            <priority>${url.priority}</priority>
          </url>
        `)
        .join('')}
    </urlset>
  `.trim();

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
