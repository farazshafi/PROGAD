import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const ProductDescription = ({description}) => {

  const specifications = [
    { label: "Model ID", value: "Zeb - Thunder" },
    { label: "Color", value: "Black" },
    { label: "Headphone Type", value: "On the Ear" },
    { label: "Inline Remote", value: "No" },
    { label: "Connectivity", value: "Bluetooth" },
    { label: "Play Time", value: "60 hr" },
    { label: "Warranty", value: "1 Year" },
  ];
  return (
    <>
      <Box
        className="product-description-panel"
        sx={{
          backgroundColor: "transparent",
          padding: "clamp(18px, 3vw, 32px)",
          borderRadius: "18px",
        }}
      >
        <Typography
          className="product-description-copy"
          variant="body1"
          sx={{ color: "rgba(255,255,255,.72)", marginBottom: "22px", lineHeight: "1.9" }}
        >
          {description}
        </Typography>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,.12)", height: "1px" }} />
        <Typography variant="h6" sx={{ marginTop: "24px", marginBottom: "8px", color: "#fff", fontWeight: 700, letterSpacing: ".08em", fontSize: "13px" }}>
          SPECIFICATION
        </Typography>
        <List className="product-specification-list">
          {specifications.map((spec, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={`${spec.label}:`}
                secondary={spec.value}
                primaryTypographyProps={{ fontWeight: 600, color: "rgba(255,255,255,.5)", fontSize: "12px" }}
                secondaryTypographyProps={{ color: "#fff", fontSize: "14px" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default ProductDescription;
