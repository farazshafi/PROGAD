import React from 'react'
import { Box, Image, Heading, Text, SimpleGrid, Button, VStack } from '@chakra-ui/react';
import Header from '../../../components/Header/Header';


const HomePage = () => {
  return (
    <Box p={5}>
      <Header />
      {/* Offer Banner */}
      <Box
        bgGradient="linear(to-r, teal.400, blue.500)"
        color="white"
        borderRadius="md"
        p={10}
        mb={10}
        textAlign="center"
      >
        <Heading as="h2" size="xl" mb={4}>
          Super Offer! Get 30% Off on All Headphones!
        </Heading>
        <Text fontSize="lg" mb={4}>
          Limited time only. Grab your favorite headphones before the sale ends.
        </Text>
        <Button colorScheme="teal" size="lg">
          Shop Now
        </Button>
      </Box>

      {/* Product Listing */}
      <Heading as="h3" size="lg" mb={6} textAlign="center">
        Featured Headphones
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {/* Product 1 */}
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
          <Image src="https://m.media-amazon.com/images/I/71svL2D2M4L._AC_SL1500_.jpg" alt="Headphone 1" />
          <VStack align="start" mt={4}>
            <Heading as="h4" size="md">Sony WH-1000XM4</Heading>
            <Text color="gray.600">$349.99</Text>
            <Button colorScheme="teal" size="sm">Add to Cart</Button>
          </VStack>
        </Box>

        {/* Product 2 */}
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
          <Image src="https://m.media-amazon.com/images/I/51D0PJ4oF8L._AC_SL1000_.jpg" alt="Headphone 2" />
          <VStack align="start" mt={4}>
            <Heading as="h4" size="md">Bose Noise Cancelling 700</Heading>
            <Text color="gray.600">$379.99</Text>
            <Button colorScheme="teal" size="sm">Add to Cart</Button>
          </VStack>
        </Box>

        {/* Product 3 */}
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
          <Image src="https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg" alt="Headphone 3" />
          <VStack align="start" mt={4}>
            <Heading as="h4" size="md">Sennheiser HD 450BT</Heading>
            <Text color="gray.600">$149.99</Text>
            <Button colorScheme="teal" size="sm">Add to Cart</Button>
          </VStack>
        </Box>

        {/* Product 4 */}
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
          <Image src="https://m.media-amazon.com/images/I/71yyo78bKuL._AC_SL1500_.jpg" alt="Headphone 4" />
          <VStack align="start" mt={4}>
            <Heading as="h4" size="md">Beats Solo3 Wireless</Heading>
            <Text color="gray.600">$199.99</Text>
            <Button colorScheme="teal" size="sm">Add to Cart</Button>
          </VStack>
        </Box>

        {/* Product 5 */}
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
          <Image src="https://m.media-amazon.com/images/I/51zrABWvD-L._AC_SL1000_.jpg" alt="Headphone 5" />
          <VStack align="start" mt={4}>
            <Heading as="h4" size="md">JBL Live 650BTNC</Heading>
            <Text color="gray.600">$129.99</Text>
            <Button colorScheme="teal" size="sm">Add to Cart</Button>
          </VStack>
        </Box>

        {/* Product 6 */}
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
          <Image src="https://m.media-amazon.com/images/I/81kblw-15DL._AC_SL1500_.jpg" alt="Headphone 6" />
          <VStack align="start" mt={4}>
            <Heading as="h4" size="md">Audio-Technica ATH-M50X</Heading>
            <Text color="gray.600">$149.00</Text>
            <Button colorScheme="teal" size="sm">Add to Cart</Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default HomePage