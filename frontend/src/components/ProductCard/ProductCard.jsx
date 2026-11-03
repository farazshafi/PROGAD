import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  selectedProductPage,
} from "../../features/product/productSlice";
import { selectedUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { createWishlistApi } from "../../api/wishlistApi";
import { addToCart } from "../../features/user/cartSlice";
import Rating from "@mui/material/Rating";

const ProductCard = ({ fetchProducts }) => {
  const user = useSelector(selectedUser);
  const products = useSelector(selectedProduct);
  const page = useSelector(selectedProductPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleNavigate = (productId) => () => {
    navigate(`/product_details/${productId}`);
  };

  const handleAddToWishlist = async (id) => {
    if (!user) {
      toast.warning("Please Login to add to wishlist");
      return;
    }
    try {
      const result = await createWishlistApi({
        userId: user._id,
        productId: id,
      });
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
    } catch (err) {
      toast.error("Failed when adding to wishlist");
      console.log(err);
    }
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: Number(product.discountPrice),
      quantity: 1,
      image: product.image,
      stock: product.stock,
      subTotal: Number(product.discountPrice) * 1,
      category: product.category,
    };

    dispatch(addToCart(cartItem));
    fetchProducts(page);
    toast.success("Product added to cart");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.length > 0 ? (
          products.map((product, i) => (
            <div
              key={i}
              className="listing-product-card group cursor-pointer"
              onMouseEnter={() => setHoveredProductId(product._id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <div
                onClick={handleNavigate(product._id)}
                className="listing-product-image-wrap cursor-pointer"
              >
                <img
                  src={product.image}
                  alt="Product Image"
                  className="w-full h-40 object-cover rounded-md"
                />
                {product.discount && (
                  <div className="listing-discount-badge">
                    {product.discountType === "percentage"
                      ? product.discount
                      : `₹-${product.discount}`}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <div className="product-card-rating text-yellow-400 text-sm">
                  <Rating
                    name="half-rating-read"
                    value={product.avgRating}
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#FF7F11",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "white",
                      },
                    }}
                  />
                </div>
                <h3 className="product-card-name text-white text-sm font-medium">
                  {product.name}
                </h3>
              </div>
              <div className="product-card-price flex justify-center items-center gap-2 mt-2">
                <span className="text-white font-semibold">
                  ₹
                  {product.hasVariants
                    ? product.variants[0].discountPrice
                    : product.discountPrice}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ₹
                  {product.hasVariants
                    ? product.variants[0].originalPrice
                    : product.originalPrice}
                </span>
              </div>
              <div className="listing-product-actions mt-2 flex items-center gap-2">
                {product.stock < 1 ? (
                  <button
                    disabled
                    className="listing-card-out-of-stock flex-grow py-2 rounded-md cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="listing-card-add-button flex-grow py-2 rounded-md"
                  >
                    Add to Cart
                  </button>
                )}
                <div className={`listing-wishlist ${product.isWishlisted ? "is-wishlisted" : ""}`}>
                  <FaHeart
                    onClick={() => handleAddToWishlist(product._id)}
                    className={`${product.isWishlisted ? "text-black" : "text-white"} text-lg cursor-pointer`}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">
            <h2 className="text-white">No Products Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
