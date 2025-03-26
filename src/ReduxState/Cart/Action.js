import axios from "axios";
import { API_BASE_URL } from "../../Config/apiConfig";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./Actiontype";

// export const getCart = () => async (dispatch) => {
//   dispatch({ type: GET_CART_REQUEST });

//   try {
//     const { data } = await api.get(`/api/cart/`);
//     console.log("GET CART : ", data);

//     dispatch({ type: GET_CART_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: GET_CART_FAILURE, payload: error.message });
//   }
// };

export const getCart = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API_BASE_URL}/api/cart/`, config);
    console.log("cart ", data);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const addItemTocart = (reqData) => async (dispatch) => {
//   dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

//   try {
//     const { data } = await api.put("/api/cart/add", reqData.data);

//     console.log("ADD ITEM TO CART : ", data);

//     dispatch({ type: ADD_ITEM_TO_CART_REQUEST, payload: data });
//   } catch (error) {
//     dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
//   }
// };

// export const removeCartItem = (reqData) => async (dispatch) => {
//   dispatch({ type: REMOVE_CART_ITEM_REQUEST });

//   try {

//     const config = {
//       headers: {
//         Authorization: `Bearer ${reqData.jwt}`,
//         "Content-Type":"application/json"
//       };

//     await axios.delete(`${API_BASE_URL}/api/cart_item/${reqData.cartItemId}`, config);

//     dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload:reqData.cartItemId});
//   } catch (error) {
//     dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
//   }
// };

// export const removeCartItem = (cartItemId) => async (dispatch) => {
//   dispatch({ type: REMOVE_CART_ITEM_REQUEST });

//   try {
//     await api.delete(`/api/cart_items/${cartItemId}`);
//     console.log(await api.delete(`/api/cart_items/${cartItemId}`));
//     dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
//   } catch (error) {
//     dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
//   }
// };

// export const updateCartItem = (cartItemId) => async (dispatch) => {
//   dispatch({ type: UPDATE_CART_ITEM_REQUEST });

//   try {
//     const { data } = await api.put(`/api/cart_item/${cartItemId}`);

//     dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
//   }
// };

export const addItemToCart = (reqData) => async (dispatch) => {
  console.log("req data ",reqData)
try {
 
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  const config = {
    headers: {
      Authorization: `Bearer ${reqData.jwt}`,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.put(`${API_BASE_URL}/api/cart/add`, 
    reqData.data,
    config,
  );
console.log("add item to cart ",data)
  dispatch({
    type: ADD_ITEM_TO_CART_SUCCESS,
    payload: data,
  });
} catch (error) {
  dispatch({
    type: ADD_ITEM_TO_CART_FAILURE,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}
};



export const removeCartItem = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        "Content-Type": "application/json",
      },
    };
    await axios.delete(
      `${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`,
      config
    );

    dispatch({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: reqData.cartItemId,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`,
      reqData.data,
      config
    );
    console.log("udated cartitem ", data);
    dispatch({
      type: UPDATE_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
