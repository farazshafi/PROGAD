import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ListingFilters from "../../../components/ListingFilters/ListingFilters";
import ListingProductCard from "../../../components/ListingProductCard/ListingProductCard";
import {
  Breadcrumbs,
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getFilteredProductsApi } from "../../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  selectedKeyword,
  selectedProduct,
  selectedProductPage,
  setKeyword,
  setPage,
  setProducts,
} from "../../../features/product/productSlice";
import { toast } from "react-toastify";
import { selectedUser } from "../../../features/user/userSlice";

const DEFAULT_PRICE = { min: 0, max: 50000 };

const ProductsPage = () => {
  const user = useSelector(selectedUser);
  const products = useSelector(selectedProduct);
  const page = useSelector(selectedProductPage);
  const keyword = useSelector(selectedKeyword);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState(keyword);
  const [sortOption, setSortOption] = useState("default");
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: DEFAULT_PRICE,
  });

  useEffect(() => setSearchInput(keyword), [keyword]);

  const fetchProducts = useCallback(async (requestedPage = page) => {
    try {
      const data = await getFilteredProductsApi({
        ...filters,
        page: requestedPage,
        sort: sortOption,
        search: keyword,
        userId: user ? user._id : null,
      });

      if (data?.response) {
        toast.error(data.response.data?.message || "Unable to load products");
        return;
      }

      dispatch(setProducts(data?.products || []));
      setTotalPages(Math.max(1, data?.totalPages || 1));
      setTotalProducts(data?.totalProducts || 0);
    } catch (error) {
      toast.error("Failed to fetch products. Please try again.");
      console.error("Fetch Products Error:", error);
    }
  }, [dispatch, filters, keyword, page, sortOption, user]);

  useEffect(() => {
    fetchProducts(page);
  }, [fetchProducts, page]);

  const submitSearch = (event) => {
    event.preventDefault();
    if (searchInput.trim() !== keyword) {
      dispatch(setPage(1));
      dispatch(setKeyword(searchInput.trim()));
    }
  };

  const updateFilters = (nextFilters) => {
    setFilters(nextFilters);
    if (page !== 1) dispatch(setPage(1));
  };

  const setSort = (event) => {
    setSortOption(event.target.value);
    if (page !== 1) dispatch(setPage(1));
  };

  const clearSearch = () => {
    setSearchInput("");
    dispatch(setKeyword(""));
    dispatch(setPage(1));
  };

  const activeFilterCount = filters.categories.length + filters.brands.length +
    (filters.priceRange.min !== DEFAULT_PRICE.min || filters.priceRange.max !== DEFAULT_PRICE.max ? 1 : 0);

  return (
    <>
      <Header />
      <main className="listing-page mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10">
        <Breadcrumbs aria-label="breadcrumb" className="mb-7 text-white/50">
          <RouterLink className="text-white/55 transition hover:text-[#ff7f11]" to="/">Home</RouterLink>
          <span className="text-white">Products</span>
        </Breadcrumbs>

        <section className="listing-hero mb-8 overflow-hidden rounded-3xl border border-white/10 px-6 py-8 sm:px-10 sm:py-11">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#ff9b48]">The collection</p>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Find your perfect match.</h1>
            <p className="max-w-xl text-sm leading-6 text-white/60 sm:text-base">Explore thoughtfully selected essentials, made to fit your everyday.</p>
          </div>
        </section>

        <form onSubmit={submitSearch} className="mb-6 flex flex-col gap-3 sm:flex-row">
          <TextField
            fullWidth
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search products by name"
            aria-label="Search products"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search size={19} /></InputAdornment>,
              endAdornment: searchInput && <InputAdornment position="end"><button type="button" aria-label="Clear search" onClick={clearSearch} className="text-white/50 hover:text-white"><X size={18} /></button></InputAdornment>,
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px", color: "white", background: "#141414", "& fieldset": { borderColor: "rgba(255,255,255,.1)" }, "&:hover fieldset": { borderColor: "rgba(255,127,17,.6)" } }, "& input::placeholder": { color: "rgba(255,255,255,.4)", opacity: 1 }, "& .MuiInputAdornment-root": { color: "rgba(255,255,255,.5)" } }}
          />
          <Button type="submit" variant="contained" className="listing-search-button">Search</Button>
        </form>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
          <div>
            <h2 className="text-xl font-semibold text-white">All products</h2>
            <p className="mt-1 text-sm text-white/45">{totalProducts} {totalProducts === 1 ? "item" : "items"}</p>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Button className="listing-filter-button lg:hidden" startIcon={<SlidersHorizontal size={17} />} onClick={() => setFilterOpen(true)}>
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </Button>
            <Select value={sortOption} onChange={setSort} size="small" aria-label="Sort products" className="listing-sort w-full sm:w-52">
              <MenuItem value="default">Recommended</MenuItem>
              <MenuItem value="lowToHigh">Price: low to high</MenuItem>
              <MenuItem value="highToLow">Price: high to low</MenuItem>
              <MenuItem value="Aa-Zz">Name: A to Z</MenuItem>
              <MenuItem value="zZ-aA">Name: Z to A</MenuItem>
              <MenuItem value="newArrival">Newest arrivals</MenuItem>
              <MenuItem value="featured">Featured</MenuItem>
            </Select>
          </div>
        </div>

        {keyword && <div className="mb-4 flex items-center gap-2"><Chip label={`Search: ${keyword}`} onDelete={clearSearch} className="listing-chip" /></div>}

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <ListingFilters filters={filters} onChange={updateFilters} />
          </aside>
          <section aria-label="Product results" className="min-w-0">
            <ListingProductCard products={products} fetchProducts={fetchProducts} />
            {totalPages > 1 && <div className="mt-10 flex justify-center"><Pagination count={totalPages} page={page} onChange={(_, value) => dispatch(setPage(value))} shape="rounded" sx={{ "& .MuiPaginationItem-root": { color: "white" }, "& .Mui-selected": { color: "#111", backgroundColor: "#ff7f11 !important", fontWeight: 700 } }} /></div>}
          </section>
        </div>
        <ListingFilters filters={filters} onChange={updateFilters} open={isFilterOpen} onClose={() => setFilterOpen(false)} mobile />
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
