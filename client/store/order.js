import axios from "axios";

//ACTION TYPES
const GET_ORDER = "GET_ORDER";
const ADD_CHEESE_ORDER = "ADD_CHEESE_ORDER";
const ADD_WINE_ORDER = "ADD_WINE_ORDER";
const UPDATE_CHEESE_QUANTITY = "UPDATE_CHEESE_QUANTITY";
const UPDATE_WINE_QUANTITY = "UPDATE_WINE_QUANTITY";
const FULFILL_ORDER = "FULFILL_ORDER";
const REMOVE_WINE_ORDER = "REMOVE_WINE_ORDER";
const REMOVE_CHEESE_ORDER = "REMOVE_CHEESE_ORDER";

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

const removeWineOrder = (wineOrder) => {
  return {
    type: REMOVE_WINE_ORDER,
    wineOrder,
  };
};

const removeCheeseOrder = (cheeseOrder) => {
  return {
    type: REMOVE_CHEESE_ORDER,
    cheeseOrder,
  };
};

// const _clearOrder = (order) => {
//   return {
//     type: CLEAR_ORDER,
//     order,
//   };
// };

// // info should include orderId, productId, and quantity
const updateCheeseQuantity = (infoToUpdate) => {
  return {
    type: UPDATE_CHEESE_QUANTITY,
    infoToUpdate,
  };
};

const updateWineQuantity = (infoToUpdate) => {
  return {
    type: UPDATE_WINE_QUANTITY,
    infoToUpdate,
  };
};

const _fulfillOrder = (order) => {
  return {
    type: FULFILL_ORDER,
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

export const addNewCheeseOrderThunk = (orderInfo) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.post(`/api/order/cheese`, orderInfo);
      console.log("data from back", order);
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

export const removeWineOrderThunk = (id) => {
  console.log("HERE IS ID", id);
  return async (dispatch) => {
    try {
      const { data: order } = await axios.delete(`/api/order/removeWine/${id}`);
      dispatch(removeWineOrder(order));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeCheeseOrderThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.delete(
        `/api/order/removeCheese/${id}`
      );
      dispatch(removeCheeseOrder(order));
    } catch (error) {
      console.log(error);
    }
  };
};

// export const clearOrder = (id) => {
//   return async (dispatch) => {
//     const { data: order } = await axios.delete(`/api/order/${id}`);
//     dispatch(_clearOrder(order));
//   };
// };

// infoToUpdate is productId, OrderId, and quantity
export const updateCheeseQuantityThunk = (infoToUpdate) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/order/updateCheese`, infoToUpdate);
      console.log("data from put", data);
      dispatch(updateCheeseQuantity(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateWineQuantityThunk = (infoToUpdate) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/order/updateWine`, infoToUpdate);
      dispatch(updateWineQuantity(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fulfillOrder = (infoToUpdate) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/order/updateOrder`, infoToUpdate);
      dispatch(_fulfillOrder(data));
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
    case REMOVE_WINE_ORDER:
      return state[0].filter((wine) => wine.id !== action.wineOrder.id);
    case REMOVE_CHEESE_ORDER:
      return state[1].filter((cheese) => cheese.id !== action.cheeseOrder.id);
    // case CLEAR_ORDER:
    //   return state.filter((order) => order.id !== action.order.id);
    case UPDATE_CHEESE_QUANTITY:
      console.log(state[1][0].cheeses);
      state[1][0].cheeses.map((cheese) => {
        if (cheese.Order_Cheese.cheeseId == action.infoToUpdate.cheeseId) {
          cheese.Order_Cheese.quantity = action.infoToUpdate.quantity;
          return cheese.Order_Cheese;
        }
        return cheese.Order_Cheese;
      });

    case UPDATE_WINE_QUANTITY:
      state[0][0].wines.map((wine) => {
        if (wine.Order_Wine.wineId == action.infoToUpdate.wineId) {
          wine.Order_Wine.quantity = action.infoToUpdate.quantity;
          return wine.Order_Wine;
        }
        return wine.Order_Wine;
      });
    // case FULFILL_ORDER:
    //   return action.order;
    default:
      return state;
  }
}
