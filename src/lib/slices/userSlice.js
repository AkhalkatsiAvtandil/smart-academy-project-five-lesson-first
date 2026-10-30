import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "null",
  surename: "null",
  age: "null",
  subscribed: "null",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {},
    deleteUser: (state, action) => {},
  },
});

export const { updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
