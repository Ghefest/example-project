import React from "react";
import s from "../bonus.module.scss";

export interface IDesktopLineProps {
	topPos?: string;
	leftPos?: string;
	money?: number;
	percent?: string;
	imgLine?: string;
}

export interface IMobileLineProps {
	money: number;
	percent?: string;
	margin?: string;
}

const DesktopLine: React.FC<IDesktopLineProps> = (props) => {
	const { topPos, leftPos, money, percent, imgLine } = props;

	return (
		<div className={s.desktop_line} style={{ left: leftPos, top: topPos }}>
			<img src={imgLine} alt='' />
			<p className='text_lower mt-2'>{percent}</p>
			<div className='subtitle_lower d-flex align-items-center flex-nowrap'>
				<div>{money}</div>
				<div>$</div>
			</div>
		</div>
	);
};

const MobileLine: React.FC<IMobileLineProps> = (props) => {
	const { money, percent, margin } = props;

	return (
		<div className={s.mobile_line} style={{ margin: margin }}>
			<p className='text mt-2'>{percent}</p>
			<div className='subtitle d-flex align-items-center flex-nowrap'>
				<div>{money}</div>
				<div>$</div>
			</div>
		</div>
	);
};

export { DesktopLine, MobileLine };
