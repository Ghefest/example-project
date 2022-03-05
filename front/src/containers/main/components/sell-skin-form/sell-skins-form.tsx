import React from "react";
import s from "../../main.module.scss";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { YourItems } from "./your-items";
import { Payment } from "./payment";

const SellSkinsForm: React.FC = () => {
	return (
		<Row className={s.sell_skins_form_box}>
			<Col xl lg='12'>
				<YourItems />
			</Col>

			<Col className='d-flex align-items-center justify-content-center d-none d-xxl-block' xl='1'>
				<div className={s.strip_y}></div>
			</Col>

			<Col xl lg='12'>
				<Payment />
			</Col>
		</Row>
	);
};

export { SellSkinsForm };
