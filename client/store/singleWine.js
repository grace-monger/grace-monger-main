import axios from "axios";

// Action types:

const SET_SINGLE_WINE = "SET_SINGLE_WINE";
const UPDATE_WINE = "UPDATE_WINE";
// const SET_WINE_PAIR = "SET_WINE_PAIR";

// Action creators:

const setSingleWine = (wine) => {
  return {
    type: SET_SINGLE_WINE,
    wine,
  };
};

export const updateWine = (wine) => {
  return {
    type: UPDATE_WINE,
    wine,
  };
};

// const setWinePair = (cheese) => {
//   return {
//     type: SET_WINE_PAIR,
//     cheese,
//   };
// };

// Thunks:

export const fetchSingleWine = (id) => {
  return async (dispatch) => {
    try {
      const { data: wine } = await axios.get(`/api/wines/${id}`);
      dispatch(setSingleWine(wine));
    } catch (error) {
      throw error;
    }
  };
};

export const updateThisWine = (wine) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(`/api/wines/${wine.id}`, wine);
    dispatch(updateWine(updated));
  };
};

// export const fetchWinePair = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`/api/wines/${id}`);
//     } catch (error) {
//       throw error;
//     }
//   };
// };

// Initial State:

const initialState = {};

// Reducer:

export default function singleWineReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_WINE:
      return action.wine;
    // case SET_WINE_PAIR:
    //   return { ...state, cheese: action.cheese };
    case UPDATE_WINE:
      return action.wine;
    default:
      return state;
  }
}
