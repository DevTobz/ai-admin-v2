import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CandidateAction, IPayloadInterviewData } from "../types/interview";

const initialState: CandidateAction = {
  interviews: [],
  interview: null,
  current_page: "1",
  last_page: "1",
  loading: false,
};

export const interview = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setInterviews: (state, action: PayloadAction<IPayloadInterviewData>) => {
      state.interviews = action.payload.data;
      state.current_page = action.payload?.current_page;
      state.last_page = action.payload?.last_page;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { setInterviews, setLoading } = interview.actions;

export default interview.reducer;
