import { createDraftSafeSelector, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { SellDTO } from "@pot-back/common";
import { RootState } from "./store";
import memoize from "lodash.memoize";

const selectedItemsAdapter = createEntityAdapter<Array<SellDTO.CreateSellItem & { rubPrice: number }>>();

export const selectedItems = createSlice({
	name: "selected-items",
	initialState: selectedItemsAdapter.getInitialState(),
	reducers: {
		addOne: (state, { payload }) => {
			selectedItemsAdapter.addOne(state, payload);
		},
		upsertMany: (state, { payload }) => {
			selectedItemsAdapter.upsertMany(state, payload);
		},
		removeOne: (state, { payload }) => {
			selectedItemsAdapter.removeOne(state, payload);
		},
		removeAll: selectedItemsAdapter.removeAll,
	},
});

export const SelectedItemsActions = selectedItems.actions;

const selectSelectedItems = (state: RootState) => state.selectedItems;
export const SelectSelectedItems = (state: RootState) =>
	Object.values<SellDTO.CreateSellItem>(state.selectedItems.entities as any);
export const SelectTotalSelectedItems = createSelector(
	selectSelectedItems,
	(selectedItems) => selectedItems.ids.length,
);
export const SelectTotalSelectedPrice = createDraftSafeSelector(selectSelectedItems, (selectedItems) => {
	return memoize((currency: string) => {
		const ids = selectedItems.ids;
		const items = selectedItems.entities;
		let totalPrice = 0;

		for (const id of ids) {
			const selectedItem = (items[id] as any) as SellDTO.CreateSellItem & { rubPrice: number };
			if (selectedItem) {
				if (currency === "USD") totalPrice += selectedItem.price;
				else totalPrice += selectedItem.rubPrice;

				totalPrice = Number(totalPrice.toFixed(2));
			}
		}

		return totalPrice;
	});
});

export const selectedItemsReducer = selectedItems.reducer;

export const getIsSelectedItem = (state: RootState, id: number) => state.selectedItems.ids.includes(id);
