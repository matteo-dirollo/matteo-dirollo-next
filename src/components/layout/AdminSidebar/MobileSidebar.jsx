'use client'
import { Box, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import EmmeLogo from '../../../../public/EmmeLogo';

const MobileSidebar = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box p={5}>
        <EmmeLogo width={30} height={30} />
      </Box>
    </Flex>
  );
};

export default MobileSidebar;
