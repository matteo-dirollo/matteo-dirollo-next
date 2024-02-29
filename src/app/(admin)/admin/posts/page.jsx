"use client";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import AddPostForm from "./AddPostForm";
import EditPostList from "./EditPostsList";
import { useSelector } from "react-redux";
import ModifyPost from "./ModifyPost";

const Posts = () => {
  const showThirdPanel = useSelector(selectThirdPanelVisibility);
  return (
    <div>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Add new post</Tab>
          <Tab>Posts list</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AddPostForm />
          </TabPanel>
          <TabPanel>
            <EditPostList />
          </TabPanel>
          {showThirdPanel && (
            <TabPanel>
              <ModifyPost />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Posts;
