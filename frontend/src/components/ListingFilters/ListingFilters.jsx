import React, { useEffect, useState } from "react";
import { Checkbox, Drawer, FormControlLabel, FormGroup, Slider } from "@mui/material";
import { X } from "lucide-react";
import { getPublishedCategoriesApi } from "../../api/categoryApi";
import { getAllPublicBrandsApi } from "../../api/brandApi";
import { toast } from "react-toastify";

const DEFAULT_PRICE = { min: 0, max: 50000 };

const ListingFilters = ({ filters, onChange, open = false, onClose = () => {}, mobile = false }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getPublishedCategoriesApi(), getAllPublicBrandsApi()])
      .then(([categoryData, brandData]) => {
        if (!active) return;
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setBrands(Array.isArray(brandData) ? brandData : []);
      })
      .catch(() => toast.error("Unable to load product filters"))
      .finally(() => active && setDataLoading(false));
    return () => { active = false; };
  }, []);

  const toggle = (key, id) => {
    const values = filters[key];
    onChange({ ...filters, [key]: values.includes(id) ? values.filter((value) => value !== id) : [...values, id] });
  };

  const clear = () => onChange({ categories: [], brands: [], priceRange: DEFAULT_PRICE });

  const content = (
    <div className="listing-filter-panel">
      <div className="mb-5 flex items-center justify-between">
        <div><h2 className="text-base font-semibold text-white">Filters</h2><p className="mt-1 text-xs text-white/40">Narrow down your search</p></div>
        {mobile && <button onClick={onClose} aria-label="Close filters" className="rounded-lg p-2 text-white/60 hover:bg-white/10"><X size={19} /></button>}
      </div>
      <FilterGroup title="Category" loading={dataLoading} items={categories} selected={filters.categories} onToggle={(id) => toggle("categories", id)} />
      <FilterGroup title="Brand" loading={dataLoading} items={brands} selected={filters.brands} onToggle={(id) => toggle("brands", id)} />
      <div className="border-t border-white/10 py-5">
        <div className="mb-4 flex justify-between"><h3 className="text-sm font-medium text-white">Price range</h3><span className="text-xs text-[#ff9b48]">₹{filters.priceRange.min.toLocaleString("en-IN")} – ₹{filters.priceRange.max.toLocaleString("en-IN")}</span></div>
        <Slider value={[filters.priceRange.min, filters.priceRange.max]} onChange={(_, value) => onChange({ ...filters, priceRange: { min: value[0], max: value[1] } })} min={0} max={50000} step={1000} aria-label="Price range" sx={{ color: "#ff7f11", "& .MuiSlider-rail": { backgroundColor: "rgba(255,255,255,.2)" } }} />
        <div className="flex justify-between text-[11px] text-white/40"><span>₹0</span><span>₹50,000+</span></div>
      </div>
      <button onClick={clear} className="w-full rounded-xl border border-white/15 py-2.5 text-sm font-medium text-white/75 transition hover:border-[#ff7f11] hover:text-white">Clear all filters</button>
    </div>
  );

  return mobile ? <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: "min(88vw, 360px)", backgroundColor: "#111", color: "white", padding: "22px", backgroundImage: "none" } }}>{content}</Drawer> : content;
};

const FilterGroup = ({ title, loading, items, selected, onToggle }) => (
  <div className="border-t border-white/10 py-5">
    <h3 className="mb-3 text-sm font-medium text-white">{title}</h3>
    <FormGroup className="max-h-52 overflow-y-auto pr-1">
      {loading ? <span className="py-2 text-xs text-white/40">Loading {title.toLowerCase()}s…</span> : items.length ? items.map((item) => (
        <FormControlLabel key={item._id} control={<Checkbox checked={selected.includes(item._id)} onChange={() => onToggle(item._id)} size="small" sx={{ color: "rgba(255,255,255,.35)", "&.Mui-checked": { color: "#ff7f11" } }} />} label={item.name} sx={{ margin: 0, minHeight: 34, "& .MuiFormControlLabel-label": { color: "rgba(255,255,255,.65)", fontSize: 13 } }} />
      )) : <span className="py-2 text-xs text-white/40">No {title.toLowerCase()}s available</span>}
    </FormGroup>
  </div>
);

export default ListingFilters;
