import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { UserInventoryApi } from "../api";
import { RootState } from "./store";

export interface Sticker {
	name: string;
	image: string;
}

export interface Gem extends Sticker {}

export interface InventoryItem {
	id: number;
	name: string;
	image: string;
	price: number;
	rubPrice: number;
	type: string;
	rarity: string;
	stickers?: Sticker[];
	gems?: Gem[];
	isBlacklisted: boolean;
}

export const loadInventory = createAsyncThunk("inventory/load", (_, api) => {
	const { getState, rejectWithValue } = api;
	const state: RootState = getState() as any;
	const filters: any = SelectInventoryFilter(state);

	return UserInventoryApi.get(filters)
		.then((inventory) => inventory)
		.catch((err) => rejectWithValue(err));
});

export const scrollInventory = createAsyncThunk("inventory/scroll", (_, api) => {
	const { getState, rejectWithValue } = api;
	const state: RootState = getState() as any;
	const filters: any = SelectInventoryFilter(state);
	const page: number = SelectInventoryScrollPage(state);

	return UserInventoryApi.get({ ...filters, skip: page * filters.take })
		.then((inventory) => inventory)
		.catch((err) => rejectWithValue(err));
});

export const reloadInventory = createAsyncThunk("inventory/reload", (_, api) => {
	const { getState, rejectWithValue } = api;
	const state: RootState = getState() as any;
	const filters: any = SelectInventoryFilter(state);

	return UserInventoryApi.reload(filters)
		.then((inventory) => inventory)
		.catch((err) => rejectWithValue(err));
});

const inventoryAdapter = createEntityAdapter<InventoryItem>();

const inventorySlice = createSlice({
	name: "inventory",
	initialState: inventoryAdapter.getInitialState({
		isLoading: false,
		total: 0,
		errorMessage: "",
		filter: {
			games: ["570", "730"],
			sort: "price",
			order: "DESC",
			types: [],
			rarities: [],
			name: "",
			take: 12,
			skip: 0,
		},
		scrollPage: 0,
	}),
	reducers: {
		updateFilter: (state, { payload }) => {
			Object.assign(state.filter, payload);
		},
		updateFilterSort: (state, { payload }) => {
			const { sort } = payload;

			if (state.filter.sort === sort) {
				if (state.filter.order === "DESC") {
					state.filter.order = "ASC";
				} else {
					state.filter.order = "DESC";
				}
			} else {
				state.filter.sort = sort;
			}

			state.scrollPage = 0;
		},
		updateFilterName: (state, { payload }) => {
			state.filter.name = payload.name;
		},
		updateFilterGames: (state, { payload }) => {
			state.filter.games = payload.games;
			if (payload.rarities) state.filter.rarities = payload.rarities;
			if (payload.types) state.filter.types = payload.types;

			if (payload.games.length === 2) {
				state.filter.types = [];
				state.filter.rarities = [];
			}

			state.scrollPage = 0;
		},
		updateFilterRarities: (state, { payload }) => {
			state.filter.rarities = payload.rarities;
		},
		updateFilterTypes: (state, { payload }) => {
			state.filter.types = payload.types;
		},
		increaseScrollPage: (state) => {
			state.scrollPage++;
		},
	},
	extraReducers: {
		[loadInventory.pending.type]: (state) => {
			state.isLoading = true;
			inventoryAdapter.setAll(state, []);
		},
		[loadInventory.fulfilled.type]: (state, action) => {
			state.isLoading = false;
			state.total = action.payload.total;
			inventoryAdapter.setAll(state, action.payload.items);
		},
		[loadInventory.rejected.type]: (state) => {
			state.isLoading = false;
			state.errorMessage = "Error";
		},
		[reloadInventory.pending.type]: (state) => {
			state.isLoading = true;
		},
		[reloadInventory.fulfilled.type]: (state, action) => {
			state.isLoading = false;
			state.total = action.payload.total;
			inventoryAdapter.setAll(state, action.payload.items);
		},
		[reloadInventory.rejected.type]: (state) => {
			state.isLoading = false;
			state.errorMessage = "Error";
		},
		[scrollInventory.fulfilled.type]: (state, { payload }) => {
			inventoryAdapter.addMany(state, payload.items);
		},
	},
});
export const inventoryReducer = inventorySlice.reducer;

export const {
	updateFilter,
	updateFilterSort,
	updateFilterName,
	updateFilterGames,
	updateFilterRarities,
	updateFilterTypes,
	increaseScrollPage,
} = inventorySlice.actions;

export const inventorySelectors = inventoryAdapter.getSelectors((state: RootState) => state.inventory);

const SelectInventory = (state: RootState) => state.inventory;
export const SelectIsInventoryLoading = createSelector(SelectInventory, (inventory) => inventory.isLoading);
export const SelectInventoryTotalItems = createSelector(SelectInventory, (inventory) => inventory.total);
export const SelectInventoryFilter = createSelector(SelectInventory, (inventory) => inventory.filter);
export const SelectInventoryFilterName = (state: RootState) => state.inventory.filter.name;
export const SelectInventoryFilterSort = (state: RootState) => state.inventory.filter.sort;
export const SelectInventoryFilterOrder = createSelector(SelectInventory, (inventory) => inventory.filter.order);
export const SelectInventoryFilterGames = createSelector(SelectInventory, (inventory) => inventory.filter.games);
export const SelectInventoryScrollPage = createSelector(SelectInventory, (inventory) => inventory.scrollPage);
