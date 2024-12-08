import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import OfferBanner from "../../../components/OfferBanner/OfferBanner";
import HilightSection from "../../../components/HighlightSection/HilightSection";
import ProductGrid from "../../../components/ProductGrid/ProductGrid";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Divider } from "@mui/material";
import { toast } from "react-toastify";
import { getTopSellingProductApi } from "../../../api/productApi";
import Footer from "../../../components/Footer/Footer";

const HomePage = () => { 
  const [topProducts, setTopProducts] = useState([]);

  const fetchTopProducts = async () => {
    try {
      const result = await getTopSellingProductApi(5);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message || "server error");
          return;
        }
      }
      setTopProducts(result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch top products");
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  return (
    <React.Fragment>
      <div style={{ padding: " 0% 2%" }}>
        <Header navbar={true}/>
        <Divider sx={{ marginTop: "80px" }} />
        <OfferBanner hide={"false"} brand={["Boat, JBL"]} title={"Eid Offer"} />
        <HilightSection showMore={false} text={"Top Products"} />
        {topProducts.length > 0 && <ProductGrid products={topProducts} />}
        <Footer />
      </div> 
    </React.Fragment>
  );
};

export default HomePage;
