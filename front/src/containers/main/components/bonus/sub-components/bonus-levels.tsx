import React from "react";
import s from "../bonus.module.scss";
import classNames from "classnames";

import { Levels, LevelsActive } from "../bonuses-types";

export interface IBonusLevelsProps {
	totalSoldFor: number;
}

const BonusLevels: React.FC<IBonusLevelsProps> = (props) => {
	const { totalSoldFor } = props;

	const activatedLevels = () => {
		if (totalSoldFor >= 0) (Levels as any).One = LevelsActive.One;
		if (totalSoldFor >= 500) (Levels as any).Two = LevelsActive.Two;
		if (totalSoldFor >= 1500) (Levels as any).Three = LevelsActive.Three;
		if (totalSoldFor >= 2500) (Levels as any).Four = LevelsActive.Four;
		if (totalSoldFor >= 5000) (Levels as any).Five = LevelsActive.Five;
	};

	activatedLevels();

	return (
		<div className={classNames(s.level_box)}>
			<div className={s.level_text_container}>
				<img src={Levels.One} alt='' className={s.lvl_img} />
				<p className={s.level_text} style={{ color: totalSoldFor >= 0 ? "#0f5fd8" : "#08306C" }}>
					Новичок
				</p>
			</div>
			<div className={s.level_text_container}>
				<img src={Levels.Two} alt='' className={s.lvl_img} />
				<p className={s.level_text} style={{ color: totalSoldFor >= 500 ? "#0f5fd8" : "#08306C" }}>
					Любитель
				</p>
			</div>
			<div className={s.level_text_container}>
				<img src={Levels.Three} alt='' className={s.lvl_img} />
				<p className={s.level_text} style={{ color: totalSoldFor >= 1500 ? "#0f5fd8" : "#08306C" }}>
					Опытный
				</p>
			</div>
			<div className={s.level_text_container}>
				<img src={Levels.Four} alt='' className={s.lvl_img} />
				<p className={s.level_text} style={{ color: totalSoldFor >= 2500 ? "#0f5fd8" : "#08306C" }}>
					Поставщик
				</p>
			</div>
			<div className={s.level_text_container}>
				<img src={Levels.Five} alt='' className={s.lvl_img} />
				<p className={s.level_text} style={{ color: totalSoldFor > 5000 ? "#0f5fd8" : "#08306C" }}>
					Оптовик
				</p>
			</div>
		</div>
	);
};

export { BonusLevels };
