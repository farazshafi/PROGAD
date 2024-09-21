// NotFoundPage.js
import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  ChakraProvider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <ChakraProvider>
      <Box
        textAlign="center"
        py={10}
        px={6}
        h="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing={4}>
          <Heading
            display="inline-block"
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, teal.400, teal.600)"
            bgClip="text"
          >
            404
          </Heading>
          <Text fontSize="lg" mt={3} mb={2}>
            Page Not Found
          </Text>
          <Text color="gray.500" mb={6}>
            The page you're looking for does not seem to exist.
          </Text>

          <Link to="/">
            <Button
              colorScheme="teal"
              bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
              color="white"
              variant="solid"
            >
              Go to Home
            </Button>
          </Link>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default NotFoundPage;
