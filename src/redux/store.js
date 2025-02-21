// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice"; // Import the reducer directly

const store = configureStore({
  reducer: {
    user: userReducer, // Use userReducer here, not the entire userSlice
  },
});

export default store;
