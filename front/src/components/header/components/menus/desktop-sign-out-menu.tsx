import * as React from "react";
import s from "../../header.module.scss";

import Nav from "react-bootstrap/Nav";

import { Button } from "semantic-ui-react";
import { SelectBox } from "../select-box";
import { DesktopLinks } from "../desktop-links";
import classNames from "classnames";

export interface IDesktopSignOutMenuProps {}

const DesktopSignOutMenu: React.FC<IDesktopSignOutMenuProps> = () => {
	return (
		<>
			<DesktopLinks className='d-none d-sm-block' />
			<Nav>
				<SelectBox className={"d-none d-lg-block"} />
				<Button
					animated='vertical'
					color='blue'
					className={classNames(s.log_btn, "d-flex justify-content-center align-items-center")}
					href='http://localhost:3005/api/auth/steam'
				>
					<Button.Content hidden>
						<span className={s.log_text_btn}>Ну же, кликай!</span>
					</Button.Content>
					<Button.Content visible>
						<img src='./images/header/shop.png' className='mb-1 mr-1' alt='' />
						<span className={s.log_text_btn}>Продать скины</span>
					</Button.Content>
				</Button>
			</Nav>
		</>
	);
};

export { DesktopSignOutMenu };
