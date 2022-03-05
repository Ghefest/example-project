import React from "react";
import s from "./withdrawal-money.module.scss";

import Col from "react-bootstrap/Col";

import { IWithdrawalMoneyItemStyleOption, WithdrawalStatus, IWithdrawalMoneyItem } from "./withdrawal-money-item.types";

import { WITHDRAWAL_MONEY_ITEMS_STYLE_OPTION } from "./withdrawal-money-items";

export interface IWithdrawalMoneyItemProps extends IWithdrawalMoneyItem {}

const getStyleOptions = (type: keyof IWithdrawalMoneyItemStyleOption, withdrawalStatus: WithdrawalStatus) => {
	return WITHDRAWAL_MONEY_ITEMS_STYLE_OPTION[withdrawalStatus][type];
};

const WithdrawalMoneyItem: React.FC<IWithdrawalMoneyItemProps> = (props) => {
	const { id, status, paymentSystem, sum, date, time } = props;

	const style = {
		color: "#F5DD0A",
		fontSize: "15px",
	};

	const checkSum = (sum: number) => {
		if (!sum) {
			return <p style={style}>Отсутсвует</p>;
		} else if (sum > 0) {
			return (
				<h5 className='subtitle' style={{ color: "#00DD66" }}>
					{sum} $
				</h5>
			);
		}
	};

	return (
		<Col lg={12} className='mt-3'>
			<div className={s.withdrawal_money_item}>
				<div className={s.withdrawal_money_content}>
					<h5 className='comments_text'># {id}</h5>
				</div>
				<div className={s.withdrawal_money_item}>
					<div className='d-flex align-items-center'>
						<img className='mr-1' src={getStyleOptions("icon", status)} alt='' />
						<h5 className='subtitle_lower' style={{ color: getStyleOptions("color", status) }}>
							{getStyleOptions("text", status)}
						</h5>
					</div>
				</div>
				<div className={s.withdrawal_money_item}>
					<h5 className='subtitle_lower'>{paymentSystem}</h5>
				</div>
				<div className={s.withdrawal_money_item}>
					<h5 className='subtitle'>{checkSum(sum)}</h5>
				</div>
				<div className={s.withdrawal_money_item}>
					<h5 className='subtitle_lower'>{date}</h5>
				</div>
				<div className={s.withdrawal_money_item}>
					<h5 className='subtitle_lower'>{time}</h5>
				</div>
			</div>
		</Col>
	);
};

export { WithdrawalMoneyItem };
