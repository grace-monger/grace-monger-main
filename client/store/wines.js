import axios from "axios";

// Action types:

const GET_ALL_WINES = "GET_ALL_WINES";
const CREATE_WINE = "CREATE_WINE";
const DELETE_WINE = "DELETE_WINE";

// Action creators - they take some data and return that in an action:

const _getAllWines = (wines) => {
  return {
    type: GET_ALL_WINES,
    wines,
  };
};

const _createWine = (wine) => {
  return {
    type: CREATE_WINE,
    wine,
  };
};

const _deleteWine = (wine) => {
  return {
    type: DELETE_WINE,
    wine,
  };
};

// Thunks:

export const fetchWines = () => {
  return async (dispatch) => {
    try {
      const { data: wines } = await axios.get(`/api/wines`);
      dispatch(_getAllWines(wines));
    } catch (error) {
      throw error;
    }
  };
};

export const createWine = (wine) => {
  return async (dispatch) => {
    const { data: created } = await axios.post("/api/wines", wine);
    dispatch(_createWine(created));
  };
};

export const deleteWine = (id) => {
  return async (dispatch) => {
    const { data: wine } = await axios.delete(`/api/wines/${id}`);
    dispatch(_deleteWine(wine));
  };
};

// Initial State:

const initialState = [];

// Reducer:

export default function winesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WINES:
      return action.wines;
    case CREATE_WINE:
      return [...state, action.wine];
    case DELETE_WINE:
      return state.filter((wine) => wine.id !== action.wine.id);
    default:
      return state;
  }
}
