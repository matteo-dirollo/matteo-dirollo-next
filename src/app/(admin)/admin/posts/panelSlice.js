// In your slices folder, create a new slice file, e.g., panelSlice.js

import { createSlice } from "@reduxjs/toolkit";

const panelSlice = createSlice({
  name: "panel",
  initialState: {
    showThirdPanel: false,
  },
  reducers: {
    toggleThirdPanel: (state) => {
      state.showThirdPanel = !state.showThirdPanel;
    },
  },
});

export const { toggleThirdPanel } = panelSlice.actions;
export const selectThirdPanelVisibility = (state) => state.panel.showThirdPanel;

export default panelSlice.reducer;
