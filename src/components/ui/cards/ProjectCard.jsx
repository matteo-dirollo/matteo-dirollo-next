// src/components/ui/cards/ProjectCard.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Image } from "@heroui/react";
import NextImage from "next/image"; // Import if using as={NextImage}
import _ from "lodash";

const ProjectCard = ({ post }) => {
  // State is now specific to *this* card instance
  const [isHovering, setIsHovering] = useState(false);

  // Determine if NextImage should be used
  // Set to true if you resolved the timeout issue and want optimizations,
  // otherwise false to use a standard img tag via HeroUI.
  const useNextImage = false; // <-- Adjust as needed

  return (
    // The key is now applied in the parent component's map function
    <article className="max-w-[250px] m-[5px]">
      <Link
        href={`/projects/${post.id}`}
        // Removed shadow-md from this className
        className="block rounded overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Text content container */}
        <div className="p-3">
          {/* Apply hover styles conditionally based on this card's state */}
          <p className={`text-sm text-purple-600 font-semibold transition-colors duration-150 ${isHovering ? 'text-purple-300' : ''}`}>
            {_.first(post.category)}
          </p>
          <h2 className={`text-xl text-gray-700 dark:text-gray-100 font-medium mt-1 transition-colors duration-150 ${isHovering ? 'text-gray-500' : ''}`}>
            {post.title}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {post.date?.seconds
              ? new Date(
                  post.date.seconds * 1000 + post.date.nanoseconds / 1000000
                ).toLocaleDateString()
              : "Invalid Date"}
          </p>
        </div>

        {/* Image component */}
        <Image
          // isZoomed is now controlled by this card's specific isHovering state
          isZoomed={isHovering}
          alt={post.title || "Project image"} // Use title for alt text
          as={useNextImage ? NextImage : undefined}
          width={250}
          height={250}
          // Simplified className - HeroUI's isZoomed should handle transitions
          className="object-cover" // object-cover is good practice
          src={post.imageUrl}
        />
      </Link>
    </article>
  );
};

export default ProjectCard;
