import React from "react";
import "./Footer.css";
import {
  Box,
  Center,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react"; // MODIFIED

const Footer = () => {
  return (
    <Box className="footer-main-div">
      <Box className="row">
        <Box
          padding={{ base: "10px 20px" }}
          className="col-md-4"
        >
          <Center display={"inline"}>
            <Text
              fontSize={{ base: "15px" }}
              color={"black"}
              className="nav-progad"
              mb={0}
            >
              PROGAD
            </Text>
            <br />
            <Text fontSize={{ base: "15px" }}>
              Welcome to PROGAD, your go-to destination for premium headphones
              and audio products. Founded in 2023, our mission is to deliver the
              best quality sound experience to all customers. We specialize in a
              wide range of headphones and audio accessories, catering to music
              lovers, audiophiles, and everyday users alike. With a commitment
              to quality and customer satisfaction, we aim to bring the latest
              and greatest in audio technology to your doorstep.
            </Text>
          </Center>
        </Box>
        <Box className="col-md-8">
          <Box
            className="footer-nav-div"
            style={{
              overflowX: "auto",
              width: "100%",
            }}
          >
            <Table
              style={{
                // borderRadius:"20px"
              }}
            >
              <Thead
               backgroundColor={"#262626"}
              >
                <Tr>
                  <Th color="white">Navigation</Th>
                  <Th color="white">Category</Th>
                  <Th color="white">Brands</Th>
                  <Th color="white">Contact</Th>
                  <Th color="white">Help</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td className="tab-items" color="white">
                    <a href="/home" style={{ color: "black" }}>
                      Home
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/categories/headphones" style={{ color: "black" }}>
                      Headphones
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="tel:+9188773788" style={{ color: "black" }}>
                      9188773788
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/help/forgot-password" style={{ color: "black" }}>
                      Forgot Password
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/brands/boat" style={{ color: "black" }}>
                      Boat
                    </a>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="tab-items" color="white">
                    <a href="/cart" style={{ color: "black" }}>
                      Cart
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/categories/neckband" style={{ color: "black" }}>
                      Neckband
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="tel:+049942042049" style={{ color: "black" }}>
                      04994 2042049
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/help/update-address" style={{ color: "black" }}>
                      Update Address
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/brands/jbl" style={{ color: "black" }}>
                      JBL
                    </a>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="tab-items" color="white">
                    <a href="/settings" style={{ color: "black" }}>
                      Settings
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a
                      href="/categories/gaming-headsets"
                      style={{ color: "black" }}
                    >
                      Gaming Headsets
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a
                      href="mailto:support@shop.com"
                      style={{ color: "black" }}
                    >
                      support@shop.com
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/help/account-help" style={{ color: "black" }}>
                      Account Help
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/brands/skullcandy" style={{ color: "black" }}>
                      Skullcandy
                    </a>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="tab-items" color="white">
                    <a href="/wishlist" style={{ color: "black" }}>
                      Wishlist
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a
                      href="/categories/wired-earphones"
                      style={{ color: "black" }}
                    >
                      Wired Earphones
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a
                      href="mailto:farazpachu777@gmail.com"
                      style={{ color: "black" }}
                    >
                      farazpachu777@gmail.com
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/help/update-name" style={{ color: "black" }}>
                      Update Name
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/brands/sony" style={{ color: "black" }}>
                      Sony
                    </a>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="tab-items" color="white">
                    <a href="/profile" style={{ color: "black" }}>
                      Profile
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a
                      href="/categories/wireless-earbuds"
                      style={{ color: "black" }}
                    >
                      Wireless Earbuds
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a
                      href="mailto:hello@support.com"
                      style={{ color: "black" }}
                    >
                      hello@support.com
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/help/change-password" style={{ color: "black" }}>
                      Change Password
                    </a>
                  </Td>
                  <Td className="tab-items" color="white">
                    <a href="/brands/sennheiser" style={{ color: "black" }}>
                      Sennheiser
                    </a>
                  </Td>
                </Tr>
                
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
