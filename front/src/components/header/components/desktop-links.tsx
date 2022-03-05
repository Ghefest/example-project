import * as React from "react";
import s from "../header.module.scss";
import "../header-clean.scss";

import classNames from "classnames";

import Nav from "react-bootstrap/Nav";

import { NavLink } from "react-router-dom";

interface IDesktopLinksProps {
	className?: string;
}

const DesktopLinks: React.FC<IDesktopLinksProps> = ({ className }) => {
	return (
		<Nav className={classNames(s.responsive_nav_container, "mr-auto", className)}>
			<NavLink exact={true} to='/' className={classNames(s.nav_link)} activeClassName={s.active}>
				Главная
			</NavLink>
			<NavLink to='/support' className={classNames(s.nav_link)} activeClassName={s.active}>
				Поддержка
			</NavLink>
		</Nav>
	);
};

export { DesktopLinks };
