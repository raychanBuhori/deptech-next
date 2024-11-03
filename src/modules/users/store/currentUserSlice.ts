// features/currentUserSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/modules/users/services/usersApiSlice";

interface CurrentUserState {
  user: User | null;
}

const initialState: CurrentUserState = {
  user: null
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
