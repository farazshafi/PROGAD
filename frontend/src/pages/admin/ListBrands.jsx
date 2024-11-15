import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { editBrandApi, getAllBrandsApi, updateBrandStatusApi } from "../../api/brandApi";
import { toast } from "react-toastify";

const ListBrands = () => {
  // States
  const [brandsList, setBrandList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);

  // Functions
  const fetchAllBrands = async () => {
    try {
      const result = await getAllBrandsApi();
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 404 || status === 500) {
          toast.error(result.response.data.message);
        }
      }
      setBrandList(result.data || []);
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  const handleEditClick = (brand) => {
    setCurrentBrand(brand);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setCurrentBrand(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBrand((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("current brand: ", currentBrand);
    try {
      const result = await editBrandApi(currentBrand._id, currentBrand);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 404 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
      fetchAllBrands();
      setOpenModal(false);
    } catch (err) {
      console.error("Error updating brand:", err);
    }
  };

  const handleStatusChange = async (brandId, newStatus) => {
    const status = newStatus === "Published" ? true : false;
    try {
      const result = await updateBrandStatusApi(brandId, { isPublished: status });
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 404 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
      fetchAllBrands();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, []);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl p-4 rounded-lg shadow-md">
        <Typography variant="h4" className="text-center font-bold mb-4">
          All Brands
        </Typography>
        <TableContainer
          component={Paper}
          className="max-h-[400px] overflow-y-auto"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold text-gray-600">
                  ID
                </TableCell>
                <TableCell className="font-semibold text-gray-600">
                  Brand Name
                </TableCell>
                <TableCell className="font-semibold text-gray-600">
                  Description
                </TableCell>
                <TableCell className="font-semibold text-gray-600">
                  Status
                </TableCell>
                <TableCell className="font-semibold text-gray-600 text-center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            {brandsList && (
              <TableBody>
                {brandsList.map((brand, i) => (
                  <TableRow key={brand._id} className="hover:bg-gray-800">
                    <TableCell>{brand._id}</TableCell>
                    <TableCell>{brand.name}</TableCell>
                    <TableCell>{brand.description}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={
                            brand.isPublished ? "Published" : "Unpublished"
                          }
                          onChange={(e) =>
                            handleStatusChange(brand._id, e.target.value)
                          }
                        >
                          <MenuItem value="Published">Publish</MenuItem>
                          <MenuItem value="Unpublished">Unpublish</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell className="text-center">
                      <IconButton
                        onClick={() => handleEditClick(brand)}
                        aria-label="edit"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>

        {/* Edit Modal */}
        <Modal open={openModal} onClose={handleModalClose}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-6 rounded-lg shadow-md w-full max-w-md">
            <Typography variant="h6" className="font-bold mb-4">
              Edit Brand
            </Typography>
            <TextField
              label="Brand Name"
              name="name"
              value={currentBrand?.name || ""}
              onChange={handleInputChange}
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Description"
              name="description"
              value={currentBrand?.description || ""}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button
                onClick={handleSave}
                variant="contained"
                className="bg-white"
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ListBrands;
