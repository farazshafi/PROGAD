import React, { useEffect, useState } from "react";
import OfferBanner from "../../../components/OfferBanner/OfferBanner";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import BreadCrums from "../../../components/BreadCrums";
import { toast } from "react-toastify";
import { offerProductsApi } from "../../../api/offerApi";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { FaHeart } from "react-icons/fa";
import OurButton from "../../../components/OurButton/OurButton";

const OfferPage = () => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const breadcrumbPath = [
    { label: "Home", url: "/" },
    { label: "Offer", url: "/offer" },
  ];

  const handleAddToWishlist = (id) => {
    //
  };

  const handleNavigate = () => {
    //
  };

  const fetchOfferProducts = async () => {
    try {
      const result = await offerProductsApi();
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error("Failed to fetch offer products. Please try again.");
          return;
        }
      }
      setOfferProducts(result.data);
    } catch (err) {
      toast.error("Failed to fetch offer products. Please try again.");
      console.error("Fetch Offer Products Error:", err);
    }
  };

  useEffect(() => {
    fetchOfferProducts();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <BreadCrums path={breadcrumbPath} />
      <OfferBanner />
      <div className="px-[20px]">
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {offerProducts.map((product) => (
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "transparent",
                position: "relative",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onMouseEnter={() => setHoveredProductId(product._id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              {hoveredProductId === product._id && (
                <FaHeart
                  onClick={() => handleAddToWishlist(product._id)}
                  className="text-black text-3xl absolute top-3 right-3 cursor-pointer z-10"
                />
              )}

              <CardActionArea>
                <CardMedia
                  onClick={handleNavigate(product._id)}
                  component="img"
                  height="140"
                  image={product.image}
                  alt="Product Image"
                />
                <div className="text-white absolute top-3 left-3 z-1 bg-black p-1 px-2 text-sm font-semibold skew-x-[-17deg] skew-y-0 rounded-md">
                  {product.discountType === "percentage"
                    ? product.discountOffer + "%"
                    : "Rs.-" + product.discountOffer}
                </div>
                <CardContent sx={{ textAlign: "center" }}>
                  <Rating
                    sx={{ color: "#FF7F11" }}
                    name={"wow"}
                    defaultValue={3.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography
                    sx={{
                      color: "#fff",
                      fontFamily: "Istok Web",
                      fontSize: {
                        xs: "15px",
                        sm: "16px",
                        md: "18px",
                        lg: "20px",
                      },
                    }}
                    variant="h6"
                    component="div"
                  >
                    {product.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton
                  type={"rupees"}
                  text={String(
                    product.hasVariants
                      ? product.variants[0].discountPrice
                      : product.discountPrice
                  )}
                />
                <Typography
                  sx={{
                    fontSize: { sm: "5px", md: "1px", lg: "20PX" },
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white",
                  }}
                >
                  {product.hasVariants
                    ? product.variants[0].originalPrice
                    : product.originalPrice}
                </Typography>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default OfferPage;
