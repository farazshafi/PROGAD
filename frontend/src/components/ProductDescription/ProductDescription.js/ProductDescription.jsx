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
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: "#333", marginBottom: "15px", lineHeight: "1.8" }}
        >
          {description}
        </Typography>

        <Divider sx={{backgroundColor:"black", height:"1px"}}/> 
        <Typography variant="h6" sx={{ marginTop: "30px",color:"black" }}>
          SPECIFICATION
        </Typography>
        <List>
          {specifications.map((spec, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={`${spec.label}:`}
                secondary={spec.value}
                primaryTypographyProps={{ fontWeight: "bold", color: "#333" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default ProductDescription;
