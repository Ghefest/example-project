import React from "react";
import s from "../sell-modal.module.scss";
import { Button } from "semantic-ui-react";
import { DealProgress } from "./deal-progress";

interface IFinishedDealProps {
	sellId: number;
	totalItemsPrice: number;
}

const FinishedDeal: React.FC<IFinishedDealProps> = ({ sellId, totalItemsPrice }) => {
	return (
		<>
			<DealProgress now={100} />
			<div className={s.finished_deal_box}>
				<p className='title_lower'>Деньги переведены!</p>
				<p className='subtitle_lower mt-3'>#{sellId}</p>
				<h2 className='title_lower mt-2' style={{ color: "#00dd66" }}>
					{totalItemsPrice} $
				</h2>

				<div className={s.content}>
					<Button content='Оставить отзыв на TrustPilot' primary size='mini' />
					<Button className='text-white' content='Закрыть окно' primary inverted size='mini' />
				</div>
			</div>
		</>
	);
};

export { FinishedDeal };
