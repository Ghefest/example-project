import { useSelector } from "react-redux";
import { SelectTradeOfferLink } from "../store";

export const useIsPayoutDisabled = () => {
	const tradeOfferLink = useSelector(SelectTradeOfferLink);

	return !!!tradeOfferLink;
};
