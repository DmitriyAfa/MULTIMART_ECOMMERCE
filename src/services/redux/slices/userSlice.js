import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const setUser = (user) => userActions.setUser(user);

export const setUsers = (users) => userActions.setUsers(users);

export default userSlice.reducer;
