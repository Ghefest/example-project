import { SellDTO } from "@pot-back/common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SellApi } from "../api";
import { SelectedItemsActions, SelectSelectedItems } from "./selected-items";
import { RootState } from "./store";

export const createSell = createAsyncThunk("sell/create", (dto: Omit<SellDTO.CreateSell, "items">, api) => {
	const { getState, rejectWithValue, dispatch } = api;
	const state: RootState = getState() as any;
	const items = SelectSelectedItems(state) as any;

	return SellApi.create({ ...dto, items })
		.then((sell) => {
			dispatch(SelectedItemsActions.removeAll());
			return sell;
		})
		.catch((err) => rejectWithValue(err));
});

const initialState = {
	isCreating: false,
	haveError: false,
	id: 0,
	tradeId: "",
	status: null,
	bot: {
		name: "",
		avatar: "",
		profileUrl: "",
	},
	items: [],
	givenItem: null,
	acceptTradeUntil: "",
	totalItemsPrice: 0,
	error: "",
};

export const sellSlice = createSlice({
	name: "sell",
	initialState: initialState,
	reducers: {
		update: (state, { payload }) => {
			if (state.id && state.id != payload.id) return;

			Object.assign(state, payload);
		},
		closeSellModal: () => {
			return initialState;
		},
	},
	extraReducers: {
		[createSell.pending.type]: (state) => {
			state.isCreating = true;
		},
		[createSell.fulfilled.type]: (state, { payload }) => {
			state.isCreating = false;
			state.haveError = false;
			return Object.assign(state, payload);
		},
		[createSell.rejected.type]: (state) => {
			state.isCreating = false;
			state.haveError = true;
		},
	},
});

export const SellActions = sellSlice.actions;
export const sellReducer = sellSlice.reducer;

export const SelectHaveSell = (state: RootState) => !!state.sell.id || state.sell.isCreating || state.sell.haveError;
export const SelectSellAcceptTradeUntil = (state: RootState) => state.sell.acceptTradeUntil;
export const SelectSell = (state: RootState) => state.sell;
export const SelectHaveError = (state: RootState) => state.sell.haveError;
export const SelectIsCreating = (state: RootState) => state.sell.isCreating;
