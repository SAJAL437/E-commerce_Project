import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { Button } from "@mui/material"; // Add this import for the Button component.
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../ReduxState/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector((store) => store);
  // console.log("cart: ", cart);

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  useEffect(() => {
    dispatch(getCart(jwt));
  }, [cart.updateCartItem, cart.deleteCartItem, jwt]);

  return (
    <div className="lg:grid grid-cols-3 lg:px-16 relative mt-4">
      <div className="col-span-2">
        {cart.cart?.cartItems.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
      <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
        <div>
          <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>

          <div className="space-y-3 font-semibold border-t border-gray-400">
            <div className="flex justify-between pt-3 text-black">
              <span>Price ({cart.cart?.totalItem} item) </span>
              <span className="text-md font-semibold">
                ₹{cart.cart?.totalPrice}
              </span>
            </div>

            <div className="flex justify-between pt-3 text-black">
              <span>Discount</span>
              <span className="text-green-500 text-md font-bold">
                -₹{cart.cart?.discount}
              </span>
            </div>

            <div className="flex justify-between pt-3 mb-4 text-black">
              <span>Delivery Charge</span>
              <span className="text-green-500 text-md font-bold">Free</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-gray-400 text-black">
              <span className="font-bold">Total Amount</span>
              <span className="text-green-500 font-bold">
                ₹{cart.cart?.totlaDiscountPrice}
              </span>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-center p-1 mt-4">
              <Button
                onClick={handleCheckout}
                variant="contained"
                sx={{
                  bgcolor: "#9155fd",
                }}
                className="w-full "
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
