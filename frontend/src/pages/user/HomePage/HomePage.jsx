import React, { Suspense, lazy, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { toast } from "react-toastify";
import Header from "../../../components/Header/Header";
import OfferBanner from "../../../components/OfferBanner/OfferBanner";
import { getTopSellingProductApi } from "../../../api/productApi";
import "./HomePage.css";

const NewArrivals = lazy(() => import("../../../components/NewArrival"));
const HilightSection = lazy(() => import("../../../components/HighlightSection/HilightSection"));
const ProductGrid = lazy(() => import("../../../components/ProductGrid/ProductGrid"));
const Footer = lazy(() => import("../../../components/Footer/Footer"));

const SectionFallback = () => (
  <div className="home-section-fallback" aria-hidden="true">
    <span />
    <span />
  </div>
);

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
    <main className="home-page">
      <div className="home-page__inner">
        <Header navbar />
        <Divider className="home-divider" />
        <OfferBanner hide="false" brand={["Boat, JBL"]} title="Eid Offer" />

        <Suspense fallback={<SectionFallback />}>
          <NewArrivals />
          <HilightSection showMore={false} text="Top Products" />
          {topProducts.length > 0 && <ProductGrid products={topProducts} />}
          <Footer />
        </Suspense>
      </div>
    </main>
  );
};

export default HomePage;
