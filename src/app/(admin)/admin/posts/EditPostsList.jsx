"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchPosts,
  fetchSinglePost,
  getPostsStatus,
  selectAllPosts,
} from "@/app/(public)/projects/postsSlice";
import _ from "lodash";
import { toggleThirdPanel } from "./panelSlice";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { Button } from "@heroui/react";

const EditPostList = ({ onSelectPost }) => {
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
      dispatch(toggleThirdPanel());
      onSelectPost(post);
    }
  };

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  const renderPosts = posts.map((post, index) => (
    <div key={index}>
      <li className="flex flex-col py-2"> {/* Changed to flex-col */}
        <div className="flex items-center"> {/* Added a flex container for the top row */}
          <div className="w-5">
            <span className="text-sm">{index + 1}</span>
          </div>
          <div className="w-[250px]">
            <span className="text-md">
              {_.truncate(post.title, { length: 25 })}
            </span>
          </div>
          <div className="w-[150px]">
            <span className="mx-5 text-xs">
              {new Date(
                post.date.seconds * 1000 + post.date.nanoseconds / 1000000
              ).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-xs">{post.author}</span>
          </div>
        </div>
        <div id="buttons-container" className="flex gap-2 mt-2"> {/* Removed ml-6 */}
          <Button
            onPress={() => {
              onEdit(post);
            }}
            startContent={<MdEditNote size={18} />}
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded min-w-[100px]"
          >
            Modify
          </Button>
          <Button
            onPress={() => {
              onSubmit(post.id);
            }}
            startContent={<MdDeleteOutline size={18} />}
            className="flex items-center bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded min-w-[100px]"
          >
            Delete
          </Button>
        </div>
      </li>
      <hr className="my-3" />
    </div>
  ));

  return <ul className="space-y-3">{renderPosts}</ul>;
};

export default EditPostList;
