import React from "react";
import s from "./referral-link-input.module.scss";

import { Button } from "semantic-ui-react";

interface IYourReferralLinkInputProps {
	referralLink: string;
}

const copyToClipboard = (e: any, value: string) => {
	e.preventDefault();
	navigator.clipboard.writeText(value);
};

const YourReferralLinkInput: React.FC<IYourReferralLinkInputProps> = ({ referralLink }) => {
	return (
		<form className='d-flex flex-column'>
			<label htmlFor='referralLink'>Ваша реферальная ссылка</label>
			<div className={s.input_container}>
				<input className={s.input} name='referralLink' type='text' value={referralLink} />
				<Button
					className={s.copy_btn}
					icon='copy'
					size='tiny'
					color='blue'
					onClick={(e) => copyToClipboard(e, referralLink)}
				></Button>
			</div>
		</form>
	);
};

export { YourReferralLinkInput };
