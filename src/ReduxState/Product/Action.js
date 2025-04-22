import { api, API_BASE_URL } from "../../Config/apiConfig";
import {
  FIND_PRODUCT_SUCCESS,
  FIND_PRODUCT_REQUEST,
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_SUCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
} from "./Actiontype";

// export const findProducts = (reqData) => async (dispatch) => {
//   const {
//     colors,
//     sizes,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     category,
//     stock,
//     sort,
//     pageNumber,
//     pageSize,
//   } = reqData;
//   try {
//     dispatch({ type: FIND_PRODUCT_REQUEST });

//     const { data } = await api.get(
//       `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
//     );

//     console.log("get product by category - ", data);
//     dispatch({
//       type: FIND_PRODUCT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FIND_PRODUCT_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

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
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const { data } = await api.get(
      `${API_BASE_URL}/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    console.log("get product by category - ", data);
    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  // const { productId } = reqData;
  try {
    const { data } = await api.get(`/api/products/id/${reqData.productId}`);
    console.log("data -----", data);

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const searchProduct = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });

    const { data } = await api.get(`/api/products/search`, {
      params: {
        q: keyword,
      },
    });

    console.log("products by  id : ", data);
    dispatch({
      type: SEARCH_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/admin/product/`,
      product.data
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await api.put(
      `${API_BASE_URL}/api/admin/product/${product.productId}`,
      product
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  console.log("delete product action", productId);
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let { data } = await api.delete(`/api/admin/product/${productId}/delete`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });

    console.log("product delte ", data);
  } catch (error) {
    console.log("catch error ", error);
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
