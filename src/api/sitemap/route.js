import { store } from "@/lib/store";
import { fetchPosts } from "./(public)/projects/postsSlice";

// Function to fetch project IDs using Redux
async function fetchProjectIds() {
    await store.dispatch(fetchPosts());
    const articles = store.getState().posts.posts;
    return articles.map(article => article.id);
  }
  
  export default async function sitemap(req, res) {
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
  
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemapXml);
  }