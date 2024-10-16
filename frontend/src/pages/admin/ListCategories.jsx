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
  TextField,
  Typography,
  Box,
  IconButton,
  Menu,
  Divider,
  MenuItem,
} from "@mui/material";
import { format } from 'date-fns'; 
import { IoMdMore } from "react-icons/io";
import { MdEdit, MdPublish } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { getAllCategories } from "../../api/categoryApi";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnpublishedOnly, setShowUnpublishedOnly] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter categories based on search term and unpublished status
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPublished = !showUnpublishedOnly || !category.isPublished;

    return matchesSearch && matchesPublished;
  });

  const totalCategories = categories.length;
  const unpublishedCategories = categories.filter(
    (cat) => !cat.isPublished
  ).length;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleMenuClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const handlePublish = async () => {
    //
  };

  const handleEdit = () => {
    console.log(`Edit category: ${selectedCategory.name}`);
    handleClose();
  };

  const handleView = () => {
    console.log(`View category: ${selectedCategory.name}`);
    handleClose();
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e2d", borderRadius: "8px" }}>
      {/* Highlight Section */}
      <Box display="flex" mb={3}>
        <Typography
          style={{ cursor: "pointer" }}
          onClick={() => setShowUnpublishedOnly(false)}
          sx={{
            color: showUnpublishedOnly ? "grey" : "white",
            padding: "2px 5px",
            borderRadius: "4px",
            transition: "background-color 0.3s",
          }}
        >
          All
          <span
            style={{
              padding: "2px 5px",
              background: showUnpublishedOnly ? "grey" : "white",
              color: "black",
              borderRadius: "4px",
              marginLeft: "3px",
            }}
          >
            {totalCategories}
          </span>
        </Typography>

        <Typography
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={() => setShowUnpublishedOnly(true)}
          sx={{
            color: showUnpublishedOnly ? "white" : "grey",
            padding: "2px 5px",
            borderRadius: "4px",
            transition: "background-color 0.3s",
          }}
        >
          Unpublished
          <span
            style={{
              padding: "2px 5px",
              background: showUnpublishedOnly ? "#ff2d00" : "#fa927c",
              color: "black",
              borderRadius: "4px",
              marginLeft: "5px",
            }}
          >
            {unpublishedCategories}
          </span>
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        variant="outlined"
        placeholder="Search by name or description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          backgroundColor: "#2c2c3a",
          borderRadius: 1,
          input: { color: "white" },
        }}
        InputLabelProps={{ style: { color: "white" } }}
        fullWidth
        mb={3}
      />

      {/* Category Table */}
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
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>CreatedAt</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <Checkbox sx={{ color: "white" }} />
                </TableCell>
                <TableCell sx={{ color: "white" }}>{category.name}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {category.description}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {format(
                    new Date(category.createdAt),
                    "MMMM dd, yyyy, hh:mm a"
                  )}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      backgroundColor: category.isPublished ? "green" : "red",
                      color: "white",
                    }}
                  >
                    {category.isPublished ? "Published" : "Unpublished"}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, category)}
                    sx={{ color: "white" }}
                  >
                    <IoMdMore fontSize={"25px"} />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{ "& .MuiPaper-root": { backgroundColor: "white" } }}
                  >
                    <MenuItem
                      onClick={handlePublish}
                      sx={{
                        color: category.isPublished ? "red" : "green",
                        gap: "15px",
                      }}
                    >
                      <MdPublish fontSize={"25px"} />
                      {category.isPublished ? "Unpublish" : "Publish"}
                    </MenuItem>
                    <Divider sx={{ height: "1px", background: "black" }} />
                    <MenuItem
                      onClick={handleEdit}
                      sx={{ color: "black", gap: "15px" }}
                    >
                      <MdEdit fontSize={"25px"} />
                      Edit
                    </MenuItem>
                    <Divider sx={{ height: "1px", background: "black" }} />
                    <MenuItem
                      onClick={handleView}
                      sx={{ color: "blue", gap: "15px" }}
                    >
                      <FaEye fontSize={"25px"} />
                      View
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListCategories;
