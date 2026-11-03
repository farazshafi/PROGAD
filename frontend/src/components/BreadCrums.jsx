import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const BreadCrums = ({ path, isAdmin }) => {
  return (
    <div role="presentation">
      <Breadcrumbs
        className="storefront-breadcrumbs"
        aria-label="breadcrumb"
        sx={{ color: "white", padding: "5px 0px 5px 20px" }}
      >
        {path.map((crumb, index) => (
          index < path.length - 1 ? (
            <Link
              key={index}
              className="storefront-breadcrumb-link"
              underline="hover"
              color="white"
              component={RouterLink}
              to={crumb.url}
            >
              {crumb.label}
            </Link>
          ) : (
            <Typography key={index} className="storefront-breadcrumb-current" color="white">
              {crumb.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrums;
