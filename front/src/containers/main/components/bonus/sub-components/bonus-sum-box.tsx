import React from "react";
import s from "../bonus.module.scss";
import classNames from "classnames";

export interface IBonusSumBoxProps {
	totalSoldFor: number;
}

const BonusSumBox: React.FC<IBonusSumBoxProps> = (props) => {
	const { totalSoldFor } = props;

	const nextBonus = (money: number) => {
		switch (true) {
			case money <= 500:
				return 500 - money;
			case money > 500 && money <= 1500:
				return 1500 - money;
			case money > 1500 && money <= 2500:
				return 2500 - money;
			case money > 2500 && money <= 5000:
				return 5000 - money;
		}
	};

	return (
		<div className={classNames(s.bonus_box)}>
			<div className={s.sum_box}>
				<div>
					<h4 className='subtitle_lower'>Сумма, которую вы вывели</h4>
					<span style={{ color: "#72AAFF" }}>{totalSoldFor} $</span>
				</div>
				<div>
					<h4 className='subtitle_lower'>Сумма до следующего бонуса</h4>
					<span style={{ color: "#00DD66" }}>{nextBonus(totalSoldFor)} $</span>
				</div>
				<div>
					<h4 className='subtitle_lower'>Вам осталось продать на</h4>
					<span style={{ color: "#FAAD14" }}> {5000 - totalSoldFor} $</span>
				</div>
			</div>
		</div>
	);
};

export { BonusSumBox };
