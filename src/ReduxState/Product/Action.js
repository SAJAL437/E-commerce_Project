import { api } from "../../Config/apiConfig";
import {
  FIND_PRODUCT_SUCCESS,
  FIND_PRODUCT_REQUEST,
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_SUCESS,
} from "./Actiontype";

export const findProducts = (reqData) => async (dispatch) => {
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    dispatch({ type: FIND_PRODUCT_REQUEST });

    const { data } = await api.get(
      `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    console.log("get product by category - ", data);
    dispatch({
      type: FIND_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// export const findProducts = (reqData) => async (dispatch) => {
//   dispatch({ type: FIND_PRODUCT_REQUEST });

//   const params = new URLSearchParams();

//   if (reqData.color) params.append('color', reqData.color);
//   if (reqData.size) params.append('size', reqData.size);
//   if (reqData.minPrice) params.append('minPrice', reqData.minPrice);
//   if (reqData.maxPrice) params.append('maxPrice', reqData.maxPrice);
//   if (reqData.minDiscount) params.append('minDiscount', reqData.minDiscount);
//   if (reqData.category) params.append('category', reqData.category);
//   if (reqData.stock !== undefined && reqData.stock !== null) params.append('stock', reqData.stock);
//   if (reqData.sort) params.append('sort', reqData.sort);
//   if (reqData.pageNumber) params.append('pageNumber', reqData.pageNumber);
//   if (reqData.pageSize) params.append('pageSize', reqData.pageSize);

//   const queryString = params.toString();

//   if (!queryString) {
//     console.warn("No valid parameters to send");
//     return;
//   }

//   try {
//     const { data } = await api.get(`/api/products?${queryString}`);
//     console.log("products", data);
//     dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: FIND_PRODUCT_FAILURE,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  // const { productId } = reqData;
  try {
    const { data } =await api.get(`/api/products/id/${reqData.productId}`);
    console.log("data -----",data)

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};
