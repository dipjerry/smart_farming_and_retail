import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: "guest user",
    isAuthenticated: false
  };
export const authSlice = createSlice({
  name: 'authAdmin',
  initialState,
  reducers: {
    LOGOUT: (state) => {
              state.user= "guest user",
              state.isAuthenticated= false
      },
    LOGIN: (state , action) => {
        console.log("action");
        console.log(action);
        state.user= action.payload;
        state.isAuthenticated= true
    },
  },
})
// Action creators are generated for each case reducer function
export const { LOGIN , LOGOUT}  = authSlice.actions

export default authSlice.reducer

// const initialState2 = {
//     user: "anonymous",
//     isAuthenticated: false
//   };
  
//   export const authSlice2 = createSlice({
//     name: 'auth2',
//     initialState: initialState2,
//     reducers: {
//       LOGOUT: (state) => {
//         state.user= "anonymous",
//         state.isAuthenticated= false
//       },
//       LOGIN: (state , action) => {
//         console.log("action");
//         console.log(action);
//         state.user= action.payload;
//         state.isAuthenticated= true
//       }
//     },
//   })
  
//   export const { LOGIN: LOGIN2, LOGOUT: LOGOUT2 } = authSlice2.actions
  
//   export default authSlice2.reducer