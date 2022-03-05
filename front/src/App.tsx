import React, { useEffect, useRef } from "react";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
	loadInventory,
	scrollInventory,
	SelectInventoryFilter,
	SelectInventoryScrollPage,
	SellActions,
	UserActions,
} from "./store";
import { Footer } from "./components";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Header, MainPage, SupportPage, Profile } from "./containers";
import { SteamAuthOk } from "./containers/steam-auth";
import { AuthApi, SellApi } from "./api";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { config } from "./config";
import { Button } from "semantic-ui-react";
import CookieConsent from "react-cookie-consent";
import { debounce } from "./helpers";

const App: React.FC = () => {
	const dispatch = useDispatch();
	const filterOptions = useSelector(SelectInventoryFilter);
	const inventoryScrollPage = useSelector(SelectInventoryScrollPage);

	useEffect(() => {
		const isLoggedIn = !!localStorage.getItem("isLoggedIn");
		if (isLoggedIn)
			AuthApi.getMe()
				.then((me) => {
					dispatch(UserActions.signIn(me));

					SellApi.getUserSalesSum()
						.then((salesSum) => dispatch(UserActions.updateSalesSum(salesSum)))
						.catch();
				})
				.catch(() => localStorage.removeItem("isLoggedIn"));
	}, [dispatch]);

	const debouncedLoadInventory = useRef(debounce(() => dispatch(loadInventory()), 500));

	useEffect(() => {
		debouncedLoadInventory.current();
	}, [filterOptions]);

	useEffect(() => {
		dispatch(scrollInventory());
	}, [inventoryScrollPage]);

	useEffect(() => {
		SellApi.getActive()
			.then((sell) => dispatch(SellActions.update(sell)))
			.catch(() => {});

		const socket = socketIOClient(config.apiWsUrl + "/sell", { multiplex: false, transports: ["websocket"] });
		socket.on("sell-status-changed", (sell: any) => dispatch(SellActions.update(sell)));

		return () => {
			socket.disconnect();
		};
	}, [dispatch]);

	return (
		<div className='App'>
			<ToastContainer />
			<Header />
			<Switch>
				<Route exact path='/' children={() => <MainPage />} />
				<Route path='/support' component={SupportPage} />
				<Route path='/profile' component={Profile} />
				<Route path='/auth/steam-ok' component={SteamAuthOk} />
			</Switch>
			<Footer />

			<CookieConsent
				location='bottom'
				buttonText='Согласиться'
				cookieName='MyCkoigfmdkg'
				style={{ background: "#0d173a" }}
				hideOnAccept={true}
				containerClasses='cookie_container'
				buttonClasses='cookie_btn'
				contentClasses='cookie_content'
				onAccept={() => alert("Cookie")}
			>
				<span className='subtitle_lower'>
					Вы любите куки? 🍪 Мы используем файлы cookie, чтобы вам было удобнее пользоваться нашим сайтом.
				</span>
				<Button color='green' inverted className='cookie_term_btn'>
					Политика конфиденциальности
				</Button>
			</CookieConsent>
		</div>
	);
};

export { App };
