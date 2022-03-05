import React from "react";
import s from "../profile.module.scss";

import { YourReferralLinkInput } from "./sub-components/referral-link-input/your-referral-link-input";
import { ReferralLinkInput } from "./sub-components/referral-link-input/referral-link-input";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useSelector } from "react-redux";
import { SelectReferralCode } from "../../../store";

interface IReferralLinkProps {}

const ReferralLink: React.FC<IReferralLinkProps> = () => {
	const referralCode = useSelector(SelectReferralCode);

	return (
		<div className={s.referral_link_box}>
			<Row>
				<Col md='4'>
					<h3 className='title_lower'>Реферальная система</h3>
					<p className='comments_text mt-1'>
						Вы можете приглашать пользователей по реферальной ссылке. Вы будете получать 1% с проданных пользователями
						скинов. Денежные средства вы сможете вывести удобным для вас способом.
					</p>
				</Col>
				<Col md='4'>
					<YourReferralLinkInput referralLink={window.location.host + `/ref_${referralCode}`} />
				</Col>
				<Col md='4'>
					<ReferralLinkInput />
				</Col>
			</Row>
		</div>
	);
};

export { ReferralLink };
