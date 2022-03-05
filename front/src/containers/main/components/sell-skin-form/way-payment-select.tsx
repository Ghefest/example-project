import React from "react";
import classNames from "classnames";
import s from "../../main.module.scss";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ReactComponent as Qiwi } from "../../../../images/main/qiwi.svg";
import { ReactComponent as MasterCard } from "../../../../images/main/master-card.svg";
import { ReactComponent as Visa } from "../../../../images/main/visa.svg";
import { ReactComponent as YMoney } from "../../../../images/main/y-money.svg";
import { ReactComponent as Bitcoin } from "../../../../images/main/bitcoin.svg";
import { ReactComponent as Tether } from "../../../../images/main/tether.svg";
import { ReactComponent as CheckMark } from "../../../../images/main/check-mark.svg";
import { useIsPayoutDisabled } from "../../../../hooks";

interface IWayPaymentSelectProps {
	formik: any;
}

const paymentProviders: Array<{
	value: string;
	name?: string;
	Icon: any;
	Icon2?: any;
}> = [
	{ value: "QWRUBnoFees", Icon: Qiwi },
	{ value: "CARDRUBNOFEES", Icon: MasterCard, Icon2: Visa },
	{ value: "YAMRUB", Icon: YMoney },
	{ value: "BTC", Icon: Bitcoin },
	{ value: "USDTTRC", name: "Tether", Icon: Tether },
];

const WayPaymentSelect: React.FC<IWayPaymentSelectProps> = React.memo(({ formik }) => {
	const isPayoutDisabled = useIsPayoutDisabled();
	const isActive = (value: string) => formik.values.provider === value;
	const showCheckMark = (value: string) => isActive(value) && !isPayoutDisabled;

	return (
		<ToggleButtonGroup className='flex-wrap' type='radio' name='provider' value={formik.values.provider}>
			{paymentProviders.map(({ value, name, Icon, Icon2 }) => {
				return (
					<ToggleButton
						key={value}
						name='provider'
						className={classNames(s.checkbox_btn, s.provider_checkbox_btn, { [s.provider_disabled]: isPayoutDisabled })}
						value={value}
						onChange={formik.handleChange}
						disabled={isPayoutDisabled}
					>
						<>
							<Icon
								className={classNames({
									[s.provider_icon_active]: isActive(value),
									[s.provider_icon_not_active]: !isActive(value),
									[s.provider_icon_disabled]: isPayoutDisabled,
								})}
							/>
							{Icon2 && (
								<Icon2
									className={classNames(s.provider_icon_second, {
										[s.provider_icon_active]: isActive(value),
										[s.provider_icon_not_active]: !isActive(value),
										[s.provider_icon_disabled]: isPayoutDisabled,
									})}
								/>
							)}
							{name && <span className={s.provider_name}>{name}</span>}
							{showCheckMark(value) && <CheckMark className={s.check_mark} />}
						</>
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
});

export { WayPaymentSelect };
