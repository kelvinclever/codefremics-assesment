import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
