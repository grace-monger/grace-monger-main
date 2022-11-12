import axios from "axios";

//ACTION TYPES
const GET_ORDER = "GET_ORDER";
const ADD_CHEESE_ORDER = "ADD_CHEESE_ORDER";
const ADD_WINE_ORDER = "ADD_WINE_ORDER";

//ACTION CREATORS
const getOrder = (order) => {
  return {
    type: GET_ORDER,
    order,
  };
};

const addCheeseOrder = (cheeseOrder) => {
  return {
    type: ADD_CHEESE_ORDER,
    cheeseOrder,
  };
};

const addWineOrder = (wineOrder) => {
  return {
    type: ADD_WINE_ORDER,
    wineOrder,
  };
};

//THUNKS
export const fetchOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.get(`/api/order/${userId}`);
      console.log("DATA", order);
      dispatch(getOrder(order));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewCheeseOrderThunk = (orderInfo) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.post(`/api/order/cheese`, orderInfo);
      dispatch(addCheeseOrder(order));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewWineOrderThunk = (orderInfo) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.post(`/api/order/wine`, orderInfo);
      dispatch(addWineOrder(order));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
const initialState = [];

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    case ADD_CHEESE_ORDER:
      return [...state, action.cheeseOrder];
    case ADD_WINE_ORDER:
      return [...state, action.wineOrder];
    default:
      return state;
  }
}
