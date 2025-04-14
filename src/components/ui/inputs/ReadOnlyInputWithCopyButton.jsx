"use client";
import { useState } from "react";
import { Input, Button } from "@heroui/react"; 
import { MdContentCopy } from "react-icons/md";

const ReadOnlyInputWithCopyButton = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="relative w-full flex items-center">
      {/* HeroUI Input */}
      <Input
        value={value}
        isReadOnly
        fullWidth
        variant="flat"
        size="md"
        classNames={{
          input: "pr-12", // Add padding-right to make space for the copy button
        }}
      />
      {/* Copy Button */}
      <Button
        variant="ghost"
        size="sm"
        aria-label="Copy"
        onPress={handleCopyClick}
        className={`absolute right-2 p-2 rounded-full ${
          isCopied ? "text-teal-500" : "text-gray-500"
        } hover:text-teal-600`}
      >
        <MdContentCopy size="20" />
      </Button>
    </div>
  );
};

export default ReadOnlyInputWithCopyButton;
