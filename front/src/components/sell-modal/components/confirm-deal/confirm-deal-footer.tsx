import React from "react";
import s from "../../sell-modal.module.scss";
import classNames from "classnames";
import { useTimer } from "react-timer-hook";
import { SelectSellAcceptTradeUntil } from "../../../../store";
import { useSelector } from "react-redux";

interface IConfirmDealFooterProps {}

const Timer = ({ expiryTimestamp }: { expiryTimestamp: number }) => {
	const { seconds, minutes } = useTimer({ expiryTimestamp });

	return (
		<div className='d-flex align-items-center'>
			<span>{minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
		</div>
	);
};

const ConfirmDealFooter: React.FC<IConfirmDealFooterProps> = () => {
	const acceptTradeUntil = useSelector(SelectSellAcceptTradeUntil);
	const time = new Date(acceptTradeUntil);

	return (
		<div className={s.confirm_deal_footer}>
			<div className={s.footer_content}>
				<p className='subtitle_lower text-primary'>Ожидание подтверждения сделки</p>
				<p className='text_lower'>
					У вас есть 10 мин для подтверждения сделки в Steam.
					<br />
					По истечении времени, сделка будет отменена.
				</p>
			</div>
			<div className={classNames(s.footer_content, "d-flex align-items-center")}>
				<div className={s.time}>
					<Timer expiryTimestamp={time.getTime()} />
				</div>
			</div>
		</div>
	);
};

export { ConfirmDealFooter };
