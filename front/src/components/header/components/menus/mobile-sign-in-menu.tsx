import React from "react";
import classNames from "classnames";
import "../../header-clean.scss";
import { ProfileBox } from "../profile-box";

interface IMobileSignInMenuProps {
	className?: string;
}

const MobileSignInMenu: React.FC<IMobileSignInMenuProps> = ({ className }) => {
	return (
		<div className={classNames("mobile_menu", className)}>
			<input id='menu__toggle' type='checkbox' />
			<label className='menu__btn' htmlFor='menu__toggle'>
				<span></span>
			</label>

			<ul className='menu__box'>
				<ProfileBox />
			</ul>
		</div>
	);
};

export { MobileSignInMenu };
