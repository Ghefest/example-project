import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { AuthApi } from "../../api";
import { UserActions } from "../../store";

export const SteamAuthOk = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		AuthApi.getMe().then((user) => dispatch(UserActions.signIn(user)));
	});

	return <Redirect to='/' />;
};
