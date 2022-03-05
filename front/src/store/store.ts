import { configureStore } from "@reduxjs/toolkit";
import { selectedItemsReducer } from "./selected-items";
import { sellReducer } from "./sell";
import { userReducer } from "./user";
import { inventoryReducer } from "./user-inventory";
import { settingsReducer } from "./settings";

export const store = configureStore({
	reducer: {
		user: userReducer,
		inventory: inventoryReducer,
		selectedItems: selectedItemsReducer,
		sell: sellReducer,
		settings: settingsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
