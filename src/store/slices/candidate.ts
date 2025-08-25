import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CandidateAction, IPayloadCandidateData } from "../types/candidate";

const initialState: CandidateAction = {
  candidates: [],
  candidate: null,
  current_page: "1",
  last_page: "1",
  loading: false,
};

export const candidate = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<IPayloadCandidateData>) => {
      state.candidates = action.payload.data;
      state.current_page = action.payload?.current_page;
      state.last_page = action.payload?.last_page;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { setCandidates, setLoading } = candidate.actions;

export default candidate.reducer;
