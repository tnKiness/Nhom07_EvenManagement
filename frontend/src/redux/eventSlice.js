import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import Swal from "sweetalert2";

const initialState = {
  event: [],
  isLoading: false,
  error: null,
};

export const getEvent = createAsyncThunk(
  "event/get-event",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/event");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addEvent = createAsyncThunk(
  "event/add-event",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/event", formData);
      Swal.fire({
        icon: "success",
        title: "Add event successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/event-management";
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEventById = createAsyncThunk(
  "event/get-event-by-id",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/event/${payload}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/update-event",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/api/event/${id}`, formData);
      Swal.fire({
        icon: "success",
        title: "Update event successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/event-management";
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/delete-event",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/api/event/${payload}`);
      Swal.fire({
        icon: "success",
        title: "Delete event successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
    });
    builder.addCase(getEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.event.push(action.payload.event);
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.event.findIndex(
        (event) => event.id === action.payload.event.id
      );
      console.log(index);
      state.event.splice(index, 1);
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getEventById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
    });
    builder.addCase(getEventById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      const { id, name, description, image, startDate, endDate, location, capacity } =
        action.meta.arg;
      for (let i = 0; i < state.event.length; i++) {
        if (state.event[i].id === id) {
          state.event[i].name = name;
          state.event[i].description = description;
          state.event[i].image = image;
          state.event[i].startDate = startDate;
          state.event[i].endDate = endDate;
          state.event[i].location = location;
          state.event[i].capacity = capacity;
        }
      }
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {
  addEventStart,
  addEventSuccess,
  addEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
  updateEventStart,
  updateEventSuccess,
  updateEventFailure,
} = eventSlice.actions;

export default eventSlice.reducer;
