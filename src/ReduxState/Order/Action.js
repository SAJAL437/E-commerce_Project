import axios from "axios";
import { api, API_BASE_URL } from "../../Config/apiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "./Actiontype";

// export const createOrder = (reqData) => async (dispatch) => {
//   console.log("req data: ", reqData);
//   dispatch({ type: CREATE_ORDER_REQUEST });

//   try {
//     const { data } = await api.post(`/api/orders`, reqData.address);

//     if (data.id) {
//       reqData.navigate({ search: `step=3&order_id=${data.id}` });
//     }
//     console.log("created order :", data)

//     dispatch({
//       type: CREATE_ORDER_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);

//     dispatch({
//       type: CREATE_ORDER_FAILURE,
//       payload: error.message,
//     });
//   }
// };

// export const createOrder = (reqData) => async (dispatch) => {
//   console.log("req data: ", reqData);
//   dispatch({ type: CREATE_ORDER_REQUEST });

//   try {
//     const { data } = await api.post(`/api/orders/`, reqData);

//     dispatch({
//       type: CREATE_ORDER_SUCCESS,
//       payload: data,
//     });

//     if (data.id) {
//       reqData.navigate({ search: `step=3&order_id=${data.id}` });
//     }

//     console.log("created order:", data);
//   } catch (error) {
//     console.error("Error creating order:", error);

//     dispatch({
//       type: CREATE_ORDER_FAILURE,
//       payload:
//         error.response?.data?.message ||
//         error.message ||
//         "An unknown error occurred",
//     });
//   }
// };

export const createOrder = (reqData) => async (dispatch) => {
  console.log("req data ", reqData);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };

    const { data } = await axios.post(
      `${API_BASE_URL}/api/orders/`,
      reqData.address,
      config
    );
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    console.log("created order - ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error : ", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const getOrderByID = (orderId) => async (dispatch) => {
//   dispatch({ type: GET_ORDER_BY_ID_REQUEST });

//   try {
//     const { data } = await api.get(`/api/orders/${orderId}`);

//     console.log("order by id", data);

//     dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
//   } catch (error) {
//     console.log("catch", error);
//     dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
//   }
// };

export const getOrderById = (orderId) => async (dispatch) => {
  console.log("get order req ", orderId);
  try {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("order by id ", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch ", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
