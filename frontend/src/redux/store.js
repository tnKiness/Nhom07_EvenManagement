import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import registerVaccineSlice from "./registerVaccineSlice";
import userSlice from "./userSlice";
import patientSlice from "./patientSlice";
import categorySlice from "./categorySlice";
import vaccinePlanSlice from "./vaccinePlanSlice";
import feedbackSlice from "./feedbackSlice";
import cartSlice from "./cartSlice";
import attendanceSlice from "./attendanceSlice";
import notificationSlice from "./notificationSlice";
import postSlice from "./postSlice";
import statisticalSlice from "./statisticalSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
    registerVaccine: registerVaccineSlice,
    user: userSlice,
    patient: patientSlice,
    category: categorySlice,
    vaccinePlan: vaccinePlanSlice,
    feedback: feedbackSlice,
    cart: cartSlice,
    attendance: attendanceSlice,
    notification: notificationSlice,
    post: postSlice,
    statistical: statisticalSlice,
  },
});

export default store;
