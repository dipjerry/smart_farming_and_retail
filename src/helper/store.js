import { createStore } from 'redux';

const initialState = {
  user: {},
  isAuthenticated: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
