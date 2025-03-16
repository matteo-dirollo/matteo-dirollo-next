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

    return {
      url: `${getBaseUrl()}/projects/${item.id}`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 1,
      // For language alternates
      alternates: {
        languages: {
          en: `${getBaseUrl()}/en/projects/${item.id}`,
          // Add other languages as needed
        },
      },
      // For images
      images: [item.imageUrl],
    };
  });

  const post = await Promise.all(postPromises);

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

  return [...staticPages, ...post];
}
