import * as React from "react";
import { useSelector } from "react-redux";
import { SelectIsSignedIn } from "../../store";
import { MainSignedIn } from "./main-signed-in";
import { MainSignedOut } from "./main-signed-out";

export interface IMainPageProps {}

const MainPage: React.FC<IMainPageProps> = React.memo(() => {
	const isSignedIn = useSelector(SelectIsSignedIn);
	return <> {isSignedIn ? <MainSignedIn /> : <MainSignedOut />} </>;
});

export { MainPage };
