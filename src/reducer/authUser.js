import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: "guest user",
    token: "",
    isAuthenticated: false
  };
export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    LOGOUTUSER: () => initialState,
    LOGINUSER: (state , action) => {
      console.log("action user");
      console.log(action);
        state.user= action.payload.id;
        state.userName= action.payload.Name;
        state.userType= action.payload.User_Type;
        state.userToken= action.payload.accessToken;
        state.profilePic= action.payload.profilePic;
        state.kyc= action.payload.kyc;
        state.Address= action.payload.Address;
        state.inventory= action.payload.inventory;
        state.isUserAuthenticated= true
    },
    CURRENTCHAINUSER: (state , action) => {
        state.chain= action.payload;
    },
  },
})
// Action creators are generated for each case reducer function
export const { LOGINUSER , LOGOUTUSER , CURRENTCHAINUSER}  = authUserSlice.actions

export default authUserSlice.reducer