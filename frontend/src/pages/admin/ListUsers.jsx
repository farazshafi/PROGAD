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
  TextField,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Menu,
  Divider,
  Stack,
  Pagination,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";
import { getAllUsers, blockUnblockUser } from "../../api/adminApi";
import { MdEdit, MdBlock } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { moniteringUserApi } from "../../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  setUser,
  selectedUser as sliceUser,
} from "../../features/user/userSlice";

const ListUsers = () => {
  const user = useSelector(sliceUser);

  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [showBannedOnly, setShowBannedOnly] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter users based on search term, role, and banned status
  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBanned = !showBannedOnly || user.isBlocked;

    return matchesRole && matchesSearch && matchesBanned;
  });

  const fetchUsers = async () => {
    const data = await getAllUsers(page);
    setUsers(data.users);
    setTotalPages(data.totalPages);
  };

  const totalUsers = users.length;
  const bannedUsers = users.filter((user) => user.isBlocked).length;

  const handleOpenDialog = (status) => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleBlock = async () => {
    try {
      handleCloseDialog();
      const isBlocked = !selectedUser.isBlocked;
      const updatedUser = await blockUnblockUser(selectedUser._id, isBlocked);
      if (updatedUser) {
        setUsers((prevUser) =>
          prevUser.map((user) =>
            user._id === selectedUser._id ? { ...user, isBlocked } : user
          )
        );

        const result = await moniteringUserApi(selectedUser._id);
        if (result.response) {
          const userId = JSON.parse(localStorage.getItem("user"))._id;
          console.log("itdh vernn");
          const { status } = result.response;
          console.log("selcted user", selectedUser._id);
          console.log("logged user", userId);
          if (
            (status === 400 || status === 500) &&
            selectedUser._id === userId
          ) {
            console.log("User matched for logout");
            dispatch(setUser({ ...user, isBlocked: true }));
            dispatch(logoutUser());
          }
        }
      }

      handleClose();
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleView = async () => {
    // const data = await deleteUserApi(selectedUser._id);
    fetchUsers();
    handleClose();
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e2d", borderRadius: "8px" }}>
      <p className="text-4xl text-center text-white py-4">User Management</p>

      {/* Highlight Section */}
      <Box display="flex" mb={3}>
        <div>
          <Typography
            style={{ cursor: "pointer" }}
            color={showBannedOnly ? "white" : "white"}
            onClick={() => {
              setShowBannedOnly(false);
            }}
            sx={{
              color: showBannedOnly ? "grey" : "white",
              padding: "2px 5px",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
          >
            All
            <span
              style={{
                padding: "2px 5px",
                background: showBannedOnly ? "grey" : "white",
                color: "black",
                borderRadius: "4px",
                marginLeft: "3px",
              }}
            >
              {totalUsers}
            </span>
          </Typography>
        </div>
        <div>
          <Typography
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => {
              setShowBannedOnly(true);
            }}
            color={showBannedOnly ? "white" : "grey"}
            sx={{
              backgroundColor: showBannedOnly ? "" : "",
              padding: "2px 5px",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
          >
            Banned
            <span
              style={{
                padding: "2px 5px",
                background: showBannedOnly ? "#ff2d00" : "#fa927c",
                color: "black",
                borderRadius: "4px",
                marginLeft: "5px",
              }}
            >
              {bannedUsers}
            </span>
          </Typography>
        </div>
      </Box>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          variant="outlined"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "#2c2c3a",
            borderRadius: 1,
            input: { color: "white" },
          }}
          InputLabelProps={{ style: { color: "white" } }}
        />

        <Select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          sx={{ backgroundColor: "#2c2c3a", color: "white" }}
        >
          <MenuItem value="All">All Roles</MenuItem>
          <MenuItem value="Customer Support Specialist">
            Customer Support Specialist
          </MenuItem>
          <MenuItem value="Operations Manager">Operations Manager</MenuItem>
          <MenuItem value="Quality Assurance Tester">
            Quality Assurance Tester
          </MenuItem>
          <MenuItem value="Software Developer">Software Developer</MenuItem>
          <MenuItem value="Product Owner">Product Owner</MenuItem>
        </Select>
      </Box>

      {/* User Table */}
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
              <TableCell sx={{ color: "white" }}>Phone Number</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Role</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Checkbox sx={{ color: "white" }} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {user.phoneNumber}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{user.email}</TableCell>
                <TableCell sx={{ color: "white" }}>{user.role}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      backgroundColor: user.isBlocked ? "red" : "green",
                      color: "white",
                    }}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, user)}
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
                      onClick={handleOpenDialog}
                      sx={{ color: "red", gap: "15px" }}
                    >
                      <MdBlock fontSize={"25px"} />
                      {selectedUser?.isBlocked ? "Unblock" : "Block"}
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
                      sx={{ color: "red", gap: "15px" }}
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you want to 
            {selectedUser?.isBlocked ? " Unblock" : " Block"}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <button
            className="text-white py-2 px-3 rounded bg-black opacity-80"
            onClick={handleCloseDialog}
          >
            No
          </button>
          <button
            className="text-black py-2 px-3 rounded bg-white"
            onClick={() => {
              handleBlock();
            }}
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListUsers;
