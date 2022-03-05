import React from "react";
import s from "../sell-modal.module.scss";
import classNames from "classnames";

import { DealProgress } from "./deal-progress";

interface IErrorDealProps {
	id: number;
	error: string;
}

const ErrorDeal: React.FC<IErrorDealProps> = ({ id, error }) => {
	return (
		<>
			<DealProgress now={100} />
			<div className={s.ending_deal_box}>
				<p className={classNames(s.title, "title_lower text-primary")}>
					Произошла ошибка '{error}'. Обратитесь в службу поддержки.
				</p>
				<p className='subtitle_lower mt-3'>Номер сделки: {id}</p>
			</div>
		</>
	);
};

export { ErrorDeal };
