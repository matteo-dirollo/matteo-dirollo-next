'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObject, clearStorage, selectLoading } from '../../../api/firestore/storageSlice';
import {
  appLoaded,
  asyncActionFinish,
  asyncActionStart,
} from '../../../api/asyncSlice';
import LoadingSpinner from '@/components/ui/loaders/LoadingSpinner';

const BackgroundVideo = () => {
  const dispatch = useDispatch();
  const desiredObjectName = 'Videos/losange-derniere.mp4';
  const loading = useSelector(selectLoading);
  const videoUrl = useSelector((state) => {
    const desiredObject = state.storage.objectData[desiredObjectName];
    return desiredObject ? desiredObject : null;
  });

  useEffect(() => {
    // Fetch objects using the fetchObjects action from the storageSlice
    const fetchObjectsFromStorage = async () => {
      try {
        dispatch(asyncActionStart());
        dispatch(clearStorage());
        await dispatch(fetchObject(desiredObjectName));

        dispatch(asyncActionFinish());
        dispatch(appLoaded());
      } catch (error) {
        console.log(error);
      }
    };

    fetchObjectsFromStorage();
  }, [dispatch]);

  return (
    <div className="relative w-full min-h-[20vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[80vh] overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        {!loading ? (
          <motion.video
            autoPlay
            loop
            muted
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </motion.video>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <div className="z-10 flex justify-center items-center">
        <div className="max-w-[300px] sm:max-w-[450px] md:max-w-[600px]">
          <h1 className="text-white font-bold leading-tight text-3xl sm:text-4xl lg:text-8xl">
            <span className="relative">
              Freelance
              <span className="absolute bottom-1 left-0 w-full h-[30%] bg-teal-400 -z-10"></span>
            </span>
            <br />
            <span className="text-white">Graphic Designer & Creative</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
