import React from "react";
import {
  Drawer,
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  FormGroup,
  Slider,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon

const FilterSideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <React.Fragment>
      <Drawer
        open={isOpen}
        onClose={toggleSidebar}
        variant="persistent"
        anchor="left"
      >
        <div style={{ width: 250, padding: "1rem", textAlign: "center" }}>
          <IconButton
            onClick={toggleSidebar}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h4"
            gutterBottom
            style={{
              fontFamily: "'Istok Web', sans-serif",
              fontSize: "25px",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            Filter
          </Typography>

          <TextField label="Search" variant="outlined" fullWidth />

          <Typography sx={{ mb: "20px", mt: "30px" }} variant="h6" gutterBottom>
            Categories
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Neckband"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Headphone"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Earphone"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Headset"
            />
          </FormGroup>

          <Divider
            sx={{ border: "1px solid black", mt: "10px", mb: "20px" }}
          />

          <Typography variant="h6" gutterBottom>
            Price in range
          </Typography>
          <RadioGroup>
            <FormControlLabel
              value="all"
              control={
                <Radio
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="All"
            />
            <FormControlLabel
              value="upto10k"
              control={
                <Radio
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Up to Rs.10K"
            />
            <FormControlLabel
              value="10kto20k"
              control={
                <Radio
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Rs.10K to Rs.20K"
            />
            <FormControlLabel
              value="morethan20k"
              control={
                <Radio
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="More than Rs.20K"
            />
            <FormControlLabel
              value="custom"
              control={
                <Radio
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Custom"
            />
          </RadioGroup>

          <Slider
            defaultValue={[0, 50000]}
            min={0}
            max={50000}
            step={5000}
            valueLabelDisplay="auto"
            sx={{
              mt: "5px",
              "& .MuiSlider-thumb": {
                color: "black",
              },
              "& .MuiSlider-track": {
                color: "black",
              },
              "& .MuiSlider-rail": {
                color: "black",
              },
            }}
          />

          <Divider
            sx={{ border: "1px solid black", mt: "10px", mb: "20px" }}
          />

          <Typography variant="h6" gutterBottom>
            Brands
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Boat"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="JBL"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Sony"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Samsung"
            />
          </FormGroup>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default FilterSideBar;
 