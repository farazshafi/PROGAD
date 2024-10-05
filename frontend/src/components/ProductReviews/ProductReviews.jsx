import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  Avatar,
  Rating,
} from "@mui/material";

const ProductReviews = () => {
  const reviews = [
    {
      name: "Faraz Shafi",
      rating: 4,
      date: "10/09/2024",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      name: "Faraz Shafi",
      rating: 4,
      date: "10/09/2024",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      name: "Faraz Shafi",
      rating: 4,
      date: "10/09/2024",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      name: "Faraz Shafi",
      rating: 4,
      date: "10/09/2024",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  ];

  return (
    <>
      <Box sx={{ padding: "20px", backgroundColor: "#262626", color: "#fff" }}>
        {/* Review Form */}
        <Box sx={{ marginBottom: "30px", textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            Write a Review
          </Typography>
          <Rating
            name="read-only"
            value={4}
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#FF7F11", // Rated star color
              },
              "& .MuiRating-iconEmpty": {
                color: "white", // Default unfilled star color
              },
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your words"
            variant="outlined"
            sx={{
              marginTop: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          />
          <Button
            variant="contained"
            sx={{ marginTop: "10px", backgroundColor: "#FF7F11" }}
          >
            Submit
          </Button>
        </Box>

        {/* Review Cards */}
        <Grid container spacing={2}>
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{ padding: "20px", backgroundColor: "#333", color: "#fff" }}
              >
                <Box display="flex" alignItems="center" marginBottom="10px">
                  <Avatar sx={{ marginRight: "10px" }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {review.name}
                    </Typography>
                    <Rating
                      value={review.rating}
                      readOnly
                      size="small"
                      sx={{ color: "#FF7F11" }}
                    />
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                  {review.review}
                </Typography>
                <Typography variant="caption" sx={{ color: "#aaa" }}>
                  {review.date}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductReviews;
