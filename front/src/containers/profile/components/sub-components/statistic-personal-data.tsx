import React from "react";
import s from "../../profile.module.scss";

import classNames from "classnames";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface IStatisticPersonalDataProps {}

const StatisticPersonalData: React.FC<IStatisticPersonalDataProps> = () => {
	return (
		<Row className='mt-4 justify-content-between align-items-center'>
			<Col md={3} xs={4}>
				<h2 className='title_lower'>Статистика</h2>
				<p className='comments_text mt-1'>Список пришглашенных, вами, пользователей.</p>
			</Col>
			<Col md={3} xs={12}>
				<div className={s.statistic_info_box}>
					<img src='./images/profile/icons/person.png' alt='' className='mr-2' />
					<h4 className='subtitle_lower m-0'>Имя пользователя</h4>
				</div>
			</Col>
			<Col md={3} xs={12}>
				<div className={s.statistic_info_box}>
					<img src='./images/profile/icons/question.png' alt='' className='mr-2' />
					<h4 className='subtitle_lower m-0'>Статус пользователя</h4>
				</div>
			</Col>
			<Col md={3} xs={12}>
				<div className={s.statistic_info_box}>
					<h5 className={classNames(s.percent, "mr-1")}>%</h5>
					<h4 className='subtitle_lower m-0'>Ваш процент от приглашения</h4>
				</div>
			</Col>
		</Row>
	);
};

export { StatisticPersonalData };
