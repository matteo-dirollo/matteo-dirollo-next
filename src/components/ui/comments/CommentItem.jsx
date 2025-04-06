"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  getCurrentUserFromState,
  getUserById,
} from '../../../api/auth/authSlice';

const CommentItem = ({ comment, handleDelete }) => {
  const user = useSelector((state) => getUserById(state, comment?.uid));
  const currentUser = getCurrentUserFromState();
  const isCurrentUserComment = currentUser && currentUser.uid === comment.uid;
  const dispatch = useDispatch();

  useEffect(() => {
    if (comment) {
      dispatch(fetchUsers());
    }
  }, [dispatch, comment]);

  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={user ? user.photoURL : ''}
          alt={user ? user.displayName : ''}
        />
      </div>
      <div className="ml-2">
        <p className="text-sm font-bold">{user ? user.displayName : ''}</p>
        <p className="text-xs">{comment.comment}</p>
      </div>
      <div className="ml-10">
        {isCurrentUserComment && (
          <button
            type="button"
            onClick={() => handleDelete(comment.id)}
            className="text-xs text-blue-500 hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
