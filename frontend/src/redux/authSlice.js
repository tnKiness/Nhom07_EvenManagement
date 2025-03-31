import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const initialState = {
  currentUser: JSON.parse(sessionStorage.getItem("user")) || null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/signin",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.currentUser = null;
      Cookies.remove("token");
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.others;

      const token = action.payload.accessToken;
      const others = JSON.parse(atob(token.split('.')[1]));
      const user = JSON.stringify({
        username: others.sub,
        role: others.role
      });

      Cookies.set("token", token);
      sessionStorage.setItem("user", user);

      if (others.role === "ROLE_ADMIN") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
