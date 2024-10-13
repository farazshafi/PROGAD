import LoginPage from "./pages/user/LoginPage/LoginPage";
import OtpPage from "./pages/user/OtpPage/OtpPage";
import RegisterPage from "./pages/user/RegisterPage/RegisterPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import routing components
import NotFoundPage from "./pages/user/NotFoundPage/NotFound";
import HomePage from "./pages/user/HomePage/HomePage";
import NewArrivalsPage from "./pages/user/NewArrivalsPage/NewArrivalsPage";
import TopProducts from "./pages/user/TopProducts/TopProducts";
import OfferPage from "./pages/user/OfferPage/OfferPage";
import ProductsPage from "./pages/user/ProductsPage/ProductsPage";
import ProductDetailsPage from "./pages/user/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./pages/user/CartPage/CartPage";
import CartProcess from "./pages/user/CartProcess/CartProcess";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/newarrivals" element={<NewArrivalsPage />} />
        <Route path="/topproducts" element={<TopProducts />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product_details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart_process" element={<CartProcess />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
