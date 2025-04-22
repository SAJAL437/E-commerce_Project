import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AccountCircleOutlined,
  AddCardOutlined,
  BookmarkAddOutlined,
  Dashboard,
  Inventory2Outlined,
  RequestPageOutlined,
  SupervisedUserCircleOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CreateProduct from "./Component/CreateProduct";
import ProductTables from "./Component/ProductTables";
import OrdersTable from "./Component/OrdersTable";
import CustomersTables from "./Component/CustomersTables";
import DashboardPage from "./Component/Dash_board";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <Dashboard /> },
  { name: "Products", path: "/admin/products", icon: <Inventory2Outlined /> },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <SupervisedUserCircleOutlined />,
  },
  { name: "Orders", path: "/admin/orders", icon: <BookmarkAddOutlined /> },
  {
    name: "Add Product",
    path: "/admin/product/create",
    icon: <AddCardOutlined />,
  },
];

const drawerWidth = 260;

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const drawer = (
    <Box className="h-full flex flex-col justify-between  bg-white shadow-md">
      {/* Sidebar Navigation */}
      <Box>
        <Toolbar className="hidden lg:flex bg-gray-100 h-16">
          <Typography
            variant="h6"
            className="text-gray-700 mx-auto font-semibold"
          >
            Admin Panel
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => navigate(item.path)}
            >
              <ListItemButton className="hover:bg-gray-200 transition duration-200">
                <ListItemIcon className="text-gray-700">
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  className="text-gray-700 font-medium"
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom Menu */}
      <List className="w-full">
        <Divider />
        {["Account", "Request"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton className="hover:bg-gray-200 transition duration-200">
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <AccountCircleOutlined />
                ) : (
                  <RequestPageOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className="flex h-screen  ">
      <CssBaseline />

      {/* Top Navbar for Mobile */}
      {!isLargeScreen && (
        <AppBar position="fixed" className="bg-white shadow-md">
          <Toolbar className="flex justify-between">
            <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
              <MenuIcon className="text-gray-700" />
            </IconButton>
            <Typography variant="h6" className="text-gray-700 font-semibold">
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar (Drawer) */}
      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        open={isLargeScreen || sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box component="main" className="flex-1 p-6">
        {!isLargeScreen && <Toolbar />}{" "}
        {/* For spacing when app bar is shown */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/products" element={<ProductTables />} />
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/customers" element={<CustomersTables />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Admin;
