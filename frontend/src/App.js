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
import ProfilePage from "./pages/user/ProfilePage/ProfilePage";
import OrderSuccessPage from "./pages/user/OrderSuccessPage/OrderSuccessPage";
import CartProcess from "./pages/user/CartProcess/CartProcess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import AdminLogin from "./pages/admin/AdminLogin";
import EditProduct from "./pages/admin/EditProduct";
import OrderDetailsCard from "./components/OrderDetailsCard/OrderDetailsCard";
import CouponsPage from "./pages/user/CouponsPage";
import AboutUs from "./pages/user/AboutUs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "./features/user/userSlice";

function App() {
  const user = JSON.parse(localStorage.getItem("user"))

  const dispatch = useDispatch();

  useEffect(() => {
    if(!user){
      toast.warning("Please Login")
    }
    if (user && user.isBlocked) {
      dispatch(logoutUser());
      window.location.href = "/login";
    }

  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* user route */}
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/newarrivals" element={<NewArrivalsPage />} />
          <Route path="/topproducts" element={<TopProducts />} />
          <Route path="/offer" element={<OfferPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product_details/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart_process" element={<CartProcess />} />
          <Route path="/order_success" element={<OrderSuccessPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/order_details/:id"
            element={<OrderDetailsCard isAdmin={false} />}
          />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/about" element={<AboutUs />} />

          {/* admin route */}
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin_dashboard/product/edit_product/:id"
            element={<EditProduct />}
          />
          <Route
            path="/admin_dashboard/order_details/:id"
            element={<OrderDetailsCard isAdmin={true} />}
          />

          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
