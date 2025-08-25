import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IAuthState {
  loading: boolean;
  update: boolean;
  more: boolean;
  delete: boolean;
}

// Define the initial state using that type
const initialState: IAuthState = {
  loading: false,
  update: false,
  more: false,
  delete: false,
};

export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setUpdate: (state) => {
      state.update = true;
    },
    stopUpdate: (state) => {
      state.update = false;
    },
  },
});

export const { setLoading, stopLoading, setUpdate, stopUpdate } =
  loading.actions;

export default loading.reducer;
