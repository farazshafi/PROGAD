import React, { useState } from "react";
import { toast } from "react-toastify";
import { createBrandApi } from "../../api/brandApi";

const AddBrand = () => {
  const [name, setName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    // validation
    if (!name || !brandDescription) {
      toast.error("Please Fill all required fields");
    }
    try {
      const result = await createBrandApi({
        name: name,
        description: brandDescription,
        isPublished,
      });

      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
      setName("");
      setBrandDescription("");
    } catch (err) {
      toast.error("Failed to create brand. Please try again later.");
      console.error("Create Brand Error:", err);
    }
  };

  return (
    <div className="px-4">
      <p className="text-2xl text-center mb-4 mt-4 font-semibold">
        Create Offer
      </p>
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Add Brand</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-[#262626] font-semibold mb-2"
                htmlFor="name"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-[#262626] font-semibold mb-2"
                htmlFor="brandDescription"
              >
                Brand Description
              </label>
              <textarea
                id="description"
                value={brandDescription}
                onChange={(e) => setBrandDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={() => setIsPublished(!isPublished)}
                className="mr-2"
              />
              <label
                className="text-gray-700 font-semibold"
                htmlFor="isPublished"
              >
                Publish
              </label>
            </div>

            <button
              onClick={(e)=>handleSubmit(e)}
              className="w-full bg-[#262626] text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
