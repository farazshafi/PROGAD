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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { format } from "date-fns";
import { IoMdMore } from "react-icons/io";
import { MdEdit, MdPublish } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import {
  getAllCategories,
  handlePublishCategory,
  onCreateCategory,
  onDeleteCategory,
  updateCategoryApi,
} from "../../api/categoryApi";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnpublishedOnly, setShowUnpublishedOnly] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    isPublished: false,
  });
  const [editCategory, setEditCategory] = useState({
    name: "",
    description: "",
    isPublished: false,
  });

  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      setCategories(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

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
    try {
      console.log(selectedCategory._id);
      await handlePublishCategory(
        selectedCategory._id,
        !selectedCategory.isPublished
      );
      fetchCategories();
    } catch (e) {
      console.error("Error publishing category:", e);
    }
  };

  const handleEdit = () => {
    setEditCategory(selectedCategory);
    setOpenEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await onDeleteCategory(selectedCategory._id);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
    handleClose();
  };

  const handleCreateCategory = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setOpenEditModal(false);
    setNewCategory({ name: "", description: "", isPublished: false });
    setEditCategory({ name: "", description: "", isPublished: false });
  };

  const handleSubmitCategory = async () => {
    try {
      await onCreateCategory(newCategory);
      fetchCategories();
    } catch (err) {
      console.error("Error creating category:", err);
    }
    handleModalClose();
  };

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = (e) => {
    setNewCategory({ ...newCategory, isPublished: e.target.checked });
  };

  const handleEditChange = (e) => {
    setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
  };

  const handleSubmitEdit = async () => {
    try {
      const updatedCategory = {
        name: editCategory.name,
        description: editCategory.description,
        isPublished: editCategory.isPublished,
      }
      console.log("edit category : ",updatedCategory);
      await updateCategoryApi(selectedCategory._id,updatedCategory)
      fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
    }
    handleModalClose();
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
        <Button
          style={{ marginLeft: "auto" }}
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "grey",
              color: "white",
            },
          }}
          onClick={handleCreateCategory}
        >
          Create Category
        </Button>
      </Box>

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
                    open={Boolean(anchorEl && selectedCategory === category)}
                    onClose={handleClose}
                    sx={{ "& .MuiPaper-root": { backgroundColor: "white" } }}
                  >
                    {/* Publish/Unpublish action */}
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
                    <Divider sx={{ height: "1px", background: "grey" }} />
                    {/* Divider to separate menu items */}
                    {/* Edit action */}
                    <MenuItem
                      onClick={handleEdit}
                      sx={{ gap: "15px", color: "black" }}
                    >
                      <MdEdit fontSize={"25px"} />
                      Edit
                    </MenuItem>
                    <Divider sx={{ height: "1px", background: "grey" }} />
                    {/* Delete action */}
                    <MenuItem
                      onClick={handleDelete}
                      sx={{ gap: "15px", color: "black" }}
                    >
                      <FaTrash fontSize={"25px"} />
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Category Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Create a New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newCategory.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={newCategory.description}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newCategory.isPublished}
                onChange={handleSwitchChange}
              />
            }
            label={newCategory.isPublished ? "Public" : "Private"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSubmitCategory}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* edit Category Modal */}
      {/* Edit Category Modal */}
      <Dialog open={openEditModal} onClose={handleModalClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editCategory.name}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editCategory.description} 
            onChange={handleEditChange} 
          />
          <FormControlLabel
            control={
              <Switch
                checked={editCategory.isPublished} 
                onChange={(e) =>
                  setEditCategory({
                    ...editCategory,
                    isPublished: e.target.checked,
                  })
                }
              />
            }
            label={editCategory.isPublished ? "Public" : "Private"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSubmitEdit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListCategories;
