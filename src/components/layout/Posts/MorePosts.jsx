"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "@/app/(public)/projects/postsSlice";
import _ from "lodash";

const MorePosts = ({ article }) => {
  const posts = useSelector(selectAllPosts);
  const [morePosts, setMorePosts] = useState([]);

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const cards = useMemo(() => {
    return _.filter(posts, (post) => post.id !== article.id);
  }, [posts, article]);

  useEffect(() => {
    if (cards) {
      setMorePosts(cards);
    }
  }, [article, cards]);

  const renderPosts = _.slice(morePosts, 0, 3).map((card) => (
    <div key={card.id} id="card" className="flex-shrink-0 w-full max-w-[250px]">
      <div className="flex flex-col justify-start items-stretch w-full">
        <Link href={`/projects/${card.id}`} className="hover:no-underline">
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-100 font-bold leading-tight">
            {card.title}
          </p>
          <div
            id="card-image"
            className="h-[250px] bg-cover bg-center aspect-square w-full max-w-[250px]"
            style={{ backgroundImage: `url(${card.imageUrl})` }}
          />
        </Link>
      </div>
    </div>
  ));
  return (
    <div>
      {morePosts?.length > 0 && (
        <>
          <h2 className="mb-5 text-xl font-semibold">More Posts</h2>
          <div
            className={`flex ${
              isDesktop ? "justify-center" : "justify-start"
            } space-x-3 md:space-x-6 mb-5 w-full overflow-x-auto`}
          >
            {renderPosts}
          </div>
        </>
      )}
    </div>
  );
};

const useBreakpointValue = (values) => {
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches;
  return isDesktop ? values.lg : values.base;
};

export default MorePosts;
