import React from "react";
import classNames from "classnames";
import s from "../../main.module.scss";
import { WayPaymentSelect } from "./way-payment-select";
import { PaymentInputWrapper } from "./payment-input-wrapper";
import { WithdrawMoneyBox } from "./withdraw-money-box";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createSell,
	SelectSavedPayoutOptions,
	SelectSettingsPriceCurrency,
	SelectTotalSelectedPrice,
} from "../../../../store";
import { UserApi } from "../../../../api";
import { useIsPayoutDisabled } from "../../../../hooks";

interface IPaymentProps {}

const Payment: React.FC<IPaymentProps> = () => {
	const dispatch = useDispatch();
	const savedPayoutOptions = useSelector(SelectSavedPayoutOptions);

	const formik = useFormik({
		initialValues: {
			email: savedPayoutOptions.email || "",
			provider: savedPayoutOptions.provider || "",
			purse: savedPayoutOptions.purse || "",
			termsAndConditions: true,
			savePayoutOptions: false,
		},
		onSubmit: ({ email, provider, purse, savePayoutOptions }) => {
			if (savePayoutOptions) {
				UserApi.updatePayoutOptions({
					email,
					provider: provider as any,
					purse,
				}).catch(() => /* todo show toast with error */ {});
			}

			dispatch(createSell({ email, paymentProvider: provider as "QWRUBnoFees", purse }));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<h2 className='title_lower'>
				Выплата
				<div className={s.strip_x}></div>
			</h2>

			<div className={s.input_container}>
				<label htmlFor=''>Способ выплаты</label>
				<WayPaymentSelect formik={formik} />
			</div>

			<PaymentInputWrapper formik={formik} formikValueKey={"email"} label={"Ваш e-mail"} />
			<PaymentInputWrapper formik={formik} formikValueKey={"purse"} label={"Ваш номер кошелька"} />

			<SumOfPayout />

			<WithdrawMoneyBox formik={formik} />
		</form>
	);
};

const SumOfPayout: React.FC<{}> = React.memo(() => {
	const selectedItemsTotalPrice = useSelector(SelectTotalSelectedPrice);
	const currency = useSelector(SelectSettingsPriceCurrency);
	const isPayoutDisabled = useIsPayoutDisabled();

	return (
		<div className={classNames(s.payment_sum_box, { [s.payment_sum_box_disabled]: isPayoutDisabled })}>
			<h2 className={classNames("title_lower", { [s.sum_text_disabled]: isPayoutDisabled })}>Сумма выплаты</h2>
			<h2
				className={classNames("title_lower", {
					[s.sum_number_active]: !isPayoutDisabled,
					[s.sum_number_disabled]: isPayoutDisabled,
				})}
			>
				{selectedItemsTotalPrice(currency) + ` ${currency === "USD" ? " $" : " ₽"}`}
			</h2>
		</div>
	);
});

export { Payment };
