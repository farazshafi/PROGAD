import React from "react";
import Header from "../../../components/Header/Header";
import OfferBanner from "../../../components/OfferBanner/OfferBanner";
import HilightSection from "../../../components/HighlightSection/HilightSection";
import headphoneImg from "../../../assets/images/products/headphone.jpeg";
import boatImg from "../../../assets/images/products/boat.jpeg";
import jblImg from "../../../assets/images/products/jbl.jpeg";
import podImg from "../../../assets/images/products/blutooth.jpeg";
import ProductGrid from "../../../components/ProductGrid/ProductGrid";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Divider } from "@mui/material";

const HomePage = () => {
  return (
    <React.Fragment>
      <div style={{padding:" 0% 2%"}}>
        <Header />
        <Divider sx={{marginTop:"80px"}} />
        <OfferBanner hide={"false"} brand={["Boat, JBL"]} title={"Eid Offer"} />
        <HilightSection nav={"newarrivals"} text={"New Arrivals"} />
        <ProductGrid
          img1={headphoneImg}
          img2={boatImg}
          img3={jblImg}
          img4={podImg}
        />
        <HilightSection text={"Top Products"} />
        <ProductCard />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
