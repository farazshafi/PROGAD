import React from "react";
import "./QtyCounterInput.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, TextField, Box } from "@mui/material";

const QtyCounterInput = ({ value, onChange, stock }) => {
  const handleIncrement = () => {
    
    if (value < 10 && value < stock) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        variant="filled"
        sx={{ color: "white", backgroundColor: "#FF7F11" }}
        onClick={handleDecrement}
        disabled={value <= 1}
      >
        <RemoveIcon />
      </Button>

      <TextField
        value={value}
        variant="outlined"
        sx={{ color: "white", backgroundColor: "white", borderRadius: "3px" }}
        size="small"
        inputProps={{ readOnly: true }}
        style={{ margin: "0 10px", width: "60px", textAlign: "center" }}
      />

      <Button
        disabled={value >= 10}
        variant="outlined"
        sx={{ color: "white", backgroundColor: "#FF7F11" }}
        onClick={handleIncrement}
      >
        <AddIcon color={value > 10 ? "grey" : "white"}/>
      </Button>
    </Box>
  );
};

export default QtyCounterInput;
