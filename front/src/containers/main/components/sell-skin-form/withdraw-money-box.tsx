import React from "react";
import classNames from "classnames";
import s from "../../main.module.scss";
import { Button } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { SelectHaveSell, SelectTotalSelectedItems, SellActions } from "../../../../store";
import { CustomModal } from "../../../../components/custom-modal";

import { SellModal } from "../../../../components/sell-modal";
import { ProcessedDeal } from "../../../../components/processed-deal";

// @ts-ignore
import { useDraggable } from "use-draggable";
import { useIsPayoutDisabled } from "../../../../hooks";

interface IWithdrawMoneyBoxProps {
	formik: any;
}

const WithdrawMoneyBox: React.FC<IWithdrawMoneyBoxProps> = React.memo(
	({ formik }) => {
		const dispatch = useDispatch();
		const haveSell = useSelector(SelectHaveSell);
		const totalSelectedItems = useSelector(SelectTotalSelectedItems);
		const isPayoutDisabled = useIsPayoutDisabled();
		const { targetRef } = useDraggable({ controlStyle: true });

		const closeModal = () => dispatch(SellActions.closeSellModal());
		const isPayoutButtonDisabled = () => {
			return isPayoutDisabled || !formik.values.termsAndConditions || totalSelectedItems < 1;
		};

		return (
			<div className={s.withdraw_money_box}>
				<div className='d-flex flex-column'>
					<CheckboxWrapper
						formik={formik}
						formikValueKey={"termsAndConditions"}
						label={"Я согласен/согласна с правилами оферты"}
						comment={"Тут какое-то пояснение, бла бла бла. Я согласен на все, только дайте мне деняк."}
					/>
				</div>

				<div className='d-flex flex-column mt-5'>
					<CheckboxWrapper
						formik={formik}
						formikValueKey={"savePayoutOptions"}
						label={"Сохранить способ оплаты"}
						comment={"При следующей продаже, будут использованы данные, которые вы использовали в этот раз."}
					/>
				</div>

				<Button
					className={classNames(s.withdraw_money_btn, { [s.width_money_btn_disabled]: isPayoutDisabled })}
					type='submit'
					color='blue'
					size='big'
					style={{ width: "220px", height: "60px" }}
					onClick={closeModal}
					disabled={isPayoutButtonDisabled()}
				>
					Вывести деньги
				</Button>

				<div ref={targetRef} style={{ zIndex: 1000 }}>
					<CustomModal isOpen={haveSell} onClose={closeModal} displayCloseBtn={true}>
						<SellModal />
					</CustomModal>
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.formik.values.termsAndConditions === nextProps.formik.values.termsAndConditions &&
			prevProps.formik.values.savePayoutOptions === nextProps.formik.values.savePayoutOptions
		);
	},
);

const CheckboxWrapper: React.FC<{ formik: any; formikValueKey: string; label: string; comment: string }> = ({
	formik,
	formikValueKey,
	label,
	comment,
}) => {
	const isPayoutDisabled = useIsPayoutDisabled();

	return (
		<label htmlFor={formikValueKey}>
			<Checkbox
				id={formikValueKey}
				className={classNames(s.checkbox, { [s.checkbox_disabled]: isPayoutDisabled })}
				type='checkbox'
				name={formikValueKey}
				label={label}
				onChange={formik.handleChange}
				checked={formik.values[formikValueKey] && !isPayoutDisabled}
				disabled={isPayoutDisabled}
			/>
			<p className='comments_text ml-1'>{comment}</p>
		</label>
	);
};

export { WithdrawMoneyBox };
