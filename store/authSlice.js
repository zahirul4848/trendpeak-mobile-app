import {createSlice} from "@reduxjs/toolkit";
import {getUserData, removeItem, setItem} from "../utils/asyncStorage";

const initialState = {
  userInfo: getUserData(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action)=> {
      state.userInfo = action.payload;
      setItem("trendPeakUserInfo", JSON.stringify(action.payload));
    },
    logout: (state, action)=> {
      state.userInfo = null;
      removeItem("trendPeakUserInfo");
    }
  }
});

export const {setUserInfo, logout} = authSlice.actions;
export default authSlice.reducer;