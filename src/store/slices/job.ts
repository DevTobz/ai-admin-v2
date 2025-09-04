import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPayloadJobData, JobAction } from "../types/job";

const initialState: JobAction = {
  jobs: [],
  job: null,
  current_page: "1",
  last_page: "1",
  loading: false,
};

export const job = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<IPayloadJobData>) => {
      state.jobs = action.payload.data;
      state.current_page = action.payload?.current_page;
      state.last_page = action.payload?.last_page;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id === action.payload);
    },
  },
});

export const { setJobs, setLoading, deleteJob } = job.actions;

export default job.reducer;
