import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setUser, clearUser } from "./user.slice";
import notificationReducer, {
  setNotification,
  clearNotification,
} from "./notification.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
export { setUser, clearUser, setNotification, clearNotification };
