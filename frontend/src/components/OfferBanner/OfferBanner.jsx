import React, { useEffect, useState } from "react";
import { Box, ChakraProvider, Heading, Text } from "@chakra-ui/react";
import OurButton from "../OurButton/OurButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { activeOfferApi } from "../../api/offerApi";
import { useRef } from "react";

// animation
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const OfferBanner = ({ hide }) => {
  const headingRef = useRef();
  const expirationRef = useRef();

  const [offer, setOffer] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/offerpage");
  };

  const fetchOffer = async () => {
    try {
      const result = await activeOfferApi();
      setOffer(result.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch offer details");
    }
  };

  useEffect(() => {
    if (offer) {
      gsap.fromTo(
        headingRef.current,
        { text: "" },
        {
          text:
            offer.name +
            "!" +
            ` Get ${offer.discount}% Off on
            ${offer.categoryIds.map((category) => " " + category.name + "")}`,
          duration: 4.1,
          ease: "none",
          },
        
      );
    }
  }, [offer]);

  useEffect(() => {
    if (offer) {
      // Apply glow effect to expiration date
      gsap.to(expirationRef.current, {
        opacity: 0,
        duration: 1.5, // Duration for fade
        repeat: -1, // Repeat infinitely
        yoyo: true, // Make it go back to fully visible after fading out
        ease: "power1.inOut", 
        delay: 1.5,
      });
    }
  }, [offer]);
  

  useEffect(() => {
    fetchOffer();
  }, []);

  return (
    <>
      {offer && (
        <ChakraProvider>
          <div className="px-[20px]">
            <Box
              bg="#ffff"
              backgroundSize="cover"
              backgroundPosition="center"
              color="white"
              borderRadius="md"
              p={10}
              mb={10}
              textAlign="center"
            >
              <Heading ref={headingRef} as="h2" size="xl" mb={4} color="black">
                {offer.name}! Get
                {offer.discountType === "percentage"
                  ? ` Off ${offer.discount}% `
                  : ` ₹${offer.discount} Discount`}
                {offer.applyToCategories === true ||
                  (offer.applyToCategories === true && "Off on")}
                {offer.applyToCategories && (
                  <>
                    on
                    {offer.categoryIds.map(
                      (category) => " " + category.name + ","
                    )}
                  </>
                )}
              </Heading>
              <Text fontSize="lg" mb={4} color="black">
                Offer expires on{" "}
                <Text ref={expirationRef} as="span" color="#FF7F11" fontWeight="bold">
                  {new Date(offer.expirationDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </Text>

              {hide === "false" && (
                <>
                  {(offer.applyToCategories || offer.applyToProducts) && (
                    <span onClick={() => navigate("/offer")}>
                      <OurButton handleClick={handleClick} text={"Shop Now"} />
                    </span>
                  )}
                </>
              )}
            </Box>
          </div>
        </ChakraProvider>
      )}
    </>
  );
};

export default OfferBanner;
