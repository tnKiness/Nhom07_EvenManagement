import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const token = Cookies.get("token");

export const getUsers = createAsyncThunk(
  "user/get-users",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8080/api/users", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update-user",
  async ({ id, data1: data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Update user successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Update user failed!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/get-user-by-id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // trạng thái chờ
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    // thành thái thành công
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;

      sessionStorage.setItem("user", JSON.stringify(action.payload));
      // reload lại trang
      window.location.reload();
    },
    // trạng thái eror
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUserById.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUserById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
