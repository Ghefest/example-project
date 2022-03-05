import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		priceCurrency: "USD",
	},
	reducers: {
		updatePriceCurrency: (state, { payload }) => {
			state.priceCurrency = payload;
		},
	},
});

export const settingsReducer = settingsSlice.reducer;
export const SettingsActions = settingsSlice.actions;

const SelectSettings = (state: RootState) => state.settings;
export const SelectSettingsPriceCurrency = createSelector(SelectSettings, (settings) => settings.priceCurrency);
