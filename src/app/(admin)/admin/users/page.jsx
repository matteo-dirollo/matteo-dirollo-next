// c:\Users\Matteo Di Rollo\Desktop\Coding\matteo-dirollo-next\src\app\(admin)\admin\users\page.jsx
"use client";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "@/api/asyncSlice";
import { db } from "@/api/firebase-config";
import { Divider } from "@heroui/react";

const UsersInfo = () => {
  const [docs, setDocs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserMsg() {
      dispatch(asyncActionStart());
      const data = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setDocs(data);
        dispatch(asyncActionFinish());
      } catch (error) {
        dispatch(asyncActionError(error));
        console.error("Error getting documents: ", error);
      }
    }

    fetchUserMsg();

    const timeInterval = setTimeout(() => {
      fetchUserMsg();
    }, 300000);

    return () => {
      clearTimeout(timeInterval);
    };
  }, [dispatch]);

  const displayUsers = docs.map((user, index) => {
    const key = user.id || index;
    return (
      <div key={key}>
        <li className="py-4">
          <div className="flex flex-wrap items-start gap-6">
            <div className="p-[5px] min-w-[40px] min-h-[40px]">
              <p className="mt-2 text-sm text-gray-400">{index + 1}</p>
            </div>

            <div className="p-[5px] min-w-[90px] min-h-[40px]">
              <p className="text-xs text-gray-400">Displayname</p>
              <p className="text-base">{user.displayName}</p>
            </div>

            <div className="p-[5px] min-w-[90px] min-h-[40px]">
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-base">{user.email}</p>
            </div>

            <div className="p-[5px] min-w-[90px] min-h-[40px]">
              <p className="text-xs text-gray-400">Created on</p>
              <p className="text-base">
                {user.createdOn?.toDate
                  ? user.createdOn.toDate().toLocaleDateString()
                  : String(user.createdOn)}
              </p>
            </div>

            <div className="p-[5px] min-w-[90px] min-h-[40px]">
              <p className="text-xs text-gray-400">uid</p>
              <p className="text-base break-all">{user.userId}</p>
            </div>
          </div>
        </li>

        {index < docs.length - 1 && <Divider />}
      </div>
    );
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <p className="text-sm font-bold text-gray-600 mb-4">All users</p>
      <ul className="space-y-0">{displayUsers}</ul>
      <p className="text-sm font-bold text-gray-600 mt-8">Online</p>
    </div>
  );
};

export default UsersInfo;
