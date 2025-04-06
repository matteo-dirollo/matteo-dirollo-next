"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import _ from "lodash";
import { deleteComment, fetchComments } from "@/app/(public)/projects/postsSlice";

const Comments = ({ article }) => {
  const comments = article.comments ? Object.values(article.comments) : [];
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchComments(article.id));
  }, [dispatch, article]);

  const handleDelete = (commentId) => {
    try {
      dispatch(deleteComment({ postId: article.id, commentId }));
    } catch (error) {
      console.log(error);
    }
  };

  const sortedComments = _.orderBy(comments, "timestamp", "desc");

  const renderComments = sortedComments.map((comment, index) => {
    return (
      <div key={index} className="mb-2">
        <CommentItem comment={comment} handleDelete={handleDelete} />
      </div>
    );
  });

  return (
    <div>
      {(authenticated || comments.length > 0) && (
        <h2 className="my-5 text-md font-bold">Comments</h2>
      )}

      {authenticated && <CommentForm articleId={article.id} />}
      {comments.length > 0 ? renderComments : null}
    </div>
  );
};

export default Comments;
