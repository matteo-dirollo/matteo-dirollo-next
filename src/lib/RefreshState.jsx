import React, { useEffect } from "react";
import { fetchComments, fetchPosts } from "../app/(public)/projects/postsSlice";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/api/auth/authSlice";

export default function RefreshState({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchComments());
        dispatch(fetchUsers())
    }, [dispatch])
    
  return <div>{children}</div>;
}
