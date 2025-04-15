"use client";
import React from "react";
import { useField } from "formik";
import { Textarea } from "@heroui/react";

export default function TextareaInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="w-full flex flex-col gap-3">
      <Textarea
        label={label}
        labelPlacement="outside"
        placeholder="Enter your text here..."
        className="max-w-full"
        isInvalid={meta.touched && !!meta.error}
        errorMessage={meta.touched && meta.error ? meta.error : undefined}
        {...field}
        {...props}
      />
    </div>
  );
}
