import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../ReduxState/Product/Action";
import { useLocation, useNavigate } from "react-router-dom";

const ProductTables = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customersProduct } = useSelector((store) => store);

  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  // Parse search params from URL
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = parseInt(searchParams.get("page")) || 0;

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value - 1); // value is 1-based, backend might want 0-based
    navigate({ search: `?${searchParams.toString()}` });
  };

  useEffect(() => {
    const data = {
      category: category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 10000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber: page || 0,
      pageSize: 10,
      stock: availability,
    };
    dispatch(findProducts(data));
  }, [availability, category, sort, page, customersProduct.deleteProduct]);

  const handleFilterChange = (e, sectionId) => {
    setFilterValue((values) => ({
      ...values,
      [sectionId]: e.target.value,
    }));
    searchParams.set(sectionId, e.target.value);
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <Box width="100%" sx={{ p: 2 }}>
      <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
        <CardHeader
          title="All Products"
          sx={{
            pt: 2,
            pb: 2,
            textAlign: "center",
            backgroundColor: "primary.main",
            color: "white",
          }}
        />
        <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
          <Table stickyHeader aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct?.products?.content?.map((item, index) => (
                <TableRow hover key={index}>
                  <TableCell align="center">
                    <Avatar
                      alt={item.title}
                      src={item.imageUrl}
                      variant="rounded"
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.brand}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="secondary"
                    >
                      {item.category?.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "success.main", fontWeight: 600 }}
                  >
                    ₹{item.discountedPrice}
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleProductDelete(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={customersProduct?.products?.totalPages || 1}
          page={page + 1}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Box>
    </Box>
  );
};

export default ProductTables;
