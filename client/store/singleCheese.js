import axios from "axios";

//action types

const GET_SINGLE_CHEESE = "GET_SINGLE_CHEESE";

// action creators

const getSingleCheese = (cheese) => {
  return {
    type: GET_SINGLE_CHEESE,
    cheese,
  };
};

// Thunk creator
export const getSingleCheeseThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: cheese } = await axios.get(`/api/cheeses/${id}`);
      dispatch(getSingleCheese(cheese));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {};

// reducer

export default function singleCheeseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_CHEESE:
      return action.cheese;
    default:
      return state;
  }
}
