import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  notification: [],
  isLoading: false,
  error: null,
};

const token = Cookies.get("token");

export const getNotification = createAsyncThunk(
  "notification/get-notification",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/notifications");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNotification = createAsyncThunk(
  "notification/add-notification",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/notifications",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Add notification successfully",
      });
      window.location.href = "/notifications";
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  extraReducers: {
    [getNotification.pending]: (state) => {
      state.isLoading = true;
    },
    [getNotification.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notification = action.payload;
    },
    [getNotification.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addNotification.pending]: (state) => {
      state.isLoading = true;
    },
    [addNotification.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notification.push(action.payload);
    },
    [addNotification.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default notificationSlice.reducer;