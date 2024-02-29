"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchPosts,
  fetchSinglePost,
  getPostsStatus,
  selectAllPosts,
  selectedPost,
} from "@/app/(public)/projects/postsSlice";
import _ from "lodash";
import {
  Box,
  Button,
  Divider,
  HStack,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { openModal } from "@/components/ui/modals/modalSlice";
import { toggleThirdPanel } from "./panelSlice";

const EditPostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);

  const onSubmit = (postId) => {
    if (postId) {
      dispatch(deletePost(postId));
    }
  };

  const onEdit = (post) => {
    if (post) {
      dispatch(fetchSinglePost(post.id));
      dispatch(openModal({ modalType: 'ModifyPost', modalProps: { post } }));
      dispatch(toggleThirdPanel());
    }
  };

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  const renderPosts = posts.map((post, index) => (
    <Box key={index}>
      <ListItem>
        <HStack>
          <Box minW={5}>
            <Text fontSize="sm">{index + 1}</Text>
          </Box>
          <Box minW="250px">
            <Text fontSize="md">{_.truncate(post.title, { length: 25 })}</Text>
          </Box>
          <Box minW="150px">
            <Text mx="20px" fontSize="xs">
              {new Date(
                post.date.seconds * 1000 + post.date.nanoseconds / 1000000
              ).toLocaleDateString()}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs">{post.author}</Text>
          </Box>
        </HStack>
        <Box mt="5px" ml="25px">
          <Button
            onClick={() => {
              onEdit(post);
            }}
            leftIcon={<EditIcon />}
            colorScheme="blue"
            mx="3px"
            size="xs"
          >
            Modify
          </Button>
          <Button
            onClick={() => {
              onSubmit(post.id);
            }}
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            mx="3px"
            size="xs"
          >
            Delete
          </Button>
        </Box>
      </ListItem>
      <Divider pt={3} />
    </Box>
  ));

  return <List spacing={3}>{renderPosts}</List>;
};

export default EditPostList;
