import * as React from "react";
import s from "./header.module.scss";
import classNames from "classnames";
import Navbar from "react-bootstrap/Navbar";
import { TabletMenu } from "./components/menus/tablet-navbar";
import { DesktopSignOutMenu } from "./components/menus/desktop-sign-out-menu";
import { Link } from "react-router-dom";
import { MobileSignOutMenu } from "./components/menus/mobile-sign-out-menu";

export interface IHeaderSignedOutProps {}

const HeaderSignedOut: React.FC<IHeaderSignedOutProps> = () => {
	return (
		<header className={classNames(s.header)}>
			<Navbar collapseOnSelect expand='lg' variant='dark' className={s.navbar}>
				<MobileSignOutMenu className='d-block d-sm-none' />
				<TabletMenu />
				<div className='container'>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' className='d-none d-lg-none d-md-block d-sm-block' />
					<Navbar.Brand className='mb-2'>
						<Link to='/'>
							<img src='/images/header/logo.svg' alt='' />
						</Link>
					</Navbar.Brand>
					<DesktopSignOutMenu />
				</div>
			</Navbar>
		</header>
	);
};

export { HeaderSignedOut };
