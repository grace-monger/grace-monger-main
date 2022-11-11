import axios from "axios";

//ACTION TYPES
const GET_ORDER = "GET_ORDER";

//ACTION CREATORS
const getOrder = (order) => {
  return {
    type: GET_ORDER,
    order,
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

//REDUCER
const initialState = [];

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    default:
      return state;
  }
}
