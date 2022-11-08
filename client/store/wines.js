import axios from "axios";

// Action types:

const GET_ALL_WINES = "GET_ALL_WINES";

// Action creators - they take some data and return that in an action:

const _getAllWines = (wines) => {
  return {
    type: GET_ALL_WINES,
    wines,
  };
};

// Thunks:

export const fetchWines = () => {
  return async (dispatch) => {
    try {
      const { data: wines } = await axios.get("/api/wines");
      dispatch(_getAllWines(wines));
    } catch (error) {
      throw error;
    }
  };
};

// Initial State:

const initialState = [];

// Reducer:

export default function winesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WINES:
      return action.wines;
    default:
      return state;
  }
}
