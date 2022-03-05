import React from "react";
import classNames from "classnames";
import "../../header-clean.scss";
import { Button } from "semantic-ui-react";

interface IMobileSignOutMenuProps {
	className?: string;
}

const MobileSignOutMenu: React.FC<IMobileSignOutMenuProps> = ({ className }) => {
	return (
		<div className={classNames("mobile_menu", className)}>
			<input id='menu__toggle' type='checkbox' />
			<label className='menu__btn' htmlFor='menu__toggle'>
				<span></span>
			</label>

			<ul className='menu__box'>
				<Button
					className='enter_btn'
					color='blue'
					size='medium'
					animated
					fluid
					href='http://localhost:3005/api/auth/steam'
				>
					<Button.Content className='mt-1 ml-2' visible>
						Войти
					</Button.Content>
					<Button.Content hidden>Вход туть!</Button.Content>
				</Button>
			</ul>
		</div>
	);
};

export { MobileSignOutMenu };
