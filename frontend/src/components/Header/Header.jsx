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
  MenuDivider,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectedUser } from "../../features/user/userSlice";
import AnimatedSearchBar from "../AnimatedSearchBar";
import {
  FaAddressBook,
  FaClipboardList,
  FaHeart,
  FaUserCircle,
  FaWallet,
} from "react-icons/fa";

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
          className="header storefront-header"
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
              <div className="storefront-header-row flex justify-between items-center px-4">
                <Box id="box1" className="text-left">
                  <Link to="/">
                    <Text className="font-semibold text-lg text-white font-poppins tracking-[5px]">
                      PROGAD
                    </Text>
                  </Link>
                </Box>

                <Box id="box2" className="relative">
                  <div className="storefront-nav-links hidden lg:flex">
                    <Link to="/" className="storefront-nav-link">
                      Home
                    </Link>
                    <Link to="/products" className="storefront-nav-link">
                      Products
                    </Link>
                    <Link to="/cart" className="storefront-nav-link">
                      Cart
                    </Link>
                    <Link to="/about" className="storefront-nav-link">
                      About Us
                    </Link>
                    <Link to="/coupons" className="storefront-nav-link">
                      Coupons
                    </Link>
                  </div>

                  <div className="storefront-mobile-menu lg:hidden">
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
                <Box
                  id="box3"
                  className="storefront-header-actions flex items-center"
                >
                  {/* Search */}
                  <AnimatedSearchBar />

                  {/* User Profile Dropdown */}
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaUser className="text-black" />}
                      className="storefront-profile-trigger"
                      aria-label="Open profile menu"
                    />
                    <MenuList className="profile-menu-list" minW="250px" p={2}>
                      {user && (
                        <>
                          <Box className="profile-menu-heading" px={3} py={3}>
                            <Text className="profile-menu-name">
                              {user.name}
                            </Text>
                            <Text className="profile-menu-email">
                              {user.email}
                            </Text>
                          </Box>
                          <MenuDivider className="profile-menu-divider" />
                        </>
                      )}
                      {user && (
                        <>
                          <MenuItem
                            as={Link}
                            to="/profile"
                            className="profile-menu-item"
                            bg="transparent"
                            color="rgba(255,255,255,.82)"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            <FaUserCircle />
                            <span>Profile</span>
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/profile/orders"
                            className="profile-menu-item"
                            bg="transparent"
                            color="rgba(255,255,255,.82)"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            <FaClipboardList />
                            <span>Orders</span>
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/profile/address"
                            className="profile-menu-item"
                            bg="transparent"
                            color="rgba(255,255,255,.82)"
                            disabled={!user}
                            
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            <FaAddressBook />
                            <span>Address</span>
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/profile/wishlist"
                            className="profile-menu-item"
                            bg="transparent"
                            color="rgba(255,255,255,.82)"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            <FaHeart />
                            <span>Wishlist</span>
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/profile/wallet"
                            className="profile-menu-item"
                            bg="transparent"
                            color="rgba(255,255,255,.82)"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            <FaWallet />
                            <span>Wallet</span>
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to="/face_register"
                            className="profile-menu-item"
                            bg="transparent"
                            color="rgba(255,255,255,.82)"
                            disabled={!user}
                            _hover={{
                              backgroundColor: "#262626",
                              color: "#FF7F11",
                            }}
                          >
                            <FaUserCircle />
                            <span>Register with face</span>
                          </MenuItem>
                        </>
                      )}

                      <MenuItem
                        className="profile-menu-item profile-menu-logout"
                        bg="transparent"
                        color="rgba(255,255,255,.82)"
                        onClick={handleLogout}
                        _hover={{
                          backgroundColor: "#262626",
                          color: "#FF7F11",
                        }}
                      >
                        <span className="profile-menu-logout-mark">↗</span>
                        <span>{user ? "Logout" : "Login"}</span>
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
