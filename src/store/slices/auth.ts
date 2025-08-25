import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUserDataType } from "../types/auth";

// types

// Define a type for the slice state
interface IAuthState {
  user: IUserDataType | null;
  token: string | null | undefined;
  loading: boolean;
}

// Define the initial state using that type
const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem("@serial"),
  loading: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserDataType>) => {
      state.user = action.payload;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { setUser } = auth.actions;

export default auth.reducer;
