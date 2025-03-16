import { store } from "@/lib/store";
import { getBaseUrl } from "@/lib/utils";
import { fetchPosts, fetchSinglePost } from "./(public)/projects/postsSlice";
import _ from "lodash";

// Helper function to extract text from the article body (same as in page.jsx)
function extractTextNodes(content) {
  let texts = [];

  function traverse(node) {
    if (node.type === "text") {
      texts.push(node.text);
    } else if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(content);

  return texts;
}

export default async function sitemap() {
  await store.dispatch(fetchPosts());
  const projects = store.getState().posts.posts;

  const postPromises = projects.map(async (item) => {
    // Fetch the full post data to get the body
    await store.dispatch(fetchSinglePost(item.id));
    const fullPost = store.getState().posts.currentPost;

    // Extract and truncate the description
    let truncatedArticleDescription = "";
    if (fullPost.body) {
      const parsedBody = JSON.parse(fullPost.body);
      const articleBody = extractTextNodes(parsedBody.root);
      truncatedArticleDescription = _.truncate(articleBody.join(" "), {
        length: 150,
        omission: "...",
      });
    }

    const lastModified = new Date(
      (item.date?.seconds || 0) * 1000 + (item.date?.nanoseconds || 0) / 1000000
    ).toISOString();

    // Build the XML for a single post
    return `
      <url>
        <loc>${getBaseUrl()}/projects/${item.id}</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
        <news:news>
          <news:publication>
            <news:name>MDR</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${lastModified}</news:publication_date>
          <news:title>${item.title}</news:title>
          <news:keywords>${item.tags?.join(", ") || ""}</news:keywords>
        </news:news>
        <image:image>
          <image:loc>${item.imageUrl}</image:loc>
          <image:caption>${item.title}</image:caption>
        </image:image>
        <description>${escapeXml(truncatedArticleDescription)}</description>
      </url>
    `;
  });

  const postXml = await Promise.all(postPromises);

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

  const staticXml = staticPages.map((page) => {
    return `
      <url>
        <loc>${page.url}</loc>
        <lastmod>${page.lastModified}</lastmod>
        <changefreq>${page.changeFrequency}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `;
  });

  // Build the complete XML string
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${staticXml.join("")}
      ${postXml.join("")}
    </urlset>
  `;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

// Helper function to escape XML characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
    return c;
  });
}
