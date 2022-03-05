import React from "react";
import s from "./sell-modal.module.scss";

import { WaitingDeal } from "./components/waiting-deal";
import { ConfirmDeal } from "./components/confirm-deal/confirm-deal";
import { EndingDeal } from "./components/ending-deal";
import { FinishedDeal } from "./components/finished-deal";
import { useSelector } from "react-redux";
import { SelectSell } from "../../store";
import { ErrorDeal } from "./components/error-deal";

interface ISellModalProps {}

const SellModal: React.FC<ISellModalProps> = () => {
	const sell = useSelector(SelectSell);

	return (
		<div className={s.sell_modal}>
			{sell.status === 0 && <WaitingDeal haveError={sell.haveError} />}
			{sell.status === 2 && <WaitingDeal haveError={sell.haveError} />}
			{sell.status === 3 && (
				<ConfirmDeal items={sell.items} sellId={sell.id} bot={sell.bot} steamTradeId={sell.tradeId} />
			)}
			{sell.status === 4 && <EndingDeal />}
			{sell.status === 7 && <EndingDeal />}
			{sell.status === 8 && <EndingDeal />}
			{sell.status === 10 && <FinishedDeal sellId={sell.id} totalItemsPrice={sell.totalItemsPrice} />}
			{sell.status === 11 && <ErrorDeal id={sell.id} error={sell.error} />}
		</div>
	);
};

export { SellModal };
