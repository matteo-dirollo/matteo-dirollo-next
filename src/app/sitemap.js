import { store } from "@/lib/store";
import { fetchPosts } from "./(public)/projects/postsSlice";

// Function to fetch project IDs using Redux
async function fetchProjectIds() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  return articles.map(article => article.id);
}

export default async function sitemap() {
  const projectIds = await fetchProjectIds();
  const projectUrls = projectIds.map(id => ({
    url: `https://matteo-dirollo.com/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://matteo-dirollo.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://matteo-dirollo.com/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://matteo-dirollo.com/contact',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...projectUrls, // Spread the project URLs into the sitemap array
  ];
}
