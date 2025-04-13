// c:\Users\Matteo Di Rollo\Desktop\Coding\matteo-dirollo-next\src\app\(public)\projects\page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsStatus, selectAllPosts } from "./postsSlice";
// Removed lodash import
import Pagination from "@/components/ui/buttons/Pagination";
// Removed Link, Image, NextImage imports
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import ProjectCard from "@/components/ui/cards/ProjectCard"; // Import the new component

const Projects = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = Array.isArray(posts)
    ? posts.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  // Map over the posts and render the ProjectCard component for each
  const renderPosts = currentPosts.map((post) => (
    // Pass the unique key here
    <ProjectCard key={post.id || post.date} post={post} />
  ));

  if (postsStatus === "succeeded") {
    return (
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10 min-h-screen">
        <h1 className="my-10 text-3xl md:text-4xl text-gray-800 dark:text-gray-100 font-medium text-center">
          Latest Projects
        </h1>
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {renderPosts} {/* Render the list of ProjectCard components */}
          </div>
        </div>
        <div className="flex justify-center mt-12 mb-6">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={Array.isArray(posts) ? posts.length : 0}
            paginate={paginate}
            active={currentPage}
          />
        </div>
      </section>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default Projects;
