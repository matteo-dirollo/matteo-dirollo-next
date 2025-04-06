import React from 'react';
import { useField } from 'formik';
import { Input } from '@heroui/react';

export default function MyTextInput({
  label,
  placeholder,
  type = 'text',
  isRequired = false,
  description,
  size,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4 w-full flex flex-col">
      <Input
        label={label}
        placeholder={placeholder}
        type={type}
        isRequired={isRequired}
        description={description}
        size={size}
        errorMessage={meta.touched && meta.error ? meta.error : undefined}
        {...field}
        {...props}
      />
    </div>
  );
}
