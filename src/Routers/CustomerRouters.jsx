import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../customer/components/navigation/Navigation";
import Cart from "../customer/components/Cart/Cart";
import Product from "../customer/components/Product/Product";
import Footer from "../customer/components/Footer/Footer";
import Homepage from "../customer/pages/Homepage/Homepage";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Order/Order";
import OrderDetails from "../customer/components/Order/OrderDetails";
import PaymentSucess from "../customer/components/Payment/PaymentSucess";
const CustomerRouters = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/login" element={<Homepage />} />
        <Route path="/register" element={<Homepage />} />

        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product />} />

        <Route path="/product/:productId" element={<ProductDetails />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order" element={<Order />} />

        <Route path="/account/order/:orderId" element={<OrderDetails />} />


        <Route path="/payment/:orderId" element={<PaymentSucess />} />

      </Routes>

      



      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
