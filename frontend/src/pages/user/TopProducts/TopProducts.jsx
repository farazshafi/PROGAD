import React from 'react'
import SectionHeader from "../../../components/SectionHeader/SectionHeader"
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import ProductCard from '../../../components/ProductCard/ProductCard'
const TopProducts = () => {
  return (
    <React.Fragment>
        <Header />
        <SectionHeader text={"Top Products"} description={"Explore our top-rated and most popular products!"}/>
        <ProductCard />
        <Footer />
    </React.Fragment>
  )
}

export default TopProducts