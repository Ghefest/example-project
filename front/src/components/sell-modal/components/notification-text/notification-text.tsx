import React from "react";
import s from "../../sell-modal.module.scss";
import classNames from "classnames";

import { INotificationText, INotificationTextStyleOption, Type } from "./notification-text.types";
import { NOTIFICATION_TEXT_STYLE_OPTION } from "./notification-texts";

export interface INotificationTextProps extends INotificationText {}

const getStyleOptions = (type: keyof INotificationTextStyleOption, messageType: Type) => {
	return NOTIFICATION_TEXT_STYLE_OPTION[messageType][type];
};

const NotificationText: React.FC<INotificationTextProps> = (props) => {
	return (
		<div className={s.notification_text_box}>
			<h1 className={classNames(s.text, "pr-1")} style={{ color: getStyleOptions("color", props.messageType) }}>
				{props.text}
			</h1>
			<img src={getStyleOptions("icon", props.messageType)} className={s.icon} alt='' />
		</div>
	);
};

export { NotificationText };
