import React, { useState } from "react";
import "./QtyCounterInput.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, TextField, Box } from "@mui/material";

const QtyCounterInput = () => {
  const [value, setValue] = useState(1); // Default value is set to 1

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue((prevValue) => (prevValue > 1 ? prevValue - 1 : 1)); // Prevent value from going below 1
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        variant="filled"
        sx={{ color: "white", backgroundColor: "#FF7F11" }}
        onClick={handleDecrement}
        disabled={value <= 1} // Disable when the value is 1
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
        variant="outlined"
        sx={{ color: "white", backgroundColor: "#FF7F11" }}
        onClick={handleIncrement}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};

export default QtyCounterInput;
