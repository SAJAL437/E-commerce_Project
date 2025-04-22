import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../ReduxState/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminOrder } = useSelector((store) => store);

  const [anchorElArray, setAnchorElArray] = useState([]);

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt, adminOrder.delivered, adminOrder.shipped, adminOrder.confirmed]);

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId));
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div>
      <Card className="mt-2">
        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="Orders Table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders?.map((item, index) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem, i) => (
                        <Avatar
                          key={i}
                          alt={orderItem?.product?.title}
                          src={orderItem?.product?.imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography fontWeight={500} fontSize="0.875rem">
                        {item.orderItems.map((order, i) => (
                          <span key={i}>{order.product.title}, </span>
                        ))}
                      </Typography>
                      <Typography variant="caption">
                        {item.orderItems.map((order, i) => (
                          <span key={`brand-${i}`} className="opacity-60">
                            {order.product.brand},
                          </span>
                        ))}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>₹{item.totalPrice}</TableCell>
                  <TableCell>{item.id}</TableCell>

                  <TableCell align="center">
                    <Chip
                      label={item.orderStatus}
                      size="small"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                      color={
                        item.orderStatus === "PENDING"
                          ? "info"
                          : item.orderStatus === "DELIVERED"
                          ? "success"
                          : "secondary"
                      }
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      onClick={(e) => handleUpdateStatusMenuClick(e, index)}
                    >
                      Status
                    </Button>
                    <Menu
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={() => handleUpdateStatusMenuClose(index)}
                    >
                      <MenuItem
                        onClick={() => handleConfirmedOrder(item.id, index)}
                        disabled={
                          item.orderStatus === "DELIVERED" ||
                          item.orderStatus === "SHIPPED" ||
                          item.orderStatus === "CONFIRMED"
                        }
                      >
                        CONFIRMED ORDER
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleShippedOrder(item.id, index)}
                        disabled={
                          item.orderStatus === "DELIVERED" ||
                          item.orderStatus === "SHIPPED"
                        }
                      >
                        SHIPPED ORDER
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeliveredOrder(item.id, index)}
                      >
                        DELIVERED ORDER
                      </MenuItem>
                    </Menu>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteOrder(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;
