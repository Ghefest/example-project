import React from "react";
import s from "../sell-modal.module.scss";
import classNames from "classnames";

import { Button } from "semantic-ui-react";
import { DealProgress } from "./deal-progress";
import { NotificationText } from "./notification-text/notification-text";
import { Type } from "./notification-text/notification-text.types";

interface IWaitingDealProps {
	haveError?: boolean;
}

const WaitingDeal: React.FC<IWaitingDealProps> = ({ haveError }) => {
	return (
		<>
			<DealProgress now={0} />

			<div className={s.waiting_deal_box}>
				<div className={s.content_box}>
					<h1 className={classNames(s.title, "title_lower")}>
						Ваш обмен находится в процессе создания. Пожалуйста ожидайте, этот процесс может занять до 15 минут
					</h1>
					{haveError && (
						<NotificationText
							text='Произошла ошибка при создании обмена, пожалуйста, попробуйте через несколько минут.'
							messageType={Type.Danger}
						/>
					)}
				</div>
				<div className={s.content_box}>
					<p className='comments_text m-0'>В случае ошибок обратитесь в нашу поддержку</p>
					<Button inverted color='blue' className='ml-2'>
						<h2 className='comments_text text-white'>Написать в поддержку</h2>
					</Button>
				</div>
			</div>
		</>
	);
};

export { WaitingDeal };
