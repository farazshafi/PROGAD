import React, { useState } from "react";
import { IoIosExit } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../features/admin/adminSlice";

const AdminLogout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutAdmin())
    navigate("/admin_login")
    setIsModalOpen(false);
  };

  const confirmLogout = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#121212", // Dark background for better contrast
      }}
    >
      <button
        onClick={confirmLogout}
        style={{
          backgroundColor: "#333", // Dark background
          color: "#fff", // White text
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        <IoIosExit fontSize={"30px"}/>
        Logout
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff", // White background for the modal
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              color: "black",
            }}
          >
            <h3 style={{ margin: "0 0 15px" }}>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#f44336", // Red for logout
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              >
                Yes, Logout
              </button>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: "#555", // Grey for cancel
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogout;
