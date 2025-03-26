import { Stepper, Step, StepLabel } from "@mui/material";
import React from "react";

const step = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const OrderTraking = ({ activeStep }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alter>
        {step.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "#9155fd" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTraking;
