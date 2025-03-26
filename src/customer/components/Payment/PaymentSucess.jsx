import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../ReduxState/Order/Action";
import { updatePayment } from "../../../ReduxState/Payment/Action";
import { Alert, AlertTitle } from "@mui/material";
import OrderTraking from "../Order/OrderTraking";
import AddressCard from "../AddressCard/AdressCard";

const PaymentSucess = () => {
  const [paymentId, setPaymentId] = useState("");
  // const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
  console.log("order", order.order);
  useEffect(() => {
    console.log("orderId", orderId);
    const urlParams = new URLSearchParams(window.location.search);

    setPaymentId(urlParams.get("razorpay_payment_id"));

    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId, jwt };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [orderId, paymentId]);
  console.log("payment Successful");

  console.log("orderId", orderId);
  return (
    <div className="px-4 lg:px-36 py-10">
      {/* Success Alert */}
      <div className="flex flex-col items-center ">
        <Alert
          variant="filled"
          severity="success"
          sx={{
            mb: 6,
            width: "fit-content",
          }}
        >
          <AlertTitle className="text-lg font-bold">Payment Success</AlertTitle>
          🎉 Congratulations! Your order has been placed successfully.
        </Alert>
      </div>

      {/* Order Tracker */}
      <OrderTraking activeStep={1} />

      {/* Order Items */}
      <div className="py-10 space-y-6">
        {order.order?.orderItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-between items-center p-6 shadow-lg border rounded-lg bg-white"
          >
            {/* Product Details */}
            <div className="flex items-center space-x-5 w-full lg:w-1/2">
              <img
                className="w-28 h-28 object-cover object-top rounded-md"
                src={item?.product.imageUrl}
                alt={item.product.title}
              />
              <div className="space-y-2">
                <p className="text-lg font-semibold">{item?.product.title}</p>
                <p className="text-sm text-gray-500 font-medium space-x-3">
                  <span>Color: Pink</span> <span>Size: {item?.size}</span>
                </p>
                <p className="text-sm font-medium">
                  Seller: {item?.product.brand}
                </p>


                <p className="text-lg font-semibold text-purple-600">
                ₹{item?.product.discountedPrice}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-6 lg:mt-0 w-full lg:w-1/2">
              <AddressCard address={order.order?.shippingAddress} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSucess;
