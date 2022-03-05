import React, { useState, useEffect } from "react";
import s from "./referral-link-input.module.scss";

import { Button } from "semantic-ui-react";

interface IReferralLinkInputProps {}

const ReferralLinkInput: React.FC<IReferralLinkInputProps> = () => {
	const [referralValue, setReferralValue] = useState("");
	const [disabled, setDisabled] = useState(false);

	const copyToClipboard = (e: any, value: string) => {
		e.preventDefault();
		navigator.clipboard.writeText(value);
	};

	const addReferralLink = (e: any) => {
		e.preventDefault();
		setDisabled(!disabled);
	};

	return (
		<form className='d-flex flex-column'>
			<label htmlFor='referralLink'>Ваш реферал</label>
			<div className={s.input_container}>
				<input
					className={s.input}
					name='referralLink'
					type='text'
					value={referralValue}
					onChange={(e) => setReferralValue(e.target.value)}
					disabled={disabled}
				/>
				<Button
					className={s.copy_btn}
					icon='add'
					size='tiny'
					color='blue'
					disabled={disabled}
					onClick={(e) => addReferralLink(e)}
				></Button>

				<Button
					className={s.copy_btn}
					icon='copy'
					size='tiny'
					color='blue'
					onClick={(e) => copyToClipboard(e, referralValue)}
					disabled={!disabled}
				></Button>
			</div>
		</form>
	);
};

export { ReferralLinkInput };
