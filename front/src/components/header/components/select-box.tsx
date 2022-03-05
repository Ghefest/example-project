import React from "react";
import s from "../header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SelectSettingsPriceCurrency, SettingsActions } from "../../../store";
import { CustomSelect } from "../../custom-select/custom-select";

interface ISelectBoxProps {
	className?: string;
}

const DollarOption = () => {
	return (
		<div className={s.select_option_wrapper}>
			<span>
				<b>$</b>
			</span>
			<span style={{ paddingLeft: "0.4rem" }}>USD</span>
		</div>
	);
};

const RubOption = () => {
	return (
		<div className={s.select_option_wrapper}>
			<span>
				<b>₽</b>
			</span>
			<span style={{ paddingLeft: "0.4rem" }}>RUB</span>
		</div>
	);
};


const currencyOptions = [
	{
		Component: RubOption,
		option: "RUB",
	},
	{
		Component: DollarOption,
		option: "USD",
	},
];

const SelectBox: React.FC<ISelectBoxProps> = React.memo(({ className }) => {
	const dispatch = useDispatch();
	const currentPriceCurrency = useSelector(SelectSettingsPriceCurrency);

	const onCurrencySelect = (currency: string) => {
		dispatch(SettingsActions.updatePriceCurrency(currency));
	};

	// @ts-ignore
	const selectedOptionComponent = () => currencyOptions.find((o) => o.option === currentPriceCurrency).Component;

	return (
			<CustomSelect
				options={currencyOptions}
				className={className}
				SelectedOptionComponent={selectedOptionComponent()}
				onSelect={onCurrencySelect}
			/>
	);
});

export { SelectBox };
