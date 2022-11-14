import axios from "axios";

//ACTION TYPES
const SET_USERS = "SET_USERS";

//ACTION CREATORS
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

//THUNKS
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users} = await axios.get('/api/users/all')
      dispatch(setUsers(users))
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
