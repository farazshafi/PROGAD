import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Row, Col, Container } from "react-bootstrap";
import { Star, StarBorder } from "@mui/icons-material"; // Import icons for customization
import sonyImg from "../../assets/images/products/sony.jpeg";
import noiseImg from "../../assets/images/products/noise.jpeg";
import OurButton from "../OurButton/OurButton";

const ProductCard = () => {
  const ratingValue = 3;

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col className="mb-5" sm={12} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Rating
                    name="custom-rating"
                    value={ratingValue}
                    readOnly
                    size="small"
                    icon={<Star sx={{ color: "#FF7F11" }} />}
                    emptyIcon={<StarBorder sx={{ color: "#FFFF" }} />}
                  />
                  <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web" }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton text={"Rs.2,800"} />
                <Typography
                  sx={{
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white",
                  }}
                >
                  Rs. 5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" sm={12} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={noiseImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Rating
                    name="custom-rating"
                    value={ratingValue}
                    readOnly
                    size="small"
                    icon={<Star sx={{ color: "#FF7F11" }} />}
                    emptyIcon={<StarBorder sx={{ color: "#FFFF" }} />}
                  />
                  <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web" }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton text={"Rs.2,800"} />
                <Typography
                  sx={{
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white",
                  }}
                >
                  Rs. 5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" sm={12} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Rating
                    name="custom-rating"
                    value={ratingValue}
                    readOnly
                    size="small"
                    icon={<Star sx={{ color: "#FF7F11" }} />}
                    emptyIcon={<StarBorder sx={{ color: "#FFFF" }} />}
                  />
                  <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web" }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton text={"Rs.2,800"} />
                <Typography
                  sx={{
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white",
                  }}
                >
                  Rs. 5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" sm={12} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Rating
                    name="custom-rating"
                    value={ratingValue}
                    readOnly
                    size="small"
                    icon={<Star sx={{ color: "#FF7F11" }} />}
                    emptyIcon={<StarBorder sx={{ color: "#FFFF" }} />}
                  />
                  <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web" }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton text={"Rs.2,800"} />
                <Typography
                  sx={{
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white",
                  }}
                >
                  Rs. 5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ProductCard;
