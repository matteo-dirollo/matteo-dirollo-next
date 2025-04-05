"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPosts,
  fetchPosts,
  getPostsStatus,
} from "@/app/(public)/projects/postsSlice";
import _ from "lodash";

const PostsCards = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  const renderCards = _.slice(posts, 0, 3).map((post) => (
    <div key={post.id} className="flex-1 w-full">
      <div className="flex flex-col justify-start items-stretch">
        <Link href={`/projects/${post.id}`} className="hover:no-underline">
          <div
            className="w-full h-[250px] bg-cover bg-center"
            style={{ backgroundImage: `url(${post.imageUrl})` }}
          />
        </Link>
        <p className="mb-2 text-lg font-bold">{post.title}</p>
      </div>
    </div>
  ));

  return (
    <div className="w-full">
      <h2 className="mb-5 text-xl font-medium">Latest Projects</h2>
      <div className="border-b-2 border-black mb-8" />
      {isDesktop ? (
        <div className="flex justify-center space-x-6 mb-5">
          {renderCards}
        </div>
      ) : (
        <div className="flex flex-col my-5">{renderCards}</div>
      )}
    </div>
  );
};

const useBreakpointValue = (values) => {
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
  return isDesktop ? values.md : values.base;
};

export default PostsCards;
