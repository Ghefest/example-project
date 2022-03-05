import React from "react";
import s from "./invited-user.module.scss";

import Col from "react-bootstrap/Col";

export interface IInvitedUserProps {
	name: string;
	percentInvitation: number;
}

const InvitedUser: React.FC<IInvitedUserProps> = ({ name, percentInvitation }) => {
	return (
		<>
			<Col className='mt-3' md={6}>
				<div className={s.invited_user}>
					<div className='d-flex align-items-center'>
						<img src='./images/profile/icons/person.png' alt='' className='mr-2' />
						<h5 className='subtitle_lower m-0'>{name}</h5>
					</div>
					<div className='d-flex align-items-center'>
						<img src='./images/profile/icons/warning.png' alt='' className='mr-2' />
						<h5 className='subtitle_lower m-0' style={{ color: "#FAAD14" }}>
							Не использовал
						</h5>
					</div>
					<div className='d-flex align-items-center'>
						<p className='subtitle_lower'> {percentInvitation} %</p>
					</div>
				</div>
			</Col>
		</>
	);
};

export { InvitedUser };
