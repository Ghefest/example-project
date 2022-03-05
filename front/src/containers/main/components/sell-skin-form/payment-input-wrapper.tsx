import React from "react";
import classNames from "classnames";
import { useIsPayoutDisabled } from "../../../../hooks";
import s from "../../main.module.scss";

interface IPaymentInputWrapperProps {
	formik: any;
	label: string;
	formikValueKey: string;
}

const PaymentInputWrapper: React.FC<IPaymentInputWrapperProps> = React.memo(({ formik, label, formikValueKey }) => {
	const isPayoutDisabled = useIsPayoutDisabled();

	return (
		<div className={classNames(s.input_container)}>
			<label htmlFor={formikValueKey} className={classNames({ [s.input_label_disabled]: isPayoutDisabled })}>
				{label}
			</label>
			<input
				name={formikValueKey}
				className={classNames(s.input, { [s.input_payout_disabled]: isPayoutDisabled })}
				placeholder='Link you'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values[formikValueKey]}
				disabled={isPayoutDisabled}
			/>
		</div>
	);
});

export { PaymentInputWrapper };
