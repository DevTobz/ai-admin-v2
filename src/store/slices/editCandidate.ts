import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CandidateType } from '../types/candidate';

interface CandidateState {
  selectedCandidate: CandidateType | null;
}

const initialState: CandidateState = {
  selectedCandidate: null,
};

const editCandidateSlice = createSlice({
  name: 'editCandidate',
  initialState,
  reducers: {
    setSelectedCandidate(state, action: PayloadAction<CandidateType>) {
      state.selectedCandidate = action.payload;
    },
    clearSelectedCandidate(state) {
      state.selectedCandidate = null;
    },
  },
});

export const { setSelectedCandidate, clearSelectedCandidate } = editCandidateSlice.actions;
export default editCandidateSlice.reducer;
