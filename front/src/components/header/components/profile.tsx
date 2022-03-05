import * as React from "react";
import s from "../header.module.scss";
import "../header-clean.scss";

import classNames from "classnames";

import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import { ProfileBox } from "./profile-box";
import { useDispatch, useSelector } from "react-redux";
import { SelectAvatar, SelectBalance, SelectUsername, UserActions } from "../../../store";
import { AuthApi } from "../../../api";

export interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
	const dispatch = useDispatch();

	const username = useSelector(SelectUsername);
	const avatar = useSelector(SelectAvatar);
	const balance = useSelector(SelectBalance);

	const signOut = () => {
		AuthApi.logout();
		dispatch(UserActions.signOut());
	};

	return (
		<div className={classNames(s.profile)}>
			<h4 className={classNames(s.name, "ml-2 mt-3")}>{username}</h4>

			<Dropdown>
				<Dropdown.Toggle id='dropdown-basic' className={classNames(s.profile_btn, "ml-3")}>
					<img src={avatar} className={s.avatar_img} alt='' />
					<p className={s.balance}>{balance}$</p>
				</Dropdown.Toggle>

				<Dropdown.Menu className={classNames(s.profile_menu)}>
					<ProfileBox />
					<Nav.Link className={classNames(s.profile_link)} style={{ color: "#FF001F" }} onClick={() => signOut()}>
						Выход
					</Nav.Link>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export { Profile };
