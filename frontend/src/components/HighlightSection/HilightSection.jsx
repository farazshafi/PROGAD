import { Box, ChakraProvider, HStack, Text } from "@chakra-ui/react";
import React from "react";
import OurButton from "../OurButton/OurButton";
import "./HilightSection.css";
import { useNavigate } from "react-router-dom";

const HilightSection = ({ nav,text }) => {

  const navigate = useNavigate()
  const navigateText = text.split(" ").join("").toLowerCase()

  const handleClick = (wow) => {
    console.log(wow)
    navigate(`/${navigateText}`)
  }

  return (
    <ChakraProvider>
      <Box
        p={{ base: "10px", md: "20px", lg: "30px" }}
        className="new-arrival-div"
      >
        <HStack>
          <Box
            display={"flex"}
            gap={"10px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              width={{ base: "4", md: "15px", lg: "20px" }}
              height={{ base: "25", md: "30px", lg: "35px" }}
              className="section-icon"
            ></Box>
            <Text
              color={"#ff7f11"}
              fontSize={{ base: "15px" }}
              className="featured-text"
            >
              Featured
            </Text>
          </Box>
          <Box ml={"auto"}>
            <OurButton handleClick={handleClick} text={"Show More"} />
          </Box>
        </HStack>
        <Text
          className="section-name"
          fontSize={{ base: "15px", md: "20px", lg: "20px" }}
        >
          {text}
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default HilightSection;
