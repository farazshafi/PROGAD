import React from "react";

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "Product 1",
      price: "$20.00",
      ogPrice:"$30.00"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Product 2",
      price: "$25.00",
      ogPrice:"$30.00"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Product 2",
      price: "$25.00",
      ogPrice:"$30.00"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Product 2",
      price: "$25.00",
      ogPrice:"$30.00"
    },
  ];

  return (
    <div className="w-full min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-100 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="flex w-full justify-between mt-3">
            <p className="text-white ">{item.price}</p>
            <p className="text-gray-500 line-through">{item.ogPrice}</p>
            </div>
            <div className="mt-4 flex w-full gap-4 justify-between
            ">
              <button className="bg-white font-semibold w-full text-black py-2 px-2	 hover:bg-gray-600 rounded transition-colors">
                Remove
              </button>
              <button className=" text-white font-semibold w-full bg-ourOrange py-2 px-2 hover:bg-gray-600 rounded transition-colors">
                Add To Cart
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
