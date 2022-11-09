import axios from "axios";

// Action types:

const SET_SINGLE_WINE = "SET_SINGLE_WINE";
const SET_WINE_PAIR = "SET_WINE_PAIR";

// Action creators:

const setSingleWine = (wine) => {
  return {
    type: SET_SINGLE_WINE,
    wine,
  };
};

const setWinePair = (cheese) => {
  return {
    type: SET_WINE_PAIR,
    cheese,
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

export const fetchWinePair = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/wines/${id}`);
    } catch (error) {
      throw error;
    }
  };
};

// Initial State:

const initialState = { info: {}, cheese: [] };

// Reducer:

export default function singleWineReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_WINE:
      return { ...state, info: action.wine };
    case SET_WINE_PAIR:
      return { ...state, cheese: action.cheese };
    default:
      return state;
  }
}
