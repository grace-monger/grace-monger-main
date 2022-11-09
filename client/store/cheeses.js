import axios from "axios"

// action types
const GET_ALL_CHEESES = "GET_ALL_CHEESES";

//action creators
const getCheeses = (cheeses) => {
  return {
    type: GET_ALL_CHEESES,
    cheeses,
  };
};

// thunk creator
export const getCheeseThunk = () => {
  return async (dispatch) => {
    try {
      const { data: cheeses } = axios.get(`/api/cheeses`);
      dispatch(getCheeses(cheeses));
    } catch (error) {
      console.error(error);
    }
  };
};

const intialState = [];

export default function cheeseReducer(state = intialState, action) {
  switch (action.type) {
    case GET_ALL_CHEESES:
      return action.cheeses;
    default:
      return state;
  }
}
