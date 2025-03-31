import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import registerVaccineSlice from "./registerVaccineSlice";
import userSlice from "./userSlice";
import patientSlice from "./patientSlice";
import categorySlice from "./categorySlice";
import vaccinePlanSlice from "./vaccinePlanSlice";
import commentSlice from "./commentSlice";
import cartSlice from "./cartSlice";
import otherSlice from "./otherSlice";
import messengerSlice from "./messengerSlice";
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
    comment: commentSlice,
    cart: cartSlice,
    other: otherSlice,
    messenger: messengerSlice,
    post: postSlice,
    statistical: statisticalSlice,
  },
});

export default store;
