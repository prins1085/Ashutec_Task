import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  view: "grid" | "list";
}

const initialState: UiState = {
  view: "grid",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<"grid" | "list">) => {
      state.view = action.payload;
    },
  },
});

export const { setView } = uiSlice.actions;

export default uiSlice.reducer;