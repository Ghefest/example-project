import React from "react";
import s from "./precessed-deal.module.scss";

import classNames from "classnames";

import { Button } from "semantic-ui-react";

interface IProcessedDealProps {
	onClose: Function;
}

const ProcessedDeal: React.FC<IProcessedDealProps> = ({ onClose }) => {
	return (
		<div className={s.processed_deal}>
			<p className={classNames(s.title, "title_lower")}>
				Сделка обрабатывается
				<span>.</span>
				<span>.</span>
				<span>.</span>
			</p>

			<h3 className='title_lower'>
				<div>Идет обработка. В ближайшем времени сделка бедут завершена.</div>
				<div>Если хотите остановить процесс, закройте это уведомление</div>
			</h3>

			<div className={s.content}>
				<Button content='Оставить отзыв на TrustPilot' primary size='large' />
				<Button
					className='text-white'
					content='Закрыть окно'
					primary
					inverted
					size='medium'
					onClick={() => onClose()}
				/>
			</div>
		</div>
	);
};

export { ProcessedDeal };
