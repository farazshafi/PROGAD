import React, { useState } from "react";
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
  TextField,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";

const ListProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Urban Explorer Sneakers',
      category: 'Accessories',
      createdAt: '20 Aug 2024 12:24 am',
      stock: 'Out of stock',
      price: 83.74,
      publishStatus: 'Unpublished',
      image: '/path-to-your-image/sneakers.png',
    },
    {
      id: 2,
      name: 'Classic Leather Loafers',
      category: 'Shoes',
      createdAt: '18 Aug 2024 11:24 pm',
      stock: 'In stock',
      price: 97.14,
      publishStatus: 'Published',
      image: '/path-to-your-image/loafers.png',
    },
    {
      id: 3,
      name: 'Sports Running Shoes',
      category: 'Shoes',
      createdAt: '15 Aug 2024 10:14 am',
      stock: 'Low stock',
      price: 45.99,
      publishStatus: 'Unpublished',
      image: '/path-to-your-image/running.png',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState("All");
  const [selectedPublishStatus, setSelectedPublishStatus] = useState("All");

  // Filter products based on search term, stock status, and publish status
  const filteredProducts = products.filter((product) => {
    const matchesStock =
      selectedStock === "All" || product.stock.toLowerCase().includes(selectedStock.toLowerCase());
    const matchesPublishStatus =
      selectedPublishStatus === "All" ||
      product.publishStatus.toLowerCase().includes(selectedPublishStatus.toLowerCase());
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStock && matchesPublishStatus && matchesSearch;
  });

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
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox sx={{ color: "white" }} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 2 }}>{product.name.charAt(0)}</Avatar>
                    {product.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "white" }}>{product.createdAt}</TableCell>
                <TableCell sx={{ color: "white" }}>{product.price}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      backgroundColor:
                        product.stock === "Out of stock"
                          ? "#e74c3c"
                          : product.stock === "In stock"
                          ? "#2ecc71"
                          : "#f1c40f",
                      color: product.stock === "Out of stock" ? "#fff" : "#333",
                    }}
                  >
                    {product.stock}
                  </Box>
                </TableCell>
                <TableCell>
                  <Select
                    value={product.publishStatus}
                    onChange={(e) => {
                      console.log(
                        `Update publish status of ${product.name} to ${e.target.value}`
                      );
                    }}
                    sx={{
                      backgroundColor: "#2c2c3a",
                      color: "white",
                      width: "150px",
                    }}
                  >
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Unpublished">Unpublished</MenuItem>
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
