import React from 'react';
import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4} >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems="center">
          <Link to="/create">
            <Button leftIcon={<PlusSquareIcon fontSize={20} />}>
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
