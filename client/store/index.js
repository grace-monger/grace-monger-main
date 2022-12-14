import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import winesReducer from "./wines";
import cheeseReducer from "./cheeses";
import singleWineReducer from "./singleWine";
import singleCheeseReducer from "./singleCheese";
import orderReducer from "./order";
import usersReducer from "./users";

const reducer = combineReducers({
  auth,
  cheeses: cheeseReducer,
  wines: winesReducer,
  singleWineReducer,
  singleCheese: singleCheeseReducer,
  order: orderReducer,
  users: usersReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
