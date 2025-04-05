"use client";
import React from "react";
import _ from "lodash";

export default function Subtitle({ article }) {
  return (
    <p className="text-xs text-gray-700 dark:text-gray-100">
      {article.author} | {_.first(article.category)} | {article.date}
    </p>
  );
}
