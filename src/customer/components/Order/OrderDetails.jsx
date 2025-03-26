import React from "react";
import AdressCard from "../AddressCard/AdressCard";
import OrderTraking from "./OrderTraking";
import { Star } from "@mui/icons-material";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20 space-y-10 bg-gray-50 py-10">
      {/* Delivery Address */}
      <div className="p-4 rounded-lg shadow-lg border border-gray-200">
        <h1 className="font-bold text-xl text-gray-800 mb-4">
          Delivery Address
        </h1>
        <AdressCard />
      </div>

      {/* Order Tracking */}
      <div className="px-2 py-8 rounded-lg shadow-lg border border-gray-200">
        <OrderTraking activeStep={3} />
      </div>

      {/* Product Card */}
      {[1, 1].map((item, index) => (
        <div
          key={index}
          className="w-full bg-white shadow-md rounded-lg border border-gray-200 p-5 "
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            {/* Product Image */}
            <img
              className="w-24 h-24 object-cover object-top rounded-lg"
              src="https://th.bing.com/th?id=OPAC.Jwjbm5b%2fd9knvg474C474&w=112&h=122&c=17&qlt=100&o=6&cb=15&dpr=1.3&pid=3.11"
              alt="Product"
            />

            {/* Product Info */}
            <div className="space-y-1 flex-1">
              <p className="font-semibold text-gray-800">
                Men Slim Mid Rise Black Jeans
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Color:</span> Pink
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Size:</span> M
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Seller:</span> Linaria
              </p>
              <p className="text-lg font-semibold text-gray-900">₹4697</p>
            </div>

            {/* Rate & Review (for larger screens) */}
            <div className="hidden md:flex items-center space-x-2 text-indigo-600 cursor-pointer">
              <Star fontSize="small" />
              <span className="text-sm font-medium">Rate & Review Product</span>
            </div>
          </div>

          {/* Rate & Review (for smaller screens) */}
          <div className="md:hidden flex items-center space-x-2 text-indigo-600 cursor-pointer">
            <Star fontSize="small" />
            <span className="text-sm font-medium">Rate & Review Product</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
