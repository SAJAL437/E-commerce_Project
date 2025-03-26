import { useDispatch, useSelector } from "react-redux";
import AdressCard from "../AddressCard/AdressCard";
import CartItem from "../Cart/CartItem"; // Assuming you have CartItem imported
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../ReduxState/Order/Action";
import { useEffect } from "react";
import { createPayment } from "../../../ReduxState/Payment/Action";

const OrderSummery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((state) => state);

  console.log("orderId ", order.order);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const handleCreatePayment = () => {
    const data = { orderId, jwt };
    dispatch(createPayment(data));
    console.log("Payment created data", data);
  };

  return (
    <div>
      {/* Address Card */}
      <div className="w-full  space-y-4">
        <div className="p-5 shadow-lg rounded-md border bg-white">
          <AdressCard address={order.order?.shippingAddress} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        {/* Left Section - Address and Cart Items */}
        <div className="w-full lg:w-7/12 space-y-4">
          {/* Cart Items List */}
          <div className="space-y-4">
            {order.order?.orderItems.map((item, index) => (
              <CartItem key={index} item={item} showButton={false} />
            ))}
          </div>
        </div>

        {/* Right Section - Price Details */}
        <div className="w-full lg:w-5/12 lg:sticky top-4 h-fit bg-white shadow-lg rounded-md border p-5">
          <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>

          <div className="space-y-3 font-semibold border-t border-gray-400">
            <div className="flex justify-between pt-3 text-black">
              <span>Price ({order.order?.totalItem} item)</span>
              <span className="text-md font-semibold">
                ₹{order.order?.totalPrice}
              </span>
            </div>

            <div className="flex justify-between pt-3 text-black">
              <span>Discount</span>
              <span className="text-green-500 text-md font-bold">
                -₹{order.order?.discounte}
              </span>
            </div>

            <div className="flex justify-between pt-3 mb-4 text-black">
              <span>Delivery Charge</span>
              <span className="text-green-500 text-md font-bold">Free</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-gray-400 text-black">
              <span className="font-bold">Total Amount</span>
              <span className="text-green-500 font-bold">
                ₹{order.order?.totalDiscountedPrice}
              </span>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleCreatePayment}
                variant="contained"
                type="submit"
                sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
              >
                Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
