'use client'
import {
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { navItems } from "./NavItem";
import DesktopSubNav from "./DesktopSubNav";
import Link from "next/link";
const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  const MenuItem = navItems.map((navItem) => {
    const child = navItems.children;
    return (
      <Box key={navItem.label}>
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Link href={navItem.href ?? "#"} p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }} passHref>
            
                {navItem.label}
              
            </Link>
          </PopoverTrigger>

          {navItem.children && (
            <PopoverContent
              border={0}
              boxShadow={"xl"}
              bg={popoverContentBgColor}
              p={4}
              rounded={"xl"}
              minW={"sm"}
            >
              <Stack>
                <DesktopSubNav key={child.label} {...child} />;
              </Stack>
            </PopoverContent>
          )}
        </Popover>
      </Box>
    );
  });

  return (
    <Stack direction="row" spacing={4} align="center">
      {MenuItem}
    </Stack>
  );
};

export default DesktopNav;
