'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const CheckAuth = ({children}) => {
    const isAdmin = useSelector(
        (state) => state.auth.currentUser.role === "admin"
      );
    
      const router = useRouter();
    
      if (!isAdmin) {
        router.push("/");
        return null;
      }
  return (
    <div>{children}</div>
  )
}

export default CheckAuth