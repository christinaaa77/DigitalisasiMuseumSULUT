import * as actionType from 'actions/types';

const INITIAL_STATE = {
  ulasans: [],
  message: null,
};

const ulasanReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.SET_ULASANS_SUCCESS:
      return {
        ...state,
        ulasans: action.payload,
        message: null,
      };
    case actionType.SET_ULASANS_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case actionType.ADD_ULASAN_SUCCESS:
      return {
        ...state,
        ulasans: [...state.ulasans, action.payload],
        message: null,
      };
    case actionType.ADD_ULASAN_ERROR:
    case actionType.DELETE_ULASAN_ERROR: // Combine handling for ADD_ULASAN_ERROR and DELETE_ULASAN_ERROR
      return {
        ...state,
        message: action.payload,
      };
    case actionType.DELETE_ULASAN_SUCCESS:
      return {
        ...state,
        ulasans: state.ulasans.filter(
          (ulasan) => ulasan.id !== action.payload
        ),
        message: null,
      };
    default:
      return state;
  }
};

export default ulasanReducer;
