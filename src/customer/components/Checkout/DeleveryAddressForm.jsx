import { Button, TextField, Typography } from "@mui/material";
import AddressCard from "../AddressCard/AdressCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../ReduxState/Order/Action";
import { useState } from "react";

function DeliveryAddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [selectedAddress, setSelectedAdress] = useState(null);
  const jwt = localStorage.getItem("jwt");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zipCode"),
      phoneNumber: data.get("phoneNumber"),
    };

    const orderData = { address, navigate, jwt };
    dispatch(createOrder(orderData));
    console.log("Address submitted:", address);
  };

  const handleCreateOrder = (item) => {
    const AddressButtonData = { address: item, navigate, jwt };
    dispatch(createOrder(AddressButtonData));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-gray-50 p-6 lg:p-10">
      {/* Left Side - Address List */}
      <div className="w-full lg:w-5/12 bg-white shadow-md rounded-md overflow-y-auto">
        <div className="h-[30.5rem] overflow-y-auto p-2 space-y-4">
          {auth.user?.address.map((item, index) => (
            <div
              onClick={() => setSelectedAdress(item)}
              key={index}
              className="p-5 bg-white hover:bg-gray-50 transition cursor-pointer border border-gray-200 rounded-md"
            >
              <AddressCard address={item} />
              {selectedAddress?.id === item.id && (
                <Button
                  sx={{
                    mt: 2,
                    bgcolor: "rgb(145, 85, 253)",
                    "&:hover": { bgcolor: "rgb(115, 55, 223)" },
                  }}
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={() => handleCreateOrder(item)}
                >
                  Deliver Here
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - New Address Form */}
      <div className="w-full lg:w-7/12 bg-white shadow-md rounded-md p-6">
        <Typography variant="h6" className="mb-6 font-bold text-sm">
          Enter a new Delivery Address
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6 mt-5">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
            />
          </div>

          {/* Address Info */}
          <div className="grid grid-cols-1 gap-4">
            <TextField
              required
              id="address"
              name="address"
              label="Street Address"
              fullWidth
              multiline
              rows={3}
              autoComplete="street-address"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="address-level2"
            />
            <TextField
              required
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              autoComplete="address-level1"
            />
            <TextField
              required
              id="zipCode"
              name="zipCode"
              label="Zip/Postal Code"
              fullWidth
              autoComplete="postal-code"
            />
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              autoComplete="tel"
            />
          </div>

          {/* Submit Button */}
          <div className="text-left font-bold">
            <Button
              sx={{
                mt: 2,
                px: 5,
                bgcolor: "rgb(145, 85, 253)",
                "&:hover": { bgcolor: "rgb(115, 55, 223)" },
              }}
              size="large"
              variant="contained"
              type="submit"
            >
              Deliver Here
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeliveryAddressForm;
