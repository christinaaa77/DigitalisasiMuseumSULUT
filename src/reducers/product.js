import * as actionType from 'actions/types';

const INITIAL_STATE = {
  products: [],
  product: {},
  message: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.SET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        message: null,
      };
    case actionType.SET_PRODUCTS_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case actionType.SET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        message: null,
      };
    case actionType.SET_PRODUCT_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case actionType.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        message: null,
      };
    case actionType.ADD_PRODUCT_ERROR:
    case actionType.EDIT_PRODUCT_ERROR: // Combine handling for ADD_PRODUCT_ERROR and EDIT_PRODUCT_ERROR
    case actionType.DELETE_PRODUCT_ERROR: // Combine handling for DELETE_PRODUCT_ERROR
      return {
        ...state,
        message: action.payload,
      };
    case actionType.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                name: action.payload.name,
                category: action.payload.category,
                photo: action.payload.photo, // Updated to use a single 'photo' field
                video: action.payload.video,
                arLink: action.payload.arLink, // Updated to use a single 'arLink' field
                desc: action.payload.desc,
              }
            : product
        ),
        message: null,
      };
    case actionType.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        message: null,
      };
    default:
      return state;
  }
};

export default productReducer;
