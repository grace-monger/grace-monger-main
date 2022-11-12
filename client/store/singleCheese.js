import axios from "axios";

//action types

const GET_SINGLE_CHEESE = "GET_SINGLE_CHEESE";
const UPDATE_CHEESE = "UPDATE_CHEESE";

// action creators

export const getSingleCheese = (cheese) => {
  return {
    type: GET_SINGLE_CHEESE,
    cheese,
  };
};

export const updateCheese = (cheese) => {
  return {
    type: UPDATE_CHEESE,
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

export const updateThisCheese = (cheese) => {
  // return async (dispatch) => {
  //   const { data: updated } = await axios.put(
  //     `/api/cheeses/${cheese.id}`,
  //     cheese
  //   );
  //   dispatch(updateCheese(updated));
  // };
  console.log(cheese)
};

const initialState = {};

// reducer

export default function singleCheeseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_CHEESE:
      return action.cheese;
    case UPDATE_CHEESE:
      return state.cheese
    default:
      return state;
  }
}
