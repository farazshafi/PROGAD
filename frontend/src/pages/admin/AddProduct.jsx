import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  Button,
  FormGroup,
  Modal,
  Divider,
  IconButton,
} from "@mui/material";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { createProductApi } from "../../api/productApi";
import { toast } from "react-toastify";
import { getPublishedCategoriesApi } from "../../api/categoryApi";

const AddProduct = () => {
  const initialProductData = {
    name: "",
    brand: "",
    description: "",
    originalPrice: 0,
    discountPrice: 0,
    totalStock: 0,
    isPublished: true,
    material: "",
    category: "",
    warranty: "",
    images: [],
    isBluetoothSupported: false,
    hasVariants: false,
    color: "",
    isNewArrival: false,
    isFeatured: false,
    batteryLife: "",
    bluetoothVersion: "",
    bluetoothRange: "",
    chargingTime: "",
    noiseCancellation: false,
    dualPlayConnection: false,
    appControl: false,
    waterResistant: false,
    touchControl: false,
    multiDevice: false,
    variants: [],
  };

  const initialVariantData = {
    name: "",
    discountPrice: 0,
    stock: 0,
    color: "",
    material: "",
    isBluetoothSupported: false,
    noiseCancellation: false,
    dualPlayConnection: false,
    appControl: false,
    waterResistant: false,
    touchControl: false,
    multiDevice: false,
    images: [],
  };

  const [productData, setProductData] = useState(initialProductData);

  const [variantData, setVariantData] = useState(initialVariantData);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" || type === "switch" ? checked : value,
    }));
  };

  const handleVariantChange = (e) => {
    const { name, type, value, checked } = e.target;

    setVariantData((prevVariantData) => ({
      ...prevVariantData,
      [name]: type === "checkbox" || type === "switch" ? checked : value,
    }));
  };

  const resetProductData = () => {
    setProductData(initialProductData);
  };

  const resetVariantData = () => {
    setVariantData(initialVariantData);
  };

  const [isBluetooth, setIsBluetooth] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [productMainImg, setProductMainImg] = useState([]);
  const [variantProductTempImg, setVariantProductTempImg] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [wantToPublish, setWantToPublish] = useState(true);
  const [variantFeatures, setVariantFeatures] = useState({
    variantNoiseCancellation: false,
    variantDualPlayConnection: false,
  });
  const [features, setFeatures] = useState({
    noiseCancellation: false,
    dualPlayConnect: false,
  });
  const [variantsArray, setVariantsArray] = useState([]);
  const [hasVariants, setHasVariants] = useState(false);
  const [openVariantModal, setOpenVariantModal] = useState(false);
  const [variantImages, setVariantImages] = useState([]);
  const [variantName, setVariantName] = useState("");
  const [variantOriginalPrice, setVariantOriginalPrice] = useState(0);
  const [variantDiscountPrice, setVariantDiscountPrice] = useState(0);
  const [variantStock, setVariantStock] = useState(0);
  const [variantColor, setVariantColor] = useState("");
  const [variantHasBluetooth, setVariantHasBluetooth] = useState(false);
  const [variantBatteryLife, setVariantBatteryLife] = useState("");
  const [variantBluetoothVersion, setVariantBluetoothVersion] = useState("");
  const [variantNoiseCancellation, setVariantNoiseCancellation] =
    useState(false);
  const [variantDualPlayConnection, setVariantDualPlayConnection] =
    useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [batteryLife, setBatteryLife] = useState("");
  const [bluetoothVersion, setBluetoothVersion] = useState("");
  const [warranty, setWarranty] = useState("1 Year");
  const [variantWarranty, setVariantWarranty] = useState("1 Year");

  const resetState = () => {
    setIsBluetooth(false);
    setUploadedImages([]);
    setProductMainImg([]);
    setVariantFeatures({
      variantNoiseCancellation: false,
      variantDualPlayConnection: false,
    });
    setFeatures({
      noiseCancellation: false,
      dualPlayConnect: false,
    });

    setVariantsArray([]);
    setHasVariants(false);
    setOpenVariantModal(false);
    setVariantImages([]);

    setVariantName("");
    setVariantOriginalPrice(0);
    setVariantDiscountPrice(0);
    setVariantStock(0);
    setVariantColor("");
    setVariantHasBluetooth(false);
    setVariantBatteryLife("");
    setVariantBluetoothVersion("");
    setVariantNoiseCancellation(false);
    setVariantDualPlayConnection(false);
    setVariantWarranty("1 Year");

    setProductName("");
    setCategory("");
    setDescription("");
    setOriginalPrice(0);
    setDiscountPrice(0);
    setStock(0);
    setBatteryLife("");
    setBluetoothVersion("");
    setWarranty("1 Year");
  };

  const handleImageUpload = (event) => {
    const tempFiles = Array.from(event.target.files);

    const tempImageList = tempFiles.map((file) => URL.createObjectURL(file));
    setProductMainImg((prevImages) => [...prevImages, ...tempImageList]);

    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...tempFiles],
    }));

    setUploadedImages((prevFiles) => [...prevFiles, ...tempFiles]);
  };

  const handleCheckboxChangeOg = (event) => {
    const { name, checked } = event.target;
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: checked,
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = productMainImg.filter(
      (_, imgIndex) => imgIndex !== index
    );
    setProductMainImg(updatedImages);
    setUploadedImages(updatedImages);
  };

  const handleVariantDeleteImage = (index) => {
    // Remove from displayed images
    setVariantProductTempImg((prev) => prev.filter((_, i) => i !== index));

    // Remove from original images to send
    setVariantImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantImageUpload = (event) => {
    const tempFiles = event.target.files;

    // Temporarily show newly selected images without replacing existing ones
    const tempImageList = Array.from(tempFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setVariantProductTempImg((prev) => [...prev, ...tempImageList]);

    // Original images to send (also append instead of replacing)
    const imageList = Array.from(tempFiles);
    setVariantImages((prev) => [...prev, ...imageList]);
  };

  const handleDeleteVariant = (indexToDelete) => {
    setVariantsArray((prevArray) =>
      prevArray.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSaveVariant = () => {
    // Validation function
    const validateFields = () => {
      if (!variantData.name || variantData.name.length < 3) {
        alert("Variant name must be at least 3 characters long.");
        return false;
      }
      if (variantData.discountPrice <= 10) {
        alert("Original price must be greater than 10.");
        return false;
      }
      if (!variantData.stock || variantData.stock < 5) {
        alert("Stock must be greater than or equal to 5.");
        return false;
      }
      if (!variantData.color) {
        alert("Color is required.");
        return false;
      }
      if (!variantData.material) {
        alert("Material is required.");
        return false;
      }
      if (
        variantProductTempImg.length < 3 ||
        variantProductTempImg.length > 5
      ) {
        alert("Please upload between 3 and 5 variant images.");
        return false;
      }

      return true;
    };

    if (!validateFields()) {
      return;
    }

    const newVariant = {
      name: variantData.name,
      discountPrice: variantData.discountPrice,
      stock: variantData.stock,
      color: variantData.color,
      material: variantData.material,
      images: variantProductTempImg,
      isBluetoothSupported: variantData.isBluetoothSupported,
      ...(variantData.isBluetoothSupported && {
        noiseCancellation: variantData.noiseCancellation,
        dualPlayConnection: variantData.dualPlayConnection,
        appControl: variantData.appControl,
        waterResistant: variantData.waterResistant,
        touchControl: variantData.touchControl,
        multiDevice: variantData.multiDevice,
      }),
    };

    setProductData((prevProductData) => ({
      ...prevProductData,
      variants: [...prevProductData.variants, newVariant],
    }));

    setVariantsArray((prevArray) => [...prevArray, newVariant]);

    // Reset fields
    resetVariantData();
    setOpenVariantModal(false);
  };

  const handleAddProductSubmit = async () => {
    let totalStock;
    let discountPrice = Number(productData.discountPrice);
    if (productData.hasVariants) {
      totalStock = productData.variants.reduce(
        (sum, variant) => sum + parseInt(variant.stock, 10),
        0
      );
    } else {
      totalStock = Number(productData.totalStock);
    }

    try {
      if (!productData.name || productData.name.length < 3) {
        toast.error("Product name must be at least 3 characters.");
        return;
      }
      if (!productData.description || productData.description.length < 10) {
        toast.error("Description must be at least 10 characters.");
        return;
      }
      if (uploadedImages.length < 3 || uploadedImages.length > 5) {
        toast.error("Please upload between 3 and 5 product images.");
        return;
      }
      if (!productData.category) {
        toast.error("Category is required.");
        return;
      }
      if (!productData.material) {
        toast.error("Material is required.");
        return;
      }
      if (!productData.brand) {
        toast.error("Brand is required.");
        return;
      }
      if (productData.originalPrice <= 0) {
        toast.error("Original price must be greater than 0.");
        return;
      }
      if (
        Number(productData.discountPrice) >=
          Number(productData.originalPrice) ||
        Number(productData.discountPrice) < 0
      ) {
        toast.error(
          "Discount price must be less than original price and not negative."
        );
        return;
      }
      if (productData.isBluetoothSupported) {
        if (!productData.batteryLife) {
          toast.error("must provide battery life");
          return;
        }
        if (!productData.bluetoothVersion) {
          toast.error("Bluetooth version is required.");
          return;
        }
        if (!productData.bluetoothRange) {
          toast.error("Bluetooth range is required.");
          return;
        }
        if (!productData.chargingTime) {
          toast.error("charging time is required.");
          return;
        }
      }
      if (totalStock < 1) {
        toast.error("Stock must be at least 1.");
        return;
      }
      if (!productData.warranty) {
        toast.error("warranty required");
        return;
      }
      if (productData.description.length < 50) {
        toast.error("Description must be at least 50 characters.");
        return;
      }
      if (productData.hasVariants && productData.variants.length < 0) {
        toast.error("Variants required");
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("originalPrice", productData.originalPrice);
      formData.append("discountPrice", discountPrice);
      formData.append("totalStock", totalStock);
      formData.append("isNewArrival", productData.isNewArrival);
      formData.append("isFeatured", productData.isFeatured);
      formData.append("isPublished", productData.isPublished);
      uploadedImages.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("brand", productData.brand);
      formData.append("category", productData.category);
      formData.append("material", productData.material);
      formData.append("warranty", productData.warranty);
      formData.append("hasVariants", productData.hasVariants);
      formData.append("isBluetoothSupported", productData.isBluetoothSupported);

      if (productData.isBluetoothSupported) {
        formData.append("batteryLife", productData.batteryLife);
        formData.append("bluetoothVersion", productData.bluetoothVersion);
        formData.append("bluetoothRange", productData.bluetoothRange);
        formData.append("chargingTime", productData.chargingTime);
        formData.append("noiseCancellation", productData.noiseCancellation);
        formData.append("dualPlayConnection", productData.dualPlayConnection);
        formData.append("appControl", productData.appControl);
        formData.append("waterResistant", productData.waterResistant);
        formData.append("multiDevice", productData.multiDevice);
        formData.append("touchControl", productData.touchControl);
      }

      if (productData.hasVariants) {
        variantsArray.forEach((variant, index) => {
          formData.append(`variants[${index}][name]`, variant.name);
          formData.append(
            `variants[${index}][discountPrice]`,
            variant.discountPrice
          );
          formData.append(`variants[${index}][stock]`, variant.stock);
          formData.append(`variants[${index}][color]`, variant.color);
          formData.append(`variants[${index}][material]`, variant.material);
          formData.append(
            `variants[${index}][isBluetoothSupported]`,
            variant.isBluetoothSupported
          );

          if (variant.isBluetoothSupported) {
            // Always append noiseCancellation and dualPlayConnection
            formData.append(
              `variants[${index}][noiseCancellation]`,
              variant.noiseCancellation ?? false
            );
            formData.append(
              `variants[${index}][dualPlayConnection]`,
              variant.dualPlayConnection ?? false
            );
            formData.append(
              `variants[${index}][multiDevice]`,
              variant.multiDevice ?? false
            );
            formData.append(
              `variants[${index}][appControl]`,
              variant.appControl ?? false
            );
            formData.append(
              `variants[${index}][waterResistant]`,
              variant.waterResistant ?? false
            );
            formData.append(
              `variants[${index}][touchControl]`,
              variant.touchControl ?? false
            );
          }
        });
      }

      // Make API call
      const data = await createProductApi(formData);

      if (data && data.error) {
        toast.error("Failed to add product: " + data.error);
      } else if (data) {
        resetProductData();
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      toast.error("Error adding product.");
      console.error("Error adding product:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getPublishedCategoriesApi();
      setAllCategories(data);
    } catch (err) {
      toast.error(err);
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
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
        Add Product
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
                Add Images
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
        </Grid>

        {/* Display uploaded images */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            {productMainImg.map((imgSrc, index) => (
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
                    alt=""
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      color: "white",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                    }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <MdDelete />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* product name */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />
        </Grid>

        {/* category */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: "#ffffff" }}>Category</InputLabel>
            <Select
              value={productData.category}
              name="category"
              onChange={handleChange}
              variant="outlined"
              style={{ color: "#ffffff" }}
            >
              {allCategories &&
                allCategories.map((cat) => (
                  <MenuItem value={cat._id}>{cat.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {/* original price */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Original Price"
            value={productData.originalPrice}
            onChange={handleChange}
            name="originalPrice"
            variant="outlined"
            type="number"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />
        </Grid>

        {/* discount price */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Discount Price"
            name="discountPrice"
            value={productData.discountPrice}
            onChange={handleChange}
            type="number"
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />
        </Grid>

        {/* description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={productData.description}
            onChange={handleChange}
            name="description"
            variant="outlined"
            multiline
            rows={4}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />
        </Grid>

        {/* stock */}
        {!productData.hasVariants && (
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Stock"
              name="totalStock"
              value={productData.totalStock}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputLabelProps={{ style: { color: "#ffffff" } }}
              inputProps={{ style: { color: "#ffffff" } }}
            />
          </Grid>
        )}

        {/* warranty */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Warranty"
            name="warranty"
            value={productData.warranty}
            onChange={handleChange}
            type="text"
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />
        </Grid>

        {/* Material */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: "#ffffff" }}>Material</InputLabel>
            <Select
              value={productData.material}
              name="material"
              onChange={handleChange}
              variant="outlined"
              style={{ color: "#ffffff" }}
            >
              <MenuItem value="softPlastic">Soft-Plastic</MenuItem>
              <MenuItem value="medium-plastic">Medium-Plastic</MenuItem>
              <MenuItem value="hard-plastic">Hard-Plastic</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Brand */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: "#ffffff" }}>Brand</InputLabel>
            <Select
              value={productData.brand}
              name="brand"
              onChange={handleChange}
              variant="outlined"
              style={{ color: "#ffffff" }}
            >
              <MenuItem value="boat">BOAT</MenuItem>
              <MenuItem value="jbl">JBL</MenuItem>
              <MenuItem value="sony">SONY</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* color */}
        {!productData.hasVariants && (
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel style={{ color: "#ffffff" }}>Color</InputLabel>
              <Select
                value={productData.color}
                name="color"
                onChange={handleChange}
                variant="outlined"
                style={{ color: "#ffffff" }}
              >
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="white">White</MenuItem>
                <MenuItem value="red">Re</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                name="isBluetoothSupported"
                checked={productData.isBluetoothSupported}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Does your product support Bluetooth?"
          />
        </Grid>
        {productData.isBluetoothSupported && (
          <>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Battery Life (hours)"
                name="batteryLife"
                value={productData.batteryLife}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bluetooth Version"
                name="bluetoothVersion"
                value={productData.bluetoothVersion}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bluetooth Range"
                name="bluetoothRange"
                value={productData.bluetoothRange}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Charging time"
                name="chargingTime"
                value={productData.chargingTime}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="noiseCancellation"
                      checked={productData.noiseCancellation}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Noise Cancellation"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="dualPlayConnection"
                      checked={productData.dualPlayConnection}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Dual Play Connect"
                />
              </FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="multiDevice"
                    checked={productData.multiDevice}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Multi Device"
              />
            </Grid>

            <Grid item xs={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="appControl"
                      checked={productData.appControl}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="App Control"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="waterResistant"
                      checked={productData.waterResistant}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Water Resistant"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="touchControl"
                      checked={productData.touchControl}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Touch Countrol"
                />
              </FormGroup>
            </Grid>
          </>
        )}

        {/* hasVariants  */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                name="hasVariants"
                checked={productData.hasVariants}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Does this product have variants?"
          />
        </Grid>

        {/* variant button */}
        {productData.hasVariants && (
          <>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {variantsArray.map((variant, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      border: "1px solid white",
                      borderRadius: "5px",
                      padding: "10px",
                      backgroundColor: "grey",
                    }}
                  >
                    <Typography variant="h6">{variant.name}</Typography>
                    <Typography>
                      Discount Price: ${variant.discountPrice}
                    </Typography>
                    <Typography>Stock: {variant.stock}</Typography>
                    <Typography>Material: {variant.material}</Typography>
                    <Typography>Color: {variant.color}</Typography>
                    <Typography>
                      Supoort Bluetooth:{" "}
                      {variant.isBluetoothSupported ? "Yes" : "No"}
                    </Typography>

                    {/* Check if the variant supports Bluetooth */}
                    {variant.isBluetoothSupported && (
                      <>
                        <Typography>
                          Noise Cancellation:
                          {variant.noiseCancellation ? "Yes" : "No"}
                        </Typography>
                        <Typography>
                          Dual Play Connection:
                          {variant.dualPlayConnection ? "Yes" : "No"}
                        </Typography>
                        <Typography>
                          Multi Device:
                          {variant.multiDevice ? "Yes" : "No"}
                        </Typography>
                        <Typography>
                          App Control:
                          {variant.appControl ? "Yes" : "No"}
                        </Typography>
                        <Typography>
                          Water Resistant:
                          {variant.waterResistant ? "Yes" : "No"}
                        </Typography>
                        <Typography>
                          Touch Contol:
                          {variant.touchControl ? "Yes" : "No"}
                        </Typography>
                      </>
                    )}

                    <Grid container spacing={1}>
                      {variant.images.map((imgSrc, imgIndex) => (
                        <Grid item xs={4} key={imgIndex}>
                          <Box
                            sx={{
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={imgSrc}
                              alt="Variant"
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                            />
                          </Box>
                        </Grid>
                      ))}
                      <Button
                        onClick={(e) => handleDeleteVariant(index)}
                        sx={{
                          width: "100%",
                          background: "white",
                          marginTop: "10px",
                          color: "black",
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setOpenVariantModal(true)}
                sx={{ mt: 2 }}
              >
                Add Variant
              </Button>
            </Grid>
          </>
        )}

        <Grid item xs={6}>
          <Divider
            sx={{ height: "1px", color: "white", background: "white" }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="isNewArrival"
                  checked={productData.isNewArrival}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="New Arrival"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isFeatured"
                  checked={productData.isFeatured}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Featured"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12} sx={{ mt: 3 }}>
          <Select
            value={wantToPublish}
            onChange={(e) => setWantToPublish(e.target.value)}
            variant="filled"
            style={{ color: "black", backgroundColor: "#f0f0f0" }}
          >
            <MenuItem value={true}>Publish</MenuItem>
            <MenuItem value={false}>UnPublish</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Button
            onClick={handleAddProductSubmit}
            sx={{ background: "white", color: "black" }}
            fullWidth
          >
            Add Product
          </Button>
        </Grid>
      </Grid>

      <Modal
        open={openVariantModal}
        onClose={() => setOpenVariantModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            backgroundColor: "#121212",
            borderRadius: "10px",
            padding: "20px",
            color: "#ffffff",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Product Variant
          </Typography>

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Variant Name"
            name="name"
            value={variantData.name}
            onChange={handleVariantChange}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Original Price"
            type="number"
            name="discountPrice"
            value={variantData.discountPrice}
            onChange={handleVariantChange}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Stock"
            type="number"
            name="stock"
            value={variantData.stock}
            onChange={handleVariantChange}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          {/* color */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel style={{ color: "#ffffff" }}>Colors</InputLabel>
            <Select
              variant="outlined"
              name="color"
              value={variantData.color}
              onChange={handleVariantChange}
              style={{ color: "#ffffff" }}
              sx={{
                "& .MuiSelect-select": {
                  color: "#ffffff",
                },
                "& .MuiInputLabel-root": {
                  color: "#ffffff",
                },
              }}
            >
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="white">White</MenuItem>
            </Select>
          </FormControl>

          {/* variant material */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel style={{ color: "#ffffff" }}>Material</InputLabel>
            <Select
              variant="outlined"
              name="material"
              value={variantData.material}
              onChange={handleVariantChange}
              style={{ color: "#ffffff" }}
              sx={{
                "& .MuiSelect-select": {
                  color: "#ffffff",
                },
                "& .MuiInputLabel-root": {
                  color: "#ffffff",
                },
              }}
            >
              <MenuItem value="softPlastic">soft plastic</MenuItem>
              <MenuItem value="mediumPlastic">medium plastic</MenuItem>
              <MenuItem value="hardPlastic">hard plastic</MenuItem>
            </Select>
          </FormControl>

          {/* is bluetooth support */}
          <FormControlLabel
            control={
              <Switch
                name="isBluetoothSupported"
                checked={variantData.isBluetoothSupported}
                onChange={handleVariantChange}
              />
            }
            label="Supports Bluetooth"
          />

          {variantData.isBluetoothSupported && (
            <>
              {/* noise cancellation */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="noiseCancellation"
                      checked={variantData.noiseCancellation}
                      onChange={handleVariantChange}
                      style={{ color: "#ffffff" }}
                    />
                  }
                  label="Noise Cancellation"
                  sx={{ mt: 2, color: "#ffffff" }}
                />
              </Grid>

              {/* dual play connection */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="dualPlayConnection"
                      checked={variantData.dualPlayConnection}
                      onChange={handleVariantChange}
                      style={{ color: "#ffffff" }}
                    />
                  }
                  label="Dual Play Connection"
                  sx={{ mt: 2, color: "#ffffff" }}
                />
              </Grid>

              {/* multi device */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="multiDevice"
                      checked={variantData.multiDevice}
                      onChange={handleVariantChange}
                      style={{ color: "#ffffff" }}
                    />
                  }
                  label="Multi Device"
                  sx={{ mt: 2, color: "#ffffff" }}
                />
              </Grid>

              {/* app control */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="appControl"
                      checked={variantData.appControl}
                      onChange={handleVariantChange}
                      style={{ color: "#ffffff" }}
                    />
                  }
                  label="App Control"
                  sx={{ mt: 2, color: "#ffffff" }}
                />
              </Grid>

              {/*water resistance */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="waterResistant"
                      checked={variantData.waterResistant}
                      onChange={handleVariantChange}
                      style={{ color: "#ffffff" }}
                    />
                  }
                  label="Water resistance"
                  sx={{ mt: 2, color: "#ffffff" }}
                />
              </Grid>

              {/* touch control */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="touchControl"
                      checked={variantData.touchControl}
                      onChange={handleVariantChange}
                      style={{ color: "#ffffff" }}
                    />
                  }
                  label="Touch control"
                  sx={{ mt: 2, color: "#ffffff" }}
                />
              </Grid>
            </>
          )}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Box
              sx={{
                width: "100%",
                height: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px dashed #ccc",
              }}
              onClick={() =>
                document.getElementById("upload-variant-image").click()
              }
            >
              <MdCloudUpload color="black" fontSize={"50px"} />

              <Typography
                sx={{
                  color: "black",
                  fontFamily: '"Istok Web", sans-serif',
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Click to Add variant images
              </Typography>
            </Box>
            <input
              hidden
              id="upload-variant-image"
              accept="image/*"
              multiple
              name="variantImages"
              type="file"
              onChange={handleVariantImageUpload}
            />
          </FormControl>

          <Grid sx={{ marginTop: "30px" }} container spacing={2}>
            {variantProductTempImg.map((imgSrc, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  {/* Display the image */}
                  <img
                    src={imgSrc}
                    alt=""
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />

                  {/* Delete Icon */}
                  <IconButton
                    onClick={() => handleVariantDeleteImage(index)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <MdDelete color="red" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="outlined"
            onClick={handleSaveVariant}
            sx={{ mt: 2, width: "100%" }}
          >
            Save Variant
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddProduct;
