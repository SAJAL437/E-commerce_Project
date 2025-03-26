import axios from "axios";
import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "./ActionType";
import { api, API_BASE_URL } from "../../Config/apiConfig";

// export const createPayment = (orderId) => async (dispatch) => {
//   console.log("create paymentData ", orderId);
//   dispatch({
//     type: CREATE_PAYMENT_REQUEST,
//   });
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       },
//     };

//     const { data } = await api.post(`/api/payments/${orderId}`, {}, config);

//     if (data.payment_link_url) {
//       window.location.href = data.payment_link_url;
//     }
//     dispatch({
//       type: CREATE_PAYMENT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: CREATE_PAYMENT_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const createPayment =
  ({ orderId, jwt }) =>
  async (dispatch) => {
    if (!orderId || isNaN(orderId)) {
      console.error("Invalid orderId:", orderId);
      return;
    }

    console.log("Creating payment for orderId:", orderId);

    dispatch({ type: CREATE_PAYMENT_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // Use extracted JWT
        },
      };

      const { data } = await api.post(`/api/payments/${orderId}`,{}, config);

      console.log("Payment response:", data);

      if (data.payment_link_url) {
        window.location.href = data.payment_link_url;
      }

      dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
      console.error("Payment error:", error);

      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const updatePayment = (reqData) => {
  return async (dispatch) => {
    console.log("update payment reqData ", reqData);
    dispatch(updatePaymentRequest());
    try {
      const { data } = await api.put(
        `/api/payments?payment_id=${reqData.orderId}&order_id=${reqData.orderId}`
      );
      console.log("update payment : -", data);
      dispatch(updatePaymentSuccess());
    } catch (error) {
      dispatch(updatePaymentFailure(error.message));
    }
  };
};

export const updatePaymentRequest = () => {
  return {
    type: UPDATE_PAYMENT_REQUEST,
  };
};

export const updatePaymentSuccess = (payment) => {
  return {
    type: UPDATE_PAYMENT_SUCCESS,
    payload: payment,
  };
};

export const updatePaymentFailure = (error) => {
  return {
    type: UPDATE_PAYMENT_FAILURE,
    payload: error,
  };
};
