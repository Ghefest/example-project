import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
	id: 0,
	username: "",
	avatar: "",
	balance: 0,
	tradeOfferLink: "",
	email: "",
	telegramTag: "",
	salesSum: 0,
	createdAt: "",
	referralCode: "",
	referrerId: "",
	savedPayoutProvider: "",
	savedPayoutEmail: "",
	savedPayoutPurse: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signIn: (state, { payload }) => {
			localStorage.setItem("isLoggedIn", "true");

			return { ...state, ...payload };
		},
		signOut: () => {
			return initialState;
		},
		updateSalesSum: (state, { payload }) => {
			return { ...state, salesSum: payload };
		},
		updateTradeOfferLink: (state, { payload }) => {
			return { ...state, tradeOfferLink: payload };
		},
	},
});

export const UserActions = userSlice.actions;

const SelectUser = (state: RootState) => state.user;
export const SelectIsSignedIn = createSelector(SelectUser, (user) => !!user.id);
export const SelectUsername = (state: RootState) => state.user.username;
export const SelectAvatar = (state: RootState) => state.user.avatar;
export const SelectBalance = (state: RootState) => state.user.balance;
export const SelectTradeOfferLink = createSelector(SelectUser, (user) => user.tradeOfferLink);
export const SelectSalesSum = (state: RootState) => state.user.salesSum;
export const SelectCreatedAt = (state: RootState) => state.user.createdAt;
export const SelectReferralCode = (state: RootState) => state.user.referralCode;
export const SelectEmail = (state: RootState) => state.user.email;
export const SelectTelegramTag = (state: RootState) => state.user.telegramTag;
export const SelectSavedPayoutOptions = createSelector(SelectUser, (user) => ({
	provider: user.savedPayoutProvider,
	email: user.savedPayoutEmail,
	purse: user.savedPayoutPurse,
}));

export const userReducer = userSlice.reducer;
