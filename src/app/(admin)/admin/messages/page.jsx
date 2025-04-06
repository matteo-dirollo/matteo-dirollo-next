'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/api/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '@/api/asyncSlice';

const Messages = () => {
  const [docs, setDocs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserMsg() {
      dispatch(asyncActionStart());
      const data = [];
      await getDocs(collection(db, 'Contact_Form'))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          dispatch(asyncActionFinish());
        })
        .catch((error) => {
          dispatch(asyncActionError(error));
          console.log('Error getting documents: ', error);
        });
      setDocs(data);
    }
    fetchUserMsg();
    const timeInterval = setTimeout(() => {
      fetchUserMsg();
    }, 300000);
    return () => {
      clearTimeout(timeInterval);
    };
  }, [dispatch]);

  const renderUserMessages = docs.map((message, index) => {
    return (
      <React.Fragment key={index}>
        <li className="flex flex-wrap items-start gap-6 border-b border-gray-200 py-4">
          <div className="p-1 min-w-max">
            <p className="text-sm text-gray-400">{index + 1}</p>
          </div>
          <div className="p-1 min-w-[90px]">
            <p className="text-xs text-gray-400">Name</p>
            <p className="text-md">{message.name}</p>
          </div>
          <div className="p-1 min-w-[120px]">
            <p className="text-xs text-gray-400">Last Name</p>
            <p className="text-md">{message.surname}</p>
          </div>
          <div className="p-1 min-w-[300px]">
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-md">{message.email}</p>
          </div>
          <div className="p-1 min-w-[180px]">
            <p className="text-xs text-gray-400">Message</p>
            <p className="text-md">{message.message}</p>
          </div>
        </li>
      </React.Fragment>
    );
  });

  return (
    <div>
      <p className="text-sm font-bold text-gray-600">Contact Form</p>
      <ul className="divide-y divide-gray-200 p-4">{renderUserMessages}</ul>
    </div>
  );
};

export default Messages;
