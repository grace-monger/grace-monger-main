import axios from "axios";

// Action types:

const SET_SINGLE_WINE = "SET_SINGLE_WINE";

// Action creators:

const setSingleWine = (wine) => {
  return {
    type: SET_SINGLE_WINE,
    wine,
  };
};

// Thunks:

export const fetchSingleWine = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/wines/${id}`);
      dispatch(setSingleWine(data));
    } catch (error) {
      throw error;
    }
  };
};

// Initial State:

const initialState = { info: {} };

// Reducer:

export default function singleWineReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_WINE:
      return { ...state, info: action.wine };
    default:
      return state;
  }
}
