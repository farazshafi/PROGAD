import React from 'react'
import { Box, Button, Center, Text } from "@chakra-ui/react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css"

const Header = () => {
  return (
    <Box mt={{ base: "10px", md: "20px", lg: "30px" }} className="header">
        <Text
          fontSize={{ base: "15px", md: "20px", lg: "30px" }}
          className="progad"
          textAlign={"center"}
          alignItems={"center"}
        >
          PROGAD
        </Text>
      <Navbar expand="lg" className="navbar">
        <Box id='box1' className="nav-progad-box">
          <Navbar.Brand href="#home">
            <Text fontSize={{ base: "15px" }} pt={{ md: "20px" }} className='nav-progad'>PROGAD</Text>
          </Navbar.Brand>
        </Box>
        <Box id="box2">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav-items-div">
              <Box style={{ borderBottom: "1px solid black",marginBottom:"10px" }} display={{ base: "block", md: "none" }} mt="20px">
                <Box display="flex" alignItems="center" mb="10px">
                  <input
                    type="text"
                    placeholder="Search"
                    style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                  />
                  <Button
                    ml="10px"
                    variant="outline"
                    colorScheme="teal"
                    size="sm"
                    leftIcon={<i className="fa-solid fa-search"></i>}
                  >
                    Find
                  </Button>
                </Box>
              </Box>
                <Nav.Link className="nav-link-chakra" href="#link">
                  <i class="fa-solid fa-user"></i>
                <Text className="nav-items" color={"black"} fontSize={{ base: "15px", md: "20px", lg: "15px" }}>Accounts</Text>
              </Nav.Link>
              <Nav.Link className="nav-link-chakra" href="#link">
                <i class="fa-solid fa-house"></i>
                <Text className="nav-items" color={"black"} fontSize={{ base: "15px", md: "20px", lg: "15px" }}>Home</Text>
              </Nav.Link>
              <Nav.Link className="nav-link-chakra" href="#link">
                <i class="fa-solid fa-headphones"></i>
                <Text className="nav-items" color={"black"} fontSize={{ base: "15px", md: "20px", lg: "15px" }}>Products</Text>
              </Nav.Link>
              <Nav.Link className="nav-link-chakra" href="#link">
                <i class="fa-solid fa-heart"></i>
                <Text className="nav-items" color={"black"} fontSize={{ base: "15px", md: "20px", lg: "15px" }}>Wishlist</Text>
              </Nav.Link>
              <Nav.Link className="nav-link-chakra" href="#link">
                <i class="fa-solid fa-box"></i>
                <Text className="nav-items" color={"black"} fontSize={{ base: "15px", md: "20px", lg: "15px" }}>Orders</Text>
              </Nav.Link>
              <Nav.Link className="nav-link-chakra" href="#link">
                <i class="fa-solid fa-cart-shopping"></i>
                <Text className="nav-items" color={"black"} fontSize={{ base: "15px", md: "20px", lg: "15px" }}>Cart</Text>
              </Nav.Link>
              <Nav.Link className="nav-link-chakra" href="#link">
                <i class="fa-solid fa-message"></i>
                <Text className="nav-items" color={"black"} fontSize={{ base: "15px", md: "20px", lg: "15px" }}>Contact us</Text>
              </Nav.Link>
              <Nav.Link className="nav-link-chakra" href="#link">
                <i class="fa-solid fa-address-card"></i>
                <Text className="nav-items" color={"black"} fontSize={{ base: "15px", md: "20px", lg: "15px" }}>About us</Text>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Box>
        <Box id="box3" display={{ base: "none", md: "flex" }}>
          <Box className="nav-icons">
            <Center style={{ width: "50px", height: "50px", borderRadius: '50%', backgroundColor: "#262626" }}>
              <i style={{ color: "white", alignItems: "center", textAlign: "center" }} className="fa-solid fa-magnifying-glass"></i>
            </Center>
            <Center style={{ width: "50px", height: "50px", borderRadius: '50%', backgroundColor: "#262626" }}>
              <i style={{ color: "white", alignItems: "center", textAlign: "center" }} className="fa-solid fa-user"></i>
            </Center>
          </Box>
        </Box>
      </Navbar>
      </Box>
  )
}

export default Header