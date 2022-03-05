import React from "react";
import s from "./header.module.scss";
import "./header-clean.scss";
import classNames from "classnames";
import Navbar from "react-bootstrap/Navbar";
import { TabletMenu } from "./components/menus/tablet-navbar";
import { DesktopSignInMenu } from "./components/menus/desktop-sign-in-menu";
import { Link } from "react-router-dom";
import { MobileSignInMenu } from "./components/menus/mobile-sign-in-menu";

export interface IHeaderSignedInProps {}

const HeaderSignedIn: React.FC<IHeaderSignedInProps> = React.memo(() => {
	return (
		<header className={classNames(s.header, "header")}>
			<Navbar className={s.navbar} collapseOnSelect expand='lg' variant='dark'>
				<MobileSignInMenu className='d-block d-sm-none' />
				<TabletMenu />
				<div className='container'>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' className='d-none d-lg-none d-md-block' />
					<Navbar.Brand className='mb-2'>
						<Link to='/'>
							<img src='/images/header/logo.svg' alt='' />
						</Link>
					</Navbar.Brand>
					<DesktopSignInMenu />
				</div>
			</Navbar>
		</header>
	);
});

export { HeaderSignedIn };
