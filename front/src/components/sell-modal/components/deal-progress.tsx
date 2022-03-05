import React from "react";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import classNames from "classnames";

import s from "../sell-modal.module.scss";

interface IDealProgressProps {
	now: number;
}

const DealProgress: React.FC<IDealProgressProps> = ({ now }) => {
	const checkConfirm = (now: number) => (now >= 50 ? "#007bff" : "");
	const checkDealEnd = (now: number) => (now === 100 ? "#007bff" : "");

	const checkMobileDeal = (now: number) => {
		if (now >= 0 && now <= 49) return "Ожидание создания сделки";
		if (now >= 50 && now <= 99) return "Подтверждение сделки";
		if (now === 100) return "Подтверждение сделки";
	};

	return (
		<div className={s.progress_deal_box}>
			<ProgressBar className={s.deal_progress} animated now={now} key={1} />

			<div className={s.circle} style={{ backgroundColor: "#007bff" }}>
				<p className={classNames(s.circle_title, "text-primary")}>Ожидание создания сделки</p>
			</div>
			<div className={s.circle} style={{ left: "48%", backgroundColor: checkConfirm(now) }}>
				<p className={s.circle_title} style={{ color: checkConfirm(now) }}>
					Подтверждение сделки
				</p>
			</div>
			<div className={s.circle} style={{ left: "99%", backgroundColor: checkDealEnd(now) }}>
				<p className={s.circle_title} style={{ color: checkDealEnd(now) }}>
					Окончание текущей сделки
				</p>
			</div>

			<div className={s.mobile_circle_title}>{checkMobileDeal(now)}</div>
		</div>
	);
};

export { DealProgress };
