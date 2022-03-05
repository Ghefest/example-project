import React from "react";
import s from "./bonus.module.scss";
import classNames from "classnames";

import { StyledProgressBar } from "./sub-components/progress-bar";
import { BonusLevels } from "./sub-components/bonus-levels";
import { BonusSumBox } from "./sub-components/bonus-sum-box";

export interface IBonusProps {
	totalSoldFor: number;
}

const Bonus: React.FC<IBonusProps> = (props) => {
	const { totalSoldFor } = props;

	return (
		<div className={classNames(s.bonus_box)}>
			<BonusLevels totalSoldFor={totalSoldFor} />
			<StyledProgressBar money={totalSoldFor} />
			<BonusSumBox totalSoldFor={totalSoldFor} />
		</div>
	);
};

export { Bonus };
