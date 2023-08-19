import { store } from "@/lib/store";
import React from "react";
import { fetchPosts } from "./postsSlice";
import ArticleCards from "./ArticleCards";



export default async function Blog() {
  await store.dispatch(fetchPosts());
  const articles = store.getState().posts.posts;
  const plainArticles = articles.map((article) => {
    let modifiedArticle = { ...article };

    modifiedArticle.date = new Date(
      article.date.seconds * 1000 + article.date.nanoseconds / 1000000
    ).toLocaleDateString();
    modifiedArticle.body = JSON.parse(article.body);

    return modifiedArticle;
  });

  return <ArticleCards articles={plainArticles} />;
}
