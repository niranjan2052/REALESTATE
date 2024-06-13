import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    value: 0,
  },
  reducers: {
    setNotification: (state, action) => {
      state.value = action.payload;
    },
    clearNotification: (state) => {
      state.value = null;
    },
  },
});

export default notificationSlice.reducer;

export const { setNotification, clearNotification } = notificationSlice.actions;
