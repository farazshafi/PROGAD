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
import sonyImg from "../../assets/images/products/sony.jpeg";
import OurButton from "../OurButton/OurButton";

const ProductCard = ({page}) => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col className="mb-5" xs={6} sm={6} md={4} lg={page === "products" ? 3 : 4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                <Rating sx={{color:'#FF7F11'}} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly size="small" />
                <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web", fontSize: {xs:"15px", sm:"16px", md:"18px", lg:"20px"} }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton type={'rupees'} text={"2,800"} />
                <Typography
                  sx={{
                    fontSize:{sm:"5px", md:"1px",lg:"20PX"},
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white"
                  }}
                >
                   5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" xs={6} sm={6} md={4} lg={page === "products" ? 3 : 4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                <Rating sx={{color:'#FF7F11'}} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly size="small" />
                <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web", fontSize: {xs:"15px", sm:"16px", md:"18px", lg:"20px"} }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton type={'rupees'} text={"2,800"} />
                <Typography
                  sx={{
                    fontSize:{sm:"5px", md:"1px",lg:"20PX"},
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white"
                  }}
                >
                   5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" xs={6} sm={6} md={4} lg={page === "products" ? 3 : 4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                <Rating sx={{color:'#FF7F11'}} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly size="small" />
                <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web", fontSize: {xs:"15px", sm:"16px", md:"18px", lg:"20px"} }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton type={'rupees'} text={"2,800"} />
                <Typography
                  sx={{
                    fontSize:{sm:"5px", md:"1px",lg:"20PX"},
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white"
                  }}
                >
                   5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" xs={6} sm={6} md={4} lg={page === "products" ? 3 : 4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                <Rating sx={{color:'#FF7F11'}} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly size="small" />
                <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web", fontSize: {xs:"15px", sm:"16px", md:"18px", lg:"20px"} }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton type={'rupees'} text={"2,800"} />
                <Typography
                  sx={{
                    fontSize:{sm:"5px", md:"1px",lg:"20PX"},
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white"
                  }}
                >
                   5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" xs={6} sm={6} md={4} lg={page === "products" ? 3 : 4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                <Rating sx={{color:'#FF7F11'}} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly size="small" />
                <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web", fontSize: {xs:"15px", sm:"16px", md:"18px", lg:"20px"} }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton type={'rupees'} text={"2,800"} />
                <Typography
                  sx={{
                    fontSize:{sm:"5px", md:"1px",lg:"20PX"},
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white"
                  }}
                >
                   5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" xs={6} sm={6} md={4} lg={page === "products" ? 3 : 4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                <Rating sx={{color:'#FF7F11'}} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly size="small" />
                <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web", fontSize: {xs:"15px", sm:"16px", md:"18px", lg:"20px"} }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton type={'rupees'} text={"2,800"} />
                <Typography
                  sx={{
                    fontSize:{sm:"5px", md:"1px",lg:"20PX"},
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white"
                  }}
                >
                   5,000
                </Typography>
              </CardActions>
            </Card>
          </Col>
          <Col className="mb-5" xs={6} sm={6} md={4} lg={page === "products" ? 3 : 4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sonyImg}
                  alt="Sony headphone"
                />
                <CardContent sx={{ textAlign: "center" }}>
                <Rating sx={{color:'#FF7F11'}} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly size="small" />
                <Typography
                    sx={{ color: "#fff", fontFamily: "Istok Web", fontSize: {xs:"15px", sm:"16px", md:"18px", lg:"20px"} }}
                    variant="h6"
                    component="div"
                  >
                    Sony G34 Black
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                <OurButton type={'rupees'} text={"2,800"} />
                <Typography
                  sx={{
                    fontSize:{sm:"5px", md:"1px",lg:"20PX"},
                    fontFamily: "Istok Web",
                    textDecoration: "line-through",
                    marginLeft: 2,
                    color: "white"
                  }}
                >
                   5,000
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
