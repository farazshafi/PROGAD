import React from "react";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const NewArrivalsPage = () => {
  return (
    <React.Fragment>
        <Header />
      <SectionHeader
        text={"New Arrivals"}
        description={"Check out the latest additions to our collection!"}
      />
      <ProductCard />
      <Footer />
    </React.Fragment>
  );
};

export default NewArrivalsPage;
