import * as React from "react";
import s from "../../header.module.scss";
import classNames from "classnames";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Button } from "semantic-ui-react";
import { SelectBox } from "../select-box";
import { ProfileBox } from "../profile-box";

export interface ITabletMenuProps {}

const TabletMenu: React.FC<ITabletMenuProps> = () => {
	return (
		<div className='d-lg-none'>
			<Navbar.Collapse id='responsive-navbar-nav' className={s.responsive_tablet_nav}>
				<div className='container'>
					<Nav className='text-center' style={{ width: "100%" }}>
						<div className={classNames(s.tablet_navbar)}>
							<button className={s.close_btn}>
								<img src='./images/header/close.png' width='32' alt='' />
							</button>

							<div className='d-flex'>
								<SelectBox />

								<Button
									className='d-flex justify-content-center align-items-center ml-3'
									color='blue'
									style={{ minHeight: "45px", minWidth: "150px" }}
									size='medium'
									animated
									fluid
									href='http://localhost:3005/api/auth/steam'
								>
									<Button.Content visible>Войти</Button.Content>
									<Button.Content hidden>Вход туть!</Button.Content>
								</Button>
							</div>
						</div>

						<div className={"mt-5 text-center"}>
							<ProfileBox />
						</div>
					</Nav>
				</div>
			</Navbar.Collapse>
		</div>
	);
};

export { TabletMenu };
