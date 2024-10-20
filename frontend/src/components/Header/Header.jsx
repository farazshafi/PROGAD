import React from "react";
import {
  Box,
  Center,
  ChakraProvider,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSearch, FaUser } from "react-icons/fa";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectedUser } from "../../features/user/userSlice";

const Header = ({ navbar = true }) => {
  const user = useSelector(selectedUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    
    console.log("Logging out...");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <React.Fragment>
      <ChakraProvider>
        <Box
          mt={{ base: "10px", md: "20px", lg: "10px" }}
          mb={{ base: "50px", md: "30px", lg: "20px" }}
          className="header"
        >
          <Text
            fontSize={{ base: "15px", md: "20px", lg: "30px" }}
            className="progad"
            textAlign={"center"}
            alignItems={"center"}
          >
            PROGAD
          </Text>
          {navbar ? (
            <>
              <Navbar expand="lg" className="navbar">
                <Box id="box1" className="nav-progad-box">
                  <Navbar.Brand>
                    <Text
                      fontSize={{ base: "15px" }}
                      pt={{ md: "20px" }}
                      className="nav-progad"
                    >
                      PROGAD
                    </Text>
                  </Navbar.Brand>
                </Box>
                <Box id="box2">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-items-div">
                      {/* Using Link from react-router-dom */}
                      <Nav.Link
                        as={Link}
                        to="/accounts"
                        className="nav-link-chakra"
                      >
                        <i className="fa-solid fa-user"></i>
                        <Text
                          className="nav-items"
                          color={"black"}
                          fontSize={{ base: "15px", md: "0px", lg: "0px" }}
                        >
                          Accounts
                        </Text>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/" className="nav-link-chakra">
                        <i className="fa-solid fa-house"></i>
                        <Text
                          className="nav-items"
                          color={"black"}
                          fontSize={{ base: "15px", md: "20px", lg: "15px" }}
                        >
                          Home
                        </Text>
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/products"
                        className="nav-link-chakra"
                      >
                        <i className="fa-solid fa-headphones"></i>
                        <Text
                          className="nav-items"
                          color={"black"}
                          fontSize={{ base: "15px", md: "20px", lg: "15px" }}
                        >
                          Products
                        </Text>
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/wishlist"
                        className="nav-link-chakra"
                      >
                        <i className="fa-solid fa-heart"></i>
                        <Text
                          className="nav-items"
                          color={"black"}
                          fontSize={{ base: "15px", md: "20px", lg: "15px" }}
                        >
                          Wishlist
                        </Text>
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/orders"
                        className="nav-link-chakra"
                      >
                        <i className="fa-solid fa-box"></i>
                        <Text
                          className="nav-items"
                          color={"black"}
                          fontSize={{ base: "15px", md: "20px", lg: "15px" }}
                        >
                          Orders
                        </Text>
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/cart"
                        className="nav-link-chakra"
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        <Text
                          className="nav-items"
                          color={"black"}
                          fontSize={{ base: "15px", md: "20px", lg: "15px" }}
                        >
                          Cart
                        </Text>
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/contact"
                        className="nav-link-chakra"
                      >
                        <i className="fa-solid fa-message"></i>
                        <Text
                          className="nav-items"
                          color={"black"}
                          fontSize={{ base: "15px", md: "20px", lg: "15px" }}
                        >
                          Contact us
                        </Text>
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/about"
                        className="nav-link-chakra"
                      >
                        <i className="fa-solid fa-address-card"></i>
                        <Text
                          className="nav-items"
                          color={"black"}
                          fontSize={{ base: "15px", md: "20px", lg: "15px" }}
                        >
                          About us
                        </Text>
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Box>
                <Box id="box3" display={{ base: "none", lg: "flex" }}>
                  <Box className="nav-icons">
                    {/* Search Icon */}
                    <Center
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#262626",
                      }}
                    >
                      <FaSearch color="white" />
                    </Center>

                    {/* Profile Dropdown */}
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={
                          <Center
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              backgroundColor: "#262626",
                              marginTop: "10px",
                            }}
                            _hover={{ backgroundColor: "#333333" }} // Change on hover
                          >
                            <FaUser color="white" />
                          </Center>
                        }
                        background="none"
                        _hover={{ background: "none" }}
                      />
                      <MenuList bg="white" color="black">
                
                        <MenuItem
                          as={Link}
                          disabled={user ? false : true}
                          to="/profile"
                          _hover={{
                            backgroundColor: "#262626",
                            color: "#FF7F11",
                          }} // Change color on hover
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          as={Link}
                          disabled={user ? false : true}
                          to="/settings"
                          _hover={{
                            backgroundColor: "#262626",
                            color: "#FF7F11",
                          }}
                        >
                          Settings
                        </MenuItem>
                        <MenuItem
                          as={Link}
                          disabled={user ? false : true}
                          to="/address"
                          _hover={{
                            backgroundColor: "#262626",
                            color: "#FF7F11",
                          }}
                        >
                          Address
                        </MenuItem>
                        <MenuItem
                          as={Link}
                          disabled={user ? false : true}
                          to="/orders"
                          _hover={{
                            backgroundColor: "#262626",
                            color: "#FF7F11",
                          }}
                        >
                          Orders
                        </MenuItem>
                        <MenuItem
                          as={Link}
                          disabled={user ? false : true}
                          to="/wishlist"
                          _hover={{
                            backgroundColor: "#262626",
                            color: "#FF7F11",
                          }}
                        >
                          Wishlist
                        </MenuItem>
                        <MenuItem
                          onClick={handleLogout}
                          _hover={{
                            backgroundColor: "#262626",
                            color: "#FF7F11",
                          }}
                        >
                          {user ? "Logout" : "Login"}
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                </Box>
              </Navbar>
            </>
          ) : (
            <></>
          )}
        </Box>
      </ChakraProvider>
    </React.Fragment>
  );
};

export default Header;
