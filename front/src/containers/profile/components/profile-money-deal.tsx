import React from "react";
import s from "../profile.module.scss";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { WithdrawalMoney } from "./sub-components/withdrawal-money/withdrawal-money";

interface IProfileMoneyDealProps {}

const ProfileMoneyDeal: React.FC<IProfileMoneyDealProps> = () => {
	return (
		<div className={s.profile_money_deal_box}>
			<Tabs defaultActiveKey='money_withdrawal' id='money_deal_tab'>
				<Tab eventKey='deposit' title='Депозит'>
					<p className='text-white'>Future deposit block</p>
				</Tab>
				<Tab eventKey='money_withdrawal' title='Вывод средств'>
					<WithdrawalMoney />
				</Tab>
				<Tab eventKey='skins_withdrawal' title='Вывод скинов'>
					<p className='text-white'>Future withdrawal of skins block</p>
				</Tab>
			</Tabs>
		</div>
	);
};

export { ProfileMoneyDeal };
