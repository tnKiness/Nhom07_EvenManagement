import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import feedbackSlice from "./feedbackSlice";
import attendanceSlice from "./attendanceSlice";
import notificationSlice from "./notificationSlice";
import statisticalSlice from "./statisticalSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
    user: userSlice,
    category: categorySlice,
    feedback: feedbackSlice,
    attendance: attendanceSlice,
    notification: notificationSlice,
    statistical: statisticalSlice,
  },
});

export default store;
