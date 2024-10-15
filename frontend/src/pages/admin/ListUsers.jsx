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
  Typography,
  Box,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";
const ListUsers = () => {
  const [users] = useState([
    {
      id: 1,
      name: "Soren Durham",
      email: "vergie.block82@hotmail.com",
      phone: "+27 11 123 4567",
      company: "Heidenreich, Stokes and Parker",
      role: "Customer Support Specialist",
      status: "Banned",
    },
    {
      id: 2,
      name: "Shawn Manning",
      email: "marjolaine.white94@gmail.com",
      phone: "+55 11 2345 6789",
      company: "Padberg -Bailey",
      role: "Operations Manager",
      status: "Pending",
    },
    {
      id: 3,
      name: "Selina Boyer",
      email: "dawn.goyette@gmail.com",
      phone: "+41 22 123 45 67",
      company: "Dibbert Inc",
      role: "Quality Assurance Tester",
      status: "Pending",
    },
    {
      id: 4,
      name: "Reece Chung",
      email: "letha.lubowitz24@yahoo.com",
      phone: "+91 22 1234 5678",
      company: "Grimes Inc",
      role: "Software Developer",
      status: "Banned",
    },
    {
      id: 5,
      name: "Melanie Noble",
      email: "luella.ryan33@gmail.com",
      phone: "+81 3 1234 5678",
      company: "Raynor Group",
      role: "Product Owner",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [showBannedOnly, setShowBannedOnly] = useState(false);

  // Filter users based on search term, role, and banned status
  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBanned = !showBannedOnly || user.status === "Banned";

    return matchesRole && matchesSearch && matchesBanned;
  });

  const totalUsers = users.length;
  const bannedUsers = users.filter((user) => user.status === "Banned").length;

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e2d", borderRadius: "8px" }}>
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
              <TableCell sx={{ color: "white" }}>Edit</TableCell> {/* New Edit Column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox sx={{ color: "white" }} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "white" }}>{user.phone}</TableCell>
                <TableCell sx={{ color: "white" }}>{user.email}</TableCell>
                <TableCell sx={{ color: "white" }}>{user.role}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      backgroundColor:
                        user.status === "Banned" ? "#e74c3c" : "#f1c40f",
                      color: user.status === "Banned" ? "#fff" : "#333",
                    }}
                  >
                    {user.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <IoMdMore
                   fontSize={"25px"}
                    sx={{ color: "white", cursor: "pointer" }} 
                    onClick={() => {
                      console.log(`Edit user: ${user.name}`);
                    }} 
                  />
                </TableCell> {/* Edit Icon */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListUsers;
