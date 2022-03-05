import React from "react";
import s from "../../sell-modal.module.scss";
import classNames from "classnames";
import { Button } from "semantic-ui-react";
import { NotificationText } from "../notification-text/notification-text";
import { Type } from "../notification-text/notification-text.types";
import { DealProgress } from "../deal-progress";
import { ConfirmDealFooter } from "./confirm-deal-footer";
import { Mobiles } from "../sub-components/mobile";

interface IConfirmDealProps {
	items: any[];
	sellId: number;
	bot: {
		name: string;
		avatar: string;
		profileUrl: string;
	};
	steamTradeId: string;
}

const ConfirmDeal: React.FC<IConfirmDealProps> = ({ items, sellId, bot, steamTradeId }) => {
	const openBotProfile = () => {
		window.open(bot.profileUrl, "_blank");
	};

	const tradeUrl = () => "https://steamcommunity.com/tradeoffer/" + steamTradeId;
	const openTradeInBrowser = () => window.open(tradeUrl(), "_blank");
	const openTradeInSteam = () => window.open("steam://openurl/" + tradeUrl(), "_self");

	return (
		<div className={s.confirm_deal_box}>
			<DealProgress now={50} />
			<div className={s.confirm_deal_main}>
				<div className={s.content}>
					<h1 className={"title_lower"}>Подтвердите в STEAM, сверив данные обмена</h1>
					<div className={s.steam_confirm_box}>
						<div className={classNames(s.confirm_table, s.bot_for_sell)} onClick={() => openBotProfile()}>
							<p className='subtitle_lower'>Бот для сделки: </p>
							<p className='subtitle_lower text-primary'>{bot.name}</p>
						</div>
						<div className={s.confirm_table}>
							<p className='subtitle_lower'>Номер сделки: </p>
							<p className='subtitle_lower'>#{sellId}</p>
						</div>
						<div className={s.btn_box}>
							<Button content='Подтвердить в браузере' primary fluid onClick={() => openTradeInBrowser()} />
							<div className='mt-4'>
								<Button content='Подтвердить в стиме' primary inverted fluid onClick={() => openTradeInSteam()} />
							</div>
						</div>
					</div>
				</div>

				<div className={classNames(s.content, s.mobile_content)}>
					<h4 className={"title_lower"}>Подтвердите обмен в телефоне</h4>
					<div className='mt-3'>
						<NotificationText text='Убедитесь что данный обмен содержит этот предмет:' messageType={Type.Warning} />
					</div>
					<Mobiles items={items} botAvatar={bot.avatar} itemImg='./images/case.png' />
				</div>
			</div>
			<ConfirmDealFooter />
		</div>
	);
};

export { ConfirmDeal };
