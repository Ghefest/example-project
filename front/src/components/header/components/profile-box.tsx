import * as React from "react";
import s from "../header.module.scss";
import { NavLink } from "react-router-dom";

export interface IProfileBoxProps {}

const ProfileBox: React.FC<IProfileBoxProps> = () => {
	return (
		<>
			<NavLink className={s.profile_link} to='/profile'>
				Профиль
			</NavLink>
			<br />
			<NavLink className={s.profile_link} to='/'>
				Вывести средства
			</NavLink>
			<br />
			<NavLink className={s.profile_link} to='/' style={{ color: "#00DD66" }}>
				Реферальная система
			</NavLink>
		</>
	);
};

export { ProfileBox };
