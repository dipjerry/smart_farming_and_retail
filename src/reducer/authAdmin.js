import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin: "guest Admin",
    token: "",
    isAuthenticated: false
  };
export const authAdminSlice = createSlice({
  name: 'authAdmin',
  initialState,
  reducers: {
    LOGOUTADMIN: () => initialState,
    LOGINADMIN: (state , action) => {
      console.log("action admin");
      console.log(action);
        state.admin= action.payload.id;
        state.adminName= action.payload.Name;
        state.adminType= action.payload.User_Type;
        state.adminToken= action.payload.accessToken;
        state.isAdminAuthenticated= true
    },
    CURRENTCHAINADMIN: (state , action) => {
        state.chain= action.payload;
    },
  },
})
// Action creators are generated for each case reducer function
export const { LOGINADMIN , LOGOUTADMIN , CURRENTCHAINADMIN}  = authAdminSlice.actions

export default authAdminSlice.reducer