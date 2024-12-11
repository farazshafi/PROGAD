import React, { useEffect, useState } from "react";
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
import { selectedUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createProductReviewApi,
  getProductReviewsApi,
} from "../../api/productApi";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { fetchProduct } from "../../features/product/productSlice";

const ProductReviews = ({ id, totalReviews }) => {
  const user = useSelector(selectedUser);
  const dispatch = useDispatch()

  const [reviewData, setReviewData] = useState({
    rating: 0,
    productId: id,
    userId: user?._id,
    review: "",
  });
  const [reviews, setReviews] = useState([]);
  const [isProductReviewed, setIsProductReviewed] = useState(false);

  const handleRatingChange = (event, newValue) => {
    setReviewData((prev) => ({ ...prev, rating: newValue }));
  };

  const handleReviewChange = (event) => {
    setReviewData((prev) => ({ ...prev, review: event.target.value }));
  };

  const handleSubmitReview = async () => {
    if (!user) {
      return toast.warning("Please log in to review products.");
    }
    if (!reviewData.rating || !reviewData.review) {
      return toast.error("All fields are required.");
    }

    const result = await createProductReviewApi(reviewData);
    if (result.response) {
      const { status } = result.response;
      if (status === 400 || status === 500) {
        toast.error(result.response.data.message);
        return;
      }
    }
    toast.success(result.data.message);
    fetchReviews();
    setReviewData({ rating: 0, productId: id, userId: user._id, review: "" });
    dispatch(fetchProduct())
  };

  const fetchReviews = async () => {
    try {
      const result = await getProductReviewsApi(id);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setReviews(result.data.reviews);
      totalReviews(result.data.reviews.length);
      if (user) {
        setIsProductReviewed(
          result.data.reviews.some((rev) => rev.userId._id === user._id)
        );
      }
    } catch (err) {
      toast.error("Failed to fetch reviews");
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Box sx={{ padding: "20px", backgroundColor: "#262626", color: "#fff" }}>
        {/* Review Form */}
        {!isProductReviewed && (
          <Box sx={{ marginBottom: "30px", textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Write a Review
            </Typography>
            <Rating
              onChange={handleRatingChange}
              name="product-rating"
              value={reviewData.rating}
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
              onChange={handleReviewChange}
              name="product-review"
              value={reviewData.review}
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
              onClick={handleSubmitReview}
              variant="contained"
              sx={{ marginTop: "10px", backgroundColor: "#FF7F11" }}
            >
              Submit
            </Button>
          </Box>
        )}

        {/* Review Cards */}
        {reviews && reviews.length > 0 ? (
          <Grid container spacing={2}>
            {reviews.map((review, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    padding: "20px",
                    backgroundColor: "#333",
                    color: "#fff",
                  }}
                >
                  <Box display="flex" alignItems="center" marginBottom="10px">
                    <Avatar sx={{ marginRight: "10px" }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {review.userId.name}
                      </Typography>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{ color: "#FF7F11" }} // Color for selected stars
                        emptyIcon={
                          <StarBorderIcon
                            style={{
                              color: "#FF7F11",
                            }}
                            fontSize="inherit"
                          />
                        }
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
        ) : (
          <>
            <div>
              <p>No Reviews Found!</p>
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default ProductReviews;
