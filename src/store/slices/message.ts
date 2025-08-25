import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../types/message";

// Define the initial state using that type
const initialState: IMessage = {
  message: null,
  type: "",
  title: "",
};

export const message = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<IMessage>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.title = action.payload.title;
    },
    clearMessage: (state) => {
      state.message = "";
      state.type = "";
      state.title = "";
    },
  },
});

export const { setMessage, clearMessage } = message.actions;

export default message.reducer;
