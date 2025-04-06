"use client";
import { Tabs, Tab } from "@heroui/tabs";
import React, { useState } from "react";
import AddPostForm from "./AddPostForm";
import EditPostList from "./EditPostsList";
import ModifyPost from "./ModifyPost";
// import {usePathname} from "next/navigation";

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  // const pathname = usePathname();

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Posts Management">
        <Tab key="add-post" title="Add new post">
          <AddPostForm />
        </Tab>
        <Tab key="posts-list" title="Posts list">
          <EditPostList onSelectPost={setSelectedPost} />
        </Tab>
        {selectedPost && (
          <Tab key="modify-post" title="Modify">
            <ModifyPost setSelectedPost={setSelectedPost} post={selectedPost} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default Posts;
