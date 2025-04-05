"use client";
import React, { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/ui/buttons/Pagination";
import _ from "lodash";

const ArticleCards = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderCards = currentPosts.map((article) => (
    <article
      key={article.date}
      className="max-w-[250px] m-[5px] flex flex-col"
    >
      <Link
        href={`/projects/${article.id}`}
        className="hover:no-underline"
      >
        <p className="text-purple-600 text-sm font-bold">
          {_.first(article.category)}
        </p>
        <h2 className="text-gray-700 dark:text-gray-100 text-xl font-bold">
          {article.title}
        </h2>
        <p className="text-xs text-gray-700 dark:text-gray-100">
          {article.date}
        </p>
        <div
          className="w-[250px] h-[250px] bg-cover bg-center my-5"
          style={{ backgroundImage: `url(${article.imageUrl})` }}
        />
      </Link>
    </article>
  ));
  return (
    <section className="w-[80%] mx-auto my-10 min-h-[100vh]">
      <h2 className="my-10 text-gray-700 dark:text-gray-100 text-2xl font-bold">
        Latest Projects
      </h2>
      <div className="w-full mx-0 flex justify-center">
        <div className="max-w-full mx-auto flex flex-wrap justify-evenly gap-5">
          {renderCards}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={articles.length}
          paginate={paginate}
          active={currentPage}
        />
      </div>
    </section>
  );
};

export default ArticleCards;
