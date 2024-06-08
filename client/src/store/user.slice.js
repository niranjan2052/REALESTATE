import { createSlice } from "@reduxjs/toolkit";
import { fromStorage } from "../lib";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: fromStorage("user"),
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.value = null;
    },
  },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;
