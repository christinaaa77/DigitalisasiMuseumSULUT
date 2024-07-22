import * as actionType from 'actions/types';

const INITIAL_STATE = {
  wbtbs: [],
  wbtb: {},
  message: null,
};

const wbtbReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.SET_WBTBS_SUCCESS:
      return {
        ...state,
        wbtbs: action.payload,
        message: null,
      };
    case actionType.SET_WBTBS_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case actionType.SET_WBTB_SUCCESS:
      return {
        ...state,
        wbtb: action.payload,
        message: null,
      };
    case actionType.SET_WBTB_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case actionType.ADD_WBTB_SUCCESS:
      return {
        ...state,
        wbtbs: [...state.wbtbs, action.payload],
        message: null,
      };
    case actionType.ADD_WBTB_ERROR:
    case actionType.EDIT_WBTB_ERROR: // Combine handling for ADD_WBTB_ERROR and EDIT_WBTB_ERROR
    case actionType.DELETE_WBTB_ERROR: // Combine handling for DELETE_WBTB_ERROR
      return {
        ...state,
        message: action.payload,
      };
    case actionType.EDIT_WBTB_SUCCESS:
      return {
        ...state,
        wbtbs: state.wbtbs.map((wbtb) =>
          wbtb.id === action.payload.id
            ? {
                ...wbtb,
                name: action.payload.name,
                category: action.payload.category,
                photo: action.payload.photo, // Updated to use a single 'photo' field
                video: action.payload.video,
                sourceLink: action.payload.sourceLink, // Updated to use a single 'sourceLink' field
                desc: action.payload.desc,
              }
            : wbtb
        ),
        message: null,
      };
    case actionType.DELETE_WBTB_SUCCESS:
      return {
        ...state,
        wbtbs: state.wbtbs.filter(
          (wbtb) => wbtb.id !== action.payload
        ),
        message: null,
      };
    default:
      return state;
  }
};

export default wbtbReducer;
