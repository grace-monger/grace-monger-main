import axios from "axios";

// Action type:
const GET_ORDER = "GET_ORDER";

// Action creator - they take some data and return that in an action:

const _getOrder = (order) => {
  return {
    type: GET_ORDER,
    order,
  };
};

// Thunk:

export const getOrder = () => {
  return async (dispatch) => {
    try {
    } catch (error) {}
  };
};
