import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import FilterSideBar from "../../../components/FilterSideBar/FilterSideBar";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {
  Breadcrumbs,
  Button,
  Link,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import {
  getFilteredProductsApi,
} from "../../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  selectedKeyword,
  selectedProduct,
  selectedProductPage,
  setPage,
  setProducts,
} from "../../../features/product/productSlice";
import { toast } from "react-toastify";
import { Stack } from "@chakra-ui/react";

const ProductsPage = () => {
  const page = useSelector(selectedProductPage);
  const keyword = useSelector(selectedKeyword)

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (filters) => {
    setSelectedCategories(filters.categories);
    setSelectedBrands(filters.brands);
    setPriceRange(filters.priceRange);
  };

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const fetchProducts = async (page) => {   
    try {
      const data = await getFilteredProductsApi({
        categories: selectedCategories,
        priceRange: priceRange,
        brands: selectedBrands,
        page,
        sort:sortOption,
        search:keyword
      });

      if (data.response) {
        const { status } = data.response;
        if (status === 400 || status === 500) {
          toast.error(data.response.data.message || "An error occurred");
        }
      } else {
        dispatch(setProducts(data.products));
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      toast.error("Failed to fetch products. Please try again.");
      console.error("Fetch Products Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [selectedCategories, priceRange, page, selectedBrands, sortOption, keyword]);

  return (
    <React.Fragment>
      <Header />
      {/* Breadcrumbs Section */}
      <div role="presentation">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ color: "white", padding: "0 5%" }}
        >
          {/* Home Breadcrumb */}
          <Link underline="hover" color="white" component={RouterLink} to="/">
            Home
          </Link>

          <Link
            underline="hover"
            color="white"
            component={RouterLink}
            to="/products"
          >
            Products
          </Link>
        </Breadcrumbs>
      </div>

      <FilterSideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onFilterChange={handleFilterChange}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 50px",
        }}
      >
        <Select
          value={sortOption}
          onChange={handleSortChange}
          displayEmpty
          sx={{ minWidth: 150, background: "#ffff", marginRight: "10px" }}
        >
          <MenuItem value="default">Sort By</MenuItem>
          <MenuItem value="lowToHigh">Low to High</MenuItem>
          <MenuItem value="highToLow">High to Low</MenuItem>
          <MenuItem value="Aa-Zz">Aa-Zz</MenuItem>
          <MenuItem value="zZ-aA">zZ-aA</MenuItem>
          <MenuItem value="newArrival">New Arrival</MenuItem>
          <MenuItem value="featured">Featured</MenuItem>
        </Select>

        <Button
          size="small"
          sx={{ backgroundColor: "#FF7F11" }}
          variant="contained"
          onClick={toggleSidebar}
        >
          <Typography>{isSidebarOpen ? "Close" : "Filter"}</Typography>
        </Button>
      </div>

      <Typography
        sx={{
          color: "white",
          fontFamily: "Poppins",
          textAlign: "center",
          fontWeight: 400,
          fontSize: { xs: "22px", md: "28px", sm: "25px", lg: "30px" },
          marginBottom: "50px",
        }}
      >
        Find Your Perfect Match
      </Typography>

      <ProductCard page={"products"} />
      <Stack spacing={2} alignItems="center" marginTop={4}>
        <Pagination
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .Mui-selected": {
              color: "white",
              backgroundColor: "#ff7f11",
            },
          }}
          count={totalPages}
          page={page}
          onChange={handleChange}
        />
      </Stack>
      <Footer />
    </React.Fragment>
  );
};

export default ProductsPage;
