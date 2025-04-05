"use client";
import React from "react";
import { Spinner } from "@heroui/react";

const LoadingSpinner = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="flex items-center justify-center">
        <Spinner
          classNames={{ label: "text-foreground mt-4" }}
          label="wave"
          variant="wave"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
