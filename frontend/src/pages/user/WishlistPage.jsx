import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteWishlistApi, getUserWishlistApi } from "../../api/wishlistApi";
import { useSelector } from "react-redux";
import { selectedUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const user = useSelector(selectedUser);

  const [wishlistItems, setWishlistItems] = useState([]);

  const navigate = useNavigate();

  const handleRemove = async (id) => {
    try {
      const dataObj = {
        userId: user._id,
        productId: id,
      };
      const result = await deleteWishlistApi(dataObj);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      fetchWishlist(user._id);
      toast.success("Item removed successfully");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const fetchWishlist = async (id) => {
    try {
      const result = await getUserWishlistApi(id);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setWishlistItems(result.wishlistedProducts);
    } catch (err) {
      console.log(err);
      return toast.error("Failed to fetch wishlist");
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please Login");
      navigate("/login");
      return;
    }
    fetchWishlist(user._id);
  }, []);

  return (
    <div className="w-full min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems?.length < 1 ? (
        <>
          <p>No items in your wishlist</p>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-100 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <div className="flex w-full justify-between mt-3">
                <p className="text-white">{item.discountPrice}</p>
                <p className="text-gray-500 line-through">
                  {item.originalPrice}
                </p>
              </div>
              <div
                className="mt-4 flex w-full gap-4 justify-between
            "
              >
                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-white font-semibold w-full text-black py-2 px-2	 hover:bg-gray-600 rounded transition-colors"
                >
                  Remove
                </button>
                {/* <button className=" text-white font-semibold w-full bg-ourOrange py-2 px-2 hover:bg-gray-600 rounded transition-colors">
                  Add To Cart
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
