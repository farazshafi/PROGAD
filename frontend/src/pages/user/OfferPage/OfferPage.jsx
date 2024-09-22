import React from 'react'
import OfferBanner from '../../../components/OfferBanner/OfferBanner'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import ProductCard from '../../../components/ProductCard/ProductCard'

const OfferPage = () => {
  return (
    <React.Fragment>
        <Header />
        <OfferBanner offerPage={"true"}/>
        <ProductCard />
        <Footer />
    </React.Fragment>
  )
}

export default OfferPage