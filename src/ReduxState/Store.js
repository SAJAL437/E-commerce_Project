import { thunk } from "redux-thunk";
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./Auth/Reducers";
import { customerProductReducer } from "./Product/productsReducer";
import { cartReducer } from "./Cart/cartReducer";
import { OrderReducer } from "./Order/orderReducer";

// ✅ Combine Reducers
const rootReducers = combineReducers({
  auth: authReducer,
  customersProduct:customerProductReducer,
  cart: cartReducer,
  order: OrderReducer,
});

// ✅ Create Store
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
