import React from "react";
import {
  Box,
  ChakraProvider,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectedUser } from "../../features/user/userSlice";
import AnimatedSearchBar from "../AnimatedSearchBar";

const Header = ({ navbar = true }) => {
  const user = useSelector(selectedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
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
          <Link to={"/"}>
            <Text
              className="text-gray-400 font-poppins text-2xl mb-2 tracking-[10px]	"
              fontSize={{ base: "15px", md: "20px", lg: "30px" }}
              textAlign={"center"}
              alignItems={"center"}
            >
              PROGAD
            </Text>
          </Link>

          {navbar && (
            <>
              <div className="flex justify-between items-center px-4">
                <Box id="box1" className="text-left">
                  <Link to="/">
                    <Text className="font-semibold text-lg text-white font-poppins tracking-[5px]">
                      PROGAD
                    </Text>
                  </Link>
                </Box>

                <Box id="box2" className="relative">
                  <div className="hidden lg:flex bg-white rounded-3xl mt-2 px-4 gap-3 py-2">
                    <Link
                      to="/"
                      className=" text-black font-poppins text-lg py-1"
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      className=" text-black font-poppins text-lg py-1"
                    >
                      Products
                    </Link>
                    <Link
                      to="/cart"
                      className=" text-black font-poppins text-lg py-1"
                    >
                      Cart
                    </Link>
                    <Link
                      to="/about"
                      className=" text-black font-poppins text-lg py-1"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/coupons"
                      className=" text-black font-poppins text-lg py-1"
                    >
                      Coupons
                    </Link>
                  </div>

                  <div className="lg:hidden">
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<FaBars />}
                        className="text-black"
                      />
                      <MenuList>
                        <MenuItem as={Link} to="/">
                          Home
                        </MenuItem>
                        <MenuItem as={Link} to="/products">
                          Products
                        </MenuItem>
                        <MenuItem as={Link} to="/cart">
                          Cart
                        </MenuItem>
                        <MenuItem as={Link} to="/about">
                          About Us
                        </MenuItem>
                        <MenuItem as={Link} to="/coupons">
                          Coupons
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </Box>

                {/* Box 3: Right-aligned icons */}
                <Box id="box3" className="flex items-center">
                  {/* Search */}
                  <AnimatedSearchBar />

                  {/* User Profile Dropdown */}
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaUser className="text-black" />}
                    />
                    <MenuList>
                      {user && (
                        <>
                          <MenuItem
                            as={Link}
                            to="/profile"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/profile/orders"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            Orders
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/profile/address"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            Address
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/profile/wishlist"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            Wishlist
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/profile/wallet"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            Wallet
                          </MenuItem>
                        </>
                      )}

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
              </div>
            </>
          )}
        </Box>
      </ChakraProvider>
    </React.Fragment>
  );
};

export default Header;
