import React from "react";
import s from "../profile.module.scss";

import { Table } from "semantic-ui-react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface IProfileMoneyInfoProps {
	totalEarned: number;
	salePercent: number;
	invitedPercent: number;
}

const ProfileMoneyInfo: React.FC<IProfileMoneyInfoProps> = (props) => {
	const { totalEarned, salePercent, invitedPercent } = props;

	return (
		<div className={s.profile_money_info_box}>
			<Row>
				<Col md='4'>
					<Table basic inverted>
						<div className={s.table}>
							<h4 className='title_lower'>Всего заработано</h4>
							<p className={s.money}>{totalEarned} $</p>
						</div>
						<div className={s.table}>
							<h4 className='comments_text'>Ваш процент от продаж</h4>
							<p className='subtitle_lower'>{salePercent} %</p>
						</div>
						<div className={s.table}>
							<h4 className='comments_text'>Процент от приглашенных пользователей</h4>
							<p className='subtitle_lower'>{invitedPercent} %</p>
						</div>
					</Table>
				</Col>
			</Row>
		</div>
	);
};

export { ProfileMoneyInfo };
