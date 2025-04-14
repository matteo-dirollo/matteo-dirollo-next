import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "@heroui/react";

export const ColorModeSwitcher = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const text = isDarkMode ? "light" : "dark";
  const SwitchIcon = isDarkMode ? FaSun : FaMoon;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-2 ml-2 text-current rounded-full"
      aria-label={`Switch to ${text} mode`}
      onPress={toggleColorMode}
      {...props}
    >
      <SwitchIcon className="text-lg" />
    </Button>
  );
};
