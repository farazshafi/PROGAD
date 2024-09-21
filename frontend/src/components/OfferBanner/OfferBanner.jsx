import React from 'react'
import { Box, ChakraProvider, Heading, Text } from '@chakra-ui/react';
import OurButton from '../OurButton/OurButton';


const OfferBanner = ({title,brand,bgImage}) => {
  return (
    <ChakraProvider>
      <Box
      bg={bgImage ? `url(${bgImage})` : "#ffff"}  
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      borderRadius="md"
      p={10}
      mb={10}
      textAlign="center"
      >
        <Heading as="h2" size="xl" mb={4} color="black"> 
          {title}! Get 30% Off on {brand? brand : "All Headphones!" }
        </Heading>
        <Text fontSize="lg" mb={4} color="black">
          Offer expires on <Text as="span" color="#FF7F11" fontWeight="bold">September 30, 2024</Text>.
        </Text>
        <OurButton text={"Shop Now"}/>
      </Box>
    </ChakraProvider>
  )
}

export default OfferBanner