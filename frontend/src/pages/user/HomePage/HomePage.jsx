import React from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "../../../components/Header/Header";
import OfferBanner from "../../../components/OfferBanner/OfferBanner";
import HilightSection from "../../../components/HighlightSection/HilightSection";
import headphoneImg from "../../../assets/images/products/headphone.jpeg";
import boatImg from "../../../assets/images/products/boat.jpeg";
import jblImg from "../../../assets/images/products/jbl.jpeg";
import podImg from "../../../assets/images/products/blutooth.jpeg";

const HomePage = () => {
  return (
    <Box p={5}>
      <Header />
      <OfferBanner brand={["Boat, JBL"]} title={"Eid Offer"} />
      <HilightSection text={"New Arrivals"} />

      {/* Responsive Grid */}
      <Box p={{ lg: "0 10px 0px 10px" }} mt={5}>
        <Grid
          height={{ lg: "400px", md: "400px", base: "300px" }}
          templateRows={{
            base: "repeat(4, 200px)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(6, 1fr)",
            lg: "repeat(7, 1fr)",
          }}
          gap={4}
        >
          {/* Product 1 */}
          <GridItem
            rowSpan={{ base: 1, md: 2, lg: 2 }}
            colSpan={{ base: 2, md: 3, lg: 3 }}
            position="relative"
          >
            {/* Background Image with Blur Effect on Hover */}
            <Box
              backgroundImage={`url(${headphoneImg})`}
              backgroundSize="cover"
              backgroundPosition="center"
              w="100%"
              h="100%"
              transition="filter 0.3s ease"
              _hover={{ filter: "blur(4px)" }}
            />
            {/* Text Overlay */}
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.6)"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="white"
              fontSize="lg"
              fontWeight="bold"
              opacity={0}
              transition="opacity 0.3s ease"
              _hover={{ opacity: 1 }}
            >
              <Text>Headphones</Text>
              <Text>$299</Text>
            </Box>
          </GridItem>

          {/* Product 2 */}
          <GridItem
            colSpan={{ base: 1, md: 2, lg: 2 }}
            rowSpan={{ base: 1, lg: 1 }}
            position="relative"
          >
            <Box
              backgroundImage={`url(${jblImg})`}
              backgroundSize="cover"
              backgroundPosition="center"
              w="100%"
              h="100%"
              transition="filter 0.3s ease"
              _hover={{ filter: "blur(4px)" }}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.6)"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="white"
              fontSize="lg"
              fontWeight="bold"
              opacity={0}
              transition="opacity 0.3s ease"
              _hover={{ opacity: 1 }}
            >
              <Text>JBL Speaker</Text>
              <Text>$199</Text>
            </Box>
          </GridItem>

          {/* Product 3 */}
          <GridItem
            colSpan={{ base: 1, md: 2, lg: 2 }}
            rowSpan={{ base: 1, lg: 1 }}
            position="relative"
          >
            <Box
              backgroundImage={`url(${boatImg})`}
              backgroundSize="cover"
              backgroundPosition="center"
              w="100%"
              h="100%"
              transition="filter 0.3s ease"
              _hover={{ filter: "blur(4px)" }}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.6)"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="white"
              fontSize="lg"
              fontWeight="bold"
              opacity={0}
              transition="opacity 0.3s ease"
              _hover={{ opacity: 1 }}
            >
              <Text>Boat Neckband</Text>
              <Text>$149</Text>
            </Box>
          </GridItem>

          {/* Product 4 */}
          <GridItem
            colSpan={{
              base: 2,
              md: 6,
              lg: 4,
            }}
            rowSpan={{ base: 1, lg: 1 }}
            position="relative"
          >
            <Box
              backgroundImage={`url(${podImg})`}
              backgroundSize="cover"
              backgroundPosition="center"
              w="100%"
              h="100%"
              transition="filter 0.3s ease"
              _hover={{ filter: "blur(4px)" }}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.6)"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="white"
              fontSize="lg"
              fontWeight="bold"
              opacity={0}
              transition="opacity 0.3s ease"
              _hover={{ opacity: 1 }}
            >
              <Text>Bluetooth Pods</Text>
              <Text>$89</Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
