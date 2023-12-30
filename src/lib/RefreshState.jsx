import React, { useEffect, useState } from "react";
import { fetchComments, fetchPosts } from "../app/(public)/projects/postsSlice";
import { useDispatch } from "react-redux";
// import { fetchUsers } from "@/api/auth/authSlice";

export default function RefreshState({ children }) {
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts); // Adjust this selector based on your actual state structure
  // const comments = useSelector((state) => state.comments); // Adjust this selector based on your actual state structure
  // const users = useSelector((state) => state.users); // Adjust this selector based on your actual state structure
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    if (!dataLoaded) {
      dispatch(fetchPosts());
      dispatch(fetchComments());
      // dispatch(fetchUsers());
      setDataLoaded(true);
    }
  }, [dispatch, dataLoaded]);

  return <div>{children}</div>;
}
