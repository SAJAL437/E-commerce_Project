import { Stack } from "@mui/material";
import OrderCard from "./OrderCard";

const orderStaus = [
  { value: "on the way", label: "On The Way" },
  { value: "delivered", label: "Delivered" },
  { value: "canceled", label: "Canceled" },
  { value: "returned", label: "Returned" },
];

const Order = () => {
  return (
    <div className="px-5 lg:px-20 py-5">
      <div className="flex flex-col md:flex-row gap-4 ">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>

            <div className="space-y-4 mt-6">
              <h1 className="font-semibold text-gray-700">ORDER STATUS</h1>

              {orderStaus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={option.value}
                    value={option.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Card Section */}
        <div className="w-full md:w-3/4">
          {[1, 1].map((item, index) => (
            <OrderCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
