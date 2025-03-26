import { Adjust } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const navigate = useNavigate();
  return (
    <div
      on
      onClick={() => navigate(`/account/order/${6}`)}
      className="p-4 border border-gray-200 rounded-lg shadow-gray-500 transform-view ease-in-out duration-500 shadow-md hover:shadow-lg bg-white space-y-4 cursor-pointer mb-4"
    >
      {/* Top Section - Product Image & Info */}
      <div className="flex items-center gap-4">
        <img
          className="w-20 h-20 rounded object-cover object-top cursor-pointer"
          src="https://th.bing.com/th?id=OPAC.FDf%2bf77CZSUO5Q474C474&w=592&h=550&o=5&dpr=1.3&pid=21.1"
          alt="Product"
        />

        <div className="space-y-1 flex-1 ml-4">
          <p className="font-semibold text-gray-800">
            Men Slim Rise Black Jeans
          </p>
          <p className="text-sm text-gray-500">Size: M</p>
          <p className="text-sm text-gray-500">Color: Black</p>
        </div>

        {/* Price (keep this to the side for larger screens) */}
        <div className="hidden sm:block">
          <p className="text-lg font-semibold text-gray-900 mr-4">₹4697</p>
        </div>
      </div>

      {/* Bottom Section - Delivery Status & Price (for smaller screens) */}
      <div className="flex justify-between items-center border-t pt-3">
        {true && (
          <div>
            <p className="text-sm font-medium text-green-600 items-center">
              <Adjust sx={{ with: "15px", height: "15px " }} />{" "}
              <span>Delivered on March 03, 2023</span>
            </p>
            <p className="text-xs ml-2 font-semibold">
              Your Item Has Been Delivered
            </p>
          </div>
        )}
        {false && (
          <p className="text-sm font-medium text-gray-500">
            <span>Expected Delivery on March 03, 2023</span>
          </p>
        )}

        <div className="sm:hidden">
          <p className="text-lg font-semibold text-gray-900">₹4697</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
