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
  Divider,
  IconButton,
  Menu,
  Stack,
  Pagination,
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
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ListProducts = () => {
  const products = useSelector(selectedAdminProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState("All");
  const [selectedPublishStatus, setSelectedPublishStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for handling the Menu component for each product
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      const { data } = await getAllProductsApi(page);
      console.log("the data , ", data);
      if (data.response) {
        const { status } = data.response;
        if (status === 400 || status === 500) {
          toast.error(data.response.data.message);
        }
      } else {
        dispatch(setAdminProducts(data.products));
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      toast.error("Failed to fetch products. Please try again.");
      console.error("Fetch Products Error:", err);
    }
  };

  const handlePublishChange = async (id, data) => {
    try {
      const response = await handlePublicChangeApi(id, data);
      if (response) {
        toast.success("Product publish status updated successfully.");
        fetchProducts();
      }
    } catch (err) {
      toast.error("Failed to update publish status. Please try again.");
      console.error("Publish Change Error:", err);
    }
  };

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    navigate(`/admin_dashboard/product/edit_product/${selectedProduct._id}`);
    handleClose();
  };

  const handleDelete = (productId) => {
    handleClose();
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e2d", borderRadius: "8px" }}>
        <p className="text-4xl text-center text-white py-4">Product Management</p>

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
                  {product.variants?.length > 0
                    ? product.variants[0].originalPrice
                    : product.discountPrice}
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
                    }
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
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={(e) => handleMenuClick(e, product)}
                  >
                    <IoMdMore />
                  </IconButton>
                  {/* Action Menu */}
                  <Menu
                    sx={{ "& .MuiPaper-root": { backgroundColor: "white" } }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      style={{ gap: "20px", color: "black" }}
                      onClick={() => handleEdit(product)}
                    >
                      <MdEdit /> Edit
                    </MenuItem>
                    <Divider sx={{ height: "1px", backgroundColor: "black" }} />
                    <MenuItem
                      style={{ gap: "20px", color: "black" }}
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaEye /> View
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" marginTop={4}>
        <Pagination
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white", 
            },
          }}
          count={totalPages}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default ListProducts;
