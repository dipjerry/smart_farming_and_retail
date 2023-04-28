// import { createStore } from 'redux';

// const initialState = {
//   user: "guest user",
//   isAuthenticated: false
// };

// function reducer (state = initialState, action) {
//   console.log("I am called");
//   switch (action.type) {
//     case 'LOGIN':
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: {},
//         isAuthenticated: false
//       };
//     default:
//       return state;
//   }
// }

// const store = createStore(reducer, window.__PRELOADED_STATE__);

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../reducer/authUser'
import authAdminReducer from '../reducer/authUser'
import countReducer from '../reducer/counter'

 const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    authUserAdmin: authUserReducer,
    count: countReducer,
  },
})

export default store;