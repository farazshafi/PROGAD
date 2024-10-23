
import React, { useEffect, useState } from "react";
import { getProductDetailsApi } from "../../api/productApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  Typography,
  IconButton,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
} from "@mui/material";
import { MdCloudUpload, MdDelete, MdAdd } from "react-icons/md";
import { getPublishedCategoriesApi } from "../../api/categoryApi";
import EditIcon from "@mui/icons-material/Edit";

const EditProduct = () => {
  const params = useParams();
  const { id } = params;

  // useState for product details and updated fields
  const [product, setProduct] = useState({});
  const [updatedImages, setUpdatedImages] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [warranty, setWarranty] = useState("");
  const [batteryLife, setBatteryLife] = useState("");
  const [bluetoothVersion, setBluetoothVersion] = useState("");
  const [noiseCancellation, setNoiseCancellation] = useState(false);
  const [dualPlayConnection, setDualPlayConnection] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [variants, setVariants] = useState(product.variants || []);
  const [editVariantModalOpen, setEditVariantModalOpen] = useState(false);
  const [variantToEdit, setVariantToEdit] = useState(null);
  const [newVariantImages, setNewVariantImages] = useState([]);

  const [newVariant, setNewVariant] = useState({
    name: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    color: "",
    images: [],
    type: "",
    batteryLife: "",
    bluetoothVersion: "",
    noiseCancellation: false,
    dualPlayConnection: false,
  });

  const [addVariantModalOpen, setAddVariantModalOpen] = useState(false);

  // Function to open the modal
  const handleOpenAddVariantModal = () => {
    setAddVariantModalOpen(true);
  };

  // Function to close the modal
  const handleCloseAddVariantModal = () => {
    setAddVariantModalOpen(false);
  };

  // Fetch product details
  const fetchProductDetails = async () => {
    try {
      const { data } = await getProductDetailsApi(id);
      if (data.response) {
        const { status } = data.response;
        if (status === 500 || status === 400) {
          toast.error(data.response.data.message);
        }
      } else {
        setProduct({
          ...data,
          variants: data.variants || [], // Ensure variants is always an array
        });
        setUpdatedImages(data.images);
        setUpdatedName(data.name);
        setUpdatedDescription(data.description);
        setSelectedCategory(data.category?.name);
        setOriginalPrice(data.originalPrice);
        setDiscountPrice(data.discountPrice);
        setStock(data.totalStock);
        setWarranty(data.warranty);
        if (data.type === "Bluetooth") {
          setBatteryLife(data.batteryLife);
          setBluetoothVersion(data.bluetoothVersion);
          setNoiseCancellation(data.noiseCancellation);
          setDualPlayConnection(data.dualPlayConnection);
        }
        setIsPublished(data.isPublished);
        setVariants(data.variants);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await getPublishedCategoriesApi();
      setAllCategories(data);
    } catch (err) {
      toast.error(err);
      console.error("Error fetching categories:", err);
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file)); // Temporarily show the uploaded images
    setUpdatedImages([...updatedImages, ...newImages]);
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const updated = updatedImages.filter((_, imgIndex) => imgIndex !== index);
    setUpdatedImages(updated);
  };

  // handle variants delete
  const handleDeleteVariant = (variantId) => {
    // This will log the variantId being deleted
    console.log("Deleting variant with id:", variantId);

    // Update the product state by filtering out the variant to delete
    const updatedVariants = product.variants.filter(
      (variant) => variant._id !== variantId
    );
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: updatedVariants,
    }));
  };

  // Function to handle opening the modal
  const handleEditVariant = (variant) => {
    setVariantToEdit(variant);
    setEditVariantModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setEditVariantModalOpen(false);
    setVariantToEdit(null); // Clear the selected variant
  };

  // Function to handle saving the edited variant
  const handleSaveVariant = () => {
    // Update the product state by adding the new variant
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: [...(prevProduct.variants || []), newVariant], // Add to variants array
    }));
    setNewVariant({ name: "", originalPrice: "", discountPrice: "", stock: "", color: "" }); // Clear the form
    handleCloseAddVariantModal();
  };
  

  // Function to save edited variant details
  const saveEditedVariant = (editedVariant) => {
    const updatedVariants = variants.map((variant) =>
      variant._id === editedVariant._id ? editedVariant : variant
    );
    setVariants(updatedVariants);
    // setEditModalOpen(false); // Close the modal after saving
    // Optionally, call your API to update the variant in the database here
  };

  const handleVariantImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const uploadedImages = files.map((file) => URL.createObjectURL(file)); // Temporarily show the uploaded images
    setNewVariantImages([...newVariantImages, ...uploadedImages]);

    // Optional: handle uploading to your server or storage bucket here
  };

  const handleUpdateProduct = () => {
    const updatedProductData = {
      updatedImages,
      updatedName,
      updatedDescription,
      selectedCategory,
      originalPrice,
      discountPrice,
      stock,
      warranty,
      batteryLife,
      bluetoothVersion,
      noiseCancellation,
      dualPlayConnection,
      variants,
      isPublished,
    };

    console.log("Updated Product Data:", updatedProductData);
  };

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, []);

  return (
    <>
      <Box
        padding={"20px"}
        sx={{
          backgroundColor: "#121212",
          color: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <Typography
          fontSize={"30px"}
          sx={{ textAlign: "center", mt: "10px" }}
          fontFamily={"'Istok Web', sans-serif"}
        >
          Edit Product
        </Typography>

        <Grid container spacing={2} sx={{ mt: "20px" }}>
          {/* Image Upload & Image Display */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                  border: "2px dashed #ccc",
                }}
                onClick={() => document.getElementById("upload-image").click()}
              >
                <MdCloudUpload color="black" fontSize={"100px"} />
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: '"Istok Web", sans-serif',
                    textAlign: "center",
                    mt: 2,
                  }}
                >
                  Click to upload images
                </Typography>
              </Box>
              <input
                hidden
                id="upload-image"
                accept="image/*"
                name="images"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
            </FormControl>

            {/* Add Image Button with Plus Icon */}
            <IconButton
              color="primary"
              aria-label="add image"
              onClick={() => document.getElementById("upload-image").click()}
              sx={{ mt: 2 }}
            >
              <MdAdd fontSize="30px" />
              <Typography sx={{ ml: 1 }}>Add Image</Typography>
            </IconButton>
          </Grid>

          {/* Display uploaded images with delete option */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {updatedImages.map((imgSrc, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={`Product Image ${index + 1}`}
                      style={{ width: "100%", height: "auto" }}
                    />
                    {/* Delete Image Icon */}
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        color: "red",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <MdDelete fontSize="20px" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Name and category Inputs */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Product Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              variant="filled"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45" }}
            />
          </Grid>

          {/* category */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel style={{ color: "#ffffff" }}>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                variant="outlined"
                style={{ color: "#ffffff" }}
                InputLabelProps={{ style: { color: "white" } }}
                inputProps={{ style: { color: "white" } }}
                sx={{ backgroundColor: "#1b1a45" }}
              >
                {allCategories &&
                  allCategories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* discription */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45" }}
            />
          </Grid>
        </Grid>

        {/* if product have variants */}
        {product.hasVariants &&
          product.variants.map((variant, index) => (
            <Grid
              sx={{ marginTop: "20px" }}
              item
              xs={6}
              lg={3}
              key={variant._id}
            >
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  position: "relative",
                }}
              >
                {/* Edit Variant Button */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ position: "absolute", top: 10, right: 10 }}
                  onClick={() => handleEditVariant(variant)}
                >
                  Edit
                </Button>

                {/* Variant Name */}
                <Typography variant="h6" sx={{ color: "black" }}>
                  {variant.name}
                </Typography>

                {/* Original Price */}
                <Typography variant="body1" sx={{ color: "black" }}>
                  Original Price: {variant.originalPrice}
                </Typography>

                {/* Discount Price */}
                <Typography variant="body1" sx={{ color: "black" }}>
                  Discount Price: {variant.discountPrice}
                </Typography>
                <Typography variant="body1" sx={{ color: "black" }}>
                  stock: {variant.stock}
                </Typography>
                <Typography variant="body1" sx={{ color: "black" }}>
                  warranty: {variant.warranty}
                </Typography>
                <Typography variant="body1" sx={{ color: "black" }}>
                  color: {variant.color}
                </Typography>
                {variant.type === "Bluetooth" && (
                  <>
                    <Typography variant="body1" sx={{ color: "black" }}>
                      Battery Life: {variant.batteryLife} hours
                    </Typography>
                    <Typography variant="body1" sx={{ color: "black" }}>
                      Bluetooth Version: {variant.bluetoothVersion}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "black" }}>
                      Noise Cancellation:{" "}
                      {variant.noiseCancellation ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "black" }}>
                      Dual Play Connection:{" "}
                      {variant.dualPlayConnection ? "Yes" : "No"}
                    </Typography>
                  </>
                )}

                {/* Variant Images */}
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {variant.images.map((imgSrc, imgIndex) => (
                    <Grid item xs={6} key={imgIndex}>
                      <img
                        src={imgSrc}
                        alt={`Variant ${variant.name}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Delete Variant Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => handleDeleteVariant(variant._id)}
                >
                  Delete Variant
                </Button>
              </Box>
            </Grid>
          ))}

        {product.variants?.length === 0 && (
          <>
            {/* Original Price and Discounted Price */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Original Price"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Offer Price"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>
            </Grid>

            {/* Stock and Warranty */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>
            </Grid>
          </>
        )}

        {/* if product support blutooth */}
        {product.type === "Bluetooth" && (
          <>
            {/* // batteryl life and bluetooth version */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Battery Life"
                  value={batteryLife}
                  onChange={(e) => setBatteryLife(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Bluetooth Version"
                  value={bluetoothVersion}
                  onChange={(e) => setBluetoothVersion(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>
            </Grid>
            {/* 2 check box */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={noiseCancellation}
                      onChange={(e) => setNoiseCancellation(e.target.checked)}
                      sx={{
                        color: "white", // Default color
                        "&.Mui-checked": {
                          color: "white", // Color when checked
                        },
                      }}
                    />
                  }
                  label="Noise Cancellation"
                  sx={{ color: "white" }} // Change label color to white
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dualPlayConnection}
                      onChange={(e) => setDualPlayConnection(e.target.checked)}
                      sx={{
                        color: "white", // Default color
                        "&.Mui-checked": {
                          color: "white", // Color when checked
                        },
                      }}
                    />
                  }
                  label="Dual Play Connection"
                  sx={{ color: "white" }} // Change label color to white
                />
              </Grid>
            </Grid>
            {/* isPublished */}
            <Grid sx={{ mt: 4 }} item xs={6}>
              <FormControl fullWidth>
                <InputLabel style={{ color: "white" }}>
                  Publish Status
                </InputLabel>
                <Select
                  value={isPublished ? "Published" : "Unpublished"}
                  onChange={(e) =>
                    setIsPublished(e.target.value === "Published")
                  }
                  variant="outlined"
                  sx={{ backgroundColor: "#1b1a45", color: "white" }}
                >
                  <MenuItem value="Published">Published</MenuItem>
                  <MenuItem value="Unpublished">Unpublished</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}

        {/* Add Variant Button */}
        <Grid lg={12} xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleOpenAddVariantModal}
          >
            Add Variant
          </Button>
        </Grid>

        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleUpdateProduct}
        >
          Update Product
        </Button>

        {/* modal */}
        <Dialog
          open={editVariantModalOpen}
          onClose={handleCloseModal}
          scroll="paper" // Make the modal scrollable
        >
          <DialogTitle>Edit Variant</DialogTitle>
          <DialogContent dividers sx={{ maxHeight: "80vh", overflowY: "auto" }}>
            {/* Set max height and enable vertical scroll */}
            <TextField
              label="Variant Name"
              value={variantToEdit?.name || ""}
              onChange={(e) =>
                setVariantToEdit({ ...variantToEdit, name: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Original Price"
              value={variantToEdit?.originalPrice || ""}
              onChange={(e) =>
                setVariantToEdit({
                  ...variantToEdit,
                  originalPrice: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discount Price"
              value={variantToEdit?.discountPrice || ""}
              onChange={(e) =>
                setVariantToEdit({
                  ...variantToEdit,
                  discountPrice: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Stock"
              value={variantToEdit?.stock || ""}
              onChange={(e) =>
                setVariantToEdit({
                  ...variantToEdit,
                  stock: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Warranty"
              value={variantToEdit?.warranty || ""}
              onChange={(e) =>
                setVariantToEdit({
                  ...variantToEdit,
                  warranty: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Color"
              value={variantToEdit?.color || ""}
              onChange={(e) =>
                setVariantToEdit({
                  ...variantToEdit,
                  color: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            {/* Add more fields as necessary */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveVariant} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* add variant modal */}
        <Modal
          open={addVariantModalOpen}
          onClose={handleCloseAddVariantModal}
          aria-labelledby="add-variant-modal"
          aria-describedby="add-variant-modal-description"
        >
          <Box
            padding={"20px"}
            sx={{
              backgroundColor: "#121212",
              color: "#ffffff",
              width: "50%",
              height: "80vh", // Fixed height
              overflowY: "auto", // Enable vertical scrolling
              margin: "auto",
              mt: "10%",
              borderRadius: "10px",
            }}
          >
            <Typography
              fontSize={"24px"}
              sx={{ textAlign: "center", mt: "10px" }}
              fontFamily={"'Istok Web', sans-serif"}
            >
              Add New Variant
            </Typography>

            {/* Variant Name */}
            <TextField
              fullWidth
              label="Variant Name"
              value={newVariant.name}
              onChange={(e) =>
                setNewVariant((prev) => ({ ...prev, name: e.target.value }))
              }
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

            {/* Original Price */}
            <TextField
              fullWidth
              label="Original Price"
              value={newVariant.originalPrice}
              onChange={(e) =>
                setNewVariant((prev) => ({
                  ...prev,
                  originalPrice: e.target.value,
                }))
              }
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

            {/* Discount Price */}
            <TextField
              fullWidth
              label="Discount Price"
              value={newVariant.discountPrice}
              onChange={(e) =>
                setNewVariant((prev) => ({
                  ...prev,
                  discountPrice: e.target.value,
                }))
              }
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

            {/* Stock */}
            <TextField
              fullWidth
              label="Stock"
              value={newVariant.stock}
              onChange={(e) =>
                setNewVariant((prev) => ({ ...prev, stock: e.target.value }))
              }
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

            {/* Color */}
            <TextField
              fullWidth
              label="Color"
              value={newVariant.color}
              onChange={(e) =>
                setNewVariant((prev) => ({ ...prev, color: e.target.value }))
              }
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

            {/* Variant Image Upload */}
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 3, backgroundColor: "#1976d2", color: "#ffffff" }}
            >
              Upload Variant Images
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => handleVariantImageUpload(e)}
              />
            </Button>

            {/* Display Uploaded Variant Images */}
            <Grid container spacing={1} sx={{ mt: 2 }}>
              {newVariantImages.map((imgSrc, imgIndex) => (
                <Grid item xs={6} key={imgIndex}>
                  <img
                    src={imgSrc}
                    alt={`Variant Image ${imgIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Save Variant Button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => {
                // Add new variant with images
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  variants: [
                    ...prevProduct.variants,
                    {
                      ...newVariant,
                      images: newVariantImages, // Add the uploaded images to the variant
                    },
                  ],
                }));
                handleCloseAddVariantModal();
              }}
            >
              Save Variant
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default EditProduct;
