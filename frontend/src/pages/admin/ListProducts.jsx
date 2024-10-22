import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";
import { getAllProductsApi } from "../../api/adminApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedAdminProducts,
  setAdminProducts,
} from "../../features/admin/adminSlice";
import { handlePublicChangeApi } from "../../api/productApi";

const ListProducts = () => {
  const products = useSelector(selectedAdminProducts);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState("All");
  const [selectedPublishStatus, setSelectedPublishStatus] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesStock =
      selectedStock === "All" ||
      (selectedStock === "Out of stock" && product?.totalStock === 0) ||
      (selectedStock === "In stock" && product?.totalStock > 0) ||
      (selectedStock === "Low stock" &&
        product?.totalStock > 0 &&
        product?.totalStock <= 5);

    const matchesPublishStatus =
      selectedPublishStatus === "All" ||
      (selectedPublishStatus === "Published" && product?.isPublished) ||
      (selectedPublishStatus === "Unpublished" && !product?.isPublished);

    const matchesSearch =
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.category?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStock && matchesPublishStatus && matchesSearch;
  });

  const fetchProducts = async () => {
    try {
      const { data } = await getAllProductsApi();
      if (data.response) {
        const { status } = data.response;
        if (status === 400 || status === 500) {
          toast.error(data.response.data.message);
        }
      } else {
        dispatch(setAdminProducts(data));
      }
    } catch (err) {
      toast.error("Failed to fetch products. Please try again.");
      console.error("Fetch Products Error:", err);
    }
  };

  const handlePublishChange = async (id,data) => {
    try{
      const response = await handlePublicChangeApi(id,data)
      if(response){
        toast.success("Products published successfully.");
        fetchProducts();
      }
    }catch(err){
      toast.error("Failed to publish products. Please try again.");
      console.error("Publish Change Error:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e2d", borderRadius: "8px" }}>
      {/* Filters */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        {/* Stock Filter */}
        <Select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          sx={{ backgroundColor: "#2c2c3a", color: "white" }}
        >
          <MenuItem value="All">All Stock</MenuItem>
          <MenuItem value="Out of stock">Out of stock</MenuItem>
          <MenuItem value="In stock">In stock</MenuItem>
          <MenuItem value="Low stock">Low stock</MenuItem>
        </Select>
        {/* Search Filter */}
        <TextField
          variant="outlined"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "#2c2c3a",
            borderRadius: 1,
            input: { color: "white" },
          }}
          InputLabelProps={{ style: { color: "white" } }}
        />

        {/* Publish Filter */}
        <Select
          value={selectedPublishStatus}
          onChange={(e) => setSelectedPublishStatus(e.target.value)}
          sx={{ backgroundColor: "#2c2c3a", color: "white" }}
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
          <MenuItem value="Unpublished">Unpublished</MenuItem>
        </Select>
      </Box>

      {/* Product Table */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e2d", color: "white" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox sx={{ color: "white" }} />
              </TableCell>
              <TableCell sx={{ color: "white" }}>Product</TableCell>
              <TableCell sx={{ color: "white" }}>CreatedAt</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
              <TableCell sx={{ color: "white" }}>Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Checkbox sx={{ color: "white" }} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={product.images[0]}
                      sx={{ mr: 2 }}
                    ></Avatar>
                    {product.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {product.variants?.length > 0 ? (
                    product.variants[0].originalPrice
                  ) : (
                    <>
                      <i
                        style={{ marginTop: "3px", marginRight: "3px" }}
                        className="fa-solid fa-indian-rupee-sign"
                      ></i>
                      {product.discountPrice}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip
                    placement="top"
                    title={product.totalStock}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "#333",
                            color: "#fff",
                          },
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        padding: "5px",
                        borderRadius: "5px",
                        backgroundColor:
                          product.totalStock < 1
                            ? "#e74c3c"
                            : product.totalStock <= 50
                              ? "#f1c40f"
                              : "#2ecc71",
                        color: product.totalStock < 1 ? "#fff" : "#333",
                      }}
                    >
                      {product.totalStock < 1
                        ? "Out of Stock"
                        : product.totalStock <= 50
                          ? "Low Stock"
                          : "In Stock"}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Select
                    value={product.isPublished}
                    onChange={(e) =>
                      handlePublishChange(product._id, e.target.value)
                    } // Add onChange handler
                    sx={{
                      backgroundColor: "#2c2c3a",
                      color: "white",
                      width: "150px",
                    }}
                  >
                    <MenuItem value={true}>Published</MenuItem>
                    <MenuItem value={false}>Unpublished</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <IoMdMore
                    fontSize={"25px"}
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => {
                      console.log(`Edit product: ${product.name}`);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListProducts;
