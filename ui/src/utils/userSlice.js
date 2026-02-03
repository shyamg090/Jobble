import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    setUserRole: (state, action) => {
      if (state) {
        return { ...state, role: action.payload };
      }
      return { role: action.payload };
    },
    updateUserProfile: (state, action) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return action.payload;
    },
  },
});

export const { addUser, removeUser, setUserRole, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
