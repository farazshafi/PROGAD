import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "react-toastify";
import { createWishlistApi } from "../../api/wishlistApi";
import { addToCart } from "../../features/user/cartSlice";
import { selectedUser } from "../../features/user/userSlice";

const ListingProductCard = ({ products = [], fetchProducts }) => {
  const user = useSelector(selectedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addWishlist = async (event, product) => {
    event.stopPropagation();
    if (!user) return toast.warning("Please Login to add to wishlist");
    try {
      const result = await createWishlistApi({ userId: user._id, productId: product._id });
      if (result?.response) return toast.error(result.response.data?.message || "Could not update wishlist");
      toast.success(result?.data?.message || "Added to wishlist");
    } catch (error) {
      toast.error("Failed when adding to wishlist");
      console.error(error);
    }
  };

  const addCart = (event, product) => {
    event.stopPropagation();
    const price = Number(product.discountPrice);
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price,
      quantity: 1,
      image: product.image,
      stock: product.stock,
      subTotal: price,
      category: product.category,
    }));
    fetchProducts?.();
    toast.success("Product added to cart");
  };

  if (!products.length) {
    return <div className="listing-empty col-span-full"><div className="mb-4 text-4xl">⌕</div><h3 className="text-lg font-semibold text-white">No products found</h3><p className="mt-2 text-sm text-white/45">Try adjusting your search or filters.</p></div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const available = Number(product.stock) > 0;
        return (
          <article key={product._id} onClick={() => navigate(`/product_details/${product._id}`)} className="listing-product-card group cursor-pointer">
            <div className="listing-product-image-wrap">
              {product.discount && <span className="listing-discount-badge">{product.discountType === "percentage" ? `${product.discount} OFF` : `₹${product.discount} OFF`}</span>}
              <button onClick={(event) => addWishlist(event, product)} aria-label={`Add ${product.name} to wishlist`} className={`listing-wishlist ${product.isWishlisted ? "is-wishlisted" : ""}`}><Heart size={18} fill={product.isWishlisted ? "currentColor" : "none"} /></button>
              <img src={product.image || "/placeholder-product.png"} alt={product.name} loading="lazy" />
              <button disabled={!available} onClick={(event) => addCart(event, product)} className="listing-quick-add"><ShoppingBag size={16} /> {available ? "Add to bag" : "Out of stock"}</button>
            </div>
            <div className="px-1 pb-1 pt-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs text-[#ffad64]"><Star size={14} fill="currentColor" /><span>{Number(product.avgRating || 0).toFixed(1)}</span><span className="text-white/30">·</span><span className="text-white/40">Customer rating</span></div>
              <h3 className="line-clamp-1 text-sm font-medium text-white transition group-hover:text-[#ffad64]">{product.name}</h3>
              <div className="mt-2 flex items-center gap-2"><span className="text-base font-semibold text-white">₹{Number(product.discountPrice || 0).toLocaleString("en-IN")}</span>{Number(product.originalPrice) > Number(product.discountPrice) && <span className="text-sm text-white/35 line-through">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>}</div>
              <p className={`mt-2 text-[11px] ${available ? "text-emerald-400/80" : "text-rose-400"}`}>{available ? "Ready to ship" : "Currently unavailable"}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ListingProductCard;
