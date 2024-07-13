import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface UserState {
  user: null | IUser;
  token: null | string;
  mode: PaletteMode;
}

const initialState: UserState = {
  user: null,
  token: null,
  mode: "light",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUpdate: (state, action) => {
      state.user = action.payload;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setUpdate, setMode, logout } = userSlice.actions;
export default userSlice.reducer;
