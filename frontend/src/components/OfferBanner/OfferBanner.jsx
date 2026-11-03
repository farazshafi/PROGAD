import React, { useEffect, useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OurButton from "../OurButton/OurButton";
import { activeOfferApi } from "../../api/offerApi";

const MotionBox = motion(Box);

const OfferBanner = ({ hide }) => {
  const [offer, setOffer] = useState(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => navigate("/offerpage");

  useEffect(() => {
    let mounted = true;
    const fetchOffer = async () => {
      try {
        const result = await activeOfferApi();
        if (mounted) setOffer(result.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch offer details");
      }
    };

    fetchOffer();
    return () => { mounted = false; };
  }, []);

  if (!offer) return null;

  const expiresOn = new Date(offer.expirationDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const discount = offer.discountType === "percentage"
    ? `${offer.discount}% off`
    : `₹${offer.discount} discount`;
  const categories = offer.applyToCategories
    ? offer.categoryIds.map((category) => category.name).join(", ")
    : "";
  const eligible = offer.applyToCategories || offer.applyToProducts;

  return (
    <ChakraProvider>
      <section className="offer-section" aria-label="Current offer">
        <MotionBox
          className="offer-card"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="offer-card__glow" aria-hidden="true" />
          <div className="offer-card__content">
            <div className="offer-card__eyebrow"><Sparkles size={15} /> LIMITED TIME OFFER</div>
            <h1 className="offer-card__title">
              {offer.name}<span className="offer-card__punctuation">.</span>
            </h1>
            <p className="offer-card__description">
              Get <strong>{discount}</strong>{categories ? <> on <span>{categories}</span></> : " on your next favorite"}.
            </p>
            <div className="offer-card__bottom">
              <p className="offer-card__expiry">Offer expires <strong>{expiresOn}</strong></p>
              {hide === "false" && eligible && (
                <span className="offer-card__action" onClick={() => navigate("/offer")}>
                  <OurButton handleClick={handleClick} text="Shop the offer" />
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              )}
            </div>
          </div>
          <div className="offer-card__visual" aria-hidden="true">
            <div className="offer-card__disc">{offer.discountType === "percentage" ? `${offer.discount}%` : "SAVE"}</div>
            <span className="offer-card__visual-caption">SOUND BETTER. SPEND LESS.</span>
          </div>
        </MotionBox>
      </section>
    </ChakraProvider>
  );
};

export default OfferBanner;
