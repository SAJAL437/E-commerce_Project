const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};
import {
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCESS,
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_REQUEST,
  FIND_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_SUCCESS,
} from "../Product/Actiontype";
export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCT_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    // case DELETE_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     products: state.products.filter((item) => item.id !== action.payload),
    //   };
    case FIND_PRODUCT_SUCCESS:
    case FIND_PRODUCT_BY_ID_SUCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };

    case FIND_PRODUCT_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case DELETE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_PRODUCT_SUCCESS:
        console.log("delete ",state.products)
        return {
          ...state,
          loading: false,
          deleteProduct:action.payload
          
          
        };
      case DELETE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case SEARCH_PRODUCT_SUCCESS:
          return {
            ...state,
            loading: false,
            searchProducts: action.payload,
          };

    default:
      return state;
  }
};
