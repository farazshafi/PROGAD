import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import GroupIcon from "@mui/icons-material/Group";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { ImHeadphones } from "react-icons/im";
import { MdBrandingWatermark } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { FaDownload } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { MdCategory } from "react-icons/md";
import { IoIosExit } from "react-icons/io";


// Components
import ListUsers from "./ListUsers";
import ListProduct from "./ListProducts";
import ListCategories from "./ListCategories";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import AdminLogout from "./AdminLogout";
import { useSelector } from "react-redux";
import { selectedAdmin } from "../../features/admin/adminSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Navigation menu items
const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  // dashboard
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <MdDashboard fontSize={"20px"} />,
  },
  // users
  {
    segment: "users",
    title: "Users",
    icon: <GroupIcon />,
    children: [
      {
        segment: "add_user",
        title: "Add User",
        icon: <IoMdAdd />,
      },
      {
        segment: "",
        title: "List User",
        icon: <FaListUl />,
      },
    ],
  },
  // products
  {
    segment: "products",
    title: "Products",
    icon: <ImHeadphones fontSize={"20px"} />,
    children: [
      {
        segment: "add_product",
        title: "Add Product",
        icon: <IoMdAdd />,
      },
      {
        segment: "",
        title: "List Products",
        icon: <FaListUl />,
      },
    ],
  },
  // orders
  {
    segment: "orders",
    title: "Orders",
    icon: <FaShoppingCart fontSize={"20px"} />,
  },
  // categories
  {
    segment: "categories",
    title: "Categories",
    icon: <MdCategory fontSize={"20px"} />,
    children: [
      {
        segment: "add_category",
        title: "Add Category",
        icon: <IoMdAdd />,
      },
      {
        segment: "",
        title: "List Categories",
        icon: <FaListUl />,
      },
    ],
  },
  // brands
  {
    segment: "brands",
    title: "Brands",
    icon: <MdBrandingWatermark fontSize={"20px"} />,
    children: [
      {
        segment: "add brand",
        title: "Add Brand",
        icon: <IoMdAdd />,
      },
      {
        segment: "list_brand",
        title: "List Brand",
        icon: <FaListUl />,
      },
    ],
  },
  // coupons
  {
    segment: "coupons",
    title: "Coupons",
    icon: <RiCoupon2Fill fontSize={"20px"} />,
    children: [
      {
        segment: "add_coupon",
        title: "Add Coupon",
        icon: <IoMdAdd />,
      },
      {
        segment: "list brand",
        title: "List Brand",
        icon: <FaListUl />,
      },
    ],
  },
  // offers
  {
    segment: "offers",
    title: "Offers",
    icon: <BiSolidOffer fontSize={"20px"} />,
    children: [
      {
        segment: "add_offer",
        title: "Add Offer",
        icon: <IoMdAdd />,
      },
      {
        segment: "list brand",
        title: "List Brand",
        icon: <FaListUl />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "sales report",
    title: "Sales Report",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "download",
        title: "Download",
        icon: <FaDownload fontSize={"20px"} />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <GoGraph fontSize={"20px"} />,
      },
    ],
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <IoIosExit fontSize={"30px"} />,
  },
];

// Theme configuration
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  let content;

  switch (pathname) {
    case "/users":
      content = <ListUsers />;
      break;
    case "/dashboard":
      content = <div>Dashboard Content Here</div>;
      break;
    case "/products":
      content = <ListProduct />;
      break;
    case "/products/add_product":
      content = <AddProduct />;
      break;
    case "/categories":
      content = <ListCategories />;
      break;
    case "/categories/add_category":
      content = <AddCategory />;
      break;
    case "/logout":
      content = <AdminLogout />;
      break;
    default:
      content = <div>Default Content</div>;
  }

  return <Box>{content}</Box>;
}

function AdminDashboard(props) {
  const { window } = props;

  const admin = useSelector(selectedAdmin)
  const navigate = useNavigate()

  // Define state to manage the current route
  const [pathname, setPathname] = React.useState("/dashboard");

  // Router object to manage path navigation
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  useEffect(()=>{
    if(!admin){
      navigate("/admin_login")
    }
  },[])

  return (
    <AppProvider
      appName="Progad"
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout title="PROGAD">
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default AdminDashboard;
