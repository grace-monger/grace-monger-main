import axios from "axios";

// action types
const GET_ALL_CHEESES = "GET_ALL_CHEESES";
const ADD_CHEESE = "ADD_CHEESE";
const DELETE_CHEESE = "DELETE_CHEESE"

//action creators
const _getCheese = (cheeses) => {
  return {
    type: GET_ALL_CHEESES,
    cheeses,
  };
};

const addCheese = (cheese) => {
  return {
    type: ADD_CHEESE,
    cheese,
  };
};

const deleteCheese = (cheeseToDelete) => {
  return {
    type: DELETE_CHEESE,
    cheeseToDelete
  }
}

// thunk creator
export const getCheeseThunk = () => {
  return async (dispatch) => {
    try {
      const { data: cheeses } = await axios.get(`/api/cheeses`);
      dispatch(_getCheese(cheeses));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addNewCheeseThunk = (cheese) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/cheeses`, cheese);
      dispatch(addCheese(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// export const deleteCheeseThunk

const intialState = [];

export default function cheeseReducer(state = intialState, action) {
  switch (action.type) {
    case GET_ALL_CHEESES:
      return action.cheeses;
    case ADD_CHEESE:
      return [...state, action.cheese];
    default:
      return state;
  }
}
