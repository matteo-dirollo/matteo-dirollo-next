'use client'
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import AdminItem from './AdminItem';
import { AdminItems } from './AdminItems';
import EmmeLogo  from 'public/EmmeLogo';

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/">
          <EmmeLogo width={30} height={30} />
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {AdminItems.map(item => (
        <AdminItem onClose={onClose} link={item.to} key={item.label} icon={item.icon}>
          {item.label}
        </AdminItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
