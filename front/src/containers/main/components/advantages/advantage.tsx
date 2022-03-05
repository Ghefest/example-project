import React from "react";
import s from "../../main.module.scss";
import classNames from "classnames";

export interface IAdvantageProps {
	title: string;
	desc: string;
	image: string;
	marginLeft: string;
}

const Advantage: React.FC<IAdvantageProps> = (props) => {
	return (
		<div className={classNames(s.advantage_box)} style={{ marginLeft: props.marginLeft }}>
			<h2 className={classNames("title_lower", s.title)}>
				<img src={props.image} className='mr-1' alt='' />
				{props.title}
			</h2>
			<h3 className={classNames("subtitle", s.subtitle)} style={{ color: "#72AAFF" }}>
				{props.desc}
			</h3>
		</div>
	);
};

export { Advantage };
