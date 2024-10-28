import React, { useEffect, useState } from "react";
import { getProductDetailsApi, updateProductApi } from "../../api/productApi";
import { toast } from "react-toastify";
import { useParams, Link as RouterLink } from "react-router-dom";
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
  Link,
  Breadcrumbs,
  Switch,
  FormGroup,
} from "@mui/material";
import { MdCloudUpload, MdDelete, MdAdd } from "react-icons/md";
import { getPublishedCategoriesApi } from "../../api/categoryApi";
import EditIcon from "@mui/icons-material/Edit";

const EditProduct = () => {
  const params = useParams();
  const { id } = params;

  // Single state object
  const [state, setState] = useState({
    product: {},
    updatedImages: [],
    updatedName: "",
    updatedDescription: "",
    allCategories: [],
    updatedDiscountPrice: "",
    stock: "",
    warranty: "",
    // if bluetooth supported
    isBluetoothSupported: false,
    updatedBatteryLife: "",
    updatedBluetoothVersion: "",
    updatedBluetoothRange: "",
    updatedChargingTime: "",
    updatedNoiseCancellation: false,
    updatedDualPlayConnection: false,
    updatedAppControl: false,
    updatedWaterResistant: false,
    updatedMultiDevice: false,
    updatedtouchControl: false,

    isPublished: false,
    // if it has vaiatns
    variants: [],
    newVariantImages: [],
    newVariant: {
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
    },
    newVariantImages: [],
    variantToEdit: null,
    editVariantModalOpen: false,
    variantToEdit: null,
    addVariantModalOpen: false,
    editVariantModalOpen: false,
    newVariantAdded: false,
  });

  const resetForm = () => {
    setState((prev) => ({
      ...prev,
      updatedName: "",
      selectedCategory: "",
      updatedDescription: "",
      product: {},
      updatedImages: [],
      allCategories: [],
      originalPrice: "",
      discountPrice: "",
      stock: "",
      warranty: "",
      batteryLife: "",
      bluetoothVersion: "",
      noiseCancellation: false,
      dualPlayConnection: false,
      isPublished: false,
      newVariant: {
        name: "",
        originalPrice: "",
        discountPrice: "",
        stock: "",
        color: "",
        images: [],
      },
      newVariantImages: [],
      editVariantModalOpen: false,
      variantToEdit: null,
      addVariantModalOpen: false,
      newVariantAdded: false,
    }));
  };

  const enqueueSnackbar = (message, options) => {
    console.log("Showing snackbar:", message);
  };

  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      editVariantModalOpen: false,
      variantToEdit: null,
      addVariantModalOpen: false,
      newVariantAdded: false,
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setState((prevState) => ({
      ...prevState,
      updatedImages: [...prevState.updatedImages, ...newImages],
    }));
  };

  const handleRemoveImage = (index) => {
    setState((prevState) => ({
      ...prevState,
      updatedImages: prevState.updatedImages.filter(
        (_, imgIndex) => imgIndex !== index
      ),
    }));
  };

  const saveEditedVariant = (editedVariant) => {
    setState((prevState) => ({
      ...prevState,
      variants: prevState.variants.map((variant) =>
        variant._id === editedVariant._id ? editedVariant : variant
      ),
    }));
  };

  const handleVariantImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setState((prevState) => ({
      ...prevState,
      newVariantImages: [...prevState.newVariantImages, ...uploadedImages],
    }));
  };

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const { data } = await getProductDetailsApi(id);
      console.log("data fetched ", data);
      if (data.response) {
        toast.error(data.response.data.message);
      } else {
        setState((prevState) => ({
          ...prevState,
          product: {
            ...data,
            variants: data.variants || [],
          },
          updatedImages: data.images,
          updatedName: data.name,
          updatedDescription: data.description,
          selectedCategory: data.category?.name,
          updatedDiscountPrice: data.discountPrice,
          stock: data.totalStock,
          warranty: data.warranty,
          // if bluetooth support
          isBluetoothSupported: data.isBluetoothSupported,
          updatedBatteryLife: data.batteryLife,
          updatedBluetoothVersion: data.bluetoothVersion,
          updatedBluetoothRange: data.bluetoothRange,
          updatedChargingTime: data.chargingTime,
          updatedNoiseCancellation: data.noiseCancellation,
          updatedDualPlayConnection: data.dualPlayConnection,
          updatedAppControl: data.appControl,
          updatedWaterResistant: data.waterResistant,
          updatedMultiDevice: data.multiDevice,
          updatedtouchControl: data.touchControl,
          isPublished: data.isPublished,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getPublishedCategoriesApi();
      setState((prevState) => ({
        ...prevState,
        allCategories: data,
      }));
    } catch (err) {
      toast.error(err);
      console.error("Error fetching categories:", err);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedFields = {};

      if (state.updatedName) {
        updatedFields.name = state.updatedName;
      }

      if (state.updatedDescription) {
        updatedFields.description = state.updatedDescription;
      }

      if (state.updatedDiscountPrice) {
        updatedFields.discountPrice = state.updatedDiscountPrice;
      }

      if (state.stock) {
        updatedFields.stock = state.stock;
      }

      if (state.warranty) {
        updatedFields.warranty = state.warranty;
      }

      if (state.isPublished !== undefined) {
        updatedFields.isPublished = state.isPublished;
      }

      const updatedImages = [...state.updatedImages];
      if (
        updatedImages.length > 0 &&
        state.product.images.length < updatedImages.length
      ) {
        updatedFields.images = updatedImages;
      }
      if(state.isBluetoothSupported){
        console.log("condition true...")
        updatedFields.isBluetoothSupported = state.isBluetoothSupported;
        updatedFields.batteryLife = state.updatedBatteryLife;
        updatedFields.bluetoothVersion = state.updatedBluetoothVersion;
        updatedFields.bluetoothRange = state.updatedBluetoothRange;
        updatedFields.chargingTime = state.updatedChargingTime;
        updatedFields.noiseCancellation = state.updatedNoiseCancellation;
        updatedFields.dualPlayConnection = state.updatedDualPlayConnection;
        updatedFields.appControl = state.updatedAppControl;
        updatedFields.waterResistant = state.updatedWaterResistant;
        updatedFields.multiDevice = state.updatedMultiDevice;
        updatedFields.touchControl = state.updatedtouchControl;
      }

      const updatedProduct = JSON.stringify(updatedFields, null, 2);
      console.log("result : ", updatedProduct);

      const result = await updateProductApi(id, JSON.parse(updatedProduct));
      console.log("data : ", result);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      } else {
        toast.success(result.data.message);
        fetchProductDetails();
      }

      // Show success message
      console.log("Product updated successfully!");

      // Close the dialog
      setState((prev) => ({
        ...prev,
        editVariantModalOpen: false,
        variantToEdit: null,
        addVariantModalOpen: false,
        newVariantAdded: false,
      }));
    } catch (error) {
      console.error("Error updating product:", error);
      console.log("Failed to update product.");
    }
  };

  const handleOpenAddVariantModal = () => {
    setState((prev) => ({ ...prev, addVariantModalOpen: true }));
  };

  const handleCloseAddVariantModal = () => {
    setState((prev) => ({ ...prev, addVariantModalOpen: false }));
  };

  const handleSaveVariant = () => {
    setState((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        variants: [
          ...prev.product.variants,
          {
            ...prev.newVariant,
            images: prev.newVariantImages,
          },
        ],
      },
      addVariantModalOpen: false,
      newVariant: { ...prev.newVariant, images: [] },
      newVariantImages: [],
    }));
  };

  const handleEditVariant = (variant) => {
    setState((prev) => ({
      ...prev,
      variantToEdit: variant,
      editVariantModalOpen: true,
    }));
  };

  const handleCloseModal = () => {
    setState((prev) => ({
      ...prev,
      variantToEdit: null,
      editVariantModalOpen: false,
    }));
  };

  const handleSaveVariantEdit = () => {
    setState((prev) => {
      const index = prev.product.variants.findIndex(
        (v) => v._id === prev.variantToEdit._id
      );
      const updatedVariants = [...prev.product.variants];
      updatedVariants[index] = { ...prev.variantToEdit };
      return {
        ...prev,
        product: { ...prev.product, variants: updatedVariants },
        variantToEdit: null,
        editVariantModalOpen: false,
      };
    });
  };

  const handleDeleteVariant = (_id) => {
    setState((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        variants: prev.product.variants.filter(
          (variant) => variant._id !== _id
        ),
      },
    }));
  };

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

        <div role="presentation">
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: "white", padding: "0 " }}
          >
            {/* Home Breadcrumb */}
            <Link
              underline="hover"
              color="white"
              component={RouterLink}
              to="/admin_dashboard"
            >
              Admin Dashboard
            </Link>

            <Link
              underline="hover"
              color="white"
              component={RouterLink}
              to="/admin_dashboard"
            >
              Products
            </Link>

            {/* Product Details Breadcrumb */}
            <Typography color="white">Product Edit</Typography>
          </Breadcrumbs>
        </div>

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
              {state.updatedImages.map((imgSrc, index) => (
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
              value={state.updatedName}
              onChange={(e) =>
                setState((prev) => ({ ...prev, updatedName: e.target.value }))
              }
              variant="filled"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45" }}
            />
          </Grid>

          {/* Discout Pice */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Discout Price"
              value={state.updatedDiscountPrice}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  updatedDiscountPrice: e.target.value,
                }))
              }
              variant="filled"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45" }}
            />
          </Grid>
        </Grid>

        {/* discription */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product description"
              value={state.updatedDescription}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  updatedDescription: e.target.value,
                }))
              }
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45" }}
            />
          </Grid>
        </Grid>

        {/* if product have variants */}
        {state.product.variants?.map((variant, index) => (
          <Grid sx={{ marginTop: "20px" }} item xs={6} lg={3} key={variant._id}>
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

        {state.product.variants?.length === 0 && (
          <>
            {/* Discounted Price */}
            {/* Stock and Warranty */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  value={state.stock}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, stock: e.target.value }))
                  }
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
                  value={state.warranty}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, warranty: e.target.value }))
                  }
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>
            </Grid>
          </>
        )}

        {state.isBluetoothSupported && (
          <>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Battery Life"
                  value={state.updatedBatteryLife}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      updatedBatteryLife: e.target.value,
                    }))
                  }
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
                  value={state.updatedBluetoothVersion}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      updatedBluetoothVersion: e.target.value,
                    }))
                  }
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>
            </Grid>

            {/* bluetooth range and charging time */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="bluetooth range "
                  value={state.updatedBluetoothRange}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      updatedBluetoothRange: e.target.value,
                    }))
                  }
                  variant="outlined"
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{ backgroundColor: "#1b1a45" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="charging time"
                  value={state.updatedChargingTime}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      updatedChargingTime: e.target.value,
                    }))
                  }
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
                      checked={state.updatedNoiseCancellation}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          updatedNoiseCancellation: e.target.checked,
                        }))
                      }
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Noise Cancellation"
                  sx={{ color: "white" }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.updatedDualPlayConnection}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          updatedDualPlayConnection: e.target.checked,
                        }))
                      }
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Dual Play Connection"
                  sx={{ color: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.updatedAppControl}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          updatedAppControl: e.target.checked,
                        }))
                      }
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="App control"
                  sx={{ color: "white" }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.updatedtouchControl}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          updatedtouchControl: e.target.checked,
                        }))
                      }
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Touch control"
                  sx={{ color: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.updatedWaterResistant}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          updatedWaterResistant: e.target.checked,
                        }))
                      }
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Water resistance"
                  sx={{ color: "white" }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.updatedMultiDevice}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          updatedMultiDevice: e.target.checked,
                        }))
                      }
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Multi device"
                  sx={{ color: "white" }}
                />
              </Grid>
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
            onClick={() =>
              setState((prev) => ({ ...prev, addVariantModalOpen: true }))
            }
          >
            Add Variant
          </Button>
        </Grid>

        {/* isPublished */}
        <Grid sx={{ mt: 4 }} item xs={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: "white" }}>Publish Status</InputLabel>
            <Select
              value={state.isPublished ? "Published" : "Unpublished"}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  isPublished: e.target.value === "Published",
                }))
              }
              variant="outlined"
              sx={{ backgroundColor: "#1b1a45", color: "white" }}
            >
              <MenuItem value="Published">Published</MenuItem>
              <MenuItem value="Unpublished">Unpublished</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => handleUpdateProduct()}
        >
          Update Product
        </Button>

        {/* modal */}
        <Dialog
          open={state.editVariantModalOpen}
          onClose={handleCloseModal}
          scroll="paper"
        >
          <DialogTitle>Edit Variant</DialogTitle>
          <DialogContent dividers sx={{ maxHeight: "80vh", overflowY: "auto" }}>
            <TextField
              label="Variant Name"
              value={state.variantToEdit?.name || ""}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  variantToEdit: {
                    ...prev.variantToEdit,
                    name: e.target.value,
                  },
                }))
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discount Price"
              value={state.variantToEdit?.discountPrice || ""}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  variantToEdit: {
                    ...prev.variantToEdit,
                    discountPrice: e.target.value,
                  },
                }))
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Stock"
              value={state.variantToEdit?.stock || ""}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  variantToEdit: {
                    ...prev.variantToEdit,
                    stock: e.target.value,
                  },
                }))
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Warranty"
              value={state.variantToEdit?.warranty || ""}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  variantToEdit: {
                    ...prev.variantToEdit,
                    warranty: e.target.value,
                  },
                }))
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Color"
              value={state.variantToEdit?.color || ""}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  variantToEdit: {
                    ...prev.variantToEdit,
                    color: e.target.value,
                  },
                }))
              }
              fullWidth
              sx={{ mb: 2 }}
            />
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
          open={state.addVariantModalOpen}
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
              height: "80vh",
              overflowY: "auto",
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

            <TextField
              label="Variant Name"
              value={state.newVariant.name}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  newVariant: { ...prev.newVariant, name: e.target.value },
                }))
              }
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

            <TextField
              label="Discount Price"
              value={state.newVariant.discountPrice}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  newVariant: {
                    ...prev.newVariant,
                    discountPrice: e.target.value,
                  },
                }))
              }
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

            <TextField
              label="Stock"
              value={state.newVariant.stock}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  newVariant: { ...prev.newVariant, stock: e.target.value },
                }))
              }
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

            <TextField
              label="Color"
              value={state.newVariant.color}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  newVariant: { ...prev.newVariant, color: e.target.value },
                }))
              }
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ backgroundColor: "#1b1a45", mt: 3 }}
            />

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

            <Grid container spacing={1} sx={{ mt: 2 }}>
              {state.newVariantImages.map((imgSrc, imgIndex) => (
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

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => {
                // Add new variant with images
                setState((prev) => ({
                  ...prev,
                  product: {
                    ...prev.product,
                    variants: [
                      ...prev.product.variants,
                      {
                        ...state.newVariant,
                        images: state.newVariantImages,
                      },
                    ],
                  },
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
