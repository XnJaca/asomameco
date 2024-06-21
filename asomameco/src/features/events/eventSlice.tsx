import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEvent, IEventCreate } from "../../interfaces/event";
import {
  createEvent,
  deleteEventApi,
  getAllEvents,
  updateEventApi,
} from "../../services/eventService";

interface EventState {
  events: IEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  return await getAllEvents();
});

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (newEvent: IEventCreate) => {
    await createEvent(newEvent);
    return await getAllEvents(); // Fetch the updated event list
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (updatedEvent: IEvent) => {
    await updateEventApi(updatedEvent);
    return await getAllEvents(); // Fetch the updated event list
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId: number) => {
    await deleteEventApi(eventId);
    return await getAllEvents(); // Fetch the updated event list
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      });
  },
});

export default eventSlice.reducer;
