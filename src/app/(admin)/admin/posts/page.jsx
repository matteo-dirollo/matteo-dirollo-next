"use client";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";
import AddPostForm from "./AddPostForm";
import EditPostList from "./EditPostsList";
import { useSelector } from "react-redux";
import ModifyPost from "./ModifyPost";
import { selectThirdPanelVisibility } from "./panelSlice";

const Posts = () => {
  // const showThirdPanel = useSelector(selectThirdPanelVisibility);
  const [selectedPost, setSelectedPost] = useState(null);
  return (
    <div>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Add new post</Tab>
          <Tab>Posts list</Tab>
          {selectedPost && <Tab>Modify</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <AddPostForm />
          </TabPanel>
          <TabPanel>
            <EditPostList onSelectPost={setSelectedPost} />
          </TabPanel>
          {selectedPost ? (
            <TabPanel>
              <ModifyPost setSelectedPost={setSelectedPost} post={selectedPost} />
            </TabPanel>
          ) : null}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Posts;
