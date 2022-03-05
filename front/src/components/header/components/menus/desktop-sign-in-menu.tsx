import * as React from "react";

import Nav from "react-bootstrap/Nav";

import { SelectBox } from "../select-box";
import { DesktopLinks } from "../desktop-links";
import { Profile } from "../profile";

export interface IDesktopSignInMenuProps {}

const DesktopSignInMenu: React.FC<IDesktopSignInMenuProps> = () => {
	return (
		<>
			<DesktopLinks className='d-none d-sm-block' />
			<Nav>
				<SelectBox className={"d-none d-lg-block"} />
				<Profile />
			</Nav>
		</>
	);
};

export { DesktopSignInMenu };
