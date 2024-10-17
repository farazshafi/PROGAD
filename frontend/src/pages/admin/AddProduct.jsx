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

const AddProduct = () => {
  const [isBluetooth, setIsBluetooth] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [features, setFeatures] = useState({
    noiseCancellation: false,
    dualPlayConnect: false,
  });

  // Handle default product image upload
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imageList = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setUploadedImages(imageList);
  };

  const handleCheckboxChange = (event) => {
    setFeatures({
      ...features,
      [event.target.name]: event.target.checked,
    });
  };
  const [variantsArray, setVariantsArray] = useState([]);
  const [hasVariants, setHasVariants] = useState(false);
  const [openVariantModal, setOpenVariantModal] = useState(false);
  const [variantImages, setVariantImages] = useState([]);
  const [variantName, setVariantName] = useState("");
  const [variantOriginalPrice, setVariantOriginalPrice] = useState(0);
  const [variantDiscountPrice, setVariantDiscountPrice] = useState(0);
  const [variantStock, setVariantStock] = useState(0);
  const [variantType, setVariantType] = useState("");
  const [variantColor, setVariantColor] = useState("");
  const [hasBluetooth, setHasBluetooth] = useState(false);
  const [batteryLife, setBatteryLife] = useState("");
  const [bluetoothVersion, setBluetoothVersion] = useState("");
  const [noiseCancellation, setNoiseCancellation] = useState(false);
  const [dualPlayConnection, setDualPlayConnection] = useState(false);

  const handleVariantImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }
    setVariantImages(newImages);
  };

  const handleDeleteVariant = (indexToDelete) => {
    setVariantsArray((prevArray) =>
      prevArray.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSaveVariant = () => {
    const newVariant = {
      name: variantName,
      originalPrice: variantOriginalPrice,
      discountPrice: variantDiscountPrice,
      stock: variantStock,
      type: variantType,
      color: variantColor,
      images: variantImages,
      hasBluetooth,
      ...(hasBluetooth && {
        batteryLife,
        bluetoothVersion,
        noiseCancellation,
        dualPlayConnection,
      }),
    };

    setVariantsArray((prevArray) => [...prevArray, newVariant]);

    // Reset fields
    setVariantName("");
    setVariantOriginalPrice("");
    setVariantDiscountPrice("");
    setVariantStock("");
    setVariantType("");
    setVariantColor("");
    setVariantImages([]);
    setHasBluetooth(false);
    setBatteryLife("");
    setBluetoothVersion("");
    setNoiseCancellation(false);
    setDualPlayConnection(false);
    setOpenVariantModal(false);
  };

  const handleAddProductSubmit = () => {
    console.log("variants :", variantsArray);
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

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: "#ffffff" }}>Category</InputLabel>
            <Select variant="outlined" style={{ color: "#ffffff" }}>
              <MenuItem value="headphones">Headphones</MenuItem>
              <MenuItem value="earbuds">Earbuds</MenuItem>
              <MenuItem value="speakers">Speakers</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Original Price"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Discount Price"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel style={{ color: "#ffffff" }}>Types</InputLabel>
                <Select variant="outlined" style={{ color: "#ffffff" }}>
                  <MenuItem value="headphones">Bluetooth</MenuItem>
                  <MenuItem value="earbuds">Wired</MenuItem>
                </Select>
              </FormControl>
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
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#ffffff" } }}
                    inputProps={{ style: { color: "#ffffff" } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Bluetooth Version"
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
                          onChange={handleCheckboxChange}
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
                          onChange={handleCheckboxChange}
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
            value={variantStock}
            onChange={(e) => setVariantStock(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            inputProps={{ style: { color: "#ffffff" } }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel style={{ color: "#ffffff" }}>Types</InputLabel>
            <Select
              variant="outlined"
              value={variantType}
              onChange={(e) => setVariantType(e.target.value)}
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
              <MenuItem value="bluetooth">Bluetooth</MenuItem>
              <MenuItem value="wired">Wired</MenuItem>
            </Select>
          </FormControl>

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
                checked={hasBluetooth}
                onChange={(e) => setHasBluetooth(e.target.checked)}
              />
            }
            label="Supports Bluetooth"
          />

          {hasBluetooth && (
            <>
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                label="Battery Life (hours)"
                value={batteryLife}
                onChange={(e) => setBatteryLife(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />

              <TextField
                sx={{ mt: 2 }}
                fullWidth
                label="Bluetooth Version"
                value={bluetoothVersion}
                onChange={(e) => setBluetoothVersion(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#ffffff" } }}
                inputProps={{ style: { color: "#ffffff" } }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={noiseCancellation}
                    onChange={(e) => setNoiseCancellation(e.target.checked)}
                    style={{ color: "#ffffff" }}
                  />
                }
                label="Noise Cancellation"
                sx={{ mt: 2, color: "#ffffff" }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={dualPlayConnection}
                    onChange={(e) => setDualPlayConnection(e.target.checked)}
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
