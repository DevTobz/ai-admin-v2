import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import job from "./slices/job";
import loading from "./slices/loading";
import candidate from "./slices/candidate";
import message from "./slices/message";
import interview from "./slices/interview";
import editCandidate from "./slices/editCandidate"

export const store = configureStore({
  reducer: {
    auth,
    job,
    loading,
    candidate,
    interview,
    message,
    editCandidate
  },
  // devTools: env.enviroment === "production" ? false : true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
