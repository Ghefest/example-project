import React from "react";
import s from "../profile.module.scss";

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useSelector } from "react-redux";
import { SelectEmail, SelectTelegramTag } from "../../../store";

interface IPersonalDataProps {}

const PersonalData: React.FC<IPersonalDataProps> = () => {
	const telegramTag = useSelector(SelectTelegramTag);
	const email = useSelector(SelectEmail);

	return (
		<div className={s.personal_data_box}>
			<h2 className='title_lower'>Личные данные</h2>
			<p className='comments_text mt-1'>Вы можете добавить данные для обратной связи</p>
			<form>
				<Row>
					<Col md='4'>
						<div className='d-flex flex-column'>
							<label htmlFor='telegram'>Ваш телеграм</label>
							<input className={s.input} type='text' placeholder='Link you' value={telegramTag} />
						</div>
					</Col>
					<Col md='4'>
						<div className='d-flex flex-column'>
							<label htmlFor='email'>Ваша почта</label>
							<input className={s.input} type='email' placeholder='Link you' value={email} />
						</div>
					</Col>
					<Col md='4'>
						<div className='d-flex flex-column'>
							<label htmlFor='telegram'>Ваш профиль Steam</label>
							<input className={s.input} type='text' placeholder='Link you' />
						</div>
					</Col>
				</Row>
			</form>
		</div>
	);
};

export { PersonalData };
