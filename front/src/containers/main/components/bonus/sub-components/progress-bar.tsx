import React from "react";
import s from "../bonus.module.scss";
import classNames from "classnames";

import ProgressBar from "react-bootstrap/ProgressBar";
import { useResizeDetector } from "react-resize-detector";

import { DesktopLine, MobileLine } from "./progress-line";
import { DESKTOP_LINE, MOBILE_LINE } from "./progress-lines";

interface IStyledProgressBarProps {
	money: number;
}

const StyledProgressBar: React.FC<IStyledProgressBarProps> = ({ money }) => {
	const { width, ref } = useResizeDetector();

	const intoInterest = (money: number) => {
		if (money >= 0 && money <= 500) {
			return (money * 25) / 500;
		} else if (money <= 2500) {
			return 25 + 0.5 * (((money - 500) * 100) / 2000);
		} else return 75 + 0.25 * (((money - 2500) * 100) / 2500);
	};

	const desktopFollowerPoint = (n: number) => {
		const imgWidth: number = 26;
		if (!width) return;
		return ((n * width) / 100 - imgWidth).toFixed().toString() + "px";
	};

	const mobileFollowerPoint = (n: number) => ((n * 380) / 100 + 55).toFixed().toString() + "px";

	mobileFollowerPoint(intoInterest(money));

	return (
		<div className={s.progress_wrapper}>
			<div className={s.progress_bar_container}>
				<ProgressBar ref={ref} animated now={intoInterest(money)} className={classNames(s.progress_bar)} />

				<div className={s.desktop_follower} style={{ left: desktopFollowerPoint(intoInterest(money)) }}>
					<img src='./images/main/bonus/desktop_follower.png' alt='' className={s.desktop_follower_img} />
				</div>

				{DESKTOP_LINE.map((line, index) => (
					<DesktopLine key={index} {...line} />
				))}

				<div className={s.mobile_line_box}>
					{MOBILE_LINE.map((line, i) => (
						<MobileLine key={i} {...line} />
					))}
				</div>
			</div>
			<div className={s.mobile_follower} style={{ top: mobileFollowerPoint(intoInterest(money)) }}>
				<h6 className={classNames("text_lower", s.text)}>Вы тут</h6>
				<img src='./images/main/bonus/mobile_follower.png' alt='' />
			</div>
		</div>
	);
};

export { StyledProgressBar };
