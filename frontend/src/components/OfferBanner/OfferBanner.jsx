import React, { useEffect, useState } from "react";
import { Box, ChakraProvider, Heading, Text } from "@chakra-ui/react";
import OurButton from "../OurButton/OurButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { activeOfferApi } from "../../api/offerApi";

const OfferBanner = ({ hide }) => {
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
    fetchOffer();
  }, []);

  return (
    <>
      {offer && (
        <ChakraProvider>
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
            <Heading as="h2" size="xl" mb={4} color="black">
              {offer.name}! Get
              {offer.discountType === "percentage"
                ? ` Off ${offer.discount}% `
                : ` Rs.${offer.discount} Discount`}
              {offer.applyToCategories === true || offer.applyToCategories === true && "Off on"}
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
              <Text as="span" color="#FF7F11" fontWeight="bold">
                {new Date(offer.expirationDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Text>

            {hide === "false" ? (
              <OurButton handleClick={handleClick} text={"Shop Now"} />
            ) : (
              <></>
            )}
          </Box>
        </ChakraProvider>
      )}
    </>
  );
};

export default OfferBanner;
