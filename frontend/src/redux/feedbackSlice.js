import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  feedback: [],
  isLoading: false,
  error: null,
};

const token = Cookies.get("token");

export const addFeedback = createAsyncThunk(
  "feedback/add-feedback",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/feedback",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Thêm bình luận thành công",
      });
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng đăng nhập để bình luận",
        confirmButtonText: ` <a href="/login">Đăng Nhập</a> `,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeedback = createAsyncThunk(
  "feedback/get-feedback",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/feedback",
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeedbackByEventId = createAsyncThunk(
  "feedback/get-feedback-by-event-id",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/feedback/${payload}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: {
    [addFeedback.pending]: (state) => {
      state.isLoading = true;
    },
    [addFeedback.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.comment.push(action.payload);
      }
    },
    [addFeedback.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getFeedback.pending]: (state) => {
      state.isLoading = true;
    },
    [getFeedback.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [getFeedback.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getFeedbackByEventId.pending]: (state) => {
      state.isLoading = true;
    },
    [getFeedbackByEventId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [getFeedbackByEventId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default feedbackSlice.reducer;
