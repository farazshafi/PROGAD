import React, { useState } from "react";
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
} from "@mui/material";
import { MdCloudUpload } from "react-icons/md";
import { createProductApi } from "../../api/productApi";

const AddProduct = () => {
  const [isBluetooth, setIsBluetooth] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
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

  // Handle default product image upload
  const handleImageUpload = (event) => {
    // const files = event.target.files;
    // const imageList = Array.from(files).map((file) =>
    //   URL.createObjectURL(file)
    // );
    // setUploadedImages(imageList);
    const files = event.target.files;
    const imageList = Array.from(files);
    setUploadedImages(imageList);
  };

  const handleCheckboxChangeOg = (event) => {
    const { name, checked } = event.target;
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: checked,
    }));
  };

  const handleVariantImageUpload = (event) => {
    // const files = event.target.files;
    // const newImages = [];
    // for (let i = 0; i < files.length; i++) {
    //   newImages.push(URL.createObjectURL(files[i]));
    // }
    // setVariantImages(newImages);

    const files = event.target.files;
    const imageList = Array.from(files);
    setVariantImages(imageList);
  };

  const handleDeleteVariant = (indexToDelete) => {
    setVariantsArray((prevArray) =>
      prevArray.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSaveVariant = () => {
    // Validation function
    const validateFields = () => {
      if (!variantName || variantName.length < 3) {
        alert("Variant name must be at least 3 characters long.");
        return false;
      }
      if (!variantOriginalPrice || variantOriginalPrice <= 1) {
        alert("Original price must be greater than 0.");
        return false;
      }
      if (variantDiscountPrice < 0) {
        alert("Discount price cannot be negative.");
        return false;
      }
      if (!variantStock || variantStock < 0) {
        alert("Stock must be greater than or equal to 0.");
        return false;
      }
      return true;
    };

    if (!validateFields()) {
      return;
    }

    const newVariant = {
      name: variantName,
      originalPrice: variantOriginalPrice,
      discountPrice: variantDiscountPrice,
      stock: variantStock,
      type: variantHasBluetooth ? "Bluetooth" : "Non-Bluetooth",
      color: variantColor,
      images: variantImages,
      variantHasBluetooth,
      warranty: variantWarranty,
      ...(variantHasBluetooth && {
        variantBatteryLife,
        variantBluetoothVersion,
        variantNoiseCancellation,
        variantDualPlayConnection,
      }),
    };

    setVariantsArray((prevArray) => [...prevArray, newVariant]);

    // Reset fields
    setVariantName("");
    setVariantOriginalPrice(0);
    setVariantDiscountPrice(0);
    setVariantStock(0);
    setVariantColor("");
    setVariantImages([]);
    setVariantHasBluetooth(false);
    setVariantBatteryLife("");
    setVariantBluetoothVersion("");
    setVariantNoiseCancellation(false);
    setVariantDualPlayConnection(false);
    setOpenVariantModal(false);
  };

  const handleAddProductSubmit = async () => {
    try {
      if (
        !productName ||
        !description ||
        uploadedImages.length === 0 ||
        !category
      ) {
        alert("Please fill out all required fields.");
        return;
      }

      const formData = new FormData();

      formData.append("name", productName);
      formData.append("description", description);
      formData.append("originalPrice", originalPrice);
      formData.append("discountPrice", discountPrice);
      formData.append("totalStock", stock);
      formData.append("isPublished", true);
      formData.append("category", "670f64bb4e5d5f23016cfd5b");
      formData.append("hasVariants", hasVariants);
      formData.append("type", isBluetooth ? "Bluetooth" : "Non-Bluetooth");
      formData.append("warranty", warranty);

      if (isBluetooth) {
        formData.append("batteryLife", batteryLife);
        formData.append("bluetoothVersion", bluetoothVersion);
        formData.append("noiseCancellation", features.noiseCancellation);
        formData.append("dualPlayConnection", features.dualPlayConnect);
      }

      uploadedImages.forEach((image) => {
        formData.append("images", image);
      });

      if (hasVariants) {
        variantsArray.forEach((variant, index) => {
          formData.append(`variants[${index}][name]`, variant.name);
          formData.append(
            `variants[${index}][originalPrice]`,
            variant.originalPrice
          );
          formData.append(
            `variants[${index}][discountPrice]`,
            variant.discountPrice
          );
          formData.append(`variants[${index}][stock]`, variant.stock);
          formData.append(`variants[${index}][color]`, variant.color);
          formData.append(`variants[${index}][type]`, variant.type);
          formData.append(`variants[${index}][warranty]`, variant.warranty);

          variant.images.forEach((variantImage) => {
            formData.append("variantImages", variantImage);
          });

          if (variant.type === "Bluetooth") {
            formData.append(
              `variants[${index}][batteryLife]`,
              variant.variantBatteryLife
            );
            formData.append(
              `variants[${index}][bluetoothVersion]`,
              variant.variantBluetoothVersion
            );
            formData.append(
              `variants[${index}][isNoiseCancellationEnabled]`,
              variant.variantNoiseCancellation
            );
            formData.append(
              `variants[${index}][isDualPlayConnectionEnabled]`,
              variant.variantDualPlayConnection
            );
          }
        });
      }

      // Make API call with FormData
      const data = await createProductApi(formData);

      if (data && data.error) {
        console.error("Error from backend:", data.error);
        alert("Failed to add product: " + data.error);
      } else if (data) {
        resetState();
      } else {
        console.error("Failed to add product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

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
        </Grid>

        {/* Display uploaded images */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            {uploadedImages.map((imgSrc, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={""}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
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
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              style={{ color: "#ffffff" }}
            >
              <MenuItem value="headphones">Headphones</MenuItem>
              <MenuItem value="earbuds">Earbuds</MenuItem>
              <MenuItem value="speakers">Speakers</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={hasVariants}
                onChange={(e) => setHasVariants(e.target.checked)}
                color="primary"
              />
            }
            label="Does this product have variants?"
          />
        </Grid>

        {!hasVariants ? (
          <>
            {/* original price */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Original Price"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
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
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                type="number"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>

            {/* stock */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type="number"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>

            {/* warranty */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Warranty"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                type="text"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isBluetooth}
                    onChange={(e) => setIsBluetooth(e.target.checked)}
                    color="primary"
                  />
                }
                label="Does your product support Bluetooth?"
              />
            </Grid>
            {isBluetooth && (
              <>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Battery Life (hours)"
                    value={batteryLife}
                    onChange={(e) => setBatteryLife(e.target.value)}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#ffffff" } }}
                    inputProps={{ style: { color: "#ffffff" } }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Bluetooth Version"
                    value={bluetoothVersion}
                    onChange={(e) => setBluetoothVersion(e.target.value)}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#ffffff" } }}
                    inputProps={{ style: { color: "#ffffff" } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={features.noiseCancellation}
                          onChange={handleCheckboxChangeOg}
                          name="noiseCancellation"
                          color="primary"
                        />
                      }
                      label="Noise Cancellation"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={features.dualPlayConnect}
                          onChange={handleCheckboxChangeOg}
                          name="dualPlayConnect"
                          color="primary"
                        />
                      }
                      label="Dual Play Connect"
                    />
                  </FormGroup>
                </Grid>
              </>
            )}
          </>
        ) : (
          <>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {variantsArray.map((variant, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      backgroundColor: "black",
                    }}
                  >
                    <Typography variant="h6">{variant.name}</Typography>
                    <Typography>
                      Original Price: ${variant.originalPrice}
                    </Typography>
                    <Typography>
                      Discount Price: ${variant.discountPrice}
                    </Typography>
                    <Typography>Stock: {variant.stock}</Typography>
                    <Typography>Type: {variant.type}</Typography>
                    <Typography>Color: {variant.color}</Typography>

                    {/* Check if the variant supports Bluetooth */}
                    {variant.hasBluetooth && (
                      <>
                        <Typography>
                          Battery Life: {variant.batteryLife} hours
                        </Typography>
                        <Typography>
                          Bluetooth Version: {variant.bluetoothVersion}
                        </Typography>
                        <Typography>
                          Noise Cancellation:{" "}
                          {variant.noiseCancellation ? "Yes" : "No"}
                        </Typography>
                        <Typography>
                          Dual Play Connection:{" "}
                          {variant.dualPlayConnection ? "Yes" : "No"}
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
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Original Price"
            type="number"
            value={variantOriginalPrice}
            onChange={(e) => setVariantOriginalPrice(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Discount Price"
            type="number"
            value={variantDiscountPrice}
            onChange={(e) => setVariantDiscountPrice(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Stock"
            type="number"
            value={variantStock}
            onChange={(e) => setVariantStock(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Warranty"
            type="text"
            value={variantWarranty}
            onChange={(e) => setVariantWarranty(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel style={{ color: "#ffffff" }}>Colors</InputLabel>
            <Select
              variant="outlined"
              value={variantColor}
              onChange={(e) => setVariantColor(e.target.value)}
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
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="white">White</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={variantHasBluetooth}
                onChange={(e) => setVariantHasBluetooth(e.target.checked)}
              />
            }
            label="Supports Bluetooth"
          />

          {variantHasBluetooth && (
            <>
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                label="Battery Life (hours)"
                value={variantBatteryLife}
                onChange={(e) => setVariantBatteryLife(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />

              <TextField
                sx={{ mt: 2 }}
                fullWidth
                label="Bluetooth Version"
                value={variantBluetoothVersion}
                onChange={(e) => setVariantBluetoothVersion(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={variantNoiseCancellation}
                    onChange={(e) =>
                      setVariantNoiseCancellation(e.target.checked)
                    }
                    style={{ color: "#ffffff" }}
                  />
                }
                label="Noise Cancellation"
                sx={{ mt: 2, color: "#ffffff" }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={variantDualPlayConnection}
                    onChange={(e) =>
                      setVariantDualPlayConnection(e.target.checked)
                    }
                    style={{ color: "#ffffff" }}
                  />
                }
                label="Dual Play Connection"
                sx={{ mt: 2, color: "#ffffff" }}
              />
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
                Click to upload variant images
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

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {variantImages.map((imgSrc, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={""}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
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
