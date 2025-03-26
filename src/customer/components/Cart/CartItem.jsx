import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../ReduxState/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?.id, jwt };
    dispatch(removeCartItem(data));
  };


  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?.id,
      jwt,
    };
    dispatch(updateCartItem(data));
  };

  return (
    <div className="p-5 shadow-lg rounded-md mb-6">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top rounded-lg"
            src={item?.product.imageUrl}
            alt=""
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product.title}</p>
          <p className="opacity-70">Size:{item?.size}, White</p>
          <p className="opacity-70 mt-2">Seller: {item?.product.brand}</p>

          <div className="flex space-x-3 items-center  text-gray-900 mt-3">
            <p className="font-semibold">₹{item?.product.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{item?.price}</p>
            <p className="text-green-600 fontsemibold">
              {item?.product.discountPercent}% off
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item?.quantity <= 1}
          >
            <RemoveCircleOutline />
          </IconButton>
          <span className="py-0.5  px-6 border rounded-sm">
            {item?.quantity}
          </span>
          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            sx={{ color: "RGB(145 85 253)" }}
          >
            <AddCircleOutline />
          </IconButton>
        </div>

        <div>
          <Button
            onClick={handleRemoveItemFromCart}
            sx={{ color: "RGB(145 85 253)" }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
