import React from "react";
import s from "../sell-modal.module.scss";
import classNames from "classnames";

import { DealProgress } from "./deal-progress";

interface IEndingDealProps {}

const EndingDeal: React.FC<IEndingDealProps> = () => {
	return (
		<>
			<DealProgress now={100} />
			<div className={s.ending_deal_box}>
				<p className={classNames(s.title, "title_lower text-primary")}>
					Сделка обрабатывается
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</p>
				<p className='subtitle_lower mt-3'>Ваши предметы получены, ожидайте выплату в ближайшее время</p>
			</div>
		</>
	);
};

export { EndingDeal };
