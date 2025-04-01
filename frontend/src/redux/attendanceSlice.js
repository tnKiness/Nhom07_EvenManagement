import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

const initialState = {
  attendance: [],
  isLoading: false,
  error: null,
};

export const getAttendance = createAsyncThunk(
  "attendance/get-attendance",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8080/api/attendance");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusAttendance = createAsyncThunk(
  "attendance/update-status-attendance",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/attendance/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAttendanceById = createAsyncThunk(
  "attendance/get-attendance-by-id",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/attendance/${payload}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAttendance = createAsyncThunk(
  "attendance/add-attendance",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/attendance",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.clear();
      window.location.href = "/othersuccess";
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

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendance.push(action.payload);
      })
      .addCase(getAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendance = action.payload;
      })
      .addCase(getAttendanceById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendanceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAttendanceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.other = action.payload;
      })
      .addCase(updateStatusAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateStatusAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        const { status, id } = action.meta.arg;
        const index = state.attendance.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.attendance[index].status = status;
        }
      });
  },
});

export default attendanceSlice.reducer;