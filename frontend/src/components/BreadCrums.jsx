import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import {Link as RouterLink } from "react-router-dom";

const BreadCrums = ({text}) => {
  return (
    <>
      <div role="presentation">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ color: "white", padding: "5px 0px 5px 20px  " }}
        >
          <Link underline="hover" color="white" component={RouterLink} to="/">
            Home
          </Link>

          <Link underline="hover" color="white" component={RouterLink} to="/profile">
            Profile
          </Link>

          {/* Product Details Breadcrumb */}
          <Typography color="white">{text}</Typography>
        </Breadcrumbs>
      </div>
    </>
  );
};

export default BreadCrums;
